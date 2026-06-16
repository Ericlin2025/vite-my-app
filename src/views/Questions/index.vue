<template>
    <div class="quiz-page">
        <!-- 头部区域 -->
        <div class="quiz-header">
            <RouterLink to="/" class="back-btn">
                <span class="back-icon">←</span>
                返回功能中心
            </RouterLink>
            <div class="header-content">
                <div class="header-icon">🧠</div>
                <h1 class="header-title">趣味问答</h1>
                <p class="header-subtitle">挑战你的知识库，测试你的智慧</p>
            </div>
        </div>

        <div class="bd">
            <!-- 表单区域（获取问题的卡片） -->
        <div class="form-section">
            <inputCard @get="questions" />
        </div>

        <!-- 问题列表区域 -->
        <div v-if="list.length > 0" class="questions-section">
            <questionslist :data="list" />
        </div>
        
        <!-- 空状态提示 -->
        <div v-else class="empty-state">
            <div class="empty-icon">📚</div>
            <p class="empty-text">还未获取问题，请先设置并获取问题</p>
            <p class="empty-hint">点击上方卡片，选择分类和难度开始挑战</p>
        </div>
        </div>
    </div>
</template>

<script setup>
import { getQuestions } from '@/api/questions';
import { ref } from 'vue'
import inputCard from '@/components/inputCard.vue';
import questionslist from '@/components/questions-list.vue'

const list = ref([])

const questions = async (a, b, c, d) => {
    const res = await getQuestions(a, b, c, d)
    console.log('获取问题成功', res)
    list.value = res.data.results
}
</script>

<style scoped lang="scss">
.quiz-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 30px 24px;
}
.bd{
    display: flex;
    justify-content: space-around;
}
// 头部样式
.quiz-header {
    max-width: 1200px;
    margin: 0 auto 30px;
    
    .back-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        padding: 8px 20px;
        border-radius: 40px;
        color: white;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.3s ease;
        margin-bottom: 24px;
        
        .back-icon {
            font-size: 1.1rem;
            transition: transform 0.2s;
        }
        
        &:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateX(-4px);
            
            .back-icon {
                transform: translateX(-3px);
            }
        }
    }
    
    .header-content {
        text-align: center;
        
        .header-icon {
            font-size: 4rem;
            margin-bottom: 8px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }
        
        .header-title {
            font-size: 2.5rem;
            color: white;
            margin: 0 0 8px 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            letter-spacing: 2px;
        }
        
        .header-subtitle {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.85);
            margin: 0;
        }
    }
}

// 表单区域
.form-section {
    max-width: 600px;
    /* margin: 0 auto 40px; */
    animation: slideUp 0.5s ease;
}

// 问题列表区域
.questions-section {
    max-width: 900px;
    /* margin: 0 auto; */
    animation: fadeIn 0.5s ease;
}

/* // 空状态样式 */
.empty-state {
    max-width: 500px;
    /* margin: 80px auto; */
    text-align: center;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 32px;
    padding: 50px 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    
    .empty-icon {
        font-size: 5rem;
        margin-bottom: 20px;
        opacity: 0.7;
    }
    
    .empty-text {
        font-size: 1.2rem;
        color: #4a5568;
        margin: 0 0 10px 0;
        font-weight: 500;
    }
    
    .empty-hint {
        font-size: 0.9rem;
        color: #a0aec0;
        margin: 0;
    }
}

// 动画
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

// 响应式
@media (max-width: 768px) {
    .quiz-page {
        padding: 20px 16px;
    }
    
    .quiz-header {
        .header-content {
            .header-title {
                font-size: 1.8rem;
            }
            
            .header-icon {
                font-size: 3rem;
            }
        }
    }
    
    .empty-state {
        margin: 50px 20px;
        padding: 35px 20px;
        
        .empty-icon {
            font-size: 3.5rem;
        }
        
        .empty-text {
            font-size: 1rem;
        }
    }
}
</style>