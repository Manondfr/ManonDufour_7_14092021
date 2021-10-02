<template>
  <div>   
     <HeaderContent>
       <div>
         <router-link class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/homepage">Accueil</router-link>
         <router-link class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/profile">Profil</router-link>
       </div>
     </HeaderContent>
  <main>
    <!-- Partie soumission d'un post -->
  <div class="publiBox">
    <h2>Bonjour Manon ! Que souhaitez-vous partager aujourd'hui ?</h2>
    <form action="#" method="POST" id="publiForm">
        <textarea rows="4" @change="onContentChange"></textarea>
    </form>
    <hr>
    <div class="imageBloc">
      <img src="" alt="">
    </div>
    <div class="submissionBloc">
      <input type="file" id="inputFile" multiple = false @change="onFileSelected">
    <label for="inputFile" class="submissionBloc__p"><p>Ajouter une image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
    <button @click="postContent" class="submissionBloc__p">Publier <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/></svg></button>
    </div>
  </div>
  <!-- Partie publication -->
  <div class="publications">
    <h1>Publications à la une</h1>
    <div class="pubBox" v-for='post in posts' :key='post.id' v-bind:data-id="post.id">
      <div class="tryflex2">
        <div class="tryFlex">
          <div id="userProfilePicture">
            <img v-bind:src="post.user.profilePicture"/>
          </div>
          <div class="trydate">
            <h4>{{ post.user.last_name }} {{ post.user.last_name }}</h4>
            <p>{{ formattingDate(post.date_col_formed) }}</p>
          </div>
        </div>
        <p id="svgParagraph" v-if="fetchUserId == post.user_id || adminStatus == true"><svg @click="showMenu(post.id)" v-bind:data-id="post.id" class="updatePub" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg></p>
      </div>
      <div  class="menu inactive" v-bind:data-id="post.id">
        <ul>
          <li id="updateListItem" v-bind:data-id="post.id" @click="showUpdateMenu(post.id)">Modifier la publication</li>
          <li id="bin" v-bind:data-id="post.id" @click="deletePublication(post.id)">Supprimer la publication</li>
        </ul>
      </div>
      <!-- Menu de mise à jour publication -->
      <div class="updateMenu inactive" v-bind:data-id="post.id">
        <h4>Mettre à jour la publication</h4>
        <textarea v-bind:data-id="post.id" v-bind:value="post.content" @change="onContentChange"></textarea>
        <img v-bind:src="post.image"/>
        <input type="file" id="inputUpdateFile" multiple = false @change="onFileChanged">
        <label for="inputUpdateFile" class="submissionBloc__p"><p>Modifier l'image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
        <img src="#" alt="">
        <button @click="updatePublication(post.id)">Enregistrer les modifications</button>
      </div>
      <p id="contentParagraph">{{ post.content }}</p>
      <img v-bind:data-id="post.id" v-bind:src="post.image"/>
      <p id="pLike" data-id={posts.indexOf(post)} ><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>{{ post.likes }}</p>
      <div class="likeSection">
        <p @click="addLike(post.id, posts.indexOf(post))"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"/></svg>J'aime</p>
        <p><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>Commenter</p>
      </div>
      <form action="#" method="POST">
        <textarea rows="3" placeholder="Écrivez un commentaire..."></textarea>
      </form>   
    </div>
  </div>
  </main>
  </div>
</template>

<script>
import HeaderContent from '../components/HeaderContent.vue'
import store from '../store'
const axios = require('axios').default;


export default {
  methods: {
  onFileSelected(event) {
    console.log(event.target.files[0]);
    this.$store.dispatch('changeSelectedFile', event.target.files[0]);
    let image = document.querySelector('.imageBloc img');
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    image.setAttribute('src', imgSrc);
  },
  addLike(dataId, indexOfPost) {
    const url = "http://localhost:3000/api/publications/" + dataId + "/like";
    console.log(url);
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
    })
    .catch(function() {                
        alert("Une erreur est survenue lors de l'envoi des données");                
    });
    this.$store.dispatch('getPosts');
    console.log(store.state);
    document.querySelector("#pLike").innerHTML = `<svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z"/></svg>${store.state.posts[indexOfPost].likes}`;
  },
  formattingDate(date) {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let formattedDate = new Date(date).toLocaleString('fr-FR', options);
  return formattedDate[0].toUpperCase() + formattedDate.slice(1);
  },
  onFileChanged(event) {
    console.log(event.target.files[0]);
    this.$store.dispatch('changeSelectedFile', event.target.files[0]);
  },
  onContentChange(event) {
    console.log(event.target.value)
    this.$store.dispatch('changeContent', event.target.value);
  },
  postContent() {
    const fd = new FormData;
    console.log(document.querySelector(".publiBox textarea"));
    fd.append('image', store.state.selectedFile, store.state.selectedFile.name);
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
    })
    .catch(function() {                
        alert("Une erreur est survenue lors de l'envoi des données");                
    })
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
    this.showMenu(dataId);
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
 updatePublication(dataId) {
  this.showUpdateMenu(dataId);  
  this.showMenu(dataId);
  const url = "http://localhost:3000/api/publications/" + dataId;
  const authorization = "Bearer " + localStorage.getItem('token');
  let textArea = document.querySelector(`.updateMenu textarea[data-id="${dataId}"]`);
  const fd = new FormData;
  if(store.state.selectedFile !== null){
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
  let imageToUpdate = document.querySelector(`.pubBox img[data-id="${dataId}"]`);
  console.log(imageToUpdate);
  let newSource = URL.createObjectURL(store.state.selectedFile);
  imageToUpdate.setAttribute("src", newSource);
  }
  },
  computed: {
    posts() {
      return this.$store.state.posts
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
    this.$store.dispatch('getPosts');
  },
	name: 'App',
	components: {
		HeaderContent,
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



.publiBox, .publications {
    width:50%;
    min-width:310px;
    margin:20px auto;
    background-color: rgba(255, 255, 255, 0.9);
    
}

.publications {
  width: 60%;
  padding:15px;
  background-color: rgba(255, 255, 255, 0.6) ;
  border-top: rgba(128, 128, 128, 0.1) solid 1px;
  //border-bottom: rgba(128, 128, 128, 0.1) solid 1px;
  //box-shadow: 4px 0 3px -4px rgba(128, 128, 128, 0.2), -4px 0 3px -4px rgba(128, 128, 128, 0.2);

  @include desktopstyle {
    width:60%;
  }
}

.pubBox {
  //background-color:white;
  position:relative;
  width:90%;
  margin:30px auto;
  min-height:400px;
  background-color: rgba(255, 255, 255, 0.8) ;
  border-top: rgba(128, 128, 128, 0.1) solid 1.5px;
  border-bottom: rgba(128, 128, 128, 0.1) solid 2px;
  box-shadow: 8px 0 3px -4px rgba(128, 128, 128, 0.2), -8px 0 3px -4px rgba(128, 128, 128, 0.2);
    @include desktopstyle {
    width:80%;
  }

}

hr {
  margin-top: 20px;
}

.submissionBloc {
  display:flex;
  justify-content:space-between;
}

.submissionBloc__p {
    width:50%;
    margin-bottom: 15px;
}

svg {
  fill: rgba(253, 45, 1, 1);
  position:relative;
  left: 10px;
  top: 4px;
}

#inputFile, #inputUpdateFile {
  display:none;
}

label {
  cursor:pointer;
}

main p {
  width:100%;
  margin:0;
}

.updatePub {
  fill: black;
  cursor:pointer;

  &:hover {
    fill: rgba(253, 45, 1, 1);
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

.updateMenu.active {

  position:fixed;
  margin: auto;
  left: 0;
  right: 0;
  top:0;
  bottom: 0;
  z-index:99;
  background-color:white;
  padding:30px;
  max-height:600px;
  max-width:600px;
  width:60%;
}

ul {
  list-style-type: none;
  line-height: 1.5em;
  border: black solid 1px;
  padding:10px;
  width:250px;
  margin:0;

  & li {
    cursor: pointer;

    &:hover {
      background-color: #ffd7d7;
    }
  }
}

.likeSection {
  padding:5px 0;
  margin: 5px auto;
  display:flex;
  border-top: rgba(128, 128, 128, 0.8) solid 0.5px;
  border-bottom: rgba(128, 128, 128, 0.8) solid 0.5px;
  p {
    cursor:pointer;

    svg {
      fill:black;
      position:relative;
      left:-10px;
    }

  }
}


.tryFlex {
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

#userProfilePicture {
  margin-left:10px;
  margin-top:10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  overflow:hidden;
  position:relative;

  & img {
    width:100%;
  }
}

.trydate {
  text-align:left;
  margin-left:10px;
}

.tryflex2 {
  display:flex;
  justify-content: space-between;
  align-items:center;
  margin-bottom:20px;

  & #svgParagraph {
    width:10px;
    padding-right:40px;
    text-align:right;
  }
}

.menu{
  position:absolute;
  z-index:3;
  background-color:white;
  right:20px;
  top:50px;
}

#contentParagraph {
  text-align:left;
  padding-left:20px;

  & + img {
    max-width:500px;
    margin:10px 0;
    text-align:left;

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

.imageBloc img, .updateMenu img {
  max-width:500px;
  margin:10px auto;
}

button {
  background-color: transparent;
  border:none;
  cursor:pointer;
  font-family:"Montserrat", sans-serif;
  font-size:0.9rem;
}

</style>