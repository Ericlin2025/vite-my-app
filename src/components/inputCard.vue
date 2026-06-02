<!-- <script setup>
import { getCategory } from '@/api/questions';
import {ref,onMounted} from 'vue'
const categorys = ref([])
const amount = ref()
const category = ref('')
const difficulty = ref('')
const type = ref('')
const getC = async() =>{
    const res = await getCategory()
    
    console.log('获取所有种类成功',res)
    categorys.value = res.data.trivia_categories
}

const emits = defineEmits(['get'])
const getQ = () =>{
    if(!amount.value||!category.value||!difficulty.value||!type.value){
        alert('请输入完整')
        return
    }
    emits('get',amount.value,category.value,difficulty.value,type.value)
}

onMounted(()=>{
    getC()
})
</script>


<template>
<div class="form">
    <p>请在以下输入你想要的问题种类来获取问题</p>
    <span>问题个数：</span><input type="number" placeholder="请输入你想要的问题个数" v-model="amount"> <br>
    <span>问题种类：</span><select name="" id="" v-model="category">
        <option  v-for="i in categorys" :value="i.id">
            {{ i.name }}
        </option>
    </select><br>
    <span>问题难度：</span><select name="" id="" v-model="difficulty">
        <option value="easy">简单</option>
        <option value="medium">中等</option>
        <option value="hard">困难</option>
    </select><br>
    <span>回答类型：</span><select name="" id="" v-model="type">
        <option value="multiple">选择题</option>
        <option value="boolean">判断题</option>
    </select><br>
    <button @click="getQ">获取问题</button>
</div>
</template>

<style scoped lang="scss">

</style> -->
<template>
    <div class="form-card">
        <div class="form-header">
            <span class="form-icon">⚙️</span>
            <h3 class="form-title">挑战设置</h3>
            <p class="form-desc">选择你想要的问题参数，开始知识挑战</p>
        </div>
        
        <div class="form-body">
            <!-- 问题个数 -->
            <div class="form-group">
                <label class="form-label">
                    <span class="label-icon">📊</span>
                    问题个数
                </label>
                <input 
                    type="number" 
                    class="form-input"
                    placeholder="请输入问题数量（1-50）" 
                    v-model="amount"
                    min="1"
                    max="40"
                >
                <span class="input-hint">数量范围：1-40 题</span>
            </div>
            
            <!-- 问题种类 -->
            <div class="form-group">
                <label class="form-label">
                    <span class="label-icon">📂</span>
                    问题种类
                </label>
                <select class="form-select" v-model="category">
                    <option value="" disabled>请选择问题分类</option>
                    <option v-for="i in categorys" :key="i.id" :value="i.id">
                        {{ i.name }}
                    </option>
                </select>
            </div>
            
            <!-- 问题难度 -->
            <div class="form-group">
                <label class="form-label">
                    <span class="label-icon">⭐</span>
                    问题难度
                </label>
                <div class="difficulty-buttons">
                    <button 
                        type="button"
                        class="difficulty-btn"
                        :class="{ active: difficulty === 'easy' }"
                        @click="difficulty = 'easy'"
                    >
                        🟢 简单
                    </button>
                    <button 
                        type="button"
                        class="difficulty-btn"
                        :class="{ active: difficulty === 'medium' }"
                        @click="difficulty = 'medium'"
                    >
                        🟡 中等
                    </button>
                    <button 
                        type="button"
                        class="difficulty-btn"
                        :class="{ active: difficulty === 'hard' }"
                        @click="difficulty = 'hard'"
                    >
                        🔴 困难
                    </button>
                </div>
            </div>
            
            <!-- 回答类型 -->
            <div class="form-group">
                <label class="form-label">
                    <span class="label-icon">🎯</span>
                    回答类型
                </label>
                <div class="type-buttons">
                    <button 
                        type="button"
                        class="type-btn"
                        :class="{ active: type === 'multiple' }"
                        @click="type = 'multiple'"
                    >
                        📝 选择题
                    </button>
                    <button 
                        type="button"
                        class="type-btn"
                        :class="{ active: type === 'boolean' }"
                        @click="type = 'boolean'"
                    >
                        ✓ 判断题
                    </button>
                </div>
            </div>
        </div>
        
        <div class="form-footer">
            <button class="submit-btn" @click="getQ">
                <span class="btn-icon">🚀</span>
                开始挑战
            </button>
        </div>
    </div>
</template>

<script setup>
import { getCategory } from '@/api/questions';
import { ref, onMounted } from 'vue'

const categorys = ref([])
const amount = ref(5)  // 设置默认值
const category = ref('')
const difficulty = ref('')
const type = ref('multiple')  // 设置默认值

const getC = async () => {
    const res = await getCategory()
    console.log('获取所有种类成功', res)
    categorys.value = res.data.trivia_categories
}

const emits = defineEmits(['get'])

const getQ = () => {
    if (!amount.value || !category.value || !difficulty.value || !type.value) {
        alert('请完整填写所有选项')
        return
    }
    if (amount.value < 1 || amount.value > 50) {
        alert('问题个数必须在 1-50 之间')
        return
    }
    emits('get', amount.value, category.value, difficulty.value, type.value)
}

onMounted(() => {
    getC()
})
</script>

<style scoped lang="scss">
.form-card {
    background: white;
    border-radius: 28px;
    box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.2);
    }
}

.form-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 24px 28px;
    text-align: center;
    
    .form-icon {
        font-size: 2.5rem;
        display: inline-block;
        margin-bottom: 8px;
    }
    
    .form-title {
        font-size: 1.5rem;
        color: white;
        margin: 0 0 6px 0;
        font-weight: 600;
    }
    
    .form-desc {
        font-size: 0.85rem;
        color: rgba(255, 255, 255, 0.85);
        margin: 0;
    }
}

.form-body {
    padding: 28px;
    background: #f8fafc;
}

.form-group {
    margin-bottom: 24px;
    
    &:last-child {
        margin-bottom: 0;
    }
}

.form-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 10px;
    font-size: 0.95rem;
    
    .label-icon {
        font-size: 1.1rem;
    }
}

.form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    font-size: 1rem;
    transition: all 0.2s ease;
    box-sizing: border-box;
    
    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    &::placeholder {
        color: #94a3b8;
    }
}

.input-hint {
    display: block;
    font-size: 0.7rem;
    color: #94a3b8;
    margin-top: 6px;
}

.form-select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 14px;
    font-size: 1rem;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
}

// 难度按钮组
.difficulty-buttons {
    display: flex;
    gap: 12px;
    
    .difficulty-btn {
        flex: 1;
        padding: 10px 16px;
        border: 2px solid #e2e8f0;
        background: white;
        border-radius: 40px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
            transform: translateY(-2px);
        }
        
        &.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
            color: white;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        &:nth-child(1).active {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }
        
        &:nth-child(2).active {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        }
        
        &:nth-child(3).active {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }
    }
}

// 类型按钮组
.type-buttons {
    display: flex;
    gap: 12px;
    
    .type-btn {
        flex: 1;
        padding: 10px 16px;
        border: 2px solid #e2e8f0;
        background: white;
        border-radius: 40px;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
            transform: translateY(-2px);
        }
        
        &.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
            color: white;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
    }
}

.form-footer {
    padding: 20px 28px 28px;
    background: white;
    border-top: 1px solid #eef2ff;
    
    .submit-btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        
        .btn-icon {
            font-size: 1.2rem;
        }
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
        
        &:active {
            transform: translateY(0);
        }
    }
}

// 响应式
@media (max-width: 640px) {
    .form-header {
        padding: 20px;
        
        .form-title {
            font-size: 1.3rem;
        }
    }
    
    .form-body {
        padding: 20px;
    }
    
    .difficulty-buttons,
    .type-buttons {
        flex-direction: column;
        gap: 8px;
        
        .difficulty-btn,
        .type-btn {
            width: 100%;
        }
    }
    
    .form-footer {
        padding: 16px 20px 20px;
    }
}
</style>