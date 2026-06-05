<script setup>
import { features } from '@/api/features';
const completed = features.filter(i=>i.completed===true)
const uncomplete = features.filter(i=>i.completed===false)
</script>

<template>
    <div class="feat">
        <div class="banner"></div>
        <div class="bd">
            <div class="completed">
                <div class="tt">
                    <h2>已完成功能</h2>
                </div>
                 <div class="items">
                    <div
            v-for="feature in completed"
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
            
            </div>
            <div class="uncomplete">
               <div class="tt">
                <h2>未完成功能</h2>
               </div>
               <div class="items">
                <div
            v-for="feature in uncomplete"
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
            </div>
         </div>
    </div>
</template>

<style scoped lang="scss">
.banner{
    height: 650px;
    background-color: white;
    background-image: url(../assets/img/bg/功能页banner.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}
.completed,
.uncomplete{
    width: 90%;
    margin: 0 auto;
    .tt{
    margin: 30px 0;
    h2{
    color: white;
}
}
.items{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
}
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
</style>