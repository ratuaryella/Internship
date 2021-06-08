const userServices = require('../services/services');
const getCurrentDate = require('../helper/current-date');
const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
        const currentDate = getCurrentDate();
    
        const dataInsert = {
            nama: req.body.nama,
            nip: req.body.nip,
            no_HP: req.body.no_HP,
            password: req.body.password,
            username: req.body.username,
            email: req.body.email,
            createdAt: currentDate.dateAsiaJakarta,
            tableRoleId: req.body.tableRoleId
        }
    
        userServices.createUser(dataInsert)
        .then(docs => {
        if(!docs) {
                res.status(406).json({
                    message: `Role is not available`
                });
        } else {
            res.status(201).json({
                status: 'Created',
                message: 'Successfully Create User',
                dataInsert: dataInsert,
                request: {
                    type: "POST",
                    url: "/create-user"
                }
            });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
    }

    exports.signin = (req, res) => {
        User.findOne({
            where: {
              username: req.body.username,
              password: req.body.password
            }
          })
            .then(user => {
              if (!user) {
                return res.status(404).send({ message: "Invalid credentials." });
              }
        
      
        
              var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 10800 // 3 hours
              });
        
              var authorities = [];
              
                authorities.push("ROLE_" + user.tableRoleId);
                res.status(200).send({
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  roles: authorities,
                  accessToken: token
                });
            })
            .catch(err => {
              res.status(500).send({ message: err.message });
            });
    }

    