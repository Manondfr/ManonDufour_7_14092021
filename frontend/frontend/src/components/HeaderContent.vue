<script>
export default {
	name: 'HeaderContent'
}
</script>

<template>
	<header>
        <p><img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania"></p>  
        <slot></slot>      
    </header>
</template>

<style lang="scss">
header {    
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width:100%;
    padding:0;
    margin:0;
    box-shadow: 0 4px 2px -2px darken(rgba(255, 215, 215, 0.15), 80%);
    height:80px;

    & img {
        height:80px;
        width:200px;
    }

    & p {
        width:50px;
        margin:0 25px 0px 25px;
    }
}
</style>