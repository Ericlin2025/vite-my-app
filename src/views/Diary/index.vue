<script setup>
import { ref,watch } from 'vue'

// --- 预留给你的逻辑变量 ---
const diaryText = ref('')       // 日记正文内容
const currentMood = ref('😊')   // 当前选中的心情

const weatherStatus = ref('🌤️') // 当前天气状态（可从你的天气接口获取）
const diaryList = ref(JSON.parse(localStorage.getItem('list')||'[]'))

// 心情选项列表
const weather =['🌤️','🌧️']
const moods = ['😊', '🥰', '😎', '🥱', '😢', '😡']
const day = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六']
// --- 预留给你的方法（内部逻辑由你来实现） ---
const handleSaveDiary = () => {
  console.log('保存日记点击，当前内容：', diaryText.value)
  console.log('当前心情：', currentMood.value)
  // 你的保存逻辑...
  const now = new Date()
  const d = {
    date:`${now.getMonth()+1}月${now.getDate()}日`,
    week:day[now.getDay()],
    weather: weatherStatus.value,
    mood:currentMood.value,
    content:diaryText.value
  }
  diaryList.value.push(d)
  diaryText.value=''
}

watch(diaryList,(newValue)=>{
    localStorage.setItem('list',JSON.stringify(newValue))
},{immediate:true,deep:true})
const handleDeleteDiary = (i) => {
  console.log('删除日记 ID:', i)
  // 你的删除逻辑...
  diaryList.value.splice(i,1)
}
</script>

<template>
  <div class="diary-container">
    <header class="diary-header">
        <RouterLink to="/weather" class="back-btn">←返回</RouterLink>
      <h1 class="title"><span class="icon">📖</span> 天气随笔</h1>
      <p class="subtitle">记录每一天的时间、天气与心情</p>
    </header>

    <div class="diary-layout">
      <section class="diary-write-card">
        <div class="card-header">
          <span class="date-tag">今天：{{ new Date().toLocaleDateString() }} {{ weatherStatus }}</span>
          <div class="mood-selector">
            <span class="label">今日天气:</span>
            <div class="mood-options">
              <button 
                v-for="item in weather" 
                :key="item"
                :class="['mood-btn', { active: weatherStatus === item }]"
                @click="weatherStatus = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
          <div class="mood-selector">
            <span class="label">今日心情:</span>
            <div class="mood-options">
              <button 
                v-for="item in moods" 
                :key="item"
                :class="['mood-btn', { active: currentMood === item }]"
                @click="currentMood = item"
              >
                {{ item }}
              </button>
            </div>
          </div>
        </div>

        <textarea 
          v-model="diaryText" 
          placeholder="留住这一刻的心情与天气，写点什么吧..." 
          class="diary-input"
          
        ></textarea>

        <div class="card-footer">
          <span class="word-count">共 {{ diaryText.length }} 字</span>
          <button class="save-btn" @click="handleSaveDiary">
            <span>💾 保存日记</span>
          </button>
        </div>
        
      </section>

      <section class="diary-history-section">
        <h3 class="section-title">历史记录 ({{ diaryList.length }})</h3>
        
        <div class="history-list">
          <div v-if="diaryList.length === 0" class="empty-state">
            🍃 还没有写过日记，留下你的第一篇足迹吧
          </div>

          <div v-for="(item,index) in diaryList" class="history-item">
            <div class="item-header">
              <div class="item-meta">
                <span class="item-date">{{ item.date }}</span>
                <span class="item-week">{{ item.week }}</span>
                <span class="badge">{{ item.weather }} 天气</span>
                <span class="badge">{{ item.mood }} 心情</span>
              </div>
              <button class="delete-btn" @click="handleDeleteDiary(index)" title="删除">🗑️</button>
            </div>
            <p class="item-content">{{ item.content }}</p>
          </div>
        </div>
      </section>
    </div>
    <footer>
          <!-- <p>记录生活</p> -->
    </footer>
  </div>
</template>

<style scoped lang="scss">
// 变量配置，保持与你原项目的渐变和圆角风格统一
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$btn-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-bg: rgba(255, 255, 255, 0.85);
$card-border-radius: 20px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
footer{
  height: 100px;
  /* border-top: 1px solid white; */
}
.diary-container {
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  .diary-header {
    margin-bottom: 30px;
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 47, 255, 0.5);
      backdrop-filter: blur(4px);
      padding: 8px 16px;
      border-radius: 30px;
      color: #ffffff;
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
        background: #667eea;
        color: white;
        transform: translateX(-4px);
        
        .back-icon {
          transform: translateX(-2px);
        }
      }
    }
    .title {
      color: #667eea;
      font-size: 2.2rem;
      margin: 0 0 8px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .subtitle {
      color: #8397ec;
      margin: 0;
      font-size: 1rem;
    }
  }
}

.diary-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  
  // 响应式：在窄屏下改为上下单列布局
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

// ================= 写日记卡片样式 =================
.diary-write-card {
  background: $card-bg;
  backdrop-filter: blur(10px);
  border-radius: $card-border-radius;
  padding: 24px;
  box-shadow: 0 8px 32px 0 rgba(118, 75, 162, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  height: 480px;

  .card-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 16px;

    .date-tag {
      background: #eef2fe;
      color: #536be2;
      padding: 6px 14px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.9rem;
      align-self: flex-start;
    }

    .mood-selector {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .label {
        font-size: 0.9rem;
        color: #666;
      }

      .mood-options {
        display: flex;
        gap: 8px;

        .mood-btn {
          background: #f3f4f6;
          border: none;
          font-size: 1.3rem;
          padding: 6px;
          border-radius: 10px;
          cursor: pointer;
          transition: $transition;
          
          &:hover {
            transform: scale(1.15);
            background: #e2e8f0;
          }

          &.active {
            background: #ffeaa7;
            box-shadow: 0 4px 10px rgba(255, 234, 167, 0.5);
            transform: scale(1.2);
          }
        }
      }
    }
  }

  .diary-input {
    flex: 1;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 16px;
    font-size: 1rem;
    line-height: 1.6;
    color: #333;
    resize: none;
    background: rgba(255, 255, 255, 0.7);
    transition: $transition;

    &:focus {
      outline: none;
      border-color: #667eea;
      background: #fff;
      box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    .word-count {
      font-size: 0.85rem;
      color: #94a3b8;
    }

    .save-btn {
      background: $btn-gradient;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: $transition;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

      &:hover {
        opacity: 0.9;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

// ================= 历史列表样式 =================
.diary-history-section {
  display: flex;
  flex-direction: column;
  height: 480px;

  .section-title {
    margin: 0 0 16px 0;
    color: #5e99ff;
    font-size: 1.1rem;
  }

  .history-list {
    flex: 1;
    overflow-y: auto; // 列表超出时可滚动
    padding-right: 8px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    // 美化滚动条
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }

    .empty-state {
      text-align: center;
      color: #45c4ff;
      padding: 40px 0;
      font-size: 0.95rem;
    }

    .history-item {
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(226, 232, 240, 0.8);
      border-radius: 16px;
      padding: 16px;
      transition: $transition;

      &:hover {
        background: #fff;
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      }

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        .item-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;

          .item-date {
            font-weight: 600;
            color: #334155;
            font-size: 0.95rem;
          }
          .item-week {
            color: #64748b;
            font-size: 0.85rem;
          }
          .badge {
            background: #f1f5f9;
            color: #475569;
            padding: 2px 8px;
            border-radius: 6px;
            font-size: 0.75rem;
          }
        }

        .delete-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
          border-radius: 6px;
          transition: $transition;
          opacity: 0.4;

          &:hover {
            opacity: 1;
            background: #fee2e2;
          }
        }
      }

      .item-content {
        margin: 0;
        color: #515d6e;
        font-size: 0.95rem;
        line-height: 1.6;
        word-break: break-all;
        white-space: pre-wrap; // 保留换行符
      }
    }
  }
}
</style>