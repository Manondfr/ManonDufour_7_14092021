<script>
const axios = require('axios').default;
axios.defaults.withCredentials = true;
export default {
	name: 'UpdateDeleteMenu',
    props: {
        postId:Number,
        postImage:String,
    },
    methods: {
          
        // AFFICHAGE DU MENU DE MISE A JOUR DE LA PUBLICATION
        showUpdateMenu(dataId) {
            let updateMenu = document.querySelector(`.updateMenu[data-id="${dataId}"]`);
            if(updateMenu.classList.contains("active")) {
                updateMenu.classList.replace("active", "inactive")
            } else {
                updateMenu.classList.replace("inactive", "active")
            }
        },

        // CHANGEMENT DE L'IMAGE DE LA PUBLICATION
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

        // MISE A JOUR DE LA PUBLICATION (EMISSION D'UN EVENEMENT VERS LE COMPOSANT PARENT)
        updatePublication() {
            this.$emit('updatePublication')
        }
    }
}
</script>

<template>
    <div class="updateMenu inactive" v-bind:data-id="postId">
        <div class="updateMenu__headers">
            <h2>Mettre à jour la publication</h2>
            <button aria-label="Fermeture du menu de modification de la publication" class="closeButton" @click="showUpdateMenu(postId)" >X</button>
        </div>
        <slot name="publicationsContent"></slot>        
        <div class="updateMenu__buttons">
            <img v-if="postImage" v-bind:src="postImage" v-bind:data-id="postId" alt="Image liée à la publication">
            <input v-bind:data-id="postId" type="file" class="inputUpdateFile" v-bind:id="'inputUpdateFile' + postId" multiple = false @change="onFileChanged(postId)">
            <label role="button" tabindex="0" v-bind:data-id="postId" v-bind:for="'inputUpdateFile' + postId" class="submissionBox__publiDivAdd">Modifier l'image<svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></label>
            <button @click="updatePublication">Enregistrer les modifications</button>
        </div>
    </div>
</template>

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

// Menu de mise à jour publication
.updateMenu__headers {
  display:flex;
  justify-content: space-between;
  align-items:center;
}

.updateMenu, .updateMenu #commentAndLikesSection {
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

  & label {
      margin-top:20px;
  }
  
  & button {
    height:35px;
    border-radius: 25px;
    background-color: #ffd7d7; 
    border:transparent 1px solid;
    font-weight: 600;
    margin-top:10px;
    padding: 5px 15px;
  }

  & .publicationsContent__userInfo__userName {
      background-color:transparent;
      margin:0;
      padding:0;
      height:auto;
      cursor:auto;
  }

  & .closeButton {
    border-radius:0;
    height:20px;
    font-size:0.7rem;
    padding: 0 5px;
  }

  & .userProfilePicture img {
      margin:0;
  }
}

.updateMenu__buttons {
    display:flex;
    flex-direction:column;
    align-items:center;
}
</style>