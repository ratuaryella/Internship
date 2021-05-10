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

    exports.create = (req, res) => {
      if(!req.body.label){
          res.status(400).send({
              message:"Content can not be empty!"
          });
          return;
      }
  
      const issue ={
          label: req.body.label,
          status: req.body.status,
          priority: req.body.priority
      };
  
      Issue.create(issue)
      .then(data=>{
          res.send(data);
      })
      .catch(err=>{
          res.status(500).send({
              message:
              err.message || "Some error occurred while creating the Issue."
          })
      })
    
  };
  
  exports.update = (req, res) => {
      const id = req.params.id;
  
      Issue.update(req.body, {
          where: { id: id }
      })
          .then(num => {
          if (num == 1) {
              res.send({
              message: "Updated"
              });
          } else {
              res.send({
              message: `Cannot update Issue with id=${id}`
              });
          }
          })
          .catch(err => {
          res.status(500).send({
              message: "Error updating Issue with id=" + id
          });
      });
  };

};



