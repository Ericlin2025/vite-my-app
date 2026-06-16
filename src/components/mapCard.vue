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
        width: 100%;
        max-width: 100%;
        display: flex;
        flex-direction: column;
        padding: 16px;
        border-radius: $card-border-radius;
        background: rgba(255, 255, 255, 0.95);
        margin-top: 20px;
        box-sizing: border-box;

        h2 {
            font-size: clamp(14px, 3vw, 18px);
            line-height: 1.5;
        }

        img {
            width: 100%;
            height: auto;
            border-radius: 12px;
        }
    }
</style>