<script>
export default {
	name: 'HeaderContent'
}
</script>

<template>
	<header>
        <p><a href="http://localhost:8080/#/homepage"><img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania - Groupe de grande distribution"></a></p>  
        <slot></slot>      
    </header>
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



header {    
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
      //background: radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);
    padding:0;
    margin:0;
    box-shadow: 0 4px 2px -2px darken(rgba(255, 215, 215, 0.15), 80%);
    height:80px;

    & img {
        width:120px;
        @include desktopstyle() {
            height:80px;
            width:200px;
        }

    }

    & img[alt="Logo Groupomania"] {
    clip-path: inset(0 80% 0 0);
    width:180px;
    position:relative;
    top:2px;
    @include desktopstyle() {
        clip-path:none;
    }
}

    & p {
        width:50px;
        margin:0 25px 0px 25px;
    }

    & svg:nth-child(1) {
        margin:0;
        padding:0;
        position:relative;
        left:40px;
        top:7px;
                  border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 5px rgba(128, 128, 128, 0.2);
    background:radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);
    padding:5px;
    border-radius:50%;
    width:25px;
    @include desktopstyle() {
                left:30px;
                width:auto;
    }
    }
}

header svg {
    //display:none;
    @include desktopstyle() {
        //display:initial;
    }
}

header .profileAccess {
    display:flex;
    border: grey solid 1px;
    width:100px;
    border-radius:20px;
    font-size:0.8rem;
    align-items:center;
    padding:3px 5px 3px 3px;
          border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 5px rgba(128, 128, 128, 0.2);
    background:radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);
    font-weight:bold;
    cursor:pointer;
    

    & span {
        padding-left:10px;

    }
}
</style>