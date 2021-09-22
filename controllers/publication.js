const { Sequelize, Model, DataTypes, Op } = require("sequelize");
const fs = require('fs');
const Publication = require('../models/Publication');



exports.createPublication = (req, res, next) => {   
  Publication.create ({
    user_id : req.body.userId,
    title: req.body.title,
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
  Publication.findOne({ where: { id: req.params.id }})
  .then(publication => {
    const filename = publication.image.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      publication.update({
        title: req.body.title,
        content: req.body.content,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
    if(req.body.like === 1) {
      publication.increment('likes', {by: 1} )
      .then(
        () => res.status(200).json({ message: 'Publication likée !' })
        )
      .catch(error => res.status(400).json({ error }));
    } else {
      publication.decrement('likes', {by: 1} )
      .then(
        () => res.status(200).json({ message: 'Like de la publication annulé !' })
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
  )
};

exports.getAllPublications = (req, res, next) => {
    Publication.findAll({ order: [['created_at', 'DESC']]})
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