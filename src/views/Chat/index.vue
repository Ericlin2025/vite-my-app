<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
import chatInput from '@/components/chatInput.vue'
import chatList from '@/components/chatList.vue'
import dayjs from 'dayjs'
//创建连接对象
let ws = null



//连接状态
const connectStatus = ref(0)

//存储对话记录
const messageList = ref([])

const chatName = ref('')


const sendMessage =(ms)=>{
    const data ={
            userName:chatName.value,
            content:ms,
            sendTime:dayjs().format('YYYY-MM-DD hh:mm:ss')
    }
    ws.send(JSON.stringify(data))
} 
onMounted(()=>{
    const wsUrl = import.meta.env.VITE_WS_URL
    console.log('正在连接',wsUrl)
    ws =new WebSocket(wsUrl)

    ws.onopen= () =>{
        console.log('连接成功')
        connectStatus.value= 1
    }

    ws.onmessage = (ms) =>{
        console.log('收到的消息为：',JSON.parse(ms.data))
        messageList.value.push(JSON.parse(ms.data))
        console.log(messageList.value)
    }

    ws.onerror = (er) =>{
        console.log('连接错误',er)
        connectStatus.value= 0
    }

    ws.onclose = () =>{
        console.log('连接关闭')
    }
})
onUnmounted(()=>{
    ws.close()
})
</script>



<template>
<h1>聊天室</h1>
<p>服务器连接状态：{{ connectStatus===1?'连接成功🟢':'连接失败🔴' }}</p>
<span>请创建您的聊天名字：</span>
<input type="text" v-model="chatName" placeholder="请输入聊天名">

<p>您的聊天名为：{{ chatName||'暂无聊天名，请创建您的聊天名' }}</p>
<chatList :data="messageList" :name="chatName"/>
<chatInput :status="connectStatus" @send="sendMessage"/>
</template>



<style scoped lang="scss">


</style>