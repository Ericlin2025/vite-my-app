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
    width: 80%;
    margin: 20px auto;
    ul{
        display: flex;
        flex-direction: column;
        width: 100%;
        // height: 700px;
        // border: 1px solid rgba(190, 190, 190, 0.788);
        overflow: auto;
        border-radius: 8px;
        li{
            
            display: flex;
            flex-direction: column;
            max-width: 70%;
            margin: 10px;
            padding: 5px;
            border-radius: 5px;
            

            
            .time{
                color: rgb(134, 134, 134);
                font-size: 13px;
            }
        }
    }
}
</style>