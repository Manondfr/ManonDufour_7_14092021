const { Sequelize } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Publication = require('../models/Publication');
const passwordValidator = require('password-validator');
const schema = new passwordValidator();
const fs = require('fs');


var crypto = require('crypto');
const RAN_TOKEN = process.env.RAN_TOKEN;
const EXPRESS_SESSION_NAME = process.env.EXPRESS_SESSION_NAME;


schema.is().min(5).has().uppercase().has().digits(1).has().symbols(1).has().not().spaces();


exports.createAdminAccount = (req, res, next) => {
  if(schema.validate(req.body.password)) {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
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
          const xsrfToken = crypto.randomBytes(64).toString('hex');
          const accessToken = jwt.sign( { userId: user.id, xsrfToken }, RAN_TOKEN, { expiresIn: '24h' } );
          req.session.accessToken = accessToken; 
          console.log(req.sessionID); 
          console.log(req.session.accessToken);
          res.status(200).json({
              xsrfToken : xsrfToken,
              admin: user.admin,
              userId: user.id
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  };

  exports.getOneUser = (req, res, next) => {
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
     User.findOne({ where: { id: req.params.id } })
     .then(
       user => {
         const filename = req.file ? user.profilePicture.split('/images/')[1] : null;
         console.log(filename);
         if(req.file && filename !== "nouser.jpg") {    
          fs.unlink(`images/${filename}`, () => {
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
          })      
         } else {
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
         }
       }
     )
     .catch(error => res.status(404).json({ error }));
  };

  exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
    .then(user => {
        const filename = user.profilePicture.split('/images/')[1];
        if(filename !== "nouser.jpg") {
          fs.unlink(`images/${filename}`, () => {
            req.session.destroy(err => {
              if (err) {
                return res.send('http://localhost:8080/#/homepage')
              }
              res.clearCookie(EXPRESS_SESSION_NAME);
            });
            user.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
            .catch(error => res.status(400).json({ error }));
          })          
        } else {
          req.session.destroy(err => {
            if (err) {
              return res.send('http://localhost:8080/#/homepage')
            }
            res.clearCookie(EXPRESS_SESSION_NAME);
          });
          user.destroy({ where: { id: req.params.id }})
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !'}))
          .catch(error => res.status(400).json({ error }));          
        }
    })
    .catch(error => res.status(404).json({ error }));
  };

  exports.logout = (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        return res.send('http://localhost:8080/#/homepage')
      }
      res.clearCookie(EXPRESS_SESSION_NAME);
      return res.send('http://localhost:8080/#/login')
    })
  }
      
    