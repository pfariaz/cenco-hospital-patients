'use strict';

module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    'Hospital',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: true,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Hospital.associate = function associate(models) {
    Hospital.hasMany(models.MedicalConsultation, { foreignKey: 'hospitalId' });
  };
  return Hospital;
};
