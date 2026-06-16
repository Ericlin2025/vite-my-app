<!-- <script setup>
import {ref} from 'vue'
const controllerType = ref('select')
const todo = ref('')
const priority = ref('')
const prioritylist = ref(['低','中','高'])
const dead = ref()
const emits = defineEmits(['addtodo'])
const add = () =>{
    emits('addtodo',todo.value,priority.value,dead.value)
    console.log('子组件发送了添加事项的请求，事项名为：',todo.value)
    todo.value='',
    priority.value=''
    dead.value=''
}
</script>


<template>
    <div class="input">
        <h1>待办事项清单</h1>
        <p>请输入要添加的待办事项：</p>
        <input type="text" placeholder="请输入事项" v-model="todo">

        <p>设置待办优先级:{{ priority }}</p>
        <div class="priority">
            <ul>
                <li 
                v-for="i in prioritylist" 
                @click="priority=i" 
                :class="{active:priority===i}">
                    {{ i }}
                </li>
            </ul>
        </div>
        <p>设置到期时间：{{ dead }}</p>
        <el-calendar v-model="dead" :controller-type="controllerType" class="setdate"/>

        

        <button @click="add">添加</button>
    </div>
</template>

<style scoped lang="scss">
.setdate{
    width: 1000px;
}
.active{
    background-color: #4983ffbd;
}
.priority{
    // display: flex;
    ul{
        display: flex;
        gap: 10px;
        li{
        width: 100px;
        height: 30px;
        border: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
            background-color: #4983ffbd;
            cursor:pointer
        }
    }
    }
}
</style> -->

<script setup>
import {ref} from 'vue'
const controllerType = ref('select')
const todo = ref('')
const priority = ref('')
const prioritylist = ref(['低','中','高'])
const dead = ref()
const emits = defineEmits(['addtodo'])
const add = () =>{
    emits('addtodo',todo.value,priority.value,dead.value)
    console.log('子组件发送了添加事项的请求，事项名为：',todo.value)
    todo.value='',
    priority.value=''
    dead.value=''
}
</script>

<template>
    <div class="input">
        <RouterLink to="/" class="back-link">← 返回功能中心</RouterLink>
        <h1>📝 待办事项清单</h1>
        
        <div class="form-group">
            <label>📌 待办事项</label>
            <input type="text" placeholder="例如：学习Vue3" v-model="todo">
        </div>

        <div class="form-group">
            <label>⚡ 优先级</label>
            <div class="priority">
                <div 
                    v-for="i in prioritylist" 
                    :key="i"
                    class="priority-option"
                    :class="{active: priority === i}"
                    @click="priority = i">
                    {{ i }}
                </div>
            </div>
        </div>

        <div class="form-group">
            <label>📅 到期时间</label>
            <el-calendar v-model="dead" :controller-type="controllerType" class="setdate"/>
        </div>

        <button class="add-btn" @click="add">+ 添加待办</button>
    </div>
</template>

<style scoped lang="scss">
@keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
                }
.back-link {
    display: inline-block;
    margin: 20px 0 0 20px;
    padding: 8px 16px;
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    border-radius: 20px;
    transition: all 0.3s ease;
     &:hover {
        background: rgba(0, 162, 255, 0.4);
        transform: translateX(-3px);
    }
}
.input {
    width: 100%;
    max-width: 800px;
    box-sizing: border-box;
    // margin: 0 auto;
    padding: 30px;
    background: linear-gradient(135deg, #66c0eab0 0%, #42f2ffdc 100%);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 0.6s ease-out 0.2s both;
    
    h1 {
        text-align: center;
        color: white;
        margin-bottom: 30px;
        font-size: 28px;
        font-weight: 600;
    }
    
    .form-group {
        margin-bottom: 25px;
        
        label {
            display: block;
            color: white;
            font-weight: 500;
            margin-bottom: 10px;
            font-size: 14px;
            opacity: 0.9;
        }
        
        input[type="text"] {
            width: 100%;
            padding: 12px 16px;
            border: none;
            border-radius: 12px;
            font-size: 15px;
            background: rgba(255, 255, 255, 0.95);
            transition: all 0.3s ease;
            box-sizing: border-box;
            
            &:focus {
                outline: none;
                background: white;
                box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
            }
            
            &::placeholder {
                color: #aaa;
            }
        }
    }
    
    .priority {
        display: flex;
        gap: 12px;
        
        .priority-option {
            flex: 1;
            padding: 10px;
            text-align: center;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
            
            &:hover {
                background: rgba(255, 255, 255, 0.35);
                transform: translateY(-2px);
            }
            
            &.active {
                background: white;
                color: #667eea;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
        }
    }
    
    .setdate {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        
        :deep(.el-calendar__header) {
            background: #f5f5f5;
            padding: 12px;
        }
        
        :deep(.el-calendar__title) {
            color: #333;
            font-weight: 500;
        }
        
        :deep(.el-calendar__body) {
            padding: 12px;
        }
        
        :deep(.el-calendar-table__row td) {
            transition: all 0.2s;
            
            &:hover {
                background: #e3f2fd;
            }
        }
        
        :deep(.el-calendar-table__row td.is-selected) {
            background: #667eea;
            color: white;
        }
    }
    
    .add-btn {
        width: 100%;
        padding: 14px;
        background: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        color: #667eea;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 10px;
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        &:active {
            transform: translateY(0);
        }
    }
}

// 响应式
@media (max-width: 768px) {
    .input {
        padding: 20px;
        margin: 10px;
        
        h1 {
            font-size: 24px;
        }
        
        .priority {
            gap: 8px;
            
            .priority-option {
                padding: 8px;
                font-size: 14px;
            }
        }
    }
}
</style>