<template>
    <div>
        <HeaderContent>
        <div>
            <router-link class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/homepage">Accueil</router-link>
            <router-link class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/profile">Profil</router-link>
        </div>
        </HeaderContent>

<div class="userInfos">
  <div class="userProfilePicture">
    <img v-bind:src="$store.state.profilePicture"/>
  </div>
  <p>{{ $store.state.firstName}} {{ $store.state.lastName }}</p>
  <p> {{ $store.state.gender }} </p>
  <p> {{ $store.state.birthday }} </p>
  <p>{{ $store.state.about }}</p>
  <button>Modifier mes informations personnelles</button>
</div>

      <!-- Partie soumission d'un post -->
      <PostSubmission v-bind:userName="$store.state.firstName">
        <template v-slot:submissionBox__textArea>
          <textarea id="submissionBox__textArea" rows="4" @input="onContentChange" @keyup.enter="postContent"></textarea>
        </template>
        <template v-slot:submissionBox__publiDivAdd>
          <input type="file" id="inputFile" multiple=false @change="onFileSelected">
          <label for="inputFile" class="submissionBox__publiDivAdd"><p>Ajouter une image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
          <button @click="postContent" class="submissionBox__publiDivAdd">Publier <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/></svg></button>
        </template>
      </PostSubmission>

 <div class="publications">
    <h1>Publications</h1>
          <div class="publications__each" v-for='post in posts' :key='post.id' v-bind:data-id="post.id">  

            <!-- Corps de la publication -->
            <PublicationsContent v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="formattingDate(post.date_col_formed)" v-bind:profilePicture="post.user.profilePicture" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes">
              <template v-slot:showMenu>
                <p class="showMenu" v-if="fetchUserId == post.user_id || adminStatus == true"><svg @click="showMenu(post.id)" v-bind:data-id="post.id" class="updatePub" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg></p>
              </template>
              <template v-slot:slotForContent>
                <p class="publicationsContent__contentParagraph">{{ post.content }}</p>
              </template>
            </PublicationsContent>

            <!-- Likes et section commentaires -->
            <CommentSection>
              <template v-slot:addLike>
                <p @click="addLike(post.id)"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"/></svg>J'aime</p>
                <p @click="inputAutofocus(post.id)"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>Commenter</p>
              </template>
              <template v-slot:commentArea>
                <div v-for='comment in comments' :key='comment.id'>
                  <div class="commentSection" v-bind:data-id="comment.id" v-if="comment.publication_id == post.id ">
                    <div class="commentContentSection">
                      <div class="commentContentSection__headers">
                      <h4 @click="visitProfile(comment.user.id)">{{ comment.user.first_name }} {{ comment.user.last_name }} </h4> 
                      <div class="commentContentSection__headers__icons">
                      <p v-if="fetchUserId == post.user_id || adminStatus == true"><svg width="16" height="16" @click="updateComment(comment.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg></p>
                      <p v-if="fetchUserId == post.user_id || adminStatus == true"><svg width="12" height="13" @click="deleteComment(post.id, comment.id)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg></p>
                      </div>
                      </div>
                      <p @keyup.enter="updateCommentContent(post.id, comment.id)" v-if="comment.publication_id == post.id " v-bind:data-id="comment.id">{{ comment.commentContent }}</p>
                    </div>
                  </div>              
                </div>
              </template>
              <template v-slot:textArea>
                <textarea id="postCommentTextArea" v-bind:data-id="post.id" @keyup.enter="postComment(post.id)" rows="3" placeholder="Écrivez un commentaire..."></textarea>
              </template>
            </CommentSection>

            <!-- On clic : Menu modification/suppression -->
            <div class="menu inactive" v-bind:data-id="post.id">
              <ul>
                <li v-bind:data-id="post.id" @click="showUpdateMenu(post.id)">Modifier la publication</li>
                <li v-bind:data-id="post.id" @click="deletePublication(post.id)">Supprimer la publication</li>
              </ul>
            </div>

            <!-- On clic : Menu de mise à jour publication -->
            <div class="updateMenu inactive" v-bind:data-id="post.id">
              <div class="updateMenu__headers">
                <h2>Mettre à jour la publication</h2>
                <button class="closeButton" @click="showUpdateMenu(post.id)">X</button>
              </div>
              <PublicationsContent v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="formattingDate(post.date_col_formed)" v-bind:profilePicture="post.user.profilePicture" v-bind:postContent="post.content" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes">
                <template v-slot:slotForContent>
                  <textarea class="publicationsContent__contentParagraph" rows="4" v-bind:data-id="post.id" v-bind:value="post.content" @input="onContentChange"></textarea>
                </template>
              </PublicationsContent>
              <input type="file" id="inputUpdateFile" multiple = false @change="onFileChanged(post.id)">
              <label for="inputUpdateFile" class="submissionBox__publiDivAdd"><p>Modifier l'image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
              <img id="updateImage" v-bind:data-id="post.id" src="#" alt="">
              <button @click="updatePublication(post.id, post.image)">Enregistrer les modifications</button>
            </div>
          </div>
  </div>       
    </div>
</template>

<script>
import HeaderContent from '../components/HeaderContent.vue'
import PublicationsContent from '../components/PublicationsContent.vue'
import CommentSection from '../components/CommentSection.vue'
import PostSubmission from '../components/PostSubmission.vue'
//import Vue from "vue"
import store from '../store'
const axios = require('axios').default;

export default {
    name: 'App',
	components: {
        HeaderContent,
        PublicationsContent,
        CommentSection,
        PostSubmission
	},
    methods: {
         onFileSelected(event) {
    console.log(event.target.files[0]);
    this.$store.dispatch('changeSelectedFile', event.target.files[0]);
    let image = document.querySelector('.imageBloc img');
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    image.setAttribute('src', imgSrc);
  },
  fetchComments(dataId) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/comments";
    axios({
      method: 'get',
      headers: {
      'Content-Type': 'application/json'
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
    axios({
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
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
    axios({
      method: 'delete',
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
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      url: url,
      data: { "userId" : localStorage.getItem('userId'),
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
    document.querySelector('#postCommentTextArea').value = "";
  },
  addLike(dataId) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/like";
    axios({
      method: 'post',
      headers: {
      'Content-Type': 'application/json'
      },
      url: url,
      data: { "userId" : localStorage.getItem('userId') }
    })
    .then(function(res) {
    if (res.ok) {
        return res.json();
        }
    document.querySelector('#pLike').innerHTML = `<svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>${res.data.likes}`;
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
    let image = document.querySelector(`.updateMenu img[data-id="${dataId}"]`);
    console.log(image);
    console.log(event.target.files);
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    image.setAttribute('src', imgSrc);
  },
  onContentChange(event) {
    console.log(event.target.value)
    this.$store.dispatch('changeContent', event.target.value);
  },
  postContent() {
    const fd = new FormData;
    let image = document.querySelector('.imageBloc img');
    console.log(image.src);
    if(image.src !== "http://localhost:8080/") {
      fd.append('image', store.state.selectedFile, store.state.selectedFile.name);
    }
    fd.append('content', store.state.content);
    fd.append('userId', localStorage.getItem('userId'));
    axios({
      method: 'post',
      headers: {
      'Content-Type': 'application/json'
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
    document.querySelector('.publiBox textarea').value = "";
    document.querySelector('.publiBox img').setAttribute("src", "");
  },
  showMenu(dataId) {
    let menu = document.querySelector(`.menu[data-id="${dataId}"]`);
    if(menu.classList.contains("active")) {
       menu.classList.replace("active", "inactive")
     } else {
       menu.classList.replace("inactive", "active")
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
    let divToDelete = document.querySelector(`.pubBox[data-id="${dataId}"]`);
    const url = "http://localhost:3000/api/publications/" + dataId;
    const authorization = "Bearer " + localStorage.getItem('token');
    axios({
      method: 'delete',
      headers: {
        'Authorization' : authorization
      },
      url: url,
    })
    .then(
      () => { divToDelete.remove() }
    )
    .catch(error => console.log(error));
  },
 updatePublication(dataId, postImage) {
  this.showUpdateMenu(dataId);  
  this.showMenu(dataId);
  const url = "http://localhost:3000/api/publications/" + dataId;
  const authorization = "Bearer " + localStorage.getItem('token');
  const fd = new FormData;
  let textArea = document.querySelector(`.updateMenu textarea[data-id="${dataId}"]`);
  let imageToUpdate = document.querySelector(`.pubBox[data-id="${dataId}"] img`);
  console.log(postImage);
  console.log(imageToUpdate.src);
  console.log(store.state.selectedFile);
  if(postImage == null && imageToUpdate.src !== ""){
      console.log('yes');
      fd.append('image', store.state.selectedFile, store.state.selectedFile.name);
  } 
  fd.append('content', textArea.value);
  fd.append('userId', localStorage.getItem('userId'));
  axios({
  method: 'put',
  headers: {
    'Authorization' : authorization
  },
  url: url,
  data: fd
  })
  .then(
    () => { console.log('ok') }
  );
  let pToUpdate = document.querySelector(`.pubBox[data-id="${dataId}"] #contentParagraph`);
  pToUpdate.innerHTML = textArea.value;
  if(imageToUpdate.src !== "") {
      let imageToUpdate = document.querySelector(`.pubBox img[data-id="${dataId}"]`);
  console.log(imageToUpdate);
  let newSource = URL.createObjectURL(store.state.selectedFile);
  imageToUpdate.setAttribute("src", newSource);
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
      return this.$store.state.userId
    },
    adminStatus() {
      return this.$store.state.admin
    },
    },
    mounted() {
        this.$store.dispatch('getUserInfos', window.location.href.slice(window.location.href.indexOf("e") + 2));
        this.$store.dispatch('getPostsByUser', window.location.href.slice(window.location.href.indexOf("e") + 2));
        this.$store.dispatch("getComments")
    }
}
</script>

<style lang="scss">
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

main {
  background-color:rgba(255,255,255, 0.7);
}

main p {
  width:100%;
  margin:0;
  text-align: center;
}

//Header
#mainMenu {
  display:flex;
  align-items: baseline;

  & img {
    max-width:30px;
    max-height:30px;
    border-radius:50%;
  }
}


// Partie soumission d'une publication
.submissionBox__publiDivAdd svg {
  fill: rgba(253, 45, 1, 1);
  position:relative;
  left: 10px;
  top: 4px;
}

#inputFile, #inputUpdateFile {
  display:none;
}


// Partie publications à la une
label {
  cursor:pointer;
}

h1 {
  margin-top:50px;
  font-weight:800;
  @include desktopstyle() {
    margin-top:80px;
    letter-spacing: 1px;
  }
}

.publications__each {
  position:relative;
  width:90%;
  margin:30px auto;
  padding-bottom:10px;
  background-color: rgba(255, 255, 255, 0.8) ;
  border-top: rgba(128, 128, 128, 0.1) solid 1.5px;
  border-bottom: rgba(128, 128, 128, 0.1) solid 2px;
  box-shadow: 8px 0 3px -4px rgba(128, 128, 128, 0.2), -8px 0 3px -4px rgba(128, 128, 128, 0.2);
    @include desktopstyle {
    width:60%;
  }
}

// Corps de la publication
.updatePub {
  fill: black;
  cursor:pointer;
  padding:10px;

  &:hover {
    border-radius:50%;
    fill: rgba(253, 45, 1, 1);
    background-color:rgba(253, 45, 1, 0.1);
  }
}

//Likes et section commentaires


// Menu modif/suppr
.menu {
  position:absolute;
  z-index:3;
  background-color:transparent;
  right:0px;
  top:35px;
  padding:0;
  width:100%;
  @include desktopstyle() {
    right:15px;
    top:55px;
  }
}

.menu, .updateMenu {
    &.inactive {
    display:none;
  }

  &.active {
    display:initial;
  }
}

ul {
  background-color:white;
  list-style-type: none;
  border: black solid 0.5px;
  padding:5px 10px;
  font-size:0.8rem;
  line-height: 1.5rem;
  @include desktopstyle() {
    width:250px;
    margin:0;
    padding:10px;
  }

  & li {
    cursor: pointer;

    &:hover {
      background-color: #ffd7d7;
    }
  }
}

// Menu de mise à jour publication
.updateMenu__headers {
  display:flex;
  justify-content: space-between;
  align-items:center;
}

.updateMenu #numberOfLikes {
  display:none;
}

.updateMenu.active {
  position:fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index:99;
  background-color:white;
  padding:10px 30px;
  max-width:600px;
  min-height:500px;
  width:80%;

  & textarea {
    width:90%;
  }
  
  & button {
    height:35px;
    border-radius: 25px;
    background-color: #ffd7d7; 
    border:transparent 1px solid;
    font-weight: 600;
    margin-top:25px;
  }

  & .closeButton {
    border-radius:0;
    height:20px;
    font-size:0.7rem;
    margin-top:0;
  }

  & .userProfilePicture img {
      margin:0;
  }
}

.displayFlex {
  display:flex;
  justify-content: flex-start;
  align-items: center;

  & h4 {
    padding-top:0px;
    padding-bottom:0;
    margin:0;
  }

  & p:nth-child(2) {
    font-size: 0.9rem;
  }
}

.userProfilePicture {
  margin-left:10px;
  margin-top:5px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow:hidden;
  position:relative;
  @include desktopstyle() {
    width: 60px;
    height: 60px;
    margin-left:10px;
    margin-top:10px;
  }

  & img {
    width:100%;
  }
}

.submissionBox__imageBloc img, .updateMenu img {
  max-width:100%;
  @include desktopstyle() {
      max-width:500px;
      margin:10px auto;
  }
}

button {
  background-color: transparent;
  border:none;
  cursor:pointer;
  font-family:"Montserrat", sans-serif;
  font-size:0.9rem;
}

#postCommentTextArea {
  width:95%;
  //margin-top:3px;
  //margin-left:20px;
  border-radius:5px;
  border:none;
  background-color:#f1f2f6;
  font-size:0.7rem;
  font-family:"Montserrat", sans-serif;
  padding:5px 0 0 5px;  
  @include desktopstyle() {
    margin:10px 30px;
    padding:3px;
    font-size: 0.8rem;
  }

  &::placeholder {
    font-size:0.7rem;
    font-family:"Montserrat", sans-serif; 
    margin:5px 0 0 5px;   
    @include desktopstyle() {
      font-size:0.8rem;
    }
  }
}
</style>