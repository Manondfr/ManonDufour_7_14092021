const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});  

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
const fs = require('fs');

schema.is().min(5);


exports.signup = (req, res, next) => {
  if(schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash
      })
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
  } else if(!schema.validate(req.body.password)) {
    return res.status(400).json({ error });
  }
};

exports.login = (req, res, next) => {
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
            userId: user.id,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.updateUserInfos = (req, res, next) => {
    User.update({
      gender: req.body.gender,
      birthday: req.body.birthday,
      occupation: req.body.occupation,
      about: req.body.about,
      profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }, { where: { id: req.params.id }})
    .then(
      () => {
        res.status(200).json({
          message: 'Utilisateur mis à jour !'
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

  exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
    .then(user => {
      if(user.profilePicture) {
        const filename = user.profilePicture.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          user.destroy({ where: { id: req.params.id }})
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        })
      } 
      user.destroy({ where: { id: req.params.id }})
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
      .catch(error => res.status(400).json({ error }));      
    })
    .catch(error => res.status(404).json({ error }));
  };
      
    