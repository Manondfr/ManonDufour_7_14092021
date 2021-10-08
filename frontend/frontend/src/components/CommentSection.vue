<script>
export default {
	name: 'CommentSection',
    props : {
        idPost:String,
        likesPost:String
    },
}
</script>

<template>
<div>
    <div class="likeSection">
        <slot name="addLike"></slot>
    </div>
    <div>
        <slot name="commentArea"></slot>
    </div>
    <form action="#" method="POST">
        <slot name="textArea"></slot>
    </form>   
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

.likeSection {
  padding:5px 0;
  margin: 5px auto;
  display:flex;
  border-top: rgba(128, 128, 128, 0.8) solid 0.5px;
  border-bottom: rgba(128, 128, 128, 0.8) solid 0.5px;

    p {
        cursor:pointer;
        font-size:0.8rem;
        @include desktopstyle() {
            font-size:1rem;
        }

    svg {
      fill:black;
      position:relative;
      left:-10px;
      top:3px;
      width:15px;
      @include desktopstyle {
            width:auto;
      }
    }

  }
}

.commentSection {
  display:flex;
  justify-content: flex-start;
  margin:10px 10px;
  @include desktopstyle() {
    margin:10px 30px;    
  }
  
  & .commentContentSection {
    background-color:#f1f2f6;
      padding:0 15px 5px 15px;
      text-align:left;
      border-radius:5px;

    & h4 {
        margin-bottom:3px;
        margin-top:5px;
        font-size:0.7rem;
        @include desktopstyle() {
          font-size:0.9rem;
        }
    }

    & p {
        font-size: 0.7rem;
        text-align:left;
          @include desktopstyle() {
            font-size:0.8rem;
          }
    }

    & svg {

        height:10px;
        fill: rgba(0,0,0,0.3);
        cursor: pointer;
        position:relative;
        top:5px;
        padding-left:3px;
        @include desktopstyle() {
            width:auto;
            height:auto;
            padding-left:8px;
        }

        &:hover {
        fill:black;
        }
    }

    & textarea {
        width:95%;
        border-radius:5px;
        border:none;
        font-size:0.7rem;
        font-family:"Montserrat", sans-serif;
        padding:5px 0 0 5px;  
        @include desktopstyle() {
        margin:10px 30px;
        padding:3px;
        font-size: 0.8rem;
    }        
    }
  }
}

.commentContentSection__headers {
    display:flex;
    justify-content:space-between;

    & .commentContentSection__headers__icons {
        display:flex;
        padding-left:20px;
    }
}
</style>