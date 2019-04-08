const { Patient, Hospital, Sequelize, MedicalConsultation, WaitingRoom } = require('../models');
const { getPatientPriority, getPatientRisk } = require('../helpers/consultationUtils');
const {
  NOT_ATTENDED,
  URGENCY,
  PEDIATRICS,
  CGI,
  CHILD,
  FREE,
  IN_WAITING_ROOM,
  OCCUPED,
  IN_ATTENTION
} = require('../../config/constants');
const logger = require('../logger');
const { Op } = Sequelize;

exports.list = (req, res) =>
  Patient.findAndCountAll({
    include: [
      {
        model: Hospital
      }
    ]
  }).then(({ count, rows: patients }) =>
    res.json({
      patients,
      count
    })
  );

exports.create = (req, res) => {
  const priority = getPatientPriority(req.body);
  const risk = getPatientRisk(req.body, priority);
  const attentionState = NOT_ATTENDED;
  logger.info(`the priority for the new patient is ${priority} and their risk is ${risk}`);
  return Patient.create({ ...req.body, priority, risk, attentionState }).then(medicalConsultationNew =>
    res.json(medicalConsultationNew)
  );
};

exports.majorRiskByHistoryClinicNumber = (req, res) => {
  if (!req.params.clinicHistoryNumber) {
    return res.status(400).send({ meesage: 'clinicHistoryNumber is required' });
  }
  return Patient.findAndCountAll({
    attributes: ['name', 'age', 'risk', 'type'],
    where: {
      clinicHistoryNumber: req.params.clinicHistoryNumber
    },
    order: [['risk', 'DESC']],
    include: [
      {
        model: Hospital
      }
    ]
  }).then(({ count, rows: patients }) =>
    res.json({
      patients,
      count
    })
  );
};

exports.smokersUrgents = (req, res) =>
  Patient.findAndCountAll({
    attributes: ['name', 'age', 'priority', 'type'],
    where: {
      priority: {
        [Op.gt]: 4
      },
      isSmoker: true
    },
    order: [['priority', 'DESC']],
    include: [
      {
        model: Hospital
      }
    ]
  }).then(({ count, rows: patients }) =>
    res.json({
      patients,
      count
    })
  );

exports.getOlderPatient = (req, res) =>
  Patient.findAndCountAll({
    attributes: ['name', 'age', 'type'],
    order: [['age', 'DESC']],
    limit: 1,
    include: [
      {
        model: Hospital
      }
    ]
  }).then(({ count, rows: patients }) =>
    res.json({
      patients,
      count
    })
  );

/**
 * cuando los pacientes sean prioridad menor a 4 se distribuyen en lo siguiente
 * los niños en pediatria y el resto en CGI
 *
 * cuando la prioridad es sobre 4 es urgencia,
 *
 * Entonces para el metodo de atender a un paciente es determinando
 * su consulta en base a la prioridad descrita, luego busco la
 * consulta y si esta libre, debo marcar la consulta como ocupada, al paciente en atencion
 * y si viene otro a atenderse y es de la misma consulta, se inserta en la sala de espera
 *
 */

exports.attendPatient = (req, res) => {
  if (!req.params.patientId) {
    return res.status(400).send({ meesage: 'patientId is required' });
  }
  return Patient.findOne({
    where: {
      id: req.params.patientId
    },
    include: [
      {
        model: Hospital
      }
    ]
  }).then(patientToAttend => {
    const lowerLevelConsultantType = patientToAttend.type === CHILD ? PEDIATRICS : CGI;
    const consultationType = patientToAttend.priority > 4 ? URGENCY : lowerLevelConsultantType;
    return MedicalConsultation.findOne({
      where: {
        consultationType,
        state: FREE
      }
    }).then(consultation => {
      if (!consultation) {
        return WaitingRoom.create({ patientId: patientToAttend.id }).then(() => {
          Patient.update(
            {
              attentionState: IN_WAITING_ROOM
            },
            { where: { id: patientToAttend.id } }
          ).then(() =>
            res.json({
              message: `there is not free consultation so the patient ${
                patientToAttend.name
              } will be on the waiting room`
            })
          );
        });
      }
      return MedicalConsultation.update(
        {
          state: OCCUPED
        },
        { where: { id: consultation.id } }
      ).then(() => {
        Patient.update(
          {
            attentionState: IN_ATTENTION
          },
          { where: { id: patientToAttend.id } }
        ).then(() => res.json({ message: `patient ${patientToAttend.name} in attention` }));
      });
    });
  });
};
