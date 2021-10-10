const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Publication = require('../models/Publication');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
const fs = require('fs');


//schema.is().min(5).has().uppercase().has().digits(1).has().not().spaces();
schema.is().min(1);

/*const emailMaskOptions = {
  maskWith: "*", 
  unmaskedStartCharactersBeforeAt: 1,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};*/

exports.createAdminAccount = (req, res, next) => {
  if(schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: /*MaskData.maskEmail2(*/req.body.email/*, emailMaskOptions)*/,
        password: hash,
        admin: true
      })
      .then(() => res.status(201).json({ message: 'Compte administrateur créé !' }))
      .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }))
  } else if(!schema.validate(req.body.password)) {
    return res.status(400).json({ error });
  }
};

exports.signup = (req, res, next) => {
  if(schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: /*MaskData.maskEmail2(*/req.body.email/*, emailMaskOptions)*/,
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

exports.signout = (req, res, next) => {
  if(schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: /*MaskData.maskEmail2(*/req.body.email/*, emailMaskOptions)*/,
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
          res.cookie(`Cookie`,jwt.sign({ userId:user.id }, 'RANDOM_TOKEN_SECRET'),{ maxAge: 86400 * 1000, httpOnly: true });
          res.status(200).json({
            userId: user.id,
            admin: user.admin,
            token: jwt.sign(
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            ),
            cookie: req.cookies
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.getOneUser = (req, res, next) => {
    console.log(req.cookies.Cookie);
    User.findOne({ where: { id: req.params.id }})
    .then(
        (user) => {
            res.status(200).json(user);
        }
    )
    .catch(
        (error) => {
            res.status(404).json({
              error: error
            });
          }
    );
  };

  exports.getPublicationsByUser = (req, res, next) => {
    Publication.findAll({ where: { user_id: req.params.id }, order: [['created_at', 'DESC']], include: [User],   attributes: [
      'id', 'content', 'image', 'user_id', 'usersLiked', 'likes',
      [Sequelize.fn('date_format', Sequelize.col('created_at'), '%c-%e-%Y'), 'date_col_formed']
  ] })
    .then(
      (publications) => {
          res.status(200).json(publications);
      }
  )
  .catch(    
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };

  exports.updateUserInfos = (req, res, next) => {
    const userObject = req.file ?
    {
      gender: req.body.gender,
      birthday: req.body.birthday,
      occupation: req.body.occupation, 
      about: req.body.about,     
      profilePicture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { 
      gender: req.body.gender,
      birthday: req.body.birthday,
      occupation: req.body.occupation, 
      about: req.body.about,     
     };
    User.update({
      ...userObject
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
        const filename = user.profilePicture.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          user.destroy({ where: { id: req.params.id }})
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));
        })  
    })
    .catch(error => res.status(404).json({ error }));
  };
      
    