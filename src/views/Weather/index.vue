<script setup>
import Hearder from '@/components/header.vue'
</script>

<template>
<div class="body">
    <Hearder/>
    <RouterView/>
</div>


</template>
<style scoped lang="scss">
.body{
    background-image: url('https://bing.img.run/1920x1080.php');
    background-repeat: no-repeat;
    background-size: cover;
}

</style>