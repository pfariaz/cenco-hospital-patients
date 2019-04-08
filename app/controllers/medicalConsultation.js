const { MedicalConsultation, Hospital } = require('../models');
const { FREE, OCCUPED } = require('../../config/constants');

exports.list = (req, res) =>
  MedicalConsultation.findAndCountAll({
    include: [
      {
        model: Hospital
      }
    ]
  }).then(({ count, rows: consultations }) =>
    res.json({
      consultations,
      count
    })
  );

exports.create = (req, res) =>
  MedicalConsultation.create(req.body).then(medicalConsultationNew => res.json(medicalConsultationNew));

exports.getMaxPatientsAttended = (req, res) =>
  MedicalConsultation.findAndCountAll({
    include: [
      {
        model: Hospital
      }
    ],
    order: [['patientsQuantity', 'DESC']],
    limit: 1
  }).then(({ count, rows: consultations }) =>
    res.json({
      consultations,
      count
    })
  );

exports.liberateConsultations = (req, res) =>
  MedicalConsultation.update(
    {
      state: FREE
    },
    {
      where: {
        state: OCCUPED
      }
    }
  ).then(() =>
    MedicalConsultation.findAndCountAll({
      attributes: ['consultationType', 'doctorName', 'state'],
      include: [
        {
          model: Hospital
        }
      ]
    }).then(({ count, rows: consultations }) =>
      res.json({
        consultations,
        count
      })
    )
  );
