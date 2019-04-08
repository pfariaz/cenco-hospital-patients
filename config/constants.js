const PEDIATRICS = 'pediatria';
const URGENCY = 'urgencia';
const CGI = 'CGI';

const MEDICAL_CONSULTATION_TYPES = [PEDIATRICS, URGENCY, CGI];

const TEEN = 'joven';
const CHILD = 'child';
const OLD = 'anciano';

const PATIENT_TYPES = [TEEN, CHILD, OLD];

const OCCUPED = 'ocupado';
const FREE = 'libre';

const MEDICAL_CONSULTATION_STATES = [OCCUPED, FREE];

const IN_ATTENTION = 'en atencion';
const ATTENDED = 'atendido';
const NOT_ATTENDED = 'no atendido';
const IN_WAITING_ROOM = 'en sala de espera';

const ATTENTION_STATES = [IN_ATTENTION, ATTENDED, NOT_ATTENDED, IN_WAITING_ROOM];

module.exports = {
  PEDIATRICS,
  URGENCY,
  MEDICAL_CONSULTATION_TYPES,
  TEEN,
  CHILD,
  OLD,
  PATIENT_TYPES,
  OCCUPED,
  FREE,
  MEDICAL_CONSULTATION_STATES,
  ATTENTION_STATES,
  CGI,
  IN_WAITING_ROOM
};
