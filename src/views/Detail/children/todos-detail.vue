<template>
  <div class="dev-notes-container">
    <!-- 返回按钮和标题区域 -->
    <div class="notes-header">
      <RouterLink to="/" class="back-btn">
        <span class="back-icon">←</span>
        返回功能中心
      </RouterLink>
      <div class="header-content">
        <div class="project-icon">📋</div>
        <h1 class="project-title">待办清单 · 开发笔记</h1>
        <p class="project-subtitle">记录时间管理工具的开发细节与实现思路</p>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="notes-content">
      <!-- 项目概览卡片 -->
      <div class="overview-card">
        <div class="card-icon">🎯</div>
        <div class="overview-text">
          <h3>项目概述</h3>
          <p>待办清单是一个基于 Vue 3 的任务管理工具，支持任务的增删改查、优先级设置、到期时间管理，以及实时倒计时功能。</p>
        </div>
      </div>

      <!-- 核心功能模块 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">✨</span>
          <h2>核心功能</h2>
        </div>
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-header">
              <span class="feature-icon">📝</span>
              <h3>任务管理</h3>
            </div>
            <p>支持添加、删除待办事项，实时更新任务列表。每个任务包含标题、优先级、创建时间、到期时间等完整信息。</p>
            <div class="feature-note">
              <span class="note-tag">💡 实现</span>
              <span>使用 v-for 动态渲染，splice 方法实现删除</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-header">
              <span class="feature-icon">⚡</span>
              <h3>优先级管理</h3>
            </div>
            <p>支持高、中、低三级优先级，不同优先级用不同颜色标识，方便用户快速识别任务重要程度。</p>
            <div class="feature-note">
              <span class="note-tag">🎨 样式</span>
              <span>高优先级(红)、中优先级(黄)、低优先级(绿)</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-header">
              <span class="feature-icon">⏰</span>
              <h3>倒计时功能</h3>
            </div>
            <p>实时显示任务到期剩余时间，支持天/时/分/秒的精确展示，到期后显示"已过期"提示。</p>
            <div class="feature-note">
              <span class="note-tag">⚙️ 技术</span>
              <span>setInterval + dayjs 插件，每秒刷新倒计时</span>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-header">
              <span class="feature-icon">📅</span>
              <h3>日期选择器</h3>
            </div>
            <p>集成 Element Plus 日历组件，可视化选择到期时间，提升用户体验。</p>
            <div class="feature-note">
              <span class="note-tag">📦 依赖</span>
              <span>Element Plus Calendar 组件</span>
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

      <!-- 数据流设计 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">🔄</span>
          <h2>数据流设计</h2>
        </div>
        <div class="dataflow-content">
          <div class="flow-diagram">
            <div class="flow-step">
              <div class="step-icon">1</div>
              <div class="step-content">
                <h4>父组件状态管理</h4>
                <p>todoList 数组存储所有待办事项，通过 defineProps 传递给子组件</p>
                <code class="code-block">const todoList = ref([...])</code>
              </div>
            </div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step">
              <div class="step-icon">2</div>
              <div class="step-content">
                <h4>子组件表单录入</h4>
                <p>用户输入任务内容、选择优先级和到期时间，通过 emit 向父组件发送添加请求</p>
                <code class="code-block">emits('addtodo', title, priority, deadline)</code>
              </div>
            </div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step">
              <div class="step-icon">3</div>
              <div class="step-content">
                <h4>父组件添加任务</h4>
                <p>接收子组件数据，生成唯一 ID 和时间戳，添加到 todoList 中</p>
                <code class="code-block">todoList.value.push({ id, title, priority, ctime, dtime })</code>
              </div>
            </div>
            <div class="flow-arrow">↓</div>
            <div class="flow-step">
              <div class="step-icon">4</div>
              <div class="step-content">
                <h4>列表组件渲染</h4>
                <p>接收更新后的 todoList，重新渲染列表，实时更新统计数据</p>
                <code class="code-block">completedlist = computed(...)</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 关键技术点 -->
      <!-- <div class="section-card">
        <div class="section-title">
          <span class="title-icon">💎</span>
          <h2>关键技术点</h2>
        </div>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tech-header">
              <span class="tech-icon">⏱️</span>
              <h4>实时倒计时</h4>
            </div>
            <p>使用 setInterval 每秒更新当前时间戳，通过 computed 计算每个任务与当前时间的差值，格式化为天/时/分/秒。</p>
            <div class="warning-note">
              <span>⚠️ 注意组件卸载时清除定时器，避免内存泄漏</span>
            </div>
          </div>
          <div class="tech-card">
            <div class="tech-header">
              <span class="tech-icon">🎨</span>
              <h4>动态样式绑定</h4>
            </div>
            <p>根据任务状态（完成/未完成）、优先级（高/中/低）、倒计时状态（正常/紧急/过期）动态绑定不同的 CSS 类。</p>
            <div class="code-snippet">
              <code>:class="{ completed: t.completed }"</code>
            </div>
          </div>
          <div class="tech-card">
            <div class="tech-header">
              <span class="tech-icon">📊</span>
              <h4>计算属性统计</h4>
            </div>
            <p>使用 computed 自动计算已完成任务数量和完成率，当任务状态变化时自动更新。</p>
            <div class="code-snippet">
              <code>const completedlist = computed(() => data.filter(i => i.completed).length)</code>
            </div>
          </div>
          <div class="tech-card">
            <div class="tech-header">
              <span class="tech-icon">📅</span>
              <h4>时间格式化</h4>
            </div>
            <p>集成 dayjs 库处理时间戳格式化和倒计时计算，使用 duration 插件扩展时间差计算功能。</p>
            <div class="code-snippet">
              <code>dayjs.extend(duration)</code>
            </div>
          </div>
        </div>
      </div> -->

      <!-- 技术栈标签 -->
      <div class="tech-stack">
        <span class="tech-label">🛠️ 技术栈</span>
        <div class="tech-tags">
          <span class="tag">Vue 3</span>
          <span class="tag">Vite</span>
          <span class="tag">Composition API</span>
          <span class="tag">Element Plus</span>
          <span class="tag">Day.js</span>
          <span class="tag">SCSS</span>
          <span class="tag">响应式设计</span>
        </div>
      </div>

      <!-- 待优化项 -->
      <div class="todo-card">
        <div class="todo-header">
          <span class="todo-icon">🚧</span>
          <h3>待完善功能</h3>
        </div>
        <ul class="todo-list">
          <li>💾 接入 localStorage 实现数据持久化</li>
          <li>✏️ 支持任务编辑功能</li>
          <li>🔍 添加搜索和筛选功能（按优先级/状态）</li>
          <li>📱 移动端手势优化（滑动删除）</li>
          <li>🔔 到期推送通知（Notification API）</li>
          <li>📊 任务统计图表（完成率趋势）</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件数据
const components = [
  {
    name: 'TodoInput 组件',
    icon: '✏️',
    status: '已启用',
    description: '任务录入表单，包含任务名称输入、优先级选择、日期选择器',
    detail: '使用 v-model 双向绑定表单数据，通过 emit 向父组件传递新增任务'
  },
  {
    name: 'TodoList 组件',
    icon: '📋',
    status: '已启用',
    description: '任务列表展示组件，支持状态切换和删除操作',
    detail: '接收父组件的 todoList 数据，通过 props 传递，通过 emit 向父组件发送操作指令'
  },
  {
    name: 'Calendar 组件',
    icon: '📅',
    status: '已启用',
    description: 'Element Plus 日历组件，用于选择任务到期时间',
    detail: '集成 el-calendar，支持日期切换和快速选择'
  },
  {
    name: 'PrioritySelector',
    icon: '⚡',
    status: '已启用',
    description: '优先级选择器，高/中/低三级',
    detail: '通过动态 class 实现不同优先级的视觉区分'
  },
  {
    name: 'CountdownTimer',
    icon: '⏰',
    status: '已启用',
    description: '倒计时显示组件，实时更新剩余时间',
    detail: '使用 setInterval + dayjs 实现每秒刷新，组件卸载时清理定时器'
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
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    
    .feature-item {
      background: #f8fafc;
      border-radius: 16px;
      padding: 20px;
      transition: all 0.2s;
      
      &:hover {
        background: #f1f5f9;
        transform: translateY(-2px);
      }
      
      .feature-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        
        .feature-icon {
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
      
      .feature-note {
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
  
  .dataflow-content {
    .flow-diagram {
      display: flex;
      flex-direction: column;
      gap: 16px;
      
      .flow-step {
        display: flex;
        gap: 20px;
        align-items: flex-start;
        
        .step-icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .step-content {
          flex: 1;
          
          h4 {
            margin: 0 0 8px 0;
            color: #1e293b;
          }
          
          p {
            margin: 0 0 8px 0;
            color: #475569;
            line-height: 1.5;
          }
          
          .code-block {
            background: #1e293b;
            color: #e2e8f0;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.85rem;
            display: inline-block;
            font-family: monospace;
          }
        }
      }
      
      .flow-arrow {
        text-align: center;
        font-size: 1.5rem;
        color: #667eea;
        margin: -8px 0;
      }
    }
  }
  
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    
    .tech-card {
      background: #f8fafc;
      border-radius: 14px;
      padding: 18px;
      
      .tech-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
        
        .tech-icon {
          font-size: 1.5rem;
        }
        
        h4 {
          margin: 0;
          color: #1e293b;
        }
      }
      
      p {
        margin: 0 0 12px 0;
        color: #475569;
        line-height: 1.5;
        font-size: 0.9rem;
      }
      
      .warning-note {
        background: #fef3c7;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.8rem;
        color: #92400e;
      }
      
      .code-snippet {
        background: #1e293b;
        padding: 8px 12px;
        border-radius: 8px;
        
        code {
          color: #a5f3c3;
          font-size: 0.8rem;
          font-family: monospace;
        }
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
    
    .feature-grid,
    .tech-grid {
      grid-template-columns: 1fr;
    }
    
    .flow-diagram .flow-step {
      flex-direction: column;
      
      .step-icon {
        margin: 0 auto;
      }
      
      .step-content {
        text-align: center;
      }
    }
  }
}
</style>