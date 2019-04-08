const { Hospital, MedicalConsultation } = require('../models');

exports.list = (req, res) =>
  Hospital.findAndCountAll({
    include: [
      {
        model: MedicalConsultation
      }
    ]
  }).then(({ count, rows: hospitals }) =>
    res.json({
      hospitals,
      count
    })
  );

exports.create = (req, res) => Hospital.create(req.body).then(hospitalNew => res.json(hospitalNew));
