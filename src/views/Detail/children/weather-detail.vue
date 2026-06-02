<template>
  <div class="dev-notes-container">
    <!-- 返回按钮和标题区域 -->
    <div class="notes-header">
      <RouterLink to="/" class="back-btn">
        <span class="back-icon">←</span>
        返回功能中心
      </RouterLink>
      <div class="header-content">
        <div class="project-icon">☀️</div>
        <h1 class="project-title">天气助手 · 开发笔记</h1>
        <p class="project-subtitle">记录开发过程中的技术细节与实现思路</p>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="notes-content">
      <!-- 项目概览卡片 -->
      <div class="overview-card">
        <div class="card-icon">🎯</div>
        <div class="overview-text">
          <h3>项目概述</h3>
          <p>天气助手是一个基于 Vue 3、Vite、Vue Router 和 Axios 开发的天气类 Web 应用。</p>
        </div>
      </div>

      <!-- 核心页面模块 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">📱</span>
          <h2>核心页面</h2>
        </div>
        <div class="page-grid">
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">🏠</span>
              <h3>天气主页（Layout）</h3>
            </div>
            <p>负责把所有模块串起来。页面背景用了必应每日图加渐变效果。用户搜索城市后，父页面会先调地理编码接口拿经纬度；如果找到了，就同时去拉实时天气、五天预报、随机诗词和静态地图；如果没找到，会提示未找到该城市。</p>
            <div class="page-note">
              <span class="note-tag">💡 流程</span>
              <span>输入城市 → 查经纬度 → 查当天天气 → 查未来预报 → 拉诗词 → 拉地图</span>
            </div>
          </div>
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">📔</span>
              <h3>天气随笔（Diary）</h3>
            </div>
            <p>左侧写日记区域，可以输入正文、选择天气（晴/雨）、选择心情（6种表情），显示当前日期和字数统计。保存后将数据存入 localStorage。右侧历史记录区域展示所有日记，支持逐条删除。</p>
            <div class="page-note">
              <span class="note-tag">💾 持久化</span>
              <span>localStorage + watch 监听，刷新页面数据不丢失</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 组件拆解模块 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">🧩</span>
          <h2>组件构成</h2>
        </div>
        
        <div class="components-list">
          <div class="component-card" v-for="comp in components" :key="comp.name">
            <div class="comp-header">
              <span class="comp-icon">{{ comp.icon }}</span>
              <h3>{{ comp.name }}</h3>
              <span class="comp-status" :class="comp.status === '已启用' ? 'status-active' : 'status-pending'">
                {{ comp.status }}
              </span>
            </div>
            <p class="comp-desc">{{ comp.description }}</p>
            <div class="comp-detail" v-if="comp.detail">
              <span class="detail-label">📌 详情：</span>
              <span>{{ comp.detail }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- API 封装模块 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">🔌</span>
          <h2>API 接口封装</h2>
        </div>
        <div class="api-grid">
          <div class="api-item" v-for="api in apis" :key="api.name">
            <div class="api-header">
              <span class="api-icon">{{ api.icon }}</span>
              <span class="api-name">{{ api.name }}</span>
              <span class="api-status" :class="api.active ? 'status-active' : 'status-inactive'">
                {{ api.active ? '已启用' : '待启用' }}
              </span>
            </div>
            <p class="api-desc">{{ api.description }}</p>
            <div class="api-endpoint" v-if="api.endpoint">
              <code>{{ api.endpoint }}</code>
            </div>
          </div>
        </div>
      </div>

      <!-- 技术栈标签 -->
      <div class="tech-stack">
        <span class="tech-label">🛠️ 技术栈</span>
        <div class="tech-tags">
          <span class="tag">Vue 3</span>
          <span class="tag">Vite</span>
          <span class="tag">Vue Router</span>
          <span class="tag">Axios</span>
          <span class="tag">SCSS</span>
          <span class="tag">Day.js</span>
          <span class="tag">OpenWeather API</span>
          <span class="tag">高德地图 API</span>
          <span class="tag">一言 API</span>
        </div>
      </div>

      <!-- 待优化项 -->
      <div class="todo-card">
        <div class="todo-header">
          <span class="todo-icon">🚧</span>
          <h3>待完善功能</h3>
        </div>
        <ul class="todo-list">
          <li>🔜 Pexels 图片接口集成（根据天气关键词搜背景图）</li>
          <li>🔜 七天预报接口（目前为付费内容，已注释）</li>
          <li>🔜 旧版预报组件清理（已替换为按天聚合版本）</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件数据
const components = [
  {
    name: 'Header 组件',
    icon: '📌',
    status: '已启用',
    description: '应用标题和实时时钟，显示距离日落剩余时间',
    detail: '使用 dayjs 每秒刷新时间，根据日落时间戳计算倒计时'
  },
  {
    name: 'SearchCard 组件',
    icon: '🔍',
    status: '已启用',
    description: '城市搜索输入框、热门城市标签、搜索历史管理',
    detail: '支持回车搜索，8个热门城市快速选择，历史记录可单条删除/一键清空'
  },
  {
    name: 'WeatherCard 组件',
    icon: '🌤️',
    status: '已启用',
    description: '展示当前天气、温度、体感温度、湿度等详细数据',
    detail: '卡片背景根据天气类型（晴/雨/云/雪）自动切换主题'
  },
  {
    name: 'ForecastCard1 组件',
    icon: '📅',
    status: '已启用',
    description: '5天天气预报，按日期合并每3小时数据',
    detail: '展示每天最高温、最低温、湿度、风速和天气描述'
  },
  {
    name: 'ForecastCard 组件',
    icon: '⏰',
    status: '已废弃',
    description: '旧版预报组件，直接展示每3小时数据',
    detail: '已被 ForecastCard1 替代'
  },
  {
    name: 'LifeCard 组件',
    icon: '💡',
    status: '已启用',
    description: '每日文学推荐、天气评价、运动建议',
    detail: '调用一言接口，根据体感温度和天气类型给出生活建议'
  },
  {
    name: 'MapCard 组件',
    icon: '🗺️',
    status: '已启用',
    description: '高德静态地图展示',
    detail: '主要适合国内城市，国外城市可能显示不佳'
  }
]

const apis = [
  {
    name: '天气接口',
    icon: '🌦️',
    active: true,
    description: '对接 OpenWeather，包括实时天气、经纬度查询、5天预报',
    endpoint: '/weather/*'
  },
  {
    name: '诗词接口',
    icon: '📖',
    active: true,
    description: '对接一言 API，获取随机句子',
    endpoint: '/poems/*'
  },
  {
    name: '地图接口',
    icon: '🗺️',
    active: true,
    description: '对接高德静态地图 API',
    endpoint: '/map/*'
  },
  {
    name: '图片接口',
    icon: '🖼️',
    active: false,
    description: '对接 Pexels，按关键词搜索背景图',
    endpoint: '/img/* (待启用)'
  }
]
</script>

<style scoped lang="scss">
.dev-notes-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 24px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e9edf2 100%);
  min-height: 100vh;

  // 返回按钮
  .notes-header {
    margin-bottom: 32px;
    
    .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(102, 126, 234, 0.15);
      backdrop-filter: blur(4px);
      padding: 8px 16px;
      border-radius: 30px;
      color: #667eea;
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
    
    .header-content {
      text-align: center;
      
      .project-icon {
        font-size: 4rem;
        margin-bottom: 8px;
      }
      
      .project-title {
        font-size: 2.2rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0 0 8px 0;
      }
      
      .project-subtitle {
        color: #64748b;
        margin: 0;
        font-size: 1rem;
      }
    }
  }
  
  .notes-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  // 概览卡片
  .overview-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 20px;
    padding: 24px 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: white;
    box-shadow: 0 10px 25px -5px rgba(102, 126, 234, 0.3);
    
    .card-icon {
      font-size: 3rem;
      background: rgba(255,255,255,0.2);
      padding: 12px;
      border-radius: 18px;
    }
    
    .overview-text {
      h3 {
        margin: 0 0 8px 0;
        font-size: 1.3rem;
      }
      p {
        margin: 0;
        opacity: 0.9;
        line-height: 1.5;
      }
    }
  }
  
  // 通用卡片样式
  .section-card {
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    
    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
      padding-bottom: 12px;
      border-bottom: 2px solid #eef2ff;
      
      .title-icon {
        font-size: 1.5rem;
      }
      
      h2 {
        margin: 0;
        font-size: 1.4rem;
        color: #1e293b;
      }
    }
  }
  
  // 页面网格
  .page-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    
    .page-item {
      background: #f8fafc;
      border-radius: 16px;
      padding: 20px;
      transition: all 0.2s;
      
      &:hover {
        background: #f1f5f9;
        transform: translateY(-2px);
      }
      
      .page-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        
        .page-icon {
          font-size: 1.8rem;
        }
        
        h3 {
          margin: 0;
          color: #334155;
        }
      }
      
      p {
        color: #475569;
        line-height: 1.6;
        margin: 0 0 16px 0;
      }
      
      .page-note {
        background: #eef2ff;
        padding: 10px 12px;
        border-radius: 12px;
        font-size: 0.85rem;
        color: #4338ca;
        
        .note-tag {
          font-weight: 600;
          margin-right: 8px;
        }
      }
    }
  }
  
  // 组件列表
  .components-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .component-card {
      background: #f8fafc;
      border-radius: 14px;
      padding: 16px 20px;
      transition: all 0.2s;
      
      &:hover {
        background: #f1f5f9;
        transform: translateX(4px);
      }
      
      .comp-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
        
        .comp-icon {
          font-size: 1.4rem;
        }
        
        h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #1e293b;
        }
        
        .comp-status {
          margin-left: auto;
          font-size: 0.7rem;
          padding: 2px 10px;
          border-radius: 20px;
          font-weight: 500;
          
          &.status-active {
            background: #dcfce7;
            color: #166534;
          }
          
          &.status-pending {
            background: #fed7aa;
            color: #9a3412;
          }
        }
      }
      
      .comp-desc {
        margin: 0 0 8px 0;
        color: #475569;
        font-size: 0.9rem;
        line-height: 1.5;
      }
      
      .comp-detail {
        font-size: 0.8rem;
        color: #64748b;
        
        .detail-label {
          font-weight: 500;
        }
      }
    }
  }
  
  // API 网格
  .api-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 16px;
    
    .api-item {
      background: #f8fafc;
      border-radius: 14px;
      padding: 16px;
      
      .api-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        
        .api-icon {
          font-size: 1.3rem;
        }
        
        .api-name {
          font-weight: 600;
          color: #1e293b;
        }
        
        .api-status {
          margin-left: auto;
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 20px;
          
          &.status-active {
            background: #dcfce7;
            color: #166534;
          }
          
          &.status-inactive {
            background: #fee2e2;
            color: #991b1b;
          }
        }
      }
      
      .api-desc {
        margin: 0 0 10px 0;
        font-size: 0.85rem;
        color: #475569;
        line-height: 1.5;
      }
      
      .api-endpoint {
        code {
          background: #e2e8f0;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          color: #1e293b;
        }
      }
    }
  }
  
  // 技术栈
  .tech-stack {
    background: white;
    border-radius: 20px;
    padding: 20px 24px;
    
    .tech-label {
      display: block;
      font-weight: 600;
      margin-bottom: 14px;
      color: #334155;
      font-size: 0.9rem;
    }
    
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      
      .tag {
        background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
        padding: 6px 14px;
        border-radius: 30px;
        font-size: 0.8rem;
        font-weight: 500;
        color: #4338ca;
        transition: all 0.2s;
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 8px rgba(67, 56, 202, 0.2);
        }
      }
    }
  }
  
  // 待办卡片
  .todo-card {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-radius: 20px;
    padding: 20px 24px;
    
    .todo-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      
      .todo-icon {
        font-size: 1.5rem;
      }
      
      h3 {
        margin: 0;
        color: #92400e;
        font-size: 1.2rem;
      }
    }
    
    .todo-list {
      margin: 0;
      padding-left: 20px;
      
      li {
        color: #78350f;
        margin: 8px 0;
        line-height: 1.5;
      }
    }
  }
  
  // 响应式
  @media (max-width: 768px) {
    padding: 20px 16px;
    
    .notes-header .header-content .project-title {
      font-size: 1.6rem;
    }
    
    .overview-card {
      flex-direction: column;
      text-align: center;
      
      .card-icon {
        font-size: 2.5rem;
      }
    }
    
    .page-grid,
    .api-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>