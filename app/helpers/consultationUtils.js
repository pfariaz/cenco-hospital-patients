const { TEEN, CHILD, OLD } = require('../../config/constants');

const getChildPriority = (age, weight, height) => {
  if (age >= 1 && age <= 5) {
    return weight - height + 3;
  } else if (age >= 6 && age <= 12) {
    return weight - height + 2;
  }
  return weight - height + 1;
};

const getTeenPriority = (isSmoker, yearsSmoker) => {
  if (isSmoker) {
    const prio = yearsSmoker / 4;
    return prio + 2;
  }
  return 2;
};

const getOldPriority = (age, hasDiet) => {
  let prio = age / 30;
  if (hasDiet && (age >= 60 && age <= 100)) {
    prio = age / 30;
    return prio + 4;
  }
  return prio + 3;
};

exports.getPatientPriority = ({ age, type, isSmoker, hasDiet, weight, height, yearsSmoker }) => {
  if (type === CHILD) {
    return getChildPriority(age, weight, height);
  } else if (type === TEEN) {
    return getTeenPriority(isSmoker, yearsSmoker);
  }
  return getOldPriority(hasDiet, age);
};

exports.getPatientRisk = ({ age, type }, priority) => {
  let baseRisk = age * priority;
  baseRisk = baseRisk / 100;
  if (type === OLD) {
    return baseRisk + 5.3;
  }
  return baseRisk;
};

// exports.getConsultationTypeByPriority = patient => {};
