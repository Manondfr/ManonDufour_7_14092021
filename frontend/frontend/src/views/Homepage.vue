<template>
  <header>
    <p><img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania"></p>
    <p></p>
  </header>
  <main>
  <div class="publiBox">
    <h2>Bonjour Manon ! Que souhaitez-vous partager aujourd'hui ?</h2>
    <form action="#" method="POST" id="publiForm">
        <textarea rows="4"></textarea>
    </form>
    <hr>
    <div class="submissionBloc">
    <p class="submissionBloc__p">Ajouter une image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p>
    <p class="submissionBloc__p">Publier <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/></svg></p>
    </div>
  </div>
  <div class="publications">
  <h1>Publications à la une</h1>
    <div class="pubBox">
    <p>hello</p>
    </div>
  </div>
  </main>
</template>

<script>

</script>

<style scoped>
.publiBox, .publications {
    width:50%;
    min-width:310px;
    margin:20px auto;
    background-color: rgba(255, 255, 255, 0.9);
    
}

.publications {
  height:1000px;
  width: 60%;
  padding:15px;
  background-color: rgba(255, 255, 255, 0.8) ;
  border-top: rgba(128, 128, 128, 0.1) solid 1px;
  border-bottom: rgba(128, 128, 128, 0.1) solid 1px;
  box-shadow: 4px 0 3px -4px rgba(128, 128, 128, 0.2), -4px 0 3px -4px rgba(128, 128, 128, 0.2);
}

.pubBox {
  background-color:white;
  width:90%;
  margin:auto;
  height:400px;
}

hr {
  margin-top: 20px;
}

.submissionBloc {
  display:flex;
  justify-content:space-between;
}

.submissionBloc__p {
    width:50%;
    margin-bottom: 15px;
}

svg {
  fill: rgba(253, 45, 1, 0.6);
  position:relative;
  left: 10px;
  top: 4px;
}




</style>