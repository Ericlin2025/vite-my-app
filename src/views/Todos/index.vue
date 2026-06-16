<script setup>
import addTodos from '@/components/addTodos.vue';
import todosList from '@/components/todos-list.vue';
import {ref,watch} from 'vue'
import dayjs from 'dayjs';
const list = ref(JSON.parse(localStorage.getItem('todolist')||'[]'))
const add = (t,p,d) =>{
    console.log('父组件收到来自子组件的请求')
    // const createTime = dayjs().format('YYYY-MM-DD hh:mm:ss')
    // const deadTime = dayjs(d).format('YYYY-MM-DD hh:mm:ss')
    const createTime = dayjs().valueOf()
    const deadTime = dayjs(d).valueOf()
    const newtodo ={
        tname:t,
        completed:false,
        priority:p,
        ctime:createTime,
        dtime:deadTime
    }
    list.value.push(newtodo)
    console.log(list.value)
}
watch(list,(newl)=>{
    localStorage.setItem('todolist',JSON.stringify(newl))
},{immediate:true,deep:true})
</script>

<!-- 
<template>
    <RouterLink to="/">←返回功能中心</RouterLink>
<div class="todos">
    
    <addTodos @addtodo="add"/>


    <div v-if="list.length!==0">
        <todosList :data="list"/>
    </div>
    <div v-else>
        待办清单为空，请添加待办
    </div>
</div>

</template>

<style scoped lang="scss">
.todos{
    display: flex;
}
</style> -->
<template>
    
    <!-- <RouterLink to="/" class="back-link">← 返回功能中心</RouterLink> -->
    <div class="todos">
        <addTodos @addtodo="add"/>

        <div v-if="list.length !== 0" class="list-container">
            <todosList :data="list"/>
        </div>
        
        <div v-else class="empty-state">
            <div class="empty-icon">📭</div>
            <p>待办清单为空，请添加待办</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.todos{
    // width: 100%;
    // display: flex;
    background-image: url(../../assets/img/bg/主页背景.jpg);
    background-size: cover;
}
.back-link {
    display: inline-block;
    margin: 20px 0 0 20px;
    padding: 8px 16px;
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
    border-radius: 20px;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(102, 126, 234, 0.1);
        transform: translateX(-3px);
    }
}

.todos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    
    .list-container {
        flex: 1;
        min-width: 280px;
        max-width: 900px;
        margin-top: 0;
    }
    
    .empty-state {
        text-align: center;
        width: 100%;
        max-width: 400px;
        min-height: 300px;
        height: auto;
        padding: 60px 20px;
        background: white;
        border-radius: 24px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        margin-top: 0;
        box-sizing: border-box;
        
        .empty-icon {
            font-size: 64px;
            margin-bottom: 16px;
            opacity: 0.5;
        }
        
        p {
            color: #999;
            font-size: 16px;
            margin: 0;
        }
    }
}

// 响应式
@media (max-width: 768px) {
    .back-link {
        margin: 16px 0 0 16px;
    }
    
    .todos {
        flex-direction: column;
        align-items: stretch;
        padding: 16px;
        gap: 16px;

        .list-container {
            max-width: 100%;
            min-width: 0;
        }
    }
}
</style>