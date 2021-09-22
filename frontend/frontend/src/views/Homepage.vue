<template>
  <header>
    <p><img src="../assets/icon-left-font.png" alt="Logo OhMyFood!"></p>
  </header>
  <main>
    <div class="logBox">
      <h1>Bienvenue sur l'espace d'échange Groupomania !</h1>
      <h2>Se connecter</h2>
      <form action="#" method="POST" id="loginForm">
        <label for="email">Adresse email</label><input id="email" type="email" pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Email" required aria-required="true"/>
        <label for="password">Mot de passe</label><input id="password" type="password" placeholder="Mot de passe" min-length="5" required aria-required="true"/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  </main>
</template>

<script>

</script>

<style>


</style>