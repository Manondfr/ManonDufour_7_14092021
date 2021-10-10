const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const fs = require('fs');
const Publication = require('../models/Publication');
const User = require('../models/User');
const Comment = require("../models/Comment");



exports.createPublication = (req, res, next) => {   
  const publicationObject = req.file ?
  {
    user_id : req.body.userId,
    content: req.body.content,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { 
    user_id : req.body.userId,
    content: req.body.content,
   };
  Publication.create ({
    ...publicationObject
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
}

// voir si intéressant à utiliser
exports.getOnePublication = (req, res, next) => {
  Publication.findOne({ where: { id: req.params.id }})
  .then(
      (publication) => {
          res.status(200).json(publication);
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

exports.updatePublication = (req, res, next) => {
  const publicationObject = req.file ?
  {
    user_id : req.body.userId,
    content: req.body.content,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { 
    user_id : req.body.userId,
    content: req.body.content,
   };
  Publication.findOne({ where: { id: req.params.id }})
  .then(publication => {
    if(publication.image) {
      const filename = publication.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        publication.update({
          ...publicationObject
        }, { where: { id: req.params.id }})
        .then(
          () => {
            res.status(200).json({
              message: 'Publication mise à jour !'
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
    )
    } else {
      publication.update({ ...publicationObject }, { where: { id:req.params.id } })
      .then(
        () => {
          res.status(200).json({
            message: 'Publication mise à jour !'
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
    }})
  .catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  )
};

exports.deletePublication = (req, res, next) => {
    Publication.findOne({ where: { id: req.params.id } })
      .then(publication => {
        if(publication.image) {
          const filename = publication.image.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            publication.destroy({ where: { id: req.params.id }})
              .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
              .catch(error => res.status(400).json({ error }));
          });         
        } else {
          publication.destroy({ where: { id: req.params.id }})
          .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
          .catch(error => res.status(400).json({ error }));         
        }
      })
      .catch(error => res.status(500).json({ error }));
};

exports.defineLikeStatus = (req, res, next) => {  
  Publication.findOne({ where: { id: req.params.id } })
  .then(publication => {
    const listUsers = publication.usersLiked;
    if(listUsers == null || listUsers == "") {
      publication.update({usersLiked : req.body.userId})
      .then(publication.increment('likes', {by: 1} ))
      .then(
        () => res.status(200).json({ likes:1 })
        )
      .catch(error => res.status(400).json({ error }));
    } else {
      const listUsers = publication.usersLiked;
      const array = listUsers.split(';');
      if(array.find(user_id => user_id == req.body.userId) == undefined) {
        publication.update({usersLiked : listUsers + ";" + req.body.userId })
        .then(publication.increment('likes', {by: 1} ))
        .then(
          () => res.status(200).json({ likes:array.length + 1 })
          )
        .catch(error => res.status(400).json({ error }));
      } else {
        array.splice(array.indexOf(array.find(user_id => user_id === req.body.userId)), 1);
        const updatedListUsers = array.join(';');
        publication.update({usersLiked : updatedListUsers })
        .then(publication.decrement('likes', {by: 1} ))
        .then(
          () => res.status(200).json({ likes:array.length })
          )
        .catch(error => res.status(400).json({ error }));
      }
    }
  })
  .catch(error => res.status(404).json({ error }))
};

exports.getAllPublications = (req, res, next) => {
  Publication.findAll({ order: [['created_at', 'DESC']], include: [User],   attributes: [
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