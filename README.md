# 🧩 我的功能中心

一个基于 **Vue 3 + Vite + Element Plus** 构建的个人功能集成平台，汇聚多个实用小工具模块，支持首页导航、功能分类展示与开发笔记查看。

## ✨ 在线预览

[项目预览链接]（如有部署可添加）

## 📦 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue 3 | ^3.5.x | 渐进式 JavaScript 框架 |
| Vite | ^8.x | 前端构建工具 |
| Vue Router | ^5.x | 路由管理 |
| Element Plus | ^2.14.x | UI 组件库 |
| Pinia | ^3.x | 状态管理 |
| Axios | ^1.16.x | HTTP 请求 |
| Day.js | ^1.11.x | 日期时间处理 |
| ECharts + vue-echarts | ^6.x / ^8.x | 图表可视化（健身热力图） |
| WebSocket (ws) | ^8.x | 在线聊天室实时通信 |
| SCSS | - | CSS 预处理器 |

## 🎯 功能模块

### 已完成

#### 1. ☀️ 天气助手 `/weather`

- 城市搜索与实时天气查询
- 未来小时级天气预报
- 生活建议与诗词展示
- 城市地图展示
- 子模块 **天气随笔** `/weather/diary`：记录每日天气、心情与日记内容，支持 localStorage 持久化

#### 2. 🧠 趣味问答 `/questions`

- 按分类、难度、题型获取题目
- 选择题 / 判断题答题
- 实时答案校验与准确率统计
- 动态选项排序

#### 3. 📝 待办事项 `/todos`

- 添加 / 删除 / 编辑待办
- 优先级设置（高 / 中 / 低）
- 截止日期设置
- 实时倒计时显示
- 完成状态切换
- localStorage 数据持久化

#### 4. 💪 健身打卡 `/fitness`

- 每日运动打卡（运动类型、时长、备注）
- 今日打卡状态检测
- ECharts 月度打卡热力图
- 打卡历史记录列表
- localStorage 数据持久化

### 开发中

#### 5. 💬 在线聊天室 `/chat`

- WebSocket 实时消息收发
- 自定义聊天昵称
- 连接状态显示
- 需配合后端 WebSocket 服务使用（见下方启动说明）

#### 6. 💰 汇率转换（规划中）

- 实时汇率查询与转换（尚未开发）

## 🗂️ 页面结构

| 路由 | 说明 |
|------|------|
| `/` | 首页，展示全部功能卡片 |
| `/feature` | 功能模块页，区分已完成 / 未完成 |
| `/progress` | 模块进度页 |
| `/detail/weather` | 天气助手开发笔记 |
| `/detail/questions` | 趣味问答开发笔记 |
| `/detail/todos` | 待办事项开发笔记 |
| `/detail/fitness` | 健身打卡开发笔记 |
| `/detail/chat` | 在线聊天室开发笔记 |

> 功能配置统一维护在 `src/api/features.js`，新增模块只需在此添加条目并配置路由即可。

## 🚀 快速开始

### 环境要求

- Node.js `^20.19.0` 或 `>=22.12.0`
- npm >= 9.0.0

### 安装与启动

```bash
# 1. 克隆项目
git clone https://github.com/your-username/my-feature-center.git

# 2. 进入项目目录
cd vue3-my-app

# 3. 安装依赖
npm install

# 4. 启动前端开发服务器
npm run dev

# 5. 构建生产版本
npm run build

# 6. 预览生产构建
npm run preview
```

### 聊天室服务（可选）

在线聊天室依赖 WebSocket 后端，需单独启动：

```bash
# 启动 WebSocket 服务（默认端口 8080）
npm run start
```

环境变量配置：

| 文件 | 变量 | 说明 |
|------|------|------|
| `.env.development` | `VITE_WS_URL=ws://localhost:8080` | 本地开发 |
| `.env.production` | `VITE_WS_URL=wss://your-domain/ws` | 生产环境 |

## 📁 项目目录

```
src/
├── api/            # 接口与功能配置（features.js）
├── assets/         # 静态资源（图片、样式）
├── components/     # 公共组件
├── router/         # 路由配置
├── uitls/          # HTTP 封装
└── views/          # 页面视图
    ├── Chat/       # 在线聊天室
    ├── Detail/     # 各模块开发笔记
    ├── Diary/      # 天气随笔
    ├── Fitness/    # 健身打卡
    ├── Layout/     # 布局容器
    ├── Questions/  # 趣味问答
    ├── Todos/      # 待办事项
    └── WeatherInfo/# 天气助手
server/
└── server.js       # WebSocket 聊天服务
```

## 📝 示例

**请求：** 在首页点击「天气助手」→「去使用」，输入城市「北京」

**结果：** 展示北京实时天气、小时预报、生活建议与城市地图；可通过 `/weather/diary` 记录当日随笔

---

**请求：** 在首页点击「健身打卡」→ 填写运动类型与时长 → 点击打卡

**结果：** 今日打卡状态更新，热力图高亮对应日期，历史列表新增一条记录
