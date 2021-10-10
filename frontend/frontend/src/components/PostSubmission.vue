<script>
export default {
	name: 'PostSubmission',
    props: {
        userName: String,
    }
}
</script>

<template>
    <div class="submissionBox">
        <h2>Bonjour {{ userName }} ! Que souhaitez-vous partager aujourd'hui ?</h2>
        <form action="#" method="POST">
            <slot name="submissionBox__textArea"></slot>
        </form>
        <hr>
        <div class="submissionBox__imageBloc">
            <img src="" alt="">
        </div>
        <div class="submissionBox__publiDiv">
            <slot name="submissionBox__publiDivAdd"></slot>
        </div>
    </div>
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

.submissionBox {
    padding:20px 0;
    width:50%;
    min-width:310px;
    margin: auto;
      border: rgba(128, 128, 128, 0.1) solid 0.5px;
  box-shadow: 1px 2px 10px rgba(128, 128, 128, 0.2);
    background:radial-gradient(circle, rgba(254,251,251,0.8) 0%, rgba(254,251,251,0.4) 100%);

    
    &__publiDiv {
        display:flex;
        justify-content:space-evenly;
        
        &Add {
            text-align:center;
            font-size:0.9rem;
            width:40%;
            margin-bottom: 15px;
            @include desktopstyle {
                font-size:1rem;
            }

            & svg {
                width:15px;
                @include desktopstyle {
                    width:auto;
                }
            }            
        }
    }
}

#submissionBox__textArea {
  width:90%;
  font-size:0.7rem;
  font-family: "Montserrat", sans-serif;  
  @include desktopstyle() {
      font-size:0.9rem;
  }
}

hr {
  margin-top: 20px;
}
</style>