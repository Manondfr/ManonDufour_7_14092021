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
}
</style>