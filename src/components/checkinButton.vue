<script setup>
import {ref,watch,onUnmounted} from 'vue'
import dayjs from 'dayjs'
const emits = defineEmits(['checked'])

const ctime = ref(JSON.parse(localStorage.getItem('ctime')||'[]'))
// const now = ref(dayjs().format('YYYY-MM-DD'))
//判断今天是否打过卡
const status = ref('今日未打卡，请打卡')
const checkStatus = ()=>{
    const now = dayjs().format('YYYY-MM-DD')
    const found = ctime.value.find(i=>i===now)
    if(found){
        status.value= '今日已打卡'
    }else{
        status.value= '今日未打卡，请打卡'
    }
}
checkStatus()
let  timer
timer = setInterval(()=>{
    checkStatus()
},60000)
//点击打卡，并记录
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
        
    }
    checkStatus()
    
}
watch(ctime,(newlist)=>{
    localStorage.setItem('ctime',JSON.stringify(newlist))
},{immediate:true,deep:true})

onUnmounted(()=>{
    if(itmer){
        clearInterval(timer)
        timer=null
    }
})
</script>

<template>

    <div class="check">
        <button @click="checked" >{{status}}</button>
    </div>
</template>