const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();

schema.is().min(5);


exports.signup = (req, res, next) => {
  if(schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password)
    .then(hash => {
      User.create({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash
      })
      .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
  } else if(!schema.validate(body.password)) {
    return res.status(400).json({ error });
  }
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
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