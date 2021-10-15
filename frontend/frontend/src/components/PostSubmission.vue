<script>
export default {
	name: 'PostSubmission',
    props: {
        userName: String,
    },
    methods: {
    selectFile() {
        this.$emit('selectFile')
    },
    changeContent() {
        this.$emit('changeContent')
    },
    postContent() {
        this.$emit('postContent')
    }
}
}
</script>

<template>
    <div class="submissionBox">
        <h2>Bonjour {{ userName }} ! Que souhaitez-vous partager aujourd'hui ?</h2>
        <form aria-label="Formulaire de création de publication" action="#" method="POST">
            <label class="sr-only" for="submissionBox__textArea">Zone d'ajout du contenu de la publication</label>
            <textarea id="submissionBox__textArea" rows="4" @input="changeContent" @keyup.enter="postContent"></textarea>
        </form>
        <hr>
        <div class="submissionBox__imageBloc">
        </div>
        <div class="submissionBox__publiDiv">
            <input type="file" id="inputFile" multiple=false @change="selectFile">
            <label role="button" tabindex="0" for="inputFile" class="submissionBox__publiDivAdd"><p>Ajouter une image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
            <button @click="postContent" class="submissionBox__publiDivAdd">Publier <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 512 512"><path d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"/></svg></button>
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

label {
  cursor:pointer;
}

button {
  background-color: transparent;
  border:none;
  cursor:pointer;
  font-family:"Montserrat", sans-serif;
  font-size:0.9rem;
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
                fill: rgba(253, 45, 1, 1);
                position:relative;
                left: 10px;
                top: 4px;
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
  margin:auto;
  @include desktopstyle() {
      font-size:0.9rem;
  }
}

hr {
  margin-top: 20px;
}


#inputFile, .inputUpdateFile, #inputUpdateProfilePicture {
  display:none;
}
</style>