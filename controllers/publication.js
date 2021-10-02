const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const fs = require('fs');
const Publication = require('../models/Publication');
const User = require('../models/User');



exports.createPublication = (req, res, next) => {   
  Publication.create ({
    user_id : req.body.userId,
    content: req.body.content,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    content: req.body.content,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Publication.findOne({ where: { id: req.params.id }})
  .then(publication => {
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
  )})
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
        const filename = publication.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          publication.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

exports.defineLikeStatus = (req, res, next) => {  
  Publication.findOne({ where: { id: req.params.id } })
  .then(publication => {
    const listUsers = publication.usersLiked;
    if(listUsers == null) {
      publication.update({usersLiked : req.body.userId})
      .then(publication.increment('likes', {by: 1} ))
      .then(
        () => res.status(200).json({ message: 'Publication likée !' })
        )
      .catch(error => res.status(400).json({ error }));
    } else {
      const listUsers = publication.usersLiked;
      const array = listUsers.split(';');
      if(array.find(user_id => user_id == req.body.userId) == undefined) {
        publication.update({usersLiked : listUsers + ";" + req.body.userId })
        .then(publication.increment('likes', {by: 1} ))
        .then(
          () => res.status(200).json({ message: 'Publication likée !' })
          )
        .catch(error => res.status(400).json({ error }));
      } else {
        array.splice(array.indexOf(array.find(user_id => user_id === req.body.userId)), 1);
        const updatedListUsers = array.join(';');
        publication.update({usersLiked : updatedListUsers })
        .then(publication.decrement('likes', {by: 1} ))
        .then(
          () => res.status(200).json({ message: 'Like de la publication annulé !' })
          )
        .catch(error => res.status(400).json({ error }));
      }
    }
  })
  .catch(error => res.status(404).json({ error }));
  /*Publication.findOne({ where: { id: req.params.id } })
  .then(publication => {
    if(req.body.like == 1) {
      const listUsers = publication.usersLiked;
      if (listUsers == null) {
        publication.update({usersLiked : req.body.userId })
        .then(
          () => res.status(200).json({ message: 'Publication likée !' })
          )
        .catch(error => res.status(400).json({ error }));
      } else {
        publication.update({usersLiked : listUsers + ";" + req.body.userId })
        .then(
          () => publication.increment('likes', {by: 1} )
          .then(
            () => res.status(200).json({ message: 'Publication likée' })
            )
          .catch(error => res.status(400).json({ error }))
          )
        .catch(error => res.status(400).json({ error }));
      }
    } else {
      const listUsers = publication.usersLiked;
      const array = listUsers.split(';');
      array.splice(array.indexOf(array.find(user_id => user_id === req.body.userId)), 1);
      const updatedListUsers = array.join(';');
      publication.update({usersLiked : updatedListUsers })
      .then(
        () => publication.decrement('likes', {by: 1} )
        .then(
          () => res.status(200).json({ message: 'Like de la publication annulé !' })
          )
        .catch(error => res.status(400).json({ error }))
      )
      .catch(error => res.status(400).json({ error }));
    }
  })
  .catch(
    (error) => {
      res.status(404).json({
        error: error
      })
    }
  )*/
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