<!-- <script setup>
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {computed, ref,watch,onUnmounted} from 'vue'

dayjs.extend(duration);
const props = defineProps({
    data:{
        type:Array,
        required:true
    }
})

const now = ref(0)
let timer = null
const getTime = (t) =>{
   return dayjs(t).format('YYYY-MM-DD hh:mm:ss')
}
const getlstime = (t) =>{
    if(t<=0){
        return '已过期'
    }
    t = t/1000
    const d = Math.floor(t/86400)

    const h= Math.floor((t%86400)/ 3600)
    

    
    const   m = Math.floor((t% 3600) / 60)
    

    
    const s = Math.floor(t % 60)

    const fd = d<10?'0'+d:d
    const fh=h<10?'0'+h:h
    const fm=m<10?'0'+m:m
    const fs=s<10?'0'+s:s
    return`${fd}天${fh}小时${fm}分钟${fs}秒`
}
timer = setInterval(()=>{
    // now.value = dayjs().format('YYYY-MM-DD hh:mm:ss')
    now.value = dayjs().valueOf()
})
const deleteItem=(i) =>{
    props.data.splice(i,1)
}

const completed = (i) =>{
    props.data[i].completed =true
}
const uncomplete = (i) =>{
    props.data[i].completed =false
}
const completedlist = computed(()=>{
   return props.data.filter(i =>i.completed=== true).length
})
//避免出现内存泄漏，清除定时器
onUnmounted(()=>{
    if(timer){
        clearInterval(timer)
        timer=null
    }
})
</script>


<template>
<div class="list">
    <h3>待办清单(已完成：{{completedlist}}/{{ data.length }})</h3>
    
    <ul>
        <li v-for="(t,index) in data">
            <p>待办{{index+1}}：{{ t.tname}}  </p>
            <p>优先级：{{ t.priority }}</p>
            <p>状态：{{ t.completed?'已完成':'未完成' }}</p>
            <p>更新状态：<button @click="completed(index)">完成</button><button @click="uncomplete(index)">未完成</button></p>
            <p>创建时间：{{ getTime(t.ctime )}}</p>
            <p>到期时间：{{ getTime(t.dtime) }}</p>
            
             <p>剩余时间：{{ getlstime(t.dtime-now)}}</p>
            <button @click="deleteItem(index)">删除</button>
        </li>
    </ul>
</div>

</template>

<style scoped lang="scss">

</style> -->
<template>
<div class="list">
    <div class="list-header">
        <h3>📋 待办清单</h3>
        <div class="stats">
            <span class="completed-count">已完成：{{ completedlist }}</span>
            <span class="total-count">总数：{{ data.length }}</span>
        </div>
    </div>
    
    <ul>
        <li v-for="(t, index) in data" :key="index" :class="{ completed: t.completed }">
            <div class="todo-header">
                <div class="todo-title">
                    <span class="todo-number">{{ index + 1 }}</span>
                    <span class="todo-name">{{ t.tname }}</span>
                    <span class="priority-badge" :class="getPriorityClass(t.priority)">
                        {{ t.priority }}
                    </span>
                </div>
                <div class="todo-actions">
                    <button class="action-btn complete-btn" @click="completed(index)">✅ 完成</button>
                    <button class="action-btn uncomplete-btn" @click="uncomplete(index)">🔄 未完成</button>
                    <button class="action-btn delete-btn" @click="deleteItem(index)">🗑️ 删除</button>
                </div>
            </div>
            
            <div class="todo-details">
                <div class="detail-item">
                    <span class="detail-label">状态：</span>
                    <span class="detail-value" :class="{ statusCompleted: t.completed }">
                        {{ t.completed ? '已完成' : '未完成' }}
                    </span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">创建时间：</span>
                    <span class="detail-value">{{ getTime(t.ctime) }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">到期时间：</span>
                    <span class="detail-value">{{ getTime(t.dtime) }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">剩余时间：</span>
                    <span class="detail-value countdown" :class="getCountdownClass(t.dtime - now)">
                        {{ getlstime(t.dtime - now) }}
                    </span>
                </div>
            </div>
        </li>
    </ul>
</div>
</template>

<script setup>
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { computed, ref, onUnmounted } from 'vue'

dayjs.extend(duration);

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const now = ref(0)
let timer = null

const getTime = (t) => {
    return dayjs(t).format('YYYY-MM-DD HH:mm:ss')
}

const getlstime = (t) => {
    if (t <= 0) {
        return '已过期'
    }
    t = t / 1000
    const d = Math.floor(t / 86400)
    const h = Math.floor((t % 86400) / 3600)
    const m = Math.floor((t % 3600) / 60)
    const s = Math.floor(t % 60)

    const fd = d < 10 ? '0' + d : d
    const fh = h < 10 ? '0' + h : h
    const fm = m < 10 ? '0' + m : m
    const fs = s < 10 ? '0' + s : s
    return `${fd}天 ${fh}:${fm}:${fs}`
}

timer = setInterval(() => {
    now.value = dayjs().valueOf()
})

const deleteItem = (i) => {
    props.data.splice(i, 1)
}

const completed = (i) => {
    props.data[i].completed = true
}

const uncomplete = (i) => {
    props.data[i].completed = false
}

const completedlist = computed(() => {
    return props.data.filter(i => i.completed === true).length
})

// 获取优先级对应的样式类
const getPriorityClass = (priority) => {
    if (priority === '高') return 'priority-high'
    if (priority === '中') return 'priority-medium'
    if (priority === '低') return 'priority-low'
    return ''
}

// 获取倒计时样式类
const getCountdownClass = (remaining) => {
    if (remaining <= 0) return 'countdown-expired'
    if (remaining < 24 * 60 * 60 * 1000) return 'countdown-urgent'
    return ''
}

// 清除定时器
onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
})
</script>

<style scoped lang="scss">
.list {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    
    .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #e5e7eb;
        
        h3 {
            font-size: 20px;
            color: #1f2937;
            margin: 0;
        }
        
        .stats {
            display: flex;
            gap: 16px;
            font-size: 14px;
            
            .completed-count {
                color: #10b981;
                font-weight: 600;
            }
            
            .total-count {
                color: #ffae00;
            }
        }
    }
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 16px;
        
        li {
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            transition: all 0.3s ease;
            border: 1px solid #f0f0f0;
            
            &:hover {
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
                transform: translateY(-2px);
            }
            
            &.completed {
                opacity: 0.7;
                background: #f9fafb;
                
                .todo-name {
                    text-decoration: line-through;
                    color: #9ca3af;
                }
            }
            
            .todo-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 12px;
                margin-bottom: 16px;
                padding-bottom: 12px;
                border-bottom: 1px solid #f0f0f0;
                
                .todo-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    flex-wrap: wrap;
                    
                    .todo-number {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        width: 28px;
                        height: 28px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 10px;
                        font-size: 14px;
                        font-weight: 600;
                    }
                    
                    .todo-name {
                        font-size: 16px;
                        font-weight: 600;
                        color: #1f2937;
                    }
                    
                    .priority-badge {
                        padding: 4px 10px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        
                        &.priority-high {
                            background: #fee2e2;
                            color: #dc2626;
                        }
                        
                        &.priority-medium {
                            background: #fef3c7;
                            color: #d97706;
                        }
                        
                        &.priority-low {
                            background: #d1fae5;
                            color: #059669;
                        }
                    }
                }
                
                .todo-actions {
                    display: flex;
                    gap: 8px;
                    
                    .action-btn {
                        padding: 6px 14px;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 13px;
                        transition: all 0.2s;
                        
                        &.complete-btn {
                            background: #10b981;
                            color: white;
                            
                            &:hover {
                                background: #059669;
                            }
                        }
                        
                        &.uncomplete-btn {
                            background: #f59e0b;
                            color: white;
                            
                            &:hover {
                                background: #d97706;
                            }
                        }
                        
                        &.delete-btn {
                            background: #ef4444;
                            color: white;
                            
                            &:hover {
                                background: #dc2626;
                            }
                        }
                    }
                }
            }
            
            .todo-details {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                
                .detail-item {
                    display: flex;
                    align-items: baseline;
                    gap: 8px;
                    font-size: 13px;
                    
                    .detail-label {
                        color: #6b7280;
                        font-weight: 500;
                        min-width: 70px;
                    }
                    
                    .detail-value {
                        color: #374151;
                        
                        &.statusCompleted {
                            color: #10b981;
                            font-weight: 600;
                        }
                        
                        &.countdown {
                            font-weight: 600;
                            
                            &.countdown-expired {
                                color: #ef4444;
                            }
                            
                            &.countdown-urgent {
                                color: #f59e0b;
                            }
                        }
                    }
                }
            }
        }
    }
}

// 响应式
@media (max-width: 640px) {
    .list {
        padding: 12px;
        
        .list-header {
            flex-direction: column;
            gap: 8px;
            text-align: center;
        }
        
        ul li {
            padding: 16px;
            
            .todo-header {
                flex-direction: column;
                align-items: stretch;
                
                .todo-actions {
                    justify-content: center;
                }
            }
            
            .todo-details {
                grid-template-columns: 1fr;
                gap: 8px;
            }
        }
    }
}
</style>