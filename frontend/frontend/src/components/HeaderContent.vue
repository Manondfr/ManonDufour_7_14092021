<script>
export default {
	name: 'HeaderContent',
    props: {
        condition:Boolean,
        profilePicture:String,
        name:String,
        userId:String,
    },
    methods: {
        showHeaderMenu() {
            this.$emit('showHeaderMenu')
        },        
    }
}
</script>

<template>
	<header>
        <p><a aria-label="Lien d'accès à la page d'accueil" href="http://localhost:8080/#/homepage"><img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania - Groupe de grande distribution"></a></p>  
        <nav id="mainMenu" v-if="condition">
            <router-link aria-label="Accès page d'accueil" class="homepage" to="/homepage"><svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"/></svg></router-link>
            <div role="button" tabindex="0" aria-controls="headerMenu" aria-expanded="false" aria-label="Menu déroulant au clic - Accès profil ou déconnexion" @click="showHeaderMenu" class="homepage"><p class="profileAccess"><img v-bind:src="profilePicture" alt="Photo de profil utilisateur"/><span>{{ name }}</span></p></div>       

            <!-- Au clic sur la div ci-dessus, apparition du menu de navigation -->
            <div class="headerMenu inactive" id="headerMenu">
                <ul>
                    <li><router-link v-bind:to="'/profile/' + userId">Voir le profil</router-link></li>
                    <li>Se déconnecter</li>
                </ul>
            </div>
        <!-- Fin du menu de navigation -->
        </nav>
        <slot></slot>      
    </header>
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



header {    
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
      //background: radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);
    padding:0;
    margin:0;
    box-shadow: 0 4px 2px -2px darken(rgba(255, 215, 215, 0.15), 80%);
    height:80px;

    & img {
        width:120px;
        @include desktopstyle() {
            height:80px;
            width:200px;
        }

    }

    & img[alt="Logo Groupomania"] {
    clip-path: inset(0 80% 0 0);
    width:180px;
    position:relative;
    top:2px;
    @include desktopstyle() {
        clip-path:none;
    }
}

    & p {
        width:50px;
        margin:0 25px 0px 25px;
    }

    & svg:nth-child(1) {
        margin:0;
        padding:0;
        position:relative;
        left:40px;
        top:7px;
                  border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 5px rgba(128, 128, 128, 0.2);
    background:radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);
    padding:5px;
    border-radius:50%;
    width:25px;
    @include desktopstyle() {
                left:30px;
                width:auto;
    }
    }
}

header svg {
    //display:none;
    @include desktopstyle() {
        //display:initial;
    }
}

header .profileAccess {
    display:flex;
    border: grey solid 1px;
    width:100px;
    border-radius:20px;
    font-size:0.8rem;
    align-items:center;
    padding:3px 5px 3px 3px;
          border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 5px rgba(128, 128, 128, 0.2);
    background:radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);
    font-weight:bold;
    cursor:pointer;
    

    & span {
        padding-left:10px;

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
</style>