<script>
const axios = require('axios').default;
axios.defaults.withCredentials = true;
export default {
	name: 'UpdateDeleteMenu',
    props: {
        postId:Number,
    },
    methods: {
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

        // SUPPRESSION DE LA PUBLICATION
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
    }
}
</script>

<template>
    <div class="menu inactive" v-bind:id="'menu'+postId" v-bind:data-id="postId">
        <ul>
            <li v-bind:data-id="postId" @click="showUpdateMenu(postId)"><button>Modifier la publication</button></li>
            <slot name="updateMenu"></slot>
            <li tabindex="0" v-bind:data-id="postId" @click="deletePublication(postId)"><button>Supprimer la publication</button></li>
        </ul>
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

ul {
  background-color:white;
  list-style-type: none;
  border: black solid 0.5px;
  padding:5px 10px;
  font-size:0.8rem;
  line-height: 1.5rem;
  @include desktopstyle() {
    padding:10px;
  }

  & li {
    cursor: pointer;

    &:hover {
      background-color: #ffd7d7;
    }
  }

  & button {
      font-weight:normal;
  }
}

.menu {
  position:absolute;
  z-index:3;
  background-color:transparent;
  right:0px;
  top:35px;
  padding:0;
  width:100%;
  @include desktopstyle() {
      width:auto;
      right:22px;
      top:45px;
  }
}

</style>