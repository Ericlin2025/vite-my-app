<script setup>
import {ref,watch} from 'vue'
import dayjs from 'dayjs'
const emits = defineEmits(['checked'])

const ctime = ref(JSON.parse(localStorage.getItem('ctime')||'[]'))
const checkStatus = ()=>{
    const now = dayjs().format('YYYY-MM-DD')
    const found = ctime.value.find(i=>i===now)
    if(found){
        return '今日已打卡'
    }else{
        return '今日未打卡，请打卡'
    }
}
const checked = () =>{
    console.log('点击了打卡')
    console.log(ctime.value)
    const now = dayjs().format('YYYY-MM-DD')
    const found = ctime.value.find(i=>i===now)
    if(found){
        alert('今天已经打过卡了')
    }else{
        
        alert('打卡成功')
        ctime.value.push(now)
        emits('checked',now)
        checkStatus.value='已打卡'
    }
    
}
watch(ctime,(newlist)=>{
    localStorage.setItem('ctime',JSON.stringify(newlist))
},{immediate:true,deep:true})
</script>

<template>

    <div class="check">
        <button @click="checked" >{{ checkStatus() }}</button>
    </div>
</template>