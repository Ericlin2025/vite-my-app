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
    min-height: 100vh;
    overflow-x: hidden;
    background-image: url('https://bing.img.run/1920x1080.php');
    background-repeat: no-repeat;
    background-size: cover;
    padding: 0 12px 20px;
    box-sizing: border-box;
}

</style>