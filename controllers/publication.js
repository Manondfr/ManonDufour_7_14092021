const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
}); 

const fs = require('fs');
const Publication = require('../models/Publication');



exports.createPublication = (req, res, next) => {   
  Publication.create ({
    user_id : req.body.user_id,
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
  
  /*Publication.findOne({ where: { id: req.params.id } })
  .then(publication => {
    const filename = publication.image.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
  Publication.update({ 
    title: req.body.title,
    content:req.body.content,
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
  )*/
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
}

exports.getAllPublications = (req, res, next) => {
    Publication.findAll()
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