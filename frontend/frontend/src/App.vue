<template>
  <div class="routerDiv" id="app">
      <router-view/>
        <router-link v-if="$route.path == '/signup' || $route.path == '/login'" to="/signup">S'inscrire</router-link> <span v-if="$route.path == '/signup' || $route.path == '/login'">| </span> 
        <router-link v-if="$route.path == '/signup' || $route.path == '/login'" to="/login">Se connecter</router-link> 
  </div>  
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap");

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

// Balises communes à toutes les pages
#app {
  font-family: "Montserrat", sans-serif;
  color: #2c3e50;
}

.routerDiv {
  text-align:center;
}

a {
  font-weight: 700;
  color: #2c3e50;
  font-size:0.9rem;
  @include desktopstyle() {
    font-size:1rem;
  }

  &.router-link-exact-active {
    color: rgba(253, 45, 1, 0.9);
  }

  &.homepage {
    padding-right:25px;
    position:relative;
    top:-5px;
    text-decoration: none;
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

h1 {
  margin: 20px 10px 15px 10px;
  font-size:1rem;
  text-align: center;
  @include desktopstyle {
    font-size: 1.1rem;
    margin: 20px 40px 20px 40px;
  }
}

h2 {
  font-size:0.8rem;
  font-weight:800;
  text-align: center;
  @include desktopstyle {
    font-size: 0.9rem;
  }
}


// Balises communes à la homepage et au profil
main p {  
  width:100%;
  margin:0;
  text-align: center;
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

.postCommentTextArea {
  width:95%;
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

.menu, .updateMenu, .headerMenu, .updateInfosMenu {
    &.inactive {
    display:none;
  }

  &.active {
    display:initial;
  }
}

.submissionBox__imageBloc img, .updateMenu img {
  max-width:100%;
  @include desktopstyle() {
      max-width:500px;
      margin:10px auto;
  }
}
</style>

<script>

</script>

