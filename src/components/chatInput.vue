<script setup>
import { ref } from 'vue';
const message = ref('')
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
    <button @click="sendMessage">发送</button>
</div>
</template>

<style scoped lang="scss">
 ul{
        display: grid;
        grid-template-columns: repeat(8,1fr);
        position: fixed;
        bottom: 200px;
        left: 70%;
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
    // flex-direction: column;
    justify-content: center;
    // gap: 8px;
    // border: 1px solid rgba(192, 192, 192, 0.795);
    height: 75px;
    width: 100%;
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
   
    .emojis{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(192, 192, 192, 0.795);
        border-left: 0;
        padding: 0 5px;
        &:hover{
            cursor: pointer;
        }
    }
    input{
        width: 60%;
        border-radius: 15px 0 0px 15px;

        outline: none;
        border: 1px solid rgba(192, 192, 192, 0.795);
        border-right: 0;
    }
    button{
        width: 5%;
        border-radius: 0 15px 15px 0;
        border: 1px solid rgba(192, 192, 192, 0.795);
    }
}
</style>