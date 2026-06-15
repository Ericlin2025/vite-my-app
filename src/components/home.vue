<script setup>
import { features } from '@/api/features';
import { ref } from 'vue';
const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')||'null'))
</script>

<template>
 <div class="banner">
       
          <el-carousel trigger="click" height="750px">
            <el-carousel-item 
            v-for="item in features" 
            :key="item" 
            >
              
                <img :src='item.src' alt="">
                <div class="app">
                    <h2 class="small justify-center" text="2xl">{{item.icon}}{{ item.title }}</h2>
                    <p>{{ item.description }}</p>
                    
                </div>
                <RouterLink :to="item.path" v-if="userInfo!==null">去使用→</RouterLink>
              
            </el-carousel-item>
          </el-carousel>
        
    </div>
    <!-- 功能卡片网格 -->
    <!-- <img src="../assets/img/bg/weather.jpg" alt=""> -->
    <div class="cards">
        <div class="tt">
            <h2>全部功能</h2>
        </div>
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
            <span class="badge" :style="{ backgroundColor: feature.completed?'#4caf50':'#9e9e9e' }">
                {{ feature.completed?'已完成':'开发中' }}
            </span>
            <RouterLink :to="feature.path" class="use-link" v-if="userInfo!==null">
                去使用
                <span class="use-arrow">→</span>
            </RouterLink>
            </div>
        </div>
    </div>

    </div>
   
 

</template>

<style scoped lang="scss">

.banner{
  width: 100%;
  height: 700px;
  margin: 0 auto;
  margin-bottom: 50px;
  /* border-bottom: 1px solid black; */
  .demonstration {
  color: var(--el-text-color-secondary);
  /* background-color: gray; */
}

//修改其他组件样式要使用深度选择器deep

:deep(.el-carousel__arrow) {
    background-color: rgb(0, 195, 255);
    width: 45px;
    height: 45px;
    
}
:deep(.el-carousel__indicators) {
        bottom: 20px;  // 调整到底部位置
        left: 80%;
    }
:deep(.el-carousel__indicator) {
    // position: absolute;
    // right: 0;
    // top: 80%;
    .el-carousel__button{
    width: 18px;
    height:18px;
    border-radius: 9px;
    background-color: rgb(0, 195, 255);
    }
    &.is-active{
        .el-carousel__button{
            width: 40px;
        }
    }
}
.el-carousel__item img{
    width: 100%;
    height: 100%;
    position: absolute;
}
.el-carousel__item .app{
    width: 200px;
    height: 200px;
    // border: 1px solid black;
    border-radius: 8px;
    position: absolute;
    top: 30%;
    left: 20%;
    background-color: rgba(255, 255, 255, 0.493);
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    box-shadow: 10px 10px 30px black;
    // animation: fadeInUp 0.6s ease-out 0.2s both;
    
    
}
.el-carousel__item a{
        min-width: 160px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(0, 195, 255);
        color: white;
        font-size: 20px;
        text-align: center;
        border-radius: 20px;
        // z-index: 888;
        position: absolute;
        top: 60%;
        left: 21%;
    }
.el-carousel__item h2 {
  color: #006eff;
//   opacity: 0.75;
//   line-height: 300px;
  margin: 0;
  text-align: center;
  margin-bottom: 10px;
}
.el-carousel__item p {
  color: #006eff;
//   opacity: 0.75;
//   line-height: 150px;
  margin: 0;
  text-align: center;
  margin-bottom: 40px;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
//  .el-carousel__item{

// //   background-color: rgba(209, 209, 209, 0.562);
//  }
}
.cards{
padding: 20px ;
.tt{
    width: 1600px;
    margin: 0 auto;
    h2{
        color: white;
    }
    margin-bottom: 20px;
}
}
/* 卡片网格 - 响应式布局 */
.cards-grid {
 
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  /* max-width: 1500px; */
  margin: 0 auto;
  /* border-top: 1px solid black; */
//   padding: 20px ;
  width: 1600px;
  /* height: 1000px; */
  padding-bottom: 2rem;
}

/* 单个卡片样式 */
.feature-card {
  /* display: flex;
  justify-content: center; */
  background: rgba(255, 255, 255, 0.808);
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