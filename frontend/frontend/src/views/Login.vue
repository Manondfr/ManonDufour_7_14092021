<template>
  <div>
  <HeaderContent></HeaderContent>
  <MainContent>
      <h2>Se connecter</h2>
      <form action="#" method="POST" id="loginForm">
        <label for="email">Adresse email</label><input id="email" type="email" pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Email" required aria-required="true"/>
        <label for="password">Mot de passe</label><input id="password" type="password" placeholder="Mot de passe" min-length="5" required aria-required="true"/>
        <button @click.prevent="loginPersonalInformations" type="submit">Se connecter</button>
      </form>
    </MainContent>
  </div>
</template>

<script>
const axios = require('axios').default;
import HeaderContent from '../components/HeaderContent.vue'
import MainContent from '../components/MainContent.vue'

export default {
	name: 'App',
	components: {
		HeaderContent,
    MainContent
	},
    methods: {
    loginPersonalInformations() {
      this.$store.dispatch('loginPersonalInformations');
      let body = {
          "email": this.$store.state.email,
          "password": this.$store.state.password
      }
      axios({
        method: 'post',
        headers: {
        'Content-Type': 'application/json'
        },
        url: 'http://localhost:3000/api/auth/login',
        data: JSON.stringify(body)
      })
      .then(function(res) {
      if (res.ok) {
          return res.json();
          }  
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('admin', res.data.admin);
      localStorage.setItem('token', res.data.token);
      window.location.href = "http://localhost:8080/#/homepage";
      })
      .catch(function() {                
          alert("Une erreur est survenue lors de l'envoi des données");                
      });
    },
  } 
}
</script>

<style>


</style>
