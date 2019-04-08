'use strict';

module.exports = (sequelize, DataTypes) => {
  const WaitingRoom = sequelize.define(
    'WaitingRoom',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      patientId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Patients',
          key: 'id'
        }
      }
    },
    {}
  );
  return WaitingRoom;
};
