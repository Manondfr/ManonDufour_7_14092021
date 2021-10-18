<script>

export default {
	name: 'PublicationsContent',
  props: {
    profilePicture:String,
    postId:Number,
    postImage:String,
    postLikes:Number,
    name:String,
    date:String,
    condition:Boolean,
    iteration:String,
    postContent:String,
    commentId:Number
  },
  methods: {
    showMenu() {
      this.$emit('showMenu')
    },   
    addLike() {
      this.$emit('addLike')      
    },
    inputAutofocus() {
      this.$emit('inputAutofocus')
    } 
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
          <p class="publicationsContent__userName">{{ name }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
      <button @click="showMenu" v-bind:aria-controls="'menu'+postId" aria-expanded="false" aria-label="Menu déroulant au clic - Accès à la modification ou suppression de la publication" class="showMenu" v-if="condition"><svg v-bind:data-id="postId" class="updatePub" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"/></svg></button>
      <slot name="updateDeleteMenu"></slot>
    </div>
    <slot name="slotForContent"></slot>
    <slot name="numberOfLikes"></slot>
    <div>
      <div id="commentAndLikesSection">
      <div class="likeSection">
        <button @click="addLike"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M466.27 286.69C475.04 271.84 480 256 480 236.85c0-44.015-37.218-85.58-85.82-85.58H357.7c4.92-12.81 8.85-28.13 8.85-46.54C366.55 31.936 328.86 0 271.28 0c-61.607 0-58.093 94.933-71.76 108.6-22.747 22.747-49.615 66.447-68.76 83.4H32c-17.673 0-32 14.327-32 32v240c0 17.673 14.327 32 32 32h64c14.893 0 27.408-10.174 30.978-23.95 44.509 1.001 75.06 39.94 177.802 39.94 7.22 0 15.22.01 22.22.01 77.117 0 111.986-39.423 112.94-95.33 13.319-18.425 20.299-43.122 17.34-66.99 9.854-18.452 13.664-40.343 8.99-62.99zm-61.75 53.83c12.56 21.13 1.26 49.41-13.94 57.57 7.7 48.78-17.608 65.9-53.12 65.9h-37.82c-71.639 0-118.029-37.82-171.64-37.82V240h10.92c28.36 0 67.98-70.89 94.54-97.46 28.36-28.36 18.91-75.63 37.82-94.54 47.27 0 47.27 32.98 47.27 56.73 0 39.17-28.36 56.72-28.36 94.54h103.99c21.11 0 37.73 18.91 37.82 37.82.09 18.9-12.82 37.81-22.27 37.81 13.489 14.555 16.371 45.236-5.21 65.62zM88 432c0 13.255-10.745 24-24 24s-24-10.745-24-24 10.745-24 24-24 24 10.745 24 24z"/></svg>J'aime</button>
        <button @click="inputAutofocus"><svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z"/></svg>Commenter</button>
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