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
    <div class="menu inactive" v-bind:data-id="postId">
        <ul>
            <li v-bind:data-id="postId" @click="updateMenu">Modifier la publication</li>
            <li v-bind:data-id="postId" @click="deletePublication">Supprimer la publication</li>
        </ul>
    </div>
</template>

<style>

</style>