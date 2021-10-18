<script>
const axios = require('axios').default;
axios.defaults.withCredentials = true;
export default {
	name: 'PublicationsContent',
  props: {
    profilePicture:String,
    postId:Number,
    postUserId: Number,
    postImage:String,
    postLikes:Number,
    name:String,
    date:String,
    condition:Boolean,
    commentId:Number,
  },
  methods: {
  
  // FORMATAGE DE LA DATE DE CREATION DE LA PUBLICATION
  formattingDate(date) {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = new Date(date).toLocaleString('fr-FR', options);
    return formattedDate[0].toUpperCase() + formattedDate.slice(1);
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

  // AJOUT D'UN LIKE AU CLIC SUR "J'AIME"
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

  // FOCUS SUR LA ZONE D'ECRITURE DE COMMENTAIRE AU CLIC SUR "COMMENTER"
  inputAutofocus(dataId) {
    document.querySelector(`.postCommentTextArea[data-id="${dataId}"]`).focus();
  },

  // ACCES AU PROFIL DU CREATEUR DE LA PUBLICATION
  visitProfile(userId) {
    window.location.href = "http://localhost:8080/#/profile/" + userId;
  },
  }
}
</script>

<template>
  <div class="publicationsContent" v-bind:data-id="postId">
    <div class="publicationsContent__userInfo">
      <div class="displayFlex">
        <div class="userProfilePicture">
          <img v-bind:src="profilePicture" alt="Photo de profil utilisateur"/>
        </div>
        <div class="publicationsContent__userInfo__nameDate">
          <button @click="visitProfile(postUserId)" class="publicationsContent__userInfo__userName">{{ name }}</button>
          <p>{{ formattingDate(date) }}</p>
        </div>
      </div>
      <button @click="showMenu(postId)" v-bind:aria-controls="'menu'+postId" aria-expanded="false" aria-label="Menu déroulant au clic - Accès à la modification ou suppression de la publication" class="showMenu" v-if="condition"><svg v-bind:data-id="postId" class="updatePub" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg></button>
      <slot name="updateDeleteMenu"></slot>
    </div>
    <slot name="slotForContent"></slot>
    <slot name="numberOfLikes"></slot>
    <div>
      <div id="commentAndLikesSection">
      <div class="likeSection">
        <button @click="addLike(postId)"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"/></svg>J'aime</button>
        <button @click="inputAutofocus(postId)"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>Commenter</button>
      </div>
    </div>
    </div> 
  </div>
</template>

<style lang="scss">
// Mixins
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

// Informations utilisateur : photo de profil, nom, date de la publication et bouton d'ouverture du menu de modification/suppression
.publicationsContent__userInfo {
  display:flex;
  justify-content: space-between;
  align-items:center;
  margin-bottom:20px;

  &__userName {
    font-size:0.9rem;
    padding:0;
    margin:5px 0 0 0;
    font-weight:bold;
    background-color:transparent;
    @include desktopstyle() {
      font-size:1rem;
    }
  }

  & p {
    font-size:0.7rem;
    text-align:left;
    @include desktopstyle() {
      font-size:1rem;
    }
  }

  & .showMenu {
    width:10px;
    margin-right:50px;
    text-align:right;
  }
}

  svg {
    width:14px;
    @include desktopstyle() {
      width:auto;
    }
}

.publicationsContent__userInfo__nameDate {
  text-align:left;
  margin-left:10px;
}

.publicationsContent__contentParagraph {
  margin-bottom:10px;
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


// Corps de la publication
.publicationsContent__contentParagraph {
  font-size:0.7rem;
  text-align:left;
  padding-left:15px;
  @include desktopstyle {
    font-size:1rem;
    padding-left:20px;
  }

  & +.divImage img {
    max-width:90%;
    margin:10px 0;
    text-align:left;
    @include desktopstyle() {
      max-width:500px;
    }

    & + p {
      text-align:left;
      padding-left:20px;
      margin-bottom:20px;

      &:hover {
        cursor:pointer;
      }

      & > svg {
        position:relative;
        left:-5px;
        top:7px;
        fill:blue;
        padding:3px;
      }
    }
  }
}

.numberOfLikes {
  font-size:0.7rem;
  text-align:left;
  padding-left:20px;
  @include desktopstyle() {
    font-size:1rem;
  }

  & svg {
    padding-right:5px;
  }
}

.likeSection {
  padding:5px 0;
  margin: 15px auto 5px auto;
  display:flex;
  border-top: rgba(128, 128, 128, 0.8) solid 0.5px;
  border-bottom: rgba(128, 128, 128, 0.8) solid 0.5px;

    button {
        cursor:pointer;
        font-size:0.8rem;
        width:50%;
        font-weight:normal;
        @include desktopstyle() {
            font-size:1rem;
        }

    svg {
      fill:black;
      position:relative;
      left:-10px;
      top:3px;
      width:15px;
      @include desktopstyle {
            width:auto;
      }
    }

  }
}

.commentSection {
  display:flex;
  justify-content: flex-start;
  margin:10px 10px;
  @include desktopstyle() {
    margin:10px 30px;    
  }
  
  & .commentContentSection {
    background-color:#f1f2f6;
      padding:0 15px 5px 15px;
      text-align:left;
      border-radius:5px;

    & h4 {
        margin-bottom:3px;
        margin-top:5px;
        font-size:0.7rem;
        @include desktopstyle() {
          font-size:0.9rem;
        }
    }

    & p {
        font-size: 0.7rem;
        text-align:left;
          @include desktopstyle() {
            font-size:0.8rem;
          }
    }

    & svg {

        height:10px;
        fill: rgba(0,0,0,0.3);
        cursor: pointer;
        position:relative;
        top:5px;
        padding-left:3px;
        @include desktopstyle() {
            width:auto;
            height:auto;
            padding-left:8px;
        }

        &:hover {
        fill:black;
        }
    }

    & textarea {
        width:95%;
        border-radius:5px;
        border:none;
        font-size:0.7rem;
        font-family:"Montserrat", sans-serif;
        padding:5px 0 0 5px;  
        @include desktopstyle() {
        margin:10px 30px;
        padding:3px;
        font-size: 0.8rem;
    }        
    }
  }
}

.commentContentSection__headers {
    display:flex;
    justify-content:space-between;

    & .commentContentSection__headers__icons {
        display:flex;
        padding-left:20px;
    }
}
</style>