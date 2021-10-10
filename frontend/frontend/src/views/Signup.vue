<template>
  <div>
    <HeaderContent></HeaderContent>
    <LoginBox text="S'inscrire">
        <label for="firstName">Prénom</label><input id="firstName" placeholder="Prénom" pattern="[a-zA-ZÀ-ÿ- ]+" minlength="2" required aria-required="true"/>
        <label for="lastName">Nom</label><input id="lastName" placeholder="Nom" pattern="[a-zA-ZÀ-ÿ- ]+" minlength="2" required aria-required="true"/>
        <label for="email">Adresse email</label><input id="email" type="email" pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Email" required aria-required="true"/>
        <label for="password">Mot de passe</label><input id="password" type="password" placeholder="Mot de passe" min-length="5" required aria-required="true"/>
        <button @click.prevent="changePersonalInformations" type="submit">S'inscrire</button>
    </LoginBox>
  </div>
</template>

<script>
const axios = require('axios').default;
import HeaderContent from '../components/HeaderContent.vue'
import LoginBox from '../components/LoginBox.vue'

export default {
	name: 'App',
	components: {
		HeaderContent,
    LoginBox
	},
  methods: {
    changePersonalInformations() {
      this.$store.dispatch('changePersonalInformations');
      let body = {
          "first_name": this.$store.state.firstName,
          "last_name": this.$store.state.lastName,
          "email": this.$store.state.email,
          "password": this.$store.state.password
      }
      axios({
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        url: 'http://localhost:3000/api/auth/signup',
        data: JSON.stringify(body)
      })
      .then(function(res) {
      if (res.ok) {
          return res.json();
          }
      window.location.href = "http://localhost:8080/#/homepage"
      })
      .catch(function() {                
          alert("Une erreur est survenue lors de l'envoi des données");                
      })
    }
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

body {
  margin:0;
  padding:0;
  background: url("../assets/icon.png") no-repeat top center fixed; 
  background-size: 800px;
  height:800px;
}
</style>
