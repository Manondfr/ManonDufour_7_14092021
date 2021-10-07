<script>
export default {
	name: 'LoginBox',
  props: {
    text:String,
  }
}
</script>

<template>
  <main>
    <div class="logBox">
      <h1>Bienvenue sur l'espace d'échange <span>Groupomania</span> !</h1>
      <h2>{{ text }}</h2>
      <form action="#" method="POST">
        <slot></slot>
      </form>
    </div>
  </main>
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

  & span {
    color: rgb(253, 45, 1);
  }
}

</style>