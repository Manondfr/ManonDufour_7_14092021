<template>
  <div class="commentSection" v-bind:data-id="commentId" v-if="condition">
    <div class="commentContentSection">
      <div class="commentContentSection__headers">
        <button aria-label="Lien vers la page de profil de l'utilisateur" @click="visitProfile(commentUserId)">{{ userFirstName }} {{ userLastName }} </button> 
        <div class="commentContentSection__headers__icons">
          <button aria-label="Modification du commentaire" v-if="contentCreator"><svg width="16" height="16" @click="updateComment(commentId)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg></button>
          <button aria-label="Suppression du commentaire" v-if="contentCreator"><svg width="12" height="13" @click="deleteComment(postId, commentId)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></button>
        </div>
      </div>
      <p @keyup.enter="updateCommentContent(postId, commentId)" v-if="condition" v-bind:data-id="commentId">{{ commentContent }}</p>
    </div>
  </div>
</template>

<script>
const axios = require('axios').default;
axios.defaults.withCredentials = true;
import store from '../store'
export default {
	name: 'Comment',
    props: {
        commentId:Number,
        commentUserId: Number,
        postId:Number,
        condition:Boolean,
        contentCreator:Boolean,
        userFirstName:String,
        userLastName:String,
        commentContent:String
  },
  methods: {
    // ACCES AU PROFIL DU CREATEUR DU COMMENTAIRE
    visitProfile(userId) {
      window.location.href = "http://localhost:8080/#/profile/" + userId;
    },

    // APPARITION TEXTAREA AU CLIC SUR L'ICONE DE MODIFICATION DU COMMENTAIRE
    updateComment(commentId) {
      let comment = document.querySelector(`.commentContentSection p[data-id="${commentId}"]`);
      comment.innerHTML = `<textarea @keyup.enter="updateCommentContent(post.id, comment.id)" v-if="comment.publication_id == post.id " v-bind:data-id="comment.id">${comment.textContent}</textarea>`;
    },

    // MISE A JOUR DU COMMENTAIRE
    updateCommentContent(dataId, commentId) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/comments/" + commentId;
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'x-xsrf-token' : xsrfToken
      },
      url: url,
      data: { "commentContent" : event.target.value }
    })
    .then(function() {
      store.dispatch('getComments');
    })
    .catch(function() {                
      alert("Une erreur est survenue lors de la suppression des données");                
    });
    },

    // SUPPRESSION DU COMMENTAIRE
    deleteComment(dataId, commentId) {
      const url = "http://localhost:3000/api/publications/" + dataId + "/comments/" + commentId;
      const commentToDelete = document.querySelector(`.commentSection[data-id="${commentId}"]`);
      let xsrfToken = localStorage.getItem('xsrfToken');
      xsrfToken = JSON.parse(xsrfToken);
      axios({
        method: 'delete',
        headers: {
          'x-xsrf-token' : xsrfToken
        },
        url: url,
      })
      .then(function() {
        commentToDelete.remove();
      })
      .catch(function() {                
        alert("Une erreur est survenue lors de la suppression des données");                
      });
    },             
  }
}
</script>

<style lang="scss">
button {
  margin:5px 0 2px 0;
  padding:0;
  font-weight:bold;
  color: #2c3e50;
}
</style>