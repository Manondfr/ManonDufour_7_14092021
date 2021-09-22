<template>
  <div id="app">
      <router-view/>
       <router-link to="/signup">S'inscrire</router-link> |
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/homepage">Page d'accueil</router-link>
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

body {
  margin:0;
  padding:0;
  background: url("./assets/icon.png") no-repeat top center; 
  background-size: 800px;
  height:800px;
}

header {
  width:100%;
  padding:0;
  margin:0;
  box-shadow: 0px 1px 5px -2px lighten(rgba(253, 45, 1, 0.05), 10%);
}

header img {
  height:80px;
}

h1 {
  margin: 20px 10px 15px 10px;
  font-size:1rem;
  @include desktopstyle {
    font-size: 1.1rem;
    margin: 20px 40px 20px 40px;
  }
}

h2 {
  font-size:0.8rem;
  font-weight:800;
  @include desktopstyle {
    font-size: 1rem;
  }
}

.logBox {
  width:80%;
  max-width:500px;
  padding:0 10px 10px 10px;
  margin: 110px auto 30px auto;
  border-radius:15px;
  background-color: rgba(255, 255, 255, 0.8) ;
  border-top: rgba(128, 128, 128, 0.1) solid 1.5px;
  border-bottom: rgba(128, 128, 128, 0.1) solid 2px;
  box-shadow: 8px 0 3px -4px rgba(128, 128, 128, 0.2), -8px 0 3px -4px rgba(128, 128, 128, 0.2);
  @include desktopstyle {
    width:500px;
    height:340px;
  }
}

form {
  display:flex;
  flex-direction: column;

  & label {
    font-size: 0.8rem;
    display:none;
  }

  & input {
    width:200px;
    margin:8px auto;
  }

  & button {
    width:110px;
    height:35px;
    border-radius: 25px;
    margin:25px auto 10px auto;
    background-color: #ffd7d7; 
    border:transparent 1px solid;
    font-weight: 600;
  }

  & ::-webkit-input-placeholder { text-align:center; }
  ::-moz-placeholder { text-align:center; } /* firefox 19+ */
  :-ms-input-placeholder { text-align:center; } /* ie */
  input:-moz-placeholder { text-align:center; }
}

#app {
  font-family: "Montserrat", sans-serif;
  text-align: center;
  color: #2c3e50;
}


a {
  font-weight: 700;
  color: #2c3e50;

  &.router-link-exact-active {
    color: rgba(253, 45, 1, 0.9);
  }
}

span {
  color: rgb(253, 45, 1);
}
</style>
