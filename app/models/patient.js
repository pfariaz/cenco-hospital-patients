'use strict';

const { PATIENT_TYPES, ATTENTION_STATES } = require('../../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    'Patient',
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
      name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      age: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      isSmoker: {
        type: DataTypes.BOOLEAN
      },
      hasDiet: {
        type: DataTypes.BOOLEAN
      },
      weight: {
        type: DataTypes.INTEGER
      },
      height: {
        type: DataTypes.INTEGER
      },
      yearsSmoker: {
        type: DataTypes.INTEGER
      },
      risk: {
        type: DataTypes.INTEGER
      },
      priority: {
        type: DataTypes.INTEGER
      },
      clinicHistoryNumber: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      attentionState: {
        type: DataTypes.STRING,
        validate: { isIn: [ATTENTION_STATES] }
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: { isIn: [PATIENT_TYPES] }
      }
    },
    {}
  );
  Patient.associate = function associate(models) {
    Patient.belongsTo(models.Hospital, { foreignKey: 'hospitalId' });
  };
  return Patient;
};
