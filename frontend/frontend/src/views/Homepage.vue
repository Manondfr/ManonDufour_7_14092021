<template>
  <div>   
     <HeaderContent>
       <div>
         <router-link class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/homepage">Accueil</router-link>
         <router-link class="homepage" v-if="$route.path !== '/signup' || $route.path !== '/login'" to="/profile">Profil</router-link>
       </div>
     </HeaderContent>
  <main>
  <div class="publiBox">
    <h2>Bonjour Manon ! Que souhaitez-vous partager aujourd'hui ?</h2>
    <form action="#" method="POST" id="publiForm">
        <textarea rows="4" @change="onContentChange"></textarea>
    </form>
    <hr>
    <div class="imageBloc">
      <img src="#" alt="">
    </div>
    <div class="submissionBloc">
      <input type="file" id="inputFile" multiple = false @change="onFileSelected">
    <label for="inputFile" class="submissionBloc__p"><p>Ajouter une image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
    <button @click="postContent" class="submissionBloc__p">Publier <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/></svg></button>
    </div>
  </div>
  <div class="publications">
    <h1>Publications à la une</h1>
    <div class="pubBox" v-for='post in posts' :key='post.id' v-bind:data-id="post.id">
      <img v-bind:src="post.user.profilePicture"/>
      <h4>{{ post.user.first_name }} {{ post.user.last_name }}</h4>
      <p>{{ post.createdAt }}</p>
      <p>{{ post.content }}</p>
      <p v-if="fetchUserId == post.user_id || adminStatus == true"><svg @click="showMenu(post.id)" v-bind:data-id="post.id" class="updatePub" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg></p>
      <div id="#unblurred" class="menu inactive" v-bind:data-id="post.id">
        <ul>
          <li id="updateListItem" v-bind:data-id="post.id" @click="showUpdateMenu(post.id)">Modifier la publication</li>
          <li id="bin" v-bind:data-id="post.id" @click="deletePublication(post.id)">Supprimer la publication</li>
        </ul>
      </div>
      <div class="updateMenu inactive" v-bind:data-id="post.id">
        <h4>Mettre à jour la publication</h4>
        <textarea v-bind:value="post.content"></textarea>
        <img v-bind:src="post.image"/>
        <input type="file" id="inputFile" multiple = false @change="onFileSelected">
        <label for="inputFile" class="submissionBloc__p"><p>Modifier l'image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
        <button @click="updatePublication(post.id)">Enregistrer les modifications</button>
      </div>
      <img v-bind:src="post.image"/>
      <p>{{ post.likes }}</p>
      <div>
        <p>J'aime</p>
        <p>Commenter</p>
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
    this.$store.dispatch('changeSelectedFile', event.target.files[0]);
    let image = document.querySelector('.imageBloc img');
    let imgSrc = URL.createObjectURL(event.target.files[0]);
    image.setAttribute('src', imgSrc);
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
    document.querySelector('.publications').classList.add('blurred');
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
  const url = "http://localhost:3000/api/publications/" + dataId;
  const authorization = "Bearer " + localStorage.getItem('token');
  axios({
  method: 'put',
  headers: {
    'Authorization' : authorization
  },
  url: url,
  })
  .then(
    () => { console.log('ok') }
  )
  .catch(error => console.log(error));
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
    }
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
  width:90%;
  margin:30px auto;
  height:400px;
  background-color: rgba(255, 255, 255, 0.8) ;
  border-top: rgba(128, 128, 128, 0.1) solid 1.5px;
  border-bottom: rgba(128, 128, 128, 0.1) solid 2px;
  box-shadow: 8px 0 3px -4px rgba(128, 128, 128, 0.2), -8px 0 3px -4px rgba(128, 128, 128, 0.2);
      filter: blur(0px);
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

#inputFile {
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
  height:300px;
  width:60%;
}

ul {
  list-style-type: none;
  line-height: 1.5em;
  border: black solid 1px;
  padding:10px;
  width:250px;

  & li {
    cursor: pointer;

    &:hover {
      background-color: #ffd7d7;
    }
  }
}

.publications {

  &.blurred:not(#unblurred) {
    filter: blur(5px);
    /*-webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);*/
    }
}

#unblurred {
  filter: blur(0px);
}

</style>