const db = require("../models");
const Issue = db.issues;
const Op = db.sequelize.Op;


exports.findAll = (req, res) => {
    const label = req.query.label;
    var condition = label ? { label: { [Op.iLike]: `%${label}%` } } : null;

    Issue.findAll({where: condition})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message|| "Error occured"
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Issue.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Issue with id=" + id
      });
    });
};



