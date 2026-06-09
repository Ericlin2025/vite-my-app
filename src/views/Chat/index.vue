<script setup>
import {ref,onMounted} from 'vue'
let ws = null
const connectStatus = ref('未连接')
onMounted(()=>{
    const wsUrl = import.meta.env.VITE_WS_URL
    console.log('正在连接',wsUrl)
    ws =new WebSocket(wsUrl)

    ws.onopen= () =>{
        console.log('连接成功')
        connectStatus.value= '已连接'
    }

    ws.onmessage = (ms) =>{
        console.log('收到的消息为：',ms.data)
    }

    ws.onerror = (er) =>{
        console.log('连接错误',er)
        connectStatus.value='连接失败'
    }

    ws.onclose = () =>{
        console.log('连接关闭')
    }
})
</script>



<template>
<h1>聊天室</h1>
<p>服务器连接状态：{{ connectStatus }}</p>
</template>



<style scoped lang="scss">


</style>