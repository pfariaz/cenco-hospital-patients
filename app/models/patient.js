'use strict';

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
      weightHeightRelation: {
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  return Patient;
};
