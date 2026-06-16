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
<div class="chat-page">
    <div class="chat-header">
        <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
        <h1>💬 聊天室</h1>
        <p class="status" :class="{ online: connectStatus === 1 }">
            服务器连接状态：{{ connectStatus===1?'连接成功 🟢':'连接失败 🔴' }}
        </p>
    </div>

    <div class="name-section">
        <label>聊天昵称</label>
        <input type="text" v-model="chatName" placeholder="请输入聊天名">
        <p class="name-tip">当前昵称：{{ chatName || '暂无，请先设置' }}</p>
    </div>

    <chatList :data="messageList" :name="chatName"/>
    <chatInput :status="connectStatus" @send="sendMessage"/>
</div>
</template>



<style scoped lang="scss">
.chat-page {
    min-height: 100vh;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 16px 140px;
    box-sizing: border-box;
}

.chat-header {
    margin-bottom: 20px;

    .back-link {
        display: inline-block;
        margin-bottom: 12px;
        padding: 8px 16px;
        background: #667eea;
        color: white;
        text-decoration: none;
        border-radius: 20px;
        font-size: 14px;
    }

    h1 {
        font-size: clamp(1.4rem, 4vw, 2rem);
        margin: 0 0 8px;
        color: #333;
    }

    .status {
        margin: 0;
        color: #ef4444;
        font-size: 14px;

        &.online {
            color: #10b981;
        }
    }
}

.name-section {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    label {
        display: block;
        font-size: 14px;
        color: #666;
        margin-bottom: 8px;
    }

    input {
        width: 100%;
        box-sizing: border-box;
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 15px;
        outline: none;

        &:focus {
            border-color: #667eea;
        }
    }

    .name-tip {
        margin: 8px 0 0;
        font-size: 13px;
        color: #999;
    }
}

@media (max-width: 768px) {
    .chat-page {
        padding: 16px 12px 130px;
    }
}
</style>