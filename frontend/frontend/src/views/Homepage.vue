<template>
  <div>   
    <HeaderContent role="banner">
      <nav id="mainMenu">
        <router-link aria-label="Accès page d'accueil" class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/homepage"><svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg></router-link>
        <div role="button" tabindex="0" aria-controls="headerMenu" aria-expanded="false" aria-label="Menu déroulant au clic - Accès profil ou déconnexion" @click="showHeaderMenu" class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'"><p class="profileAccess"><img v-bind:src="$store.state.profilePicture"/><span>Manon</span></p></div>       
        
        <!-- Au clic sur la div ci-dessus, apparition du menu de navigation -->
        <div class="headerMenu inactive" id="headerMenu">
          <ul>
            <li><router-link v-bind:to="'/profile/' + $store.state.userId">Voir le profil</router-link></li>
            <li>Se déconnecter</li>
          </ul>
        </div>
        <!-- Fin du menu de navigation -->
      </nav>
    </HeaderContent>

    <main>
      <!-- Partie soumission d'un post -->
      <PostSubmission role="region" v-bind:userName="$store.state.firstName" @changeContent="onContentChange" @postContent="postContent" @selectFile="onFileSelected"></PostSubmission>

      <!-- Partie publications à la une -->        
        <div role="region" class="publications">
          <h1>Publications à la une</h1>
          <div class="publications__each" v-for='post in posts' :key='post.id' v-bind:data-id="post.id">  

            <!-- Corps de la publication -->
            <PublicationsContent @inputAutofocus="inputAutofocus(post.id)" @addLike="addLike(post.id)" @showMenu="showMenu(post.id)" v-bind:condition="fetchUserId == post.user_id || adminStatus == true" v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="formattingDate(post.date_col_formed)" v-bind:profilePicture="post.user.profilePicture" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes" v-bind:postContent="post.content"></PublicationsContent>
            <div v-for='comment in comments' :key='comment.id'>
              <Comment @updateCommentContent="updateCommentContent(post.id, comment.id)" @deleteComment="deleteComment(post.id, comment.id)" @updateComment="updateComment(comment.id)" @visitProfile="visitProfile(comment.user.id)" v-bind:commentContent="comment.commentContent" v-bind:userLastName="comment.user.last_name" v-bind:userFirstName="comment.user.first_name" v-bind:commentId="comment.id" v-bind:condition="comment.publication_id == post.id" v-bind:contentCreator="fetchUserId == post.user_id || adminStatus == true"></Comment>           
            </div>
            <textarea id="postCommentTextArea" v-bind:data-id="post.id" @keyup.enter="postComment(post.id)" rows="3" placeholder="Écrivez un commentaire..."></textarea>
               

            <!-- On clic : Menu modification/suppression -->
           <UpdateDeleteMenu v-bind:postId="post.id" @showUpdateMenu="showUpdateMenu(post.id)" @deletePublication="deletePublication(post.id)"></UpdateDeleteMenu>


            <!-- On clic : Menu de mise à jour publication -->
            <UpdatePublication v-bind:postId="post.id" v-bind:postImage="post.image" @showUpdateMenu="showUpdateMenu(post.id)" @changeFile="onFileChanged(post.id)" @updatePublication="updatePublication(post.id, post.image)">
              <template v-slot:publicationsContent>
                <PublicationsContent v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="formattingDate(post.date_col_formed)" v-bind:profilePicture="post.user.profilePicture" v-bind:postContent="post.content" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes">
                  <template v-slot:slotForContent>
                    <textarea class="publicationsContent__contentParagraph" rows="4" v-bind:data-id="post.id" v-bind:value="post.content" @input="onContentChange"></textarea>
                  </template>
                </PublicationsContent>
              </template>
            </UpdatePublication>
          </div>
        </div>
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
  onFileSelected() {
    console.log(event.target.files[0]);
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
    document.querySelector(`#postCommentTextArea[data-id="${dataId}"]`).focus();
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
    document.querySelector(`.publicationsContent[data-id="${dataId}"] #numberOfLikes`).innerHTML = `<svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>${res.data.likes}`;
    if(res.data.likes == 0) {
      document.querySelector(`.publicationsContent[data-id="${dataId}"] #numberOfLikes`).style.display = "none"
    } else {
      document.querySelector(`.publicationsContent[data-id="${dataId}"] #numberOfLikes`).style.display = "inherit"
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
    document.querySelector('.submissionBox textarea').value = "";
  },
  showMenu(dataId) {
    let menu = document.querySelector(`.menu[data-id="${dataId}"]`);
    if(menu.classList.contains("active")) {
       menu.classList.replace("active", "inactive")
     } else {
       menu.classList.replace("inactive", "active")
     }
  },
    showHeaderMenu() {
    let menu = document.querySelector(`.headerMenu`);
    if(menu.classList.contains("active")) {
       menu.classList.replace("active", "inactive");
       menu.setAttribute("aria-expanded", "false")
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
 updatePublication(dataId) {
  this.showUpdateMenu(dataId);  
  this.showMenu(dataId);
  const url = "http://localhost:3000/api/publications/" + dataId;
  const authorization = "Bearer " + localStorage.getItem('token');
  const fd = new FormData;
  let textArea = document.querySelector(`.updateMenu textarea[data-id="${dataId}"]`);
  let imageToUpdate = document.querySelector(`.publications__each[data-id="${dataId}"] img[data-id="${dataId}"]`);
  console.log(imageToUpdate);
  fd.append('image', store.state.selectedFile, store.state.selectedFile.name);
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
  let pToUpdate = document.querySelector(`.publications__each[data-id="${dataId}"] .publicationsContent__contentParagraph`);
  pToUpdate.innerHTML = textArea.value;
      let newSource = URL.createObjectURL(store.state.selectedFile);
      imageToUpdate.setAttribute("src", newSource);
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
    this.$store.dispatch('getUserInfos', localStorage.getItem('userId'));
    this.$store.dispatch('getPosts');
    this.$store.dispatch("getComments");
  },
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
  padding-top:55px;
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

#inputFile, .inputUpdateFile {
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

.menu, .updateMenu, .headerMenu {
    &.inactive {
    display:none;
  }

  &.active {
    display:initial;
  }
}

.headerMenu {
  position:absolute;
  z-index:99;
  cursor:pointer;
  @include desktopstyle() {
      top:75px;
  right:35px;
  }

  & ul {
                    border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 5px rgba(128, 128, 128, 0.2);
    background:radial-gradient(circle, rgba(254,251,251,1) 0%, rgba(254,251,251,1) 100%);
    border-radius:3px;
  }

  & ul, a {
    width:200px;
    font-size:0.8rem;
    line-height:1.2rem;
    text-decoration:none;
    font-weight:normal;
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

.updateMenu #numberOfLikes, .updateMenu #commentAndLikesSection {
  display:none;
}

.updateMenu.active {
  position:fixed;
  margin: auto;
  height:100%;
  left: 0;
  right: 0;
  top: 0;
  z-index:99;
  background-color:white;
  padding:10px 30px;
  max-width:600px;
  min-height:500px;
  width:80%;
  @include desktopstyle() {
    top:70px;
    height:auto;
  }

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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
</style>