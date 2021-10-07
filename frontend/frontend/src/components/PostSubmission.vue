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
.submissionBox {
    width:50%;
    min-width:310px;
    margin:20px auto;
    background-color: rgba(255, 255, 255, 0.9);
    
    &__publiDiv {
        display:flex;
        justify-content:space-between;
        
        &Add {
            width:50%;
            margin-bottom: 15px;
        }
    }
}

#submissionBox__textArea {
  width:100%;
}
</style>