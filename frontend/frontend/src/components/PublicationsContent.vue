<script>

export default {
	name: 'PublicationsContent',
}
</script>

<template>
<div>
  <div class="tryflex2">
    <div class="tryFlex">
      <div id="userProfilePicture">
        <slot name="profilePicture"></slot>
      </div>
      <div class="trydate">
        <slot name="nameDate"></slot>
      </div>
    </div>
    <slot name="svgParagraph"></slot>
  </div>
  <slot name="contentImage"></slot>
  <slot name="try"></slot>
</div>
</template>

<style>

</style>