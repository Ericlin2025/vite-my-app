<!-- <script setup>
import { selectV2InjectionKey } from 'element-plus'
import {ref,onMounted,watch} from 'vue'
const props = defineProps({
    data:{
        type:Array,
        required :true
    }
})
const optionsList = ref([])
const getOptions = () =>{
    optionsList.value = props.data.map(question => {
        if (question.type === 'multiple') {
            const allOptions = [question.correct_answer, ...question.incorrect_answers]
            return [...allOptions].sort(() => Math.random() - 0.5)
        }
})
}
onMounted(()=>{
    getOptions()
})
watch(()=>props.data,(newData)=>{
    getOptions()
},{immediate:true,deep:true})
const count  = ref(0)
const accuracy = ref(0)
const answer = ref('')
const userAnswer = ref({})
const addAnswer = (i) =>{
    // if(userAnswer.value===props.data[i].correct_answer){
    //     console.log('回答正确')
    //     count.value++
    // }else{
    //     console.log('回答错误')
    // }
    //如果变量属性名是变量，要用[变量名]使用
    userAnswer.value[i]= answer.value
    console.log(userAnswer.value)

}
const send = ref(false)
const getAccuracy =()=>{
    count.value=0
    props.data.forEach((item,index)=>{
        if(userAnswer.value[index]===item.correct_answer){
            count.value++
        }
    })
   accuracy.value=(count.value/props.data.length)*100
    send.value=true
}
</script>


<template>
<div class="list"> 
    <h3>获取的问题列表为：</h3>
    <ul>
        <li v-for="(i,index) in data">
           <div class="question">
            问题{{ index+1 }}: {{ i.question }}
            <span></span>
           </div>
           <div 
           class="select-item" 
           v-for="item in optionsList[index]" 
           v-if="i.type==='multiple'?true:false"
           :class="{active:userAnswer[index]===item}"
           @click="answer=item,addAnswer(index)"
           >
            {{ item }}
           </div>
           <div v-else>
            正确<input type="radio" :name="i.question" value="true"><br>
            错误<input type="radio" :name="i.question" value="false"><br>
           </div>
           <div class="correct">
            <p>正确答案为:{{ i.correct_answer }}</p>
           </div>
        </li>
    </ul>
    <button @click="getAccuracy">查看回答的准确率</button>
    <div v-if="send">
        <p>回答准确率为：{{ accuracy }}%</p>
    </div>
</div>
</template>

<style scoped lang="scss">
.active{
    background-color: orange;
}
.list{
    .select-item{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        width: 300px;
        height: 30px;
        &:hover{
            cursor: pointer;
        }
    }
}

</style> -->
<template>
    <div class="questions-container">
        <div class="questions-header">
            <div class="header-left">
                <span class="header-icon">📋</span>
                <h3 class="header-title">问题列表</h3>
            </div>
            <div class="header-right">
                <span class="question-count">共 {{ data.length }} 道题</span>
            </div>
        </div>

        <div class="questions-list">
            <div v-for="(question, qIndex) in data" :key="qIndex" class="question-card">
                <!-- 题目头部 -->
                <div class="question-header">
                    <div class="question-number">
                        <span class="number-badge">{{ qIndex + 1 }}</span>
                        <span class="question-type" :class="question.type">
                            {{ question.type === 'multiple' ? '选择题' : '判断题' }}
                        </span>
                    </div>
                    <div class="question-correct" v-if="userAnswer[qIndex] !== undefined">
                        <span v-if="userAnswer[qIndex] === question.correct_answer" class="correct-badge">
                            ✓ 回答正确
                        </span>
                        <span v-else class="wrong-badge">
                            ✗ 回答错误
                        </span>
                    </div>
                </div>

                <!-- 题目内容 -->
                <div class="question-content">
                    {{ decodeHtml(question.question) }}
                </div>

                <!-- 选择题选项 -->
                <div v-if="question.type === 'multiple'" class="options-grid">
                    <div 
                        v-for="(item, optIndex) in optionsList[qIndex]" 
                        :key="optIndex"
                        class="option-card"
                        :class="{
                            active: userAnswer[qIndex] === item,
                            correct: userAnswer[qIndex] !== undefined && item === question.correct_answer,
                            wrong: userAnswer[qIndex] !== undefined && userAnswer[qIndex] === item && item !== question.correct_answer
                        }"
                        @click="answer = item, addAnswer(qIndex)"
                    >
                        <span class="option-letter">{{ String.fromCharCode(65 + optIndex) }}</span>
                        <span class="option-text">{{ decodeHtml(item) }}</span>
                        <span v-if="userAnswer[qIndex] === item" class="option-check">✓</span>
                    </div>
                </div>

                <!-- 判断题选项 -->
                <div v-else class="boolean-group">
                    <div 
                        class="boolean-option"
                        :class="{ active: userAnswer[qIndex] === 'True' }"
                        @click="answer = 'True', addAnswer(qIndex)"
                    >
                        <span class="boolean-icon">✓</span>
                        <span>正确</span>
                    </div>
                    <div 
                        class="boolean-option"
                        :class="{ active: userAnswer[qIndex] === 'False' }"
                        @click="answer = 'False', addAnswer(qIndex)"
                    >
                        <span class="boolean-icon">✗</span>
                        <span>错误</span>
                    </div>
                </div>

                <!-- 显示正确答案 -->
                <div v-if="userAnswer[qIndex] !== undefined && userAnswer[qIndex] !== question.correct_answer" class="answer-hint">
                    <span class="hint-label">💡 正确答案：</span>
                    <span class="hint-answer">{{ decodeHtml(question.correct_answer) }}</span>
                </div>
            </div>
        </div>

        <!-- 底部统计区域 -->
        <div class="questions-footer">
            <button class="check-btn" @click="getAccuracy">
                <span class="btn-icon">📊</span>
                查看准确率
            </button>
            <div v-if="send" class="result-card">
                <div class="result-score">
                    <span class="score-number">{{ accuracy }}%</span>
                    <span class="score-label">准确率</span>
                </div>
                <div class="result-detail">
                    答对 {{ count }} 题 / 共 {{ data.length }} 题
                </div>
                <div class="result-bar">
                    <div class="bar-fill" :style="{ width: accuracy + '%' }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})

const optionsList = ref([])
const getOptions = () => {
    if (!props.data || !props.data.length) return
    
    optionsList.value = props.data.map(question => {
        if (question.type === 'multiple') {
            const allOptions = [question.correct_answer, ...question.incorrect_answers]
            return [...allOptions].sort(() => Math.random() - 0.5)
        }
        return []
    })
}

onMounted(() => {
    getOptions()
})



const count = ref(0)
const accuracy = ref(0)
const answer = ref('')
const userAnswer = ref({})
const send = ref(false)

const addAnswer = (i) => {
    userAnswer.value[i] = answer.value
    console.log(userAnswer.value)
}

const getAccuracy = () => {
    count.value = 0
    props.data.forEach((item, index) => {
        if (userAnswer.value[index] === item.correct_answer) {
            count.value++
        }
    })
    accuracy.value = Math.round((count.value / props.data.length) * 100)
    send.value = true
}

// 解码 HTML 实体
const decodeHtml = (text) => {
    if (!text) return ''
    const textarea = document.createElement('textarea')
    textarea.innerHTML = text
    return textarea.value
}
watch(() => props.data, (newData) => {
    getOptions()
    userAnswer.value={}
    count.value=0
    accuracy.value=0
}, { immediate: true, deep: true })
</script>

<style scoped lang="scss">
.questions-container {
    background: #f5f7fb;
    border-radius: 24px;
    padding: 24px;
    // margin-top: 20px;
}

// 头部样式
.questions-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 2px solid #e2e8f0;
    
    .header-left {
        display: flex;
        align-items: center;
        gap: 10px;
        
        .header-icon {
            font-size: 1.5rem;
        }
        
        .header-title {
            font-size: 1.2rem;
            color: #1e293b;
            margin: 0;
        }
    }
    
    .header-right {
        .question-count {
            background: #e2e8f0;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            color: #475569;
        }
    }
}

// 问题列表
.questions-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
}

// 问题卡片
.question-card {
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
}

// 问题头部
.question-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    
    .question-number {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .number-badge {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 0.85rem;
            font-weight: bold;
        }
        
        .question-type {
            font-size: 0.7rem;
            padding: 4px 10px;
            border-radius: 20px;
            
            &.multiple {
                background: #dbeafe;
                color: #1e40af;
            }
            
            &.boolean {
                background: #fef3c7;
                color: #92400e;
            }
        }
    }
    
    .question-correct {
        .correct-badge {
            background: #dcfce7;
            color: #166534;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 500;
        }
        
        .wrong-badge {
            background: #fee2e2;
            color: #991b1b;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 500;
        }
    }
}

// 问题内容
.question-content {
    font-size: 1rem;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.5;
    margin-bottom: 20px;
    padding: 12px;
    background: #f8fafc;
    border-radius: 12px;
}

// 选择题选项网格
.options-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .option-card {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 12px 16px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
            background: #f1f5f9;
            border-color: #94a3b8;
            transform: translateX(4px);
        }
        
        &.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
            
            .option-letter, .option-text, .option-check {
                color: white;
            }
        }
        
        &.correct {
            background: #dcfce7;
            border-color: #4caf50;
            
            .option-letter, .option-text {
                color: #166534;
            }
        }
        
        &.wrong {
            background: #fee2e2;
            border-color: #f44336;
            text-decoration: line-through;
            
            .option-letter, .option-text {
                color: #991b1b;
            }
        }
        
        .option-letter {
            font-weight: 700;
            color: #667eea;
            min-width: 30px;
            font-size: 1rem;
        }
        
        .option-text {
            flex: 1;
            color: #1e293b;
        }
        
        .option-check {
            font-size: 1.1rem;
            font-weight: bold;
            color: #4caf50;
        }
    }
}

// 判断题选项
.boolean-group {
    display: flex;
    gap: 16px;
    
    .boolean-option {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px;
        background: #f8fafc;
        border: 2px solid #e2e8f0;
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
            background: #f1f5f9;
            transform: translateY(-2px);
        }
        
        &.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-color: transparent;
            color: white;
        }
        
        .boolean-icon {
            font-size: 1.1rem;
        }
    }
}

// 答案提示
.answer-hint {
    margin-top: 16px;
    padding: 10px 14px;
    background: #fef3c7;
    border-radius: 12px;
    font-size: 0.85rem;
    
    .hint-label {
        color: #92400e;
        font-weight: 500;
    }
    
    .hint-answer {
        color: #78350f;
    }
}

// 底部区域
.questions-footer {
    margin-top: 24px;
    text-align: center;
    
    .check-btn {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 12px 32px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 40px;
        font-size: 1rem;
        font-weight: 600;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
        
        .btn-icon {
            font-size: 1.1rem;
        }
        
        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }
    }
    
    .result-card {
        margin-top: 20px;
        padding: 20px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        
        .result-score {
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 8px;
            margin-bottom: 10px;
            
            .score-number {
                font-size: 2.5rem;
                font-weight: 700;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
            
            .score-label {
                font-size: 0.9rem;
                color: #64748b;
            }
        }
        
        .result-detail {
            text-align: center;
            color: #475569;
            font-size: 0.9rem;
            margin-bottom: 12px;
        }
        
        .result-bar {
            height: 8px;
            background: #e2e8f0;
            border-radius: 10px;
            overflow: hidden;
            
            .bar-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
                border-radius: 10px;
                transition: width 0.5s ease;
            }
        }
    }
}

// 响应式
@media (max-width: 640px) {
    .questions-container {
        padding: 16px;
    }
    
    .question-card {
        padding: 16px;
    }
    
    .question-content {
        font-size: 0.9rem;
    }
    
    .boolean-group {
        flex-direction: column;
        gap: 10px;
    }
    
    .options-grid .option-card {
        padding: 10px 14px;
    }
    
    .check-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>