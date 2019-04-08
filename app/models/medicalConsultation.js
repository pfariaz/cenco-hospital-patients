'use strict';

const { MEDICAL_CONSULTATION_TYPES, MEDICAL_CONSULTATION_STATES } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  const MedicalConsultation = sequelize.define(
    'MedicalConsultation',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      hospitalId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Hospitals',
          key: 'id'
        }
      },
      consultationType: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [MEDICAL_CONSULTATION_TYPES] }
      },
      patientsQuantity: {
        type: DataTypes.INTEGER
      },
      doctorName: {
        allowNull: false,
        type: DataTypes.STRING
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [MEDICAL_CONSULTATION_STATES] }
      }
    },
    {}
  );
  MedicalConsultation.associate = function associate(models) {
    MedicalConsultation.belongsTo(models.Hospital, { foreignKey: 'hospitalId' });
  };
  return MedicalConsultation;
};
