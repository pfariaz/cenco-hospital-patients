// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const hospital = require('./controllers/hospital');
const medicalConsultation = require('./controllers/medicalConsultation');
const patient = require('./controllers/patient');

exports.init = app => {
  app.get('/health', healthCheck);

  app.get('/hospital', [], hospital.list);
  app.post('/hospital', [], hospital.create);

  app.get('/consultations', [], medicalConsultation.list);
  app.post('/consultations', [], medicalConsultation.create);

  app.get('/patient', [], patient.list);
  app.post('/patient', [], patient.create);

  // Listar_Pacientes_Mayor_Riesgo.
  app.get('/patient/history-clinic/:clinicHistoryNumber/risk', [], patient.majorRiskByHistoryClinicNumber);

  // Listar_Pacientes_Fumadores_Urgentes
  app.get('/patient/smokers/urgent', [], patient.smokersUrgents);

  // Consulta_mas_Pacientes_Atendidos
  app.get('/consultations/max-patients', [], medicalConsultation.getMaxPatientsAttended);

  // Paciente_Mas_Anciano
  app.get('/patient/older', [], patient.getOlderPatient);

  // Liberar_Consultas.
  app.post('/consultations/liberate', [], medicalConsultation.liberateConsultations);

  // Atender_Paciente,
  app.post('/consultations/:patientId/attend', [], patient.attendPatient);
};
