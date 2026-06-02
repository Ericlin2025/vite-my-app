<script setup>
const props = defineProps({
    map:String
    
})
</script>


<template>
    <div class="map">
        <h2>对应天气城市地图,调用的是高德地图的接口，只能显示国内地图</h2>
        <img :src="map" alt="">
    </div>
</template>


<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-border-radius: 24px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    .map{
        width: 1500px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        border-radius: $card-border-radius;
        background: rgba(255, 255, 255, 0.95);
        margin-top: 20px;
    }
</style>