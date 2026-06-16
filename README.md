# 我的功能中心

基于 **Vue 3 + Vite + Element Plus** 构建的个人功能集成平台。项目采用模块化架构，将天气查询、知识问答、任务管理、健身打卡等实用工具统一收纳，并提供用户认证、功能进度追踪与开发笔记等配套能力。

**在线访问：** [https://vite-my-app.vercel.app/](https://vite-my-app.vercel.app/)

---

## 项目概述

| 项目属性 | 说明 |
|---------|------|
| 项目名称 | my-app（我的功能中心） |
| 前端框架 | Vue 3（Composition API + `<script setup>`） |
| 构建工具 | Vite 8 |
| 路由方案 | Vue Router 5（History 模式） |
| UI 组件库 | Element Plus |
| 数据持久化 | localStorage（用户、待办、打卡、日记等） |
| 实时通信 | WebSocket（在线聊天室） |
| 线上部署 | [Vercel](https://vercel.com/) — `https://vite-my-app.vercel.app/` |

---

## 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 核心框架 | Vue | ^3.5.x | 视图层与响应式状态 |
| 构建 | Vite | ^8.x | 开发服务器与生产构建 |
| 路由 | Vue Router | ^5.x | SPA 路由与页面导航 |
| UI | Element Plus | ^2.14.x | 轮播、表单等通用组件 |
| 状态 | Pinia | ^3.x | 全局状态管理（预留） |
| 网络 | Axios | ^1.16.x | 第三方 API 请求封装 |
| 日期 | Day.js | ^1.11.x | 时间格式化与计算 |
| 图表 | ECharts + vue-echarts | ^6.x / ^8.x | 健身打卡热力图 |
| 实时 | ws | ^8.x | 聊天室 WebSocket 服务 |
| 样式 | SCSS | — | 组件级样式预处理 |

**外部 API 依赖：**

- OpenWeatherMap — 天气与地理坐标查询
- Open Trivia DB — 趣味问答题库

---

## 系统架构

```
┌─────────────────────────────────────────────────────┐
│                    布局层 (Layout)                   │
│  layoutHeader（导航 / 登录态） + layoutFooter          │
├─────────────────────────────────────────────────────┤
│  首页 / 功能模块 / 模块进度  │  各功能模块独立页面      │
├─────────────────────────────────────────────────────┤
│  用户认证（Login / Register）│  localStorage 持久化    │
├─────────────────────────────────────────────────────┤
│  HTTP 封装 (uitls/)  │  WebSocket 服务 (server/)    │
└─────────────────────────────────────────────────────┘
```

**认证流程：**

1. 应用启动时，`App.vue` 检测本地是否存在 `userList`，若无则写入默认账户（见 `src/api/users.js`）
2. 用户通过 `/register` 注册或 `/login` 登录，验证通过后写入 `loginUserInfo`
3. 顶部导航栏展示当前用户与角色（管理者 / 普通用户）
4. 首页与功能模块页的「去使用」入口需登录后方可访问
5. 退出登录清除 `loginUserInfo` 并跳转至登录页

**默认账户（首次启动自动初始化）：**

| 用户名 | 密码 | 角色 |
|--------|------|------|
| EricLin | 1234 | 管理者 |
| admin | 1234 | 管理者 |

---

## 功能模块

模块配置统一维护于 `src/api/features.js`，通过 `completed` 字段标识开发状态。

### 已上线模块

#### 天气助手 `/weather`

- 城市搜索与 OpenWeatherMap 实时天气查询
- 未来小时级天气预报（3 小时间隔）
- 生活建议与诗词卡片展示
- 城市静态地图渲染
- **子模块 — 天气随笔** `/weather/diary`：按日期记录天气、心情与正文，localStorage 持久化

#### 趣味问答 `/questions`

- 按数量、分类、难度、题型拉取题目（Open Trivia DB）
- 支持选择题与判断题
- 实时答案校验与正确率统计
- 选项动态乱序

#### 待办事项 `/todos`

- 增删改查待办任务
- 优先级（高 / 中 / 低）与截止日期
- 倒计时与完成状态切换
- localStorage 持久化

#### 健身打卡 `/fitness`

- 每日运动打卡（类型、时长、备注）
- 今日打卡状态自动检测
- ECharts 月度打卡热力图
- 历史记录列表
- localStorage 持久化

### 开发中模块

#### 在线聊天室 `/chat`

- WebSocket 实时消息广播
- 自定义聊天昵称与连接状态指示
- 需独立启动 `server/server.js`（端口 8080）

#### 汇率转换（规划中）

- 实时汇率查询与货币换算，尚未实现

---

## 路由表

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 功能轮播 + 卡片网格，登录后可跳转功能 |
| `/feature` | 功能模块 | 按完成状态分组展示 |
| `/progress` | 模块进度 | 开发进度页（预留） |
| `/login` | 登录 | 密码登录 / 扫码登录（预留） |
| `/register` | 注册 | 用户名与密码格式校验 |
| `/weather` | 天气助手 | 天气查询主页面 |
| `/weather/diary` | 天气随笔 | 天气模块子页面 |
| `/questions` | 趣味问答 | 答题主页面 |
| `/todos` | 待办事项 | 任务管理主页面 |
| `/fitness` | 健身打卡 | 运动打卡主页面 |
| `/chat` | 在线聊天室 | WebSocket 聊天 |
| `/detail/*` | 开发笔记 | 各模块开发过程文档 |

路由切换时自动滚动至页面顶部（`scrollBehavior`）。

---

## 快速开始

### 环境要求

- Node.js `^20.19.0` 或 `>=22.12.0`
- npm >= 9.0.0

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/your-username/vue3-my-app.git
cd vue3-my-app

# 安装依赖
npm install

# 启动前端开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 预览生产构建
npm run preview
```

### 聊天室服务（可选）

```bash
# 另开终端，启动 WebSocket 服务（端口 8080）
npm run start
```

### 环境变量

| 文件 | 变量 | 值 | 说明 |
|------|------|----|------|
| `.env.development` | `VITE_WS_URL` | `ws://localhost:8080` | 本地 WebSocket 地址 |
| `.env.production` | `VITE_WS_URL` | `wss://vite-my-app.vercel.app/ws` | 生产 WebSocket 地址 |

### 开发代理

`vite.config.js` 已配置 `/api` 代理至 `http://localhost:8080`，可按需调整 `target` 与 `rewrite`。

---

## 目录结构

```
vue3-my-app/
├── public/                 # 静态资源（功能模块封面图等）
├── server/
│   └── server.js           # WebSocket 聊天服务
├── src/
│   ├── api/                # 接口与配置
│   │   ├── features.js     # 功能模块注册表
│   │   ├── users.js        # 默认用户数据
│   │   ├── weather.js      # 天气 API
│   │   └── questions.js    # 问答 API
│   ├── assets/             # 图片、全局样式
│   ├── components/         # 公共组件
│   │   ├── layoutHeader.vue    # 顶部导航 + 登录态
│   │   ├── home.vue            # 首页轮播与卡片
│   │   └── feature.vue         # 功能模块列表
│   ├── router/
│   │   └── index.js        # 路由定义
│   ├── uitls/              # Axios 实例封装
│   ├── views/
│   │   ├── Login/          # 登录页
│   │   ├── Register/       # 注册页
│   │   ├── Layout/         # 主布局
│   │   ├── WeatherInfo/    # 天气助手
│   │   ├── Diary/          # 天气随笔
│   │   ├── Questions/      # 趣味问答
│   │   ├── Todos/          # 待办事项
│   │   ├── Fitness/        # 健身打卡
│   │   ├── Chat/           # 在线聊天室
│   │   └── Detail/         # 开发笔记
│   ├── App.vue             # 根组件（用户数据初始化）
│   └── main.js             # 应用入口
├── .env.development
├── .env.production
├── vite.config.js
└── package.json
```

---

## 扩展指南

新增功能模块建议按以下步骤操作：

1. 在 `src/api/features.js` 添加模块配置（`title`、`path`、`detail`、`completed` 等）
2. 在 `src/router/index.js` 注册路由
3. 在 `src/views/` 下创建页面组件
4. 如需开发笔记，在 `src/views/Detail/children/` 添加对应 detail 页面
5. 在 `public/img/` 放置模块封面图

---

## 使用示例

**场景一：用户注册与登录**

```
操作：访问 /register → 输入用户名 admin2、密码 123456、确认密码 123456 → 创建
结果：账户写入 localStorage，跳转登录页；登录成功后顶部显示「欢迎你，admin2 (普通用户)」
```

**场景二：天气查询**

```
操作：登录 → 首页点击「天气助手」→ 输入「北京」搜索
结果：展示实时天气、小时预报、生活建议与城市地图；可通过 /weather/diary 记录随笔
```

**场景三：健身打卡**

```
操作：登录 → 进入健身打卡 → 填写运动类型与时长 → 点击打卡
结果：今日状态更新，热力图高亮对应日期，历史列表新增记录
```

---

## 在线预览

项目已部署至 Vercel，可直接访问：

**[https://vite-my-app.vercel.app/](https://vite-my-app.vercel.app/)**

---

## License

Private
