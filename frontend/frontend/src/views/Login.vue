<template>
  <div>
  <HeaderContent></HeaderContent>
    <LoginBox text="Se connecter">
      <form aria-label="Formulaire de création de compte" action="#" method="POST">
        <label for="email">Adresse email</label><input id="email" type="email" pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Email" required aria-required="true"/>
        <label for="password">Mot de passe</label><input id="password" type="password" placeholder="Mot de passe" min-length="5" required aria-required="true"/>
        <button @click.prevent="login" type="submit">Se connecter</button>
      </form>
    </LoginBox>
  </div>
</template>

<script>
const axios = require('axios').default;
import HeaderContent from '../components/HeaderContent.vue'
import LoginBox from '../components/LoginBox.vue'
//var Vue = require('vue')
//Vue.use(require('vue-cookies'))
axios.defaults.withCredentials = true
axios.defaults.withCredentials = true

export default {
	name: 'App',
	components: {
		HeaderContent,
    LoginBox
	},
  methods: {
  login() {
    this.$store.dispatch('loginPersonalInformations');
    let body = {
        "email": this.$store.state.email,
        "password": this.$store.state.password
    }
    axios({
      method: 'post',
      withCredentials:true,
      headers: {
      'Content-Type': 'application/json'
      },
      url: 'http://localhost:3000/api/auth/login',
      data: JSON.stringify(body)
    })
    .then(function(res) {
    localStorage.setItem('userId', res.data.userId);
    localStorage.setItem('xsrfToken', JSON.stringify(res.data.xsrfToken));
    window.location.href = "http://localhost:8080/#/homepage";
    })
    .catch(function() {                
        alert("La connexion a échoué")});                
  }},
  beforeMount() {
    axios({
      method: 'get',
      withCredentials:true,
      url: 'http://localhost:3000/api/auth/',
    })
    .then(response => {
      if(response.data == 'http://localhost:8080/#/homepage') {
        window.location.href = response.data
      } 
    })              
  .catch(error => console.log(error)); 
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



button {
    font-family:"Montserrat", sans-serif;
    font-size:0.8rem;
    font-weight:bold;
    @include desktopstyle() {
      font-size:0.8rem;
    }
}
</style>
