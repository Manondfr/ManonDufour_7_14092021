const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});  

//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const User = require('../models/User');
//const passwordValidator = require('password-validator');
//const schema = new passwordValidator();



exports.signup = (req, res, next) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password
  })
    .then(
        () => {
            res.status(201).json({
              message: 'Publication créée !'
            });
          }
    )
    .catch(
        (error) => {
            res.status(400).json({
              error: error
            });
          }
    )
};

exports.login = (req, res, next) => {
  console.log(req.body.email);
  User.findOne({ where: {email: req.body.email} })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };
