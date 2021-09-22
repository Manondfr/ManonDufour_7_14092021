const { Sequelize, Model, DataTypes } = require("sequelize");
const Comment = require('../models/Comment');

exports.createComment = (req, res, next) => {   
    Comment.create ({
      user_id : req.body.userId,
      publication_id : req.params.id,
      commentContent: req.body.commentContent,
    })
      .then(
          () => {
              res.status(201).json({
                message: 'Commentaire créé !'
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

  exports.updateComment = (req, res, next) => {
    Comment.update({
      commentContent: req.body.commentContent
    }, { where: { id: req.params.commentid }})
    .then(
      () => {
        res.status(200).json({
          message: 'Commentaire mis à jour !'
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


  exports.deleteComment = (req, res, next) => {
    Comment.findOne({ where: { id: req.params.commentid } })
      .then(comment => {
          console.log(comment.commentContent);
          comment.destroy({ where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(404).json({ error }));
}


  exports.getAllComments = (req, res, next) => {
    Comment.findAll()
    .then(
        (comments) => {
            res.status(200).json(comments);
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