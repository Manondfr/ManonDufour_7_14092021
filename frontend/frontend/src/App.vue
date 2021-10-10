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
  }
}
</style>
