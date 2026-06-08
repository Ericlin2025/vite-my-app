<template>
  <div class="dev-notes-container">
    <!-- 返回按钮和标题区域 -->
    <div class="notes-header">
      <RouterLink to="/" class="back-btn">
        <span class="back-icon">←</span>
        返回功能中心
      </RouterLink>
      <div class="header-content">
        <div class="project-icon">💪</div>
        <h1 class="project-title">健身打卡 · 开发笔记</h1>
        <p class="project-subtitle">记录健身打卡模块的开发过程与技术细节</p>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="notes-content">
      <!-- 项目概览卡片 -->
      <div class="overview-card">
        <div class="card-icon">🎯</div>
        <div class="overview-text">
          <h3>项目概述</h3>
          <p>健身打卡模块是一个基于 Vue 3 的健身记录 Web 应用，支持每日打卡、训练详情记录、热力图展示、数据可视化分析等功能。</p>
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
              <span class="page-icon">🏋️</span>
              <h3>健身打卡主页</h3>
            </div>
            <p>负责整合所有健身打卡相关组件。包含打卡按钮、训练详情表单、热力图展示、数据统计图表和历史记录等模块，形成完整的打卡闭环。</p>
            <div class="page-note">
              <span class="note-tag">💡 流程</span>
              <span>填写训练信息 → 点击打卡 → 更新热力图 → 刷新统计图表 → 保存到本地</span>
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

      <!-- 数据可视化模块 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">📊</span>
          <h2>数据可视化</h2>
        </div>
        <div class="api-grid">
          <div class="api-item" v-for="chart in charts" :key="chart.name">
            <div class="api-header">
              <span class="api-icon">{{ chart.icon }}</span>
              <span class="api-name">{{ chart.name }}</span>
              <span class="api-status" :class="chart.active ? 'status-active' : 'status-inactive'">
                {{ chart.active ? '已集成' : '待集成' }}
              </span>
            </div>
            <p class="api-desc">{{ chart.description }}</p>
            <div class="api-endpoint" v-if="chart.tech">
              <code>{{ chart.tech }}</code>
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
          <span class="tag">SCSS</span>
          <span class="tag">Day.js</span>
          <span class="tag">ECharts</span>
          <span class="tag">vue-echarts</span>
          <span class="tag">localStorage</span>
        </div>
      </div>

      <!-- 功能特性 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">✨</span>
          <h2>核心功能</h2>
        </div>
        <div class="page-grid">
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">✅</span>
              <h3>每日打卡</h3>
            </div>
            <p>支持记录训练时长、训练部位（腿部/胸部/肩部/手臂/背部/腹部）和训练笔记。打卡后自动判断今日是否已打卡，防止重复打卡。</p>
          </div>
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">🗓️</span>
              <h3>热力图展示</h3>
            </div>
            <p>以日历网格形式展示当月打卡情况，已打卡日期高亮显示。支持补签功能（仅限过去日期）。</p>
          </div>
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">📈</span>
              <h3>训练趋势图表</h3>
            </div>
            <p>使用 ECharts 展示训练时长折线图，直观反映训练强度变化趋势。</p>
          </div>
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">🥧</span>
              <h3>部位占比图表</h3>
            </div>
            <p>使用 ECharts 饼图展示各训练部位占比，帮助用户了解训练均衡性。</p>
          </div>
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">📝</span>
              <h3>历史记录管理</h3>
            </div>
            <p>展示所有打卡记录详情，支持删除记录（取消打卡）。</p>
          </div>
          <div class="page-item">
            <div class="page-header">
              <span class="page-icon">💾</span>
              <h3>本地数据持久化</h3>
            </div>
            <p>使用 localStorage 存储打卡数据，配合 watch 监听实现数据自动保存，刷新页面不丢失。</p>
          </div>
        </div>
      </div>

      <!-- 待优化项 -->
      <div class="todo-card">
        <div class="todo-header">
          <span class="todo-icon">🚧</span>
          <h3>待完善功能</h3>
        </div>
        <ul class="todo-list">
          <li>🔜 训练目标设定功能（周目标/月目标）</li>
          <li>🔜 成就徽章系统（连续打卡奖励）</li>
          <li>🔜 数据导出功能（导出打卡记录为 CSV/Excel）</li>
          <li>🔜 图表时间范围切换（本周/本月/自定义）</li>
          <li>🔜 训练笔记搜索功能</li>
          <li>🔜 深色/浅色主题切换</li>
        </ul>
      </div>

      <!-- 开发心得 -->
      <div class="section-card">
        <div class="section-title">
          <span class="title-icon">💡</span>
          <h2>开发心得</h2>
        </div>
        <div class="components-list">
          <div class="component-card">
            <div class="comp-header">
              <span class="comp-icon">📊</span>
              <h3>图表库选型</h3>
            </div>
            <p class="comp-desc">选择了 ECharts + vue-echarts 方案，全量引入虽然体积较大但开发便捷，按需引入可在上线前优化。图表配置中需要为深色背景单独设置文字颜色。</p>
          </div>
          <div class="component-card">
            <div class="comp-header">
              <span class="comp-icon">🔄</span>
              <h3>响应式数据与图表更新</h3>
            </div>
            <p class="comp-desc">饼图数据使用 computed 动态计算各部位次数，但需要注意 pieOption 需要用 ref 包裹并通过 watch 更新，避免 ECharts 克隆时出现无限递归错误。</p>
          </div>
          <div class="component-card">
            <div class="comp-header">
              <span class="comp-icon">💾</span>
              <h3>数据持久化策略</h3>
            </div>
            <p class="comp-desc">使用 watch 深度监听数据变化，自动同步到 localStorage。补签功能需要判断补签日期是否超过当前日期。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 组件数据
const components = [
  {
    name: 'checkinButton 组件',
    icon: '🔘',
    status: '已启用',
    description: '打卡按钮和训练详情表单组件',
    detail: '包含训练时长输入、训练部位下拉选择、训练笔记文本框，打卡后触发父组件更新数据'
  },
  {
    name: 'heatMap 组件',
    icon: '🔥',
    status: '已启用',
    description: '打卡热力图组件',
    detail: '以日历网格形式展示打卡情况，支持补签功能（仅限过去日期），已打卡日期高亮显示'
  },
  {
    name: 'checkinHistory 组件',
    icon: '📋',
    status: '已启用',
    description: '打卡记录列表组件',
    detail: '展示所有打卡记录详情，支持删除记录操作'
  },
  {
    name: 'ECharts 图表',
    icon: '📈',
    status: '已启用',
    description: '数据可视化图表',
    detail: '包含训练时长趋势折线图和训练部位占比饼图'
  }
]

const charts = [
  {
    name: '训练时长趋势图',
    icon: '📈',
    active: true,
    description: '折线图展示每日训练时长变化',
    tech: 'ECharts Line Chart'
  },
  {
    name: '训练部位占比图',
    icon: '🥧',
    active: true,
    description: '饼图展示各部位训练次数占比',
    tech: 'ECharts Pie Chart'
  },
  {
    name: '月度统计报表',
    icon: '📊',
    active: false,
    description: '月度训练数据汇总统计',
    tech: '待开发'
  },
  {
    name: '周趋势对比图',
    icon: '📉',
    active: false,
    description: '本周与上周训练对比',
    tech: '待开发'
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
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
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    
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