<script>

export default {
	name: 'UpdateMenu',
    props: {
        idPost:String,
        contentPost:String,
        imagePost:String
    }
}
</script>

<template>
    <div class="updateMenu inactive" v-bind:data-id="post.id">
        <div class="updateMenu__headers">
            <h4>Mettre à jour la publication</h4>
            <button @click="showUpdateMenu(post.id)">X</button>
        </div>
        <div class="displayFlex">
            <div class="userProfilePicture">
                <img v-bind:src="post.user.profilePicture"/>
            </div>
            <div class="publicationsContent__userInfo__nameDate">
                <h4>{{ post.user.first_name }} {{ post.user.last_name }}</h4>
                <p>{{ formattingDate(post.date_col_formed) }}</p>
            </div>
        </div>
        <textarea rows="4" v-bind:data-id="post.id" v-bind:value="post.content" @input="onContentChange"></textarea>
        <img v-bind:src="post.image" v-bind:data-id="post.id"/>
        <input type="file" id="inputUpdateFile" multiple = false @change="onFileChanged(post.id)">
        <label for="inputUpdateFile" class="submissionBox__publiDivAdd"><p>Modifier l'image <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 576 512"><path d="M480 416v16c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V176c0-26.51 21.49-48 48-48h16v48H54a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6v-10h48zm42-336H150a6 6 0 0 0-6 6v244a6 6 0 0 0 6 6h372a6 6 0 0 0 6-6V86a6 6 0 0 0-6-6zm6-48c26.51 0 48 21.49 48 48v256c0 26.51-21.49 48-48 48H144c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h384zM264 144c0 22.091-17.909 40-40 40s-40-17.909-40-40 17.909-40 40-40 40 17.909 40 40zm-72 96l39.515-39.515c4.686-4.686 12.284-4.686 16.971 0L288 240l103.515-103.515c4.686-4.686 12.284-4.686 16.971 0L480 208v80H192v-48z"/></svg></p></label>
        <img src="#" alt="">
        <button @click="updatePublication(post.id, post.image)">Enregistrer les modifications</button>
    </div>
</template>

<style>

</style>