<script setup>
import { ref } from 'vue';
const message = ref('')
const props = defineProps({
    status:{
        type:Number,
        required:true
    }
})
const emits = defineEmits(['send'])
// 表情列表
const emojis = ref([
  '😀', '😁', '😂', '🤣', '😊', '😍', '🥰', '😎',
  '👍', '❤️', '🎉', '🔥', '✅', '❌', '💬', '📢','👌'
])
const emojisShow = ref(false)
const sendMessage = () =>{
    emits('send',message.value)
    message.value= ''
}
</script>


<template>
     <ul v-show="emojisShow">
        <li v-for="e in emojis"
        @click="message+=e,emojisShow=!emojisShow"
        >
            
            {{ e }}
        </li>
    </ul>
<div class="input">
   
    <input type="text"
        placeholder="输入消息，回车发送"
        @keyup.enter='sendMessage'
        v-model="message">
        <span class="emojis" 
        @click="emojisShow=!emojisShow"
        >😊添加表情</span>
    <button @click="sendMessage" :disabled="status===0">发送</button>
</div>
</template>

<style scoped lang="scss">
 ul{
        display: grid;
        grid-template-columns: repeat(8,1fr);
        position: fixed;
        bottom: 130px;
        left: 50%;
        transform: translateX(-50%);
        width: min(320px, 90vw);
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10;
        li{
            padding:3px;
            border: 1px solid rgba(192, 192, 192, 0.795);
            &:hover{
            cursor: pointer;
            background-color: rgba(192, 192, 192, 0.795);
        }
        }
    }
.input{
    display: flex;
    align-items: center;
    height: auto;
    min-height: 56px;
    width: min(800px, calc(100% - 24px));
    position: fixed;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    border-radius: 15px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    z-index: 9;
   
    .emojis{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(192, 192, 192, 0.795);
        border-left: 0;
        padding: 0 8px;
        font-size: 12px;
        white-space: nowrap;
        flex-shrink: 0;
        &:hover{
            cursor: pointer;
        }
    }
    input{
        flex: 1;
        min-width: 0;
        border-radius: 15px 0 0px 15px;
        outline: none;
        border: 1px solid rgba(192, 192, 192, 0.795);
        border-right: 0;
        padding: 12px;
        box-sizing: border-box;
    }
    button{
        flex-shrink: 0;
        min-width: 60px;
        padding: 12px 16px;
        border-radius: 0 15px 15px 0;
        border: 1px solid rgba(192, 192, 192, 0.795);
        background: #667eea;
        color: white;
        cursor: pointer;

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
}

@media (max-width: 768px) {
    .input {
        width: calc(100% - 16px);
        bottom: 12px;

        .emojis {
            font-size: 11px;
            padding: 0 4px;
        }

        button {
            min-width: 52px;
            padding: 12px 10px;
        }
    }

    ul {
        bottom: 80px;
        grid-template-columns: repeat(6, 1fr);
    }
}
</style>