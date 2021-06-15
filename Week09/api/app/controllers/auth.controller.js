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
            password: bcrypt.hashSync(req.body.password, 8),
            username: req.body.username,
            email: req.body.email,
            kode_wilayah: req.body.kode_wilayah,
            created_at: currentDate.dateAsiaJakarta,
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
                    url: "/user/create-user"
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
              username: req.body.username
            }
          })
            .then(user => {
              if (!user) {
                return res.status(404).send({ message: "Invalid credentials." });
              }
        
              var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
              );
        
              if (!passwordIsValid) {
                return res.status(401).send({
                  accessToken: null,
                  message: "Invalid Password!"
                });
              }
              
              var token = jwt.sign({ 
                id: user.id, 
                nama:user.nama, 
                username: user.username, 
                email: user.email,
                no_HP: user.no_HP,
                kode_wilayah: user.kode_wilayah
              }, config.secret, {
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

    