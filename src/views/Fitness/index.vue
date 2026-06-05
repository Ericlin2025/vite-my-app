<script setup>
import checkinButton from '@/components/checkinButton.vue';
import checkinHistory from '@/components/checkinHistory.vue';
import heatMap from '@/components/heatMap.vue';
import dayjs  from 'dayjs';
import {ref,watch} from 'vue'
const checkList = ref(JSON.parse(localStorage.getItem('checkList')||'[]'))
const addToList = (n) =>{
    // const now = dayjs().format('YYYY-MM-DD hh:mm:ss')
    const card = {
        time:n,
        user:'admin'
    }
    checkList.value.push(card)
}
watch(checkList,(newlist)=>{
    localStorage.setItem('checkList',JSON.stringify(newlist))
},{immediate:true,deep:true})
</script>


<template>
    <div class="fitness">
        <h1>健身打卡</h1>
        <checkinButton @checked="addToList"/>
        <checkinHistory :data="checkList"/>
        <heatMap :data="checkList"/>
    </div>

</template>