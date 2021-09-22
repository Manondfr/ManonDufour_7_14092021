<template>
  <header>
    <p><img src="../assets/icon-left-font.png" alt="Logo OhMyFood!"></p>
  </header>
  <main>
    <div class="logBox">
      <h1>Bienvenue sur l'espace d'échange <span>Groupomania</span> !</h1>
      <h2>S'inscrire</h2>
      <form action="#" method="POST" id="signupForm">
        <label for="firstName">Prénom</label><input id="firstName" placeholder="Prénom" pattern="[a-zA-ZÀ-ÿ- ]+" minlength="2" required aria-required="true"/>
        <label for="lastName">Nom</label><input id="lastName" placeholder="Nom" pattern="[a-zA-ZÀ-ÿ- ]+" minlength="2" required aria-required="true"/>
        <label for="email">Adresse email</label><input id="email" type="email" pattern="[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" placeholder="Email" required aria-required="true"/>
        <label for="password">Mot de passe</label><input id="password" type="password" placeholder="Mot de passe" min-length="5" required aria-required="true"/>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </main>
</template>

<script>

</script>
