<template>
  <div>
    <HeaderContent role="banner" v-bind:condition="$route.path !== '/signup' || $route.path !== '/login'" v-bind:name="$store.state.connectedUser.firstName" v-bind:profilePicture="$store.state.connectedUser.profilePicture" v-bind:userId="$store.state.connectedUser.id">
    </HeaderContent>

    <main>
      <!-- Informations utilisateur -->
      <div class="userInfos">
        <div class="userProfilePicture generalUserProfilePicture">
          <img v-bind:src="$store.state.profilePicture" alt="Photo de profil utilisateur"/>
        </div>
        <h1>{{ $store.state.firstName}} {{ $store.state.lastName }}</h1>
        <div class='userInfos__paragraphs'>
          <h2 v-show="$store.state.gender !== null && $store.state.gender !== ''">Genre :</h2>
          <p v-show="$store.state.gender !== null && $store.state.gender !== ''" id="genderParagraph"> {{ $store.state.gender == "F"?"Femme":"Homme" }} </p>
          <h2 v-show="$store.state.occupation !== null && $store.state.occupation !== ''">Poste :</h2>
          <p v-show="$store.state.occupation !== null && $store.state.occupation !== ''" id="occupationParagraph"> {{ $store.state.occupation }} </p>
          <h2 v-show="$store.state.birthday !== null && $store.state.birthday !== 'Invalid Date'">Date de naissance :</h2>
          <p v-show="$store.state.birthday !== null && $store.state.birthday !== 'Invalid Date'" id="birthdayParagraph"> {{ formattingBirthday($store.state.birthday) }} </p>
          <h2 v-show="$store.state.about !== null && $store.state.about !== ''">A propos :</h2>
          <p v-show="$store.state.about !== null && $store.state.about !== ''" id="aboutParagraph">{{ $store.state.about }}</p>
        </div>
        <button v-if="$route.path == '/profile/' + fetchUserId || $store.state.connectedUser.admin == 1" @click="showUpdateInfosMenu" id="updateInfosButton">Modifier mes informations personnelles</button>
        
        <!-- Menu de mise à jour des informations personnelles -->
        <div class="updateInfosMenu inactive">
          <div class="updateMenu__headers">
            <h2>Mettre à jour les informations utilisateurs</h2>
            <button aria-label="Fermeture du menu de modification du profil utilisateur" class="closeButton" @click="showUpdateInfosMenu">X</button>
          </div>
          <div class="userProfilePicture generalUserProfilePicture">
            <img v-bind:src="$store.state.profilePicture" alt="Photo de profil utilisateur"/>
          </div>
          <input type="file" id="inputUpdateProfilePicture" multiple = false @change="onProfilePictureChanged">
          <label role="button" tabindex="0" for="inputUpdateProfilePicture" class="submissionBox__publiDivAdd"><p>Modifier ma photo de profil <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
          <form aria-label="Formulaire de mise à jour des informations utilisateur" method="POST" action="#">
            <label for="gender">Genre</label>
              <select id="gender">
                <option value=""></option>
                <option value="F">Femme</option>
                <option value="M">Homme</option>
              </select>
            <label for="birthday">Date de naissance</label><input type="date" v-bind:value="$store.state.birthday" id="birthday"/>
            <label for="occupation">Poste</label><input v-bind:value="$store.state.occupation" id="occupation"/>
            <label for="about">A propos</label><textarea v-bind:value="$store.state.about" id="about"></textarea>
          </form>
          <div id="updateButtons">
            <button @click="saveNewInfos">Enregistrer les modifications</button>
            <button @click="deleteAccount" id="deleteAccountButton">Supprimer mon compte</button>
          </div>
        </div>

        <!-- Partie soumission d'un post -->
        <PostSubmission v-if="$route.path == '/profile/' + fetchUserId" role="region" v-bind:userName="$store.state.firstName"></PostSubmission>
      </div>

      <!-- Partie publications à la une -->        
        <section class="publications">
          <h1>Dernières publications</h1>
          
          <article class="publications__each" v-for='post in posts' :key='post.id' v-bind:data-id="post.id">  
            <div v-if="post.user.id == $store.state.userId">
              <!-- Corps de la publication -->
              <PublicationsContent v-bind:postUserId="post.user.id" v-bind:condition="fetchUserId == post.user_id || $store.state.connectedUser.admin == 1" v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="post.date_col_formed" v-bind:profilePicture="post.user.profilePicture" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes" v-bind:postContent="post.content">
                  <!-- On clic : Menu modification/suppression -->
                  <template v-slot:updateDeleteMenu>
                    <UpdateDeleteMenu v-bind:postId="post.id">
                      <template v-slot:updateMenu>
                        <!-- On clic sur Modifier la publication : Menu de mise à jour publication -->
                        <UpdatePublication @updatePublication="updatePublication(post.id)" v-bind:postId="post.id" v-bind:postImage="post.image">
                          <template v-slot:publicationsContent>
                            <PublicationsContent v-bind:name="post.user.first_name + ' ' + post.user.last_name" v-bind:date="post.date_col_formed" v-bind:profilePicture="post.user.profilePicture" v-bind:postContent="post.content" v-bind:postId="post.id" v-bind:postImage="post.image" v-bind:postLikes="post.likes">
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
                          <img v-show="post.image" v-bind:data-id="post.id" v-bind:src="post.image" alt="Image accompagnant la publication"/>
                        </div>
                  </template>
                  <template v-slot:numberOfLikes>
                    <p  class="numberOfLikes" v-bind:class="'numberOfLikes'+post.id" v-show="post.likes > 0"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>{{ post.likes }}</p>
                  </template>
              </PublicationsContent>
              <div v-for='comment in comments' :key='comment.id'>
                <Comment v-bind:commentContent="comment.commentContent" v-bind:userLastName="comment.user.last_name" v-bind:userFirstName="comment.user.first_name" v-bind:commentId="comment.id" v-bind:condition="comment.publication_id == post.id" v-bind:contentCreator="fetchUserId == post.user_id || $store.state.connectedUser.admin == 1"></Comment>           
              </div>
              <form aria-label="Formulaire d'ajout de commentaire" action="#" method="POST">
                <label class="sr-only" v-bind:for="'postCommentTextArea'+post.id">Zone d'ajout de commentaire</label>
                <textarea class="postCommentTextArea" v-bind:id="'postCommentTextArea'+post.id" v-bind:data-id="post.id" @keyup.enter="postComment(post.id)" rows="3" placeholder="Écrivez un commentaire..."></textarea>
              </form>   
            </div>
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
  // FORMATAGE DATE ANNIVERSAIRE UTILISATEUR
  formattingBirthday(date) {
    let options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleString("fr-FR", options)
  },

  // AFFICHAGE DU MENU DE MODIFICATION DES INFORMATIONS UTILISATEUR
  showUpdateInfosMenu() {
    let menu = document.querySelector(`.updateInfosMenu`);
    if(menu.classList.contains("active")) {
       menu.classList.replace("active", "inactive")
     } else {
       menu.classList.replace("inactive", "active")
     }
     console.log(store.state.gender);
     document.querySelector(`option[value="${store.state.gender}"]`).selected = true;
  },

  // MISE A JOUR DU STORE AVEC NOUVELLE PHOTO DE PROFIL
  onProfilePictureChanged() {
    store.dispatch('changeProfilePicture', event.target.files[0]);
    document.querySelector(".updateInfosMenu .userProfilePicture img").remove();
    let image = document.createElement('img');
    document.querySelector(".updateInfosMenu .userProfilePicture").appendChild(image);
    image.setAttribute('src', URL.createObjectURL(event.target.files[0]));   
  },

  // SAUVEGARDE DES NOUVELLES INFORMATIONS UTILISATEUR
  saveNewInfos() {
    const url = "http://localhost:3000/api/auth/user/" + window.location.href.slice(window.location.href.indexOf("e") + 2);
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);  
    const fd = new FormData;
    if(store.state.connectedUser.profilePicture && typeof store.state.connectedUser.profilePicture !== "string") {
      fd.append('profilePicture', store.state.connectedUser.profilePicture, store.state.connectedUser.profilePicture.name);                                      
      document.querySelector(".userProfilePicture img").remove();
      let image = document.createElement('img');
      document.querySelector(".userProfilePicture").appendChild(image);
      image.setAttribute('src', URL.createObjectURL(store.state.connectedUser.profilePicture));
    }
    fd.append('gender', document.querySelector("#gender").value);
    if(document.querySelector("#birthday").value !== "") {
      fd.append('birthday', document.querySelector("#birthday").value);
    }
    fd.append('occupation', document.querySelector("#occupation").value);
    fd.append('about', document.querySelector("#about").value);
    axios({
      method: 'put',
      headers: {
      'x-xsrf-token' : xsrfToken
      },
      url: url,
      data: fd
    })
    .then(function(response) {
      return response.data
    })
    .catch(error => console.log(error)); 
    document.querySelector(".userInfos #genderParagraph").textContent = document.querySelector("#gender").options[document.querySelector("#gender").selectedIndex].textContent;
    document.querySelector(".userInfos #genderParagraph").style.display = 'initial';
    document.querySelector(".userInfos #occupationParagraph").textContent = document.querySelector("#occupation").value;
    document.querySelector(".userInfos #birthdayParagraph").textContent = this.formattingBirthday(document.querySelector("#birthday").value);
    if(document.querySelector("#birthdayParagraph").textContent !== "Invalid Date") {
      document.querySelector(".userInfos #birthdayParagraph").style.display = 'initial';             
    }
    document.querySelector(".userInfos #aboutParagraph").textContent = document.querySelector("#about").value;
    if(store.state.connectedUser.profilePicture  && typeof store.state.connectedUser.profilePicture !== "string") {
      document.querySelector("header .profileAccess img").setAttribute('src', URL.createObjectURL(store.state.connectedUser.profilePicture));
      document.querySelectorAll(".publicationsContent .userProfilePicture img").forEach(image => {
      image.setAttribute('src', URL.createObjectURL(store.state.connectedUser.profilePicture))
    });
    }
    this.showUpdateInfosMenu()
  },

  // SUPPRESSION DU COMPTE UTILISATEUR
  deleteAccount() {
    const url = "http://localhost:3000/api/auth/user/" + localStorage.getItem("userId");
    let xsrfToken = localStorage.getItem('xsrfToken');
    xsrfToken = JSON.parse(xsrfToken);
    axios({
      method: 'delete',
      headers: {
        'x-xsrf-token': xsrfToken
      },
      url: url,
    })
    .then(function() {
      window.location.href="http://localhost:8080/#/signup";
    })
    .catch(function() {                
      alert("Une erreur est survenue lors de la suppression des données");                
    });
  },

  // AFFICHAGE DU MENU DE MODIFICATION / SUPPRESSION DE LA PUBLICATION
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
  
  // AFFICHAGE DU MENU DE MISE A JOUR DE LA PUBLICATION
  showUpdateMenu(dataId) {
      let updateMenu = document.querySelector(`.updateMenu[data-id="${dataId}"]`);
      if(updateMenu.classList.contains("active")) {
          updateMenu.classList.replace("active", "inactive")
      } else {
          updateMenu.classList.replace("inactive", "active")
      }
  },  
  
  // ENREGISTREMENT DES MODIFICATIONS DE PUBLICATION
  updatePublication(dataId) {
      // Gestion de l'affichage du menu modif/suppr
      this.showUpdateMenu(dataId);  
      this.showMenu(dataId);
      // Requête POST
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
      .then(function() {
      store.dispatch('getPosts');
      })
      .catch(error => console.log(error));
      // Mise à jour dynamique du contenu et de l'image de la publication
      let pToUpdate = document.querySelector(`p.publicationsContent__contentParagraph${dataId}`);
      pToUpdate.innerHTML = textArea.value;
      if(document.querySelector(`.updateMenu[data-id="${dataId}"] img[data-id="${dataId}"]`) && store.state.selectedFile) {
          if(!document.querySelector(`.divImage${dataId} img`)) {
              document.querySelector(`.divImage${dataId} img`).style.display = "initial";
          }
          let imageToUpdate = document.querySelector(`div.divImage${dataId} > img`);
          let newSource = URL.createObjectURL(store.state.selectedFile);
          imageToUpdate.setAttribute("src", newSource);
          this.$store.dispatch('changeSelectedFile', null);
      }  
  },
  
  // PUBLICATION COMMENTAIRE
  postComment(dataId) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/comments";
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
              "publicationId" : dataId }
    })
    .then(function() {
      store.dispatch('getComments');
    })
    .catch(function() {                
      alert("Une erreur est survenue lors de l'envoi des données");                
    });
    document.querySelector('.postCommentTextArea').value = "";
  },

    changeInfos(input) {
        this.$store.dispatch('changeInfos', event.target.value, input);
  },
  },
  computed: {
    posts() {
      let posts = this.$store.state.posts;
      posts = posts.filter(post => post.user_id == this.$store.state.userId);
      return posts
    },
    comments() {
      return this.$store.state.comments
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
  updated() {
    this.$store.dispatch('getUserInfos', window.location.href.slice(window.location.href.indexOf("e") + 2));
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

// Balise générales à plusieurs composants ou applicable à la homepage et au profil
h1 {
  margin-top:50px;
  font-weight:800;
  @include desktopstyle() {
    margin-top:80px;
    letter-spacing: 1px;
  }
}

.updateInfosMenu {
  height:100%;
  @include desktopstyle() {
    height:auto;
  }

  & p {
      margin-bottom:10px;
  }

  & h2 {
    margin-bottom:30px;
  }
}

// Partie infos utilisateur et soumission de post
.userInfos {
  margin:10px auto;
  text-align:center;
  width:98%;
  padding:20px 0;
  border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 10px rgba(128, 128, 128, 0.2);
  background:radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);

  & h1 {
    margin-top:10px;
  }

  &__paragraphs {
    font-size: 0.8rem;
    @include desktopstyle() {
      font-size: 1rem;

      & h2 {
        margin-top:10px;
        margin-bottom:0;
      }
    }
  }
}

.generalUserProfilePicture {
  width:120px;
  height:120px;
  margin:auto;
}

#updateInfosButton {
    height:35px;
    border-radius: 25px;
    border:transparent 1px solid;
    font-weight: 600;
    margin-top:25px;  
    margin-bottom:40px;
    background-color: #ffd7d7; 
}

#profilePostSubmission {
  box-shadow:none;
  border:none;
}


// Partie mise à jour des infos utilisateur
.updateMenu.active, .updateInfosMenu.active {
  position:fixed;
  margin: auto;
  left: 0;
  right: 0;
  top: 0px;
  z-index:99;
  background-color:white;
  padding:10px 30px;
  max-width:600px;
  min-height:500px;
  width:80%;
  @include desktopstyle() {
    top:70px;
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
}

form {
  display:flex;
  flex-direction:column;

  & input, select {
    width:200px;
    margin:8px auto;
    font-family:"Montserrat", sans-serif;
  }

  & label {
    font-size: 0.8rem;
    margin-top:10px;
  }

  & #about {
    max-width:400px;
    height:75px;
    margin:auto;
    font-family:"Montserrat", sans-serif;
    margin:8px auto;
  }
}

#updateButtons {
  display:flex;
  flex-direction: column;
  width:40%;
  min-width:220px;
  margin:auto;
  justify-content: space-between;  

  & button {
    font-size:0.8rem;
    @include desktopstyle() {
      font-size:0.9rem;
    }
  }
}

#deleteAccountButton {
  background-color:darken(rgb(253, 45, 1), 15%);
  color:white;
}

#inputFile, .inputUpdateFile, #inputUpdateProfilePicture {
  display:none;
}
</style>