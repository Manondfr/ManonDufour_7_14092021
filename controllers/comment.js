const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('socialnetwork', 'P6user', 'P6user', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});  

const Comment = require('../models/Comment');





exports.createComment = (req, res, next) => {   
    Comment.create ({
      user_id : req.body.user_id,
      publication_id : req.body.publication_id,
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