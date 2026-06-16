<script setup>
const props = defineProps({
    data:{
        type:Array,
        required:true
    },
    name:{
        type:String,
        required:true
    }
})
</script>


<template>
<div class="list">
    <p>聊天空间</p>
    <ul>
        <li v-for="m in data" :class="{my:name===m.userName,other:name!==m.userName}">
           <p>{{ m.userName }}: {{ m.content}}</p>
           <span class="time">{{ m.sendTime }}</span>
        </li>
    </ul>
</div>

</template>

<style scoped lang="scss">
.my{
    background-color: rgba(86, 241, 86, 0.733);
    text-align: end;
    align-self: flex-end;
    
}
.other{
    align-self: flex-start;
    background-color: #d6d6d6bd;
}    
.list {
    width: 100%;
    margin: 0 auto 16px;
    min-height: 200px;
    max-height: calc(100vh - 320px);
    overflow-y: auto;
    ul{
        display: flex;
        flex-direction: column;
        width: 100%;
        overflow: auto;
        border-radius: 8px;
        padding-bottom: 8px;
        li{
            display: flex;
            flex-direction: column;
            max-width: 85%;
            margin: 10px;
            padding: 8px 12px;
            border-radius: 8px;
            word-break: break-word;
            
            .time{
                color: rgb(134, 134, 134);
                font-size: 12px;
            }
        }
    }
}

@media (max-width: 768px) {
    .list {
        max-height: calc(100vh - 280px);

        ul li {
            max-width: 90%;
            margin: 8px 4px;
        }
    }
}
</style>