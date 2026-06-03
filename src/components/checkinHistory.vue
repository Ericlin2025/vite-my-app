<script setup>

const props = defineProps({
    data:{
        type:Array,
        required:true
    }
})
</script>


<template>
<div class="list">
    <p>打卡记录：</p>
    <ul>
        <li v-for="i in data">
            <p>打卡者：{{ i.user }}</p>
            <p>打卡时间：{{ i.time }}</p>
        </li>
    </ul>
</div>
</template>