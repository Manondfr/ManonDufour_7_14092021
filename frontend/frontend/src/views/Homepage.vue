<template>
  <div>   
    <HeaderContent @logout="logout" @showHeaderMenu="showHeaderMenu" role="banner" v-bind:condition="$route.path !== '/signup' || $route.path !== '/login'" v-bind:name="$store.state.connectedUser.firstName" v-bind:profilePicture="$store.state.connectedUser.profilePicture" v-bind:userId="$store.state.connectedUser.id">
    </HeaderContent>

    <main>
      <!-- Partie soumission d'un post -->
      <PostSubmission role="region" v-bind:userName="$store.state.connectedUser.firstName" @changeContent="onContentChange" @postContent="postContent" @selectFile="onFileSelected"></PostSubmission>

      <!-- Partie publications à la une -->        
        <section class="publications">
          <h1>Publications à la une</h1>
          <article class="publications__each" v-for='post in posts' :key='post.id' v-bind:data-id="post.id">  

            <!-- Corps de la publication -->
            <PublicationsContent @visitProfile="visitProfile(post.user.id)" @showUpdateMenu="showUpdateMenu(post.id)" @deletePublication="deletePublication(post.id)" @inputAutofocus="inputAutofocus(post.id)" @addLike="addLike(post.id)" @showMenu="showMenu(post.id)" v-bind:condition="fetchUserId == post.user_id || $store.state.connectedUser.admin == 1" v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="formattingDate(post.date_col_formed)" v-bind:profilePicture="post.user.profilePicture" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes" v-bind:postContent="post.content">
                <!-- On clic : Menu modification/suppression -->
                <template v-slot:updateDeleteMenu>
                  <UpdateDeleteMenu v-bind:postId="post.id" @showUpdateMenu="showUpdateMenu(post.id)" @deletePublication="deletePublication(post.id)">
                    <template v-slot:updateMenu>
                      <!-- On clic sur Modifier la publication : Menu de mise à jour publication -->
                      <UpdatePublication v-bind:postId="post.id" v-bind:postImage="post.image" @showUpdateMenu="showUpdateMenu(post.id)" @changeFile="onFileChanged(post.id)" @updatePublication="updatePublication(post.id, post.image)">
                        <template v-slot:publicationsContent>
                          <PublicationsContent v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="formattingDate(post.date_col_formed)" v-bind:profilePicture="post.user.profilePicture" v-bind:postContent="post.content" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes">
                            <template v-slot:slotForContent>
                              <label class="sr-only" v-bind:for="'publicationsContent__contentParagraph'+post.id">Zone de modification du contenu de la publication</label>
                              <textarea class="publicationsContent__contentParagraph" v-bind:id="'publicationsContent__contentParagraph'+post.id" rows="4" v-bind:data-id="post.id" v-bind:value="post.content" @input="onContentChange"></textarea>
                            </template>
                          </PublicationsContent>
                        </template>
                      </UpdatePublication>
                    </template>
                  </UpdateDeleteMenu>
                  <!-- Fin du menu de modification de la publication -->
                </template>
                <!-- Fin du menu de modification et suppression -->
                <template v-slot:slotForContent>
                      <p class="publicationsContent__contentParagraph" v-bind:class="'publicationsContent__contentParagraph'+post.id" v-bind:id="'publicationsContent__contentParagraph'+post.id">{{ post.content }}</p>
                      <div class="divImage" v-bind:class="'divImage'+post.id">
                        <img v-if="post.image" v-bind:data-id="post.id" v-bind:src="post.image" alt="Image accompagnant la publication"/>
                      </div>
                </template>
                <template v-slot:numberOfLikes>
                   <p class="numberOfLikes" v-bind:class="'numberOfLikes'+post.id" v-show="post.likes > 0"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>{{ post.likes }}</p>
                </template>
            </PublicationsContent>
            <div v-for='comment in comments' :key='comment.id'>
              <Comment @updateCommentContent="updateCommentContent(post.id, comment.id)" @deleteComment="deleteComment(post.id, comment.id)" @updateComment="updateComment(comment.id)" @visitProfile="visitProfile(comment.user.id)" v-bind:commentContent="comment.commentContent" v-bind:userLastName="comment.user.last_name" v-bind:userFirstName="comment.user.first_name" v-bind:commentId="comment.id" v-bind:condition="comment.publication_id == post.id" v-bind:contentCreator="fetchUserId == comment.user.id || $store.state.connectedUser.admin == 1"></Comment>           
            </div>
            <form aria-label="Formulaire d'ajout de commentaire" action="#" method="POST">
              <label class="sr-only" v-bind:for="'postCommentTextArea'+post.id">Zone d'ajout de commentaire</label>
              <textarea class="postCommentTextArea" v-bind:id="'postCommentTextArea'+post.id" v-bind:data-id="post.id" @keyup.enter="postComment(post.id)" rows="3" placeholder="Écrivez un commentaire..."></textarea>
            </form>   
          </article>
        </section>
    
    </main>
  </div>
</template>

<script>
import HeaderContent from '../components/HeaderContent.vue'
import PostSubmission from '../components/PostSubmission.vue'
import PublicationsContent from '../components/PublicationsContent.vue'
import Comment from '../components/Comment.vue'
import UpdateDeleteMenu from '../components/UpdateDeleteMenu.vue'
import UpdatePublication from '../components/UpdatePublication.vue'
//import Vue from "vue"
import store from '../store'
const axios = require('axios').default;
axios.defaults.withCredentials = true;


export default {
  name: 'App',
	components: {
		HeaderContent,
    PublicationsContent,
    UpdateDeleteMenu,
    UpdatePublication,
    PostSubmission,
    Comment
	},
  methods: {
  logout() {
    const url = "http://localhost:3000/api/auth/logout";
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    axios({
      method: 'post',
      headers: {
        'x-xsrf-token': xsrfToken
      },
      url:url
    })
    .then(function() {
      localStorage.clear();
      window.location.href = "http://localhost:8080/#/login"
    })
    .catch(function() {                
    alert("Une erreur est survenue lors de la déconnexion");                
    });
  },
  onFileSelected() {
    this.$store.dispatch('changeSelectedFile', event.target.files[0]);
    let image = document.createElement("img");
    document.querySelector('.submissionBox__imageBloc').append(image);
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    image.setAttribute('src', imgSrc);
    image.setAttribute('alt', 'Image liée à la publication en cours de rédaction')
  },
  visitProfile(userId) {
    window.location.href = "http://localhost:8080/#/profile/" + userId;
  },
  inputAutofocus(dataId) {
    document.querySelector(`.postCommentTextArea[data-id="${dataId}"]`).focus();
  },
  fetchComments(dataId) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/comments";
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    axios({
      method: 'get',
      headers: {
      'Content-Type': 'application/json',
      'x-xsrf-token': xsrfToken,
      },
      url:url
    })
    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
        store.dispatch('getComments');
    })
    .catch(function() {                
    alert("Une erreur est survenue lors de l'envoi des données");                
    });
  },
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
      data: {               "commentContent" : event.target.value,
      }
    })
    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    store.dispatch('getComments');
    })
    .catch(function() {                
    alert("Une erreur est survenue lors de la suppression des données");                
    });
  },
  updateComment(commentId) {
    let comment = document.querySelector(`.commentContentSection p[data-id="${commentId}"]`);
    comment.innerHTML = `<textarea @keyup.enter="updateCommentContent(post.id, comment.id)" v-if="comment.publication_id == post.id " v-bind:data-id="comment.id">${comment.textContent}</textarea>`;
  },
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
    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
    commentToDelete.remove();
    })
    .catch(function() {                
    alert("Une erreur est survenue lors de la suppression des données");                
    });
  },
  postComment(dataId) {
    console.log(dataId);
    console.log(event.target.value);
    const url = "http://localhost:3000/api/publications/" + dataId + "/comments";
    console.log(url);
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    const Id = Number(localStorage.getItem('userId'));
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-xsrf-token' : xsrfToken
      },
      url: url,
      data: { "userId" : Id,
              "commentContent" : event.target.value,
              "publicationId" : dataId
      }
    })
    .then(function(res) {
    if (res.ok) {
    return res.json();
    }
        store.dispatch('getComments');
    })
    .catch(function() {                
    alert("Une erreur est survenue lors de l'envoi des données");                
    });
    document.querySelector('.postCommentTextArea').value = "";
  },
  addLike(dataId) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/like";
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    const Id = Number(localStorage.getItem('userId'));
    axios({
      method: 'post',
      headers: {
      'Content-Type': 'application/json',
      'x-xsrf-token' : xsrfToken
      },
      url: url,
      data: { "userId" : Id }
    })
    .then(function(res) {
    if (res.ok) {
        return res.json();
        }
    console.log(res.data.likes);
    document.querySelector(`.numberOfLikes${dataId}`).innerHTML = `<svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>${res.data.likes}`;
    if(res.data.likes == 0) {
      document.querySelector(`.numberOfLikes${dataId}`).style.display = "none"
    } else {
      document.querySelector(`.numberOfLikes${dataId}`).style.display = "inherit"
    }
    })
    .catch(function() {                
        alert("Une erreur est survenue lors de l'envoi des données");                
    });
  },
  formattingDate(date) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = new Date(date).toLocaleString('fr-FR', options);
  return formattedDate[0].toUpperCase() + formattedDate.slice(1);
  },
  onFileChanged(dataId) {
    this.$store.dispatch('changeSelectedFile', event.target.files[0]);
    if(!document.querySelector(`.updateMenu[data-id="${dataId}"] img[data-id="${dataId}"]`)) {
      let image = document.createElement('img');
      image.setAttribute(`data-id`, `${dataId}`)
      document.querySelector(`.updateMenu[data-id="${dataId}"] .updateMenu__buttons`).prepend(image)
    }
    let image = document.querySelector(`.updateMenu[data-id="${dataId}"] img[data-id="${dataId}"]`);
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    image.setAttribute('src', imgSrc);
  },
  onContentChange() {
    console.log(event.target.value)
    this.$store.dispatch('changeContent', event.target.value);
  },
  postContent() {
    const fd = new FormData;
    if(document.querySelector('.submissionBox__imageBloc img')) {
            fd.append('image', store.state.selectedFile, store.state.selectedFile.name);
                document.querySelector('.submissionBox img').remove();
    }
    fd.append('content', store.state.content);
    fd.append('userId', localStorage.getItem('userId'));
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    axios({
      method: 'post',
      headers: {
      'Content-Type': 'application/json',
      'x-xsrf-token' : xsrfToken
      },
      url: 'http://localhost:3000/api/publications',
      data: fd
    })
    .then(function(res) {
    if (res.ok) {
        return res.json();
        }
    store.dispatch('getPosts');
    })
    .catch(function() {                
        alert("Une erreur est survenue lors de l'envoi des données")              
    })
    document.querySelector('.submissionBox textarea').value = "";
      this.$store.dispatch('changeSelectedFile', null);
  },
  showMenu(dataId) {
    let menu = document.querySelector(`.menu[data-id="${dataId}"]`);
    if(menu.classList.contains("active")) {
      menu.classList.replace("active", "inactive");
      menu.setAttribute("aria-expanded", "false")
     } else {
      menu.classList.replace("inactive", "active")
      menu.setAttribute("aria-expanded", "true");
     }
  },
    showHeaderMenu() {
    let menu = document.querySelector(`.headerMenu`);
    if(menu.classList.contains("active")) {
       menu.classList.replace("active", "inactive");
       menu.setAttribute("aria-expanded", "false");
     } else {
       menu.classList.replace("inactive", "active");
       menu.setAttribute("aria-expanded", "true");
     }
  },
  showUpdateMenu(dataId) {
    let updateMenu = document.querySelector(`.updateMenu[data-id="${dataId}"]`);
        if(updateMenu.classList.contains("active")) {
       updateMenu.classList.replace("active", "inactive")
     } else {
       updateMenu.classList.replace("inactive", "active")
     }
  },
  deletePublication(dataId) {
    this.showMenu(dataId);
    let divToDelete = document.querySelector(`.publications__each[data-id="${dataId}"]`);
    const url = "http://localhost:3000/api/publications/" + dataId;
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    axios({
      method: 'delete',
      headers: {
        'x-xsrf-token' : xsrfToken,
      },
      url: url,
    })
    .then(
      () => { divToDelete.remove() }
    )
    .catch(error => console.log(error));
  },
 updatePublication(dataId) {
  this.showUpdateMenu(dataId);  
  this.showMenu(dataId);
  const url = "http://localhost:3000/api/publications/" + dataId;
  let xsrfToken = localStorage.getItem('xsrfToken');
  xsrfToken = JSON.parse(xsrfToken);
  const fd = new FormData;
  let textArea = document.querySelector(`.publicationsContent[data-id="${dataId}"] textarea[data-id="${dataId}"]`);
  if(document.querySelector(`.updateMenu[data-id="${dataId}"] img[data-id="${dataId}"]`) && store.state.selectedFile) {
      fd.append('image', store.state.selectedFile, store.state.selectedFile.name);
  }
  fd.append('content', textArea.value);
  fd.append('userId', localStorage.getItem('userId'));
  axios({
  method: 'put',
  headers: {
    'x-xsrf-token' : xsrfToken
  },
  url: url,
  data: fd
  })
  .then(function(res) {
  if (res.ok) {
      return res.json();
      }
  store.dispatch('getPosts');
  })
  .catch(error => console.log(error));
  let pToUpdate = document.querySelector(`p.publicationsContent__contentParagraph${dataId}`);
  pToUpdate.innerHTML = textArea.value;
  if(document.querySelector(`.updateMenu[data-id="${dataId}"] img[data-id="${dataId}"]`) && store.state.selectedFile) {
    if(!document.querySelector(`div.divImage${dataId} > img`)) {
      let image = document.createElement('img');
      image.setAttribute('alt', 'Image accompagnant la publication');
      document.querySelector(`div.divImage${dataId}`).appendChild(image);
    }
    let imageToUpdate = document.querySelector(`div.divImage${dataId} > img`);
    //imageToUpdate.style.display = "initial";
    let newSource = URL.createObjectURL(store.state.selectedFile);
    imageToUpdate.setAttribute("src", newSource);
    this.$store.dispatch('changeSelectedFile', null);
  }  
  }
  },
  computed: {
    posts() {
      return this.$store.state.posts
    },
    comments() {
      return this.$store.state.comments
    },
    selectedFile() {
      return this.$store.state.selectedFile
    },
    fetchUserId() {
      return this.$store.state.connectedUser.id
    },
  },
  mounted() {
    this.$store.dispatch('getConnectedUserInfos', localStorage.getItem('userId'));
    this.$store.dispatch('getPosts');
    this.$store.dispatch("getComments");
  },
}


</script>

<style lang="scss" scoped>
@mixin tabletstyle {
    @media all and (min-width:483px){
        @content;
    }
}

@mixin desktopstyle {
    @media all and (min-width:993px){
        @content;
    }
}

// Balise générales à plusieurs composants ou applicable uniquement à la homepage
main {
  padding-top:55px;
}

h1 {
  margin-top:50px;
  font-weight:800;
  @include desktopstyle() {
    margin-top:80px;
    letter-spacing: 1px;
  }
}
</style>