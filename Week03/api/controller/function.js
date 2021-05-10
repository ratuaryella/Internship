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

    exports.delete = (req, res) => {
      const id = req.params.id;
  
      Issue.destroy({
        where: { id: id }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "Data deleted"
            });
          } else {
            res.send({
              message: `Cannot delete Issue with id=${id}.`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete Issue with id=" + id
          });
        });
  };
  
  exports.deleteAll = (req, res) => {
      Issue.destroy({
          where: {},
          truncate: false
        })
          .then(nums => {
            res.send({ message: `${nums} Data deleted` });
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Error occured while removing all data"
            });
          });
  };
  
};



