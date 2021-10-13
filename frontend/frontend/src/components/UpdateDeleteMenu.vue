<script>
export default {
	name: 'UpdateDeleteMenu',
    props: {
        postId:Number,
    },
    methods: {
        updateMenu() {
            this.$emit('showUpdateMenu')
        },
        deletePublication() {
            this.$emit('deletePublication')
        }
    }
}
</script>

<template>
    <div class="menu inactive" v-bind:id="'menu'+postId" v-bind:data-id="postId">
        <ul>
            <li v-bind:data-id="postId" @click="updateMenu"><button>Modifier la publication</button></li>
            <li tabindex="0" v-bind:data-id="postId" @click="deletePublication"><button>Supprimer la publication</button></li>
        </ul>
    </div>
</template>

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

ul {
  background-color:white;
  list-style-type: none;
  border: black solid 0.5px;
  padding:5px 10px;
  font-size:0.8rem;
  line-height: 1.5rem;
  @include desktopstyle() {
    padding:10px;
  }

  & li {
    cursor: pointer;

    &:hover {
      background-color: #ffd7d7;
    }
  }
}

.menu {
  position:absolute;
  z-index:3;
  background-color:transparent;
  right:0px;
  top:35px;
  padding:0;
  width:100%;
  @include desktopstyle() {
      width:auto;
      right:22px;
      top:45px;
  }
}

</style>