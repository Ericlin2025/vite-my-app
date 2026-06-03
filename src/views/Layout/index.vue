<template>
  <div class="home-container">
    <!-- 顶部 Header -->
    <video class="bg-video" autoplay muted loop playsinline>
      <source src="/video/首页视频背景.mp4" type="video/mp4">
    </video>
    <header class="app-header">
      <h1>🧩 我的功能中心</h1>
      <p>选择工具，提升效率</p>
    </header>
    <div class="banner">
       
          <el-carousel trigger="click" height="300px">
            <el-carousel-item v-for="item in features" :key="item">
              <RouterLink :to="item.path">
                <h2 class="small justify-center" text="2xl">{{item.icon}}{{ item.title }}</h2>
                <p>{{ item.description }}</p>
              </RouterLink>
            </el-carousel-item>
          </el-carousel>
        
    </div>
    <!-- 功能卡片网格 -->
     <h2>我的功能模块</h2>
    <div class="cards-grid">
      
      <!-- 遍历功能列表，生成卡片 -->
      <div
        v-for="feature in features"
        :key="feature.id"
        class="feature-card"
      >
        <div class="card-icon">{{ feature.icon }}</div>
        <h3>{{ feature.title }}</h3>
        <p>{{ feature.description }}</p>
        
        <!-- 开发过程笔记链接 -->
        <RouterLink :to="feature.detail" class="detail-link">
          <span class="notes-icon">📝</span>
          开发过程笔记
          <span class="arrow-icon">→</span>
        </RouterLink>
        
        <div class="card-footer">
          <span class="badge" :style="{ backgroundColor: feature.badgeColor }">
            {{ feature.status }}
          </span>
          <RouterLink :to="feature.path" class="use-link">
            去使用
            <span class="use-arrow">→</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- 底部 Footer -->
    <footer class="app-footer">
      <p>持续开发中... 更多有趣的功能即将到来</p>
    </footer>
  </div>
</template>

<script setup>

// 功能列表数据 —— 你只需要在这里添加新功能即可
const features = [
  {
    id: 1,
    title: '天气助手',
    description: '实时天气未来预报，获取生活建议',
    icon: '☀️',
    detail: '/detail/weather',
    path: '/weather',
    status: '已完成',
    badgeColor: '#4caf50'
  },
  {
    id: 2,
    title: '趣味问答',
    description: '测试知识库，挑战高分记录',
    icon: '🧠',
    detail: '/detail/questions',
    path: '/questions',
    status: '基本完成',
    badgeColor: '#4caf50'
  },
  // 待添加的示例功能（可复制修改）
  {
    id: 3,
    title: '待办事项',
    description: '高效管理你的日常任务清单',
    icon: '📝',
    detail: '/detail/todos',
    path: '/todos',
    status: '基本完成',
    badgeColor: '#4caf50'
  },
  {
    id: 4,
    title: '汇率转换',
    description: '实时汇率查询与转换',
    icon: '💰',
    detail: '/',
    path: '/',
    status: '规划中',
    badgeColor: '#9e9e9e'
  },
  {
  id: 5,
  title: '健身打卡',
  description: '记录每日运动，保持连续打卡',
  icon: '💪',
  detail: '/detail/fitness',
  path: '/fitness',
  status: '开发中',
  badgeColor: '#ffbd5a'  
}
]
</script>

<style scoped>
h2{
  color: #00f7ff;
}
/* 整体容器 */
.home-container {
  min-height: 100vh;
  /* background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%); */
  /* background-image: url(../../assets/img/bg/主页背景.jpg); */
  background-repeat: no-repeat;
  background-size: cover;
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  /* background-color: #ffbd5a; */
}

.bg-video {
 /* background-color: red; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
/* Header 样式 */
.app-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease;
}

.app-header h1 {
  font-size: 2.5rem;
  color: #2369ff;
  margin-bottom: 0.5rem;
}

.app-header p {
  font-size: 1.1rem;
  color: #157aff;
}
.banner{
  width: 1000px;
  height: 400px;
  margin: 0 auto;
  margin-bottom: 50px;
  /* border-bottom: 1px solid black; */
  .demonstration {
  color: var(--el-text-color-secondary);
  /* background-color: gray; */
}

.el-carousel__item h2 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}
.el-carousel__item p {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
 .el-carousel__item{
 
  background-color: rgba(209, 209, 209, 0.562);
 }
}
/* 卡片网格 - 响应式布局 */
.cards-grid {
  /* flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem; */
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  /* max-width: 1500px; */
  margin: 0 auto;
  /* border-top: 1px solid black; */
  padding: 20px ;
  width: 100%;
  padding-bottom: 2rem;
}

/* 单个卡片样式 */
.feature-card {
  background: white;
  border-radius: 24px;
  padding: 1.8rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(0px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 350px;
  width: 340px;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  border-color: #fff;
}

/* 卡片图标 */
.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  flex: 1;
}

/* 开发过程笔记链接样式 */
.detail-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f0f4ff;
  color: #5b6ebe;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  transition: all 0.2s ease;
  width: fit-content;
}

.detail-link .notes-icon {
  font-size: 1rem;
}

.detail-link .arrow-icon {
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.detail-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateX(3px);
}

.detail-link:hover .arrow-icon {
  transform: translateX(3px);
}

/* 卡片底部：状态标签 + 使用链接 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid #eef2ff;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

/* 去使用链接样式 */
.use-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.use-link .use-arrow {
  font-size: 1rem;
  transition: transform 0.2s;
}

.use-link:hover {
  transform: translateX(3px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.use-link:hover .use-arrow {
  transform: translateX(3px);
}

/* 底部 Footer */
.app-footer {
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  color: #94a3b8;
  font-size: 0.85rem;
}

/* 简单动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .home-container {
    padding: 1rem;
  }
  .app-header h1 {
    font-size: 1.8rem;
  }
  .cards-grid {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 1.4rem;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .use-link {
    justify-content: center;
  }
  
  .detail-link {
    width: auto;
    justify-content: center;
  }
}
</style>