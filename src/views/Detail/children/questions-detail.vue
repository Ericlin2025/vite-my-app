<template>
  <div class="dev-notes-container">
    <!-- 返回按钮和标题区域 -->
    <div class="notes-header">
      <RouterLink to="/" class="back-btn">
        <span class="back-icon">←</span>
        返回功能中心
      </RouterLink>
      <div class="header-content">
        <div class="project-icon">🧠</div>
        <h1 class="project-title">趣味问答 · 开发笔记</h1>
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
          <p>趣味问答是一个基于 Vue 3、Vite、Vue Router 和 Axios 开发的知识挑战类 Web 应用。用户可以选择题目数量、分类、难度和题型，进行在线答题挑战，系统会自动统计准确率并展示错题回顾。</p>
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
              <span class="page-icon">⚙️</span>
              <h3>问答主页（Layout）</h3>
            </div>
            <p>负责整合所有组件。页面包含设置区域和答题区域两部分。用户先在设置表单中选择题目参数（数量、分类、难度、题型），点击获取问题后，父组件调用 API 获取数据，再通过 props 传递给子组件展示。</p>
            <div class="page-note">
              <span class="note-tag">💡 流程</span>
              <span>选择参数 → 获取问题 → 展示题目 → 用户作答 → 计算准确率</span>
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

      <!-- 技术难点记录 -->
      

      <!-- 技术栈标签 -->
      <div class="tech-stack">
        <span class="tech-label">🛠️ 技术栈</span>
        <div class="tech-tags">
          <span class="tag">Vue 3</span>
          <span class="tag">Vite</span>
          <span class="tag">Vue Router</span>
          <span class="tag">Axios</span>
          <span class="tag">SCSS</span>
          <span class="tag">Open Trivia DB API</span>
        </div>
      </div>

      <!-- 待优化项 -->
      <div class="todo-card">
        <div class="todo-header">
          <span class="todo-icon">🚧</span>
          <h3>待完善功能</h3>
        </div>
        <ul class="todo-list">
          <li>🔜 添加倒计时功能（每题限时作答）</li>
          <li>🔜 错题本功能（收集错题，支持重做）</li>
          <li>🔜 排行榜功能（本地存储高分记录）</li>
          <li>🔜 分享功能（分享答题成绩）</li>
          <li>🔜 更多题型支持（填空、匹配等）</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件数据
const components = [
  {
    name: 'InputCard 组件',
    icon: '📝',
    status: '已启用',
    description: '问题参数设置表单，包括数量、分类、难度、题型选择',
    detail: '支持数量1-50，难度简单/中等/困难，题型选择题/判断题'
  },
  {
    name: 'QuestionsList 组件',
    icon: '📋',
    status: '已启用',
    description: '题目展示列表，包含选择题和判断题的渲染',
    detail: '支持选项随机打乱、选中高亮、答题结果展示'
  },
  {
    name: 'QuestionCard 组件（内置）',
    icon: '🃏',
    status: '已启用',
    description: '单个题目的卡片组件，包含选项和结果反馈',
    detail: '根据题型动态渲染，支持点击选择和状态变化'
  }
]

const apis = [
  {
    name: '获取题目接口',
    icon: '❓',
    active: true,
    description: '对接 Open Trivia DB，支持数量、分类、难度、题型参数',
    endpoint: 'https://opentdb.com/api.php'
  },
  {
    name: '获取分类接口',
    icon: '📂',
    active: true,
    description: '获取所有题目分类列表，用于下拉选择',
    endpoint: 'https://opentdb.com/api_category.php'
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
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    
    .feature-item {
      background: #f8fafc;
      border-radius: 14px;
      padding: 18px;
      
      .feature-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        
        .feature-icon {
          font-size: 1.5rem;
        }
        
        h4 {
          margin: 0;
          color: #1e293b;
        }
      }
      
      p {
        color: #475569;
        font-size: 0.85rem;
        line-height: 1.5;
        margin: 0 0 12px 0;
      }
      
      .feature-code {
        display: block;
        background: #1e293b;
        color: #a5f3c3;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.7rem;
        font-family: monospace;
        overflow-x: auto;
      }
    }
  }
  
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
          word-break: break-all;
        }
      }
    }
  }
  
  .difficult-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .difficult-item {
      background: #f8fafc;
      border-radius: 14px;
      padding: 16px;
      
      .difficult-question {
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 8px;
      }
      
      .difficult-answer {
        color: #475569;
        font-size: 0.9rem;
        margin-bottom: 10px;
      }
      
      .difficult-code {
        display: block;
        background: #1e293b;
        color: #a5f3c3;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.7rem;
        font-family: monospace;
        overflow-x: auto;
      }
    }
  }
  
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
    .api-grid,
    .features-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>