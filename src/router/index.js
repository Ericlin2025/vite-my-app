import { createRouter,createWebHistory } from "vue-router";
import Layout from '@/views/Layout/index.vue'
import Diary from '@/views/Diary/index.vue'
import Weather from '@/views/Weather/index.vue'
import WeatherInfo from '@/views/WeatherInfo/index.vue'
import Detail from '@/views/Detail/index.vue'
import WeatherDetail from '@/views/Detail/children/weather-detail.vue'
import Questions from '@/views/Questions/index.vue'
import QuestionsDetail from "@/views/Detail/children/questions-detail.vue";
import Todos from '@/views/Todos/index.vue'
import TodosDetail from "@/views/Detail/children/todos-detail.vue";
import Fitness from '@/views/Fitness/index.vue'
import FitnessDetail from "@/views/Detail/children/fitness-detail.vue";
import Home from "@/components/home.vue";
import Feature from "@/components/feature.vue";
import Progress from "@/components/progress.vue";
import Chat from '@/views/Chat/index.vue'
import ChatDetail from "@/views/Detail/children/chat-detail.vue";
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            meta: { title: '首页 - 我的功能中心' },
            component:Layout,
            children:[
                {
                    path:'',
                    component:Home
                },
                {
                    path:'/feature',
                    component:Feature
                },
                {
                    path:'/progress',
                    component:Progress
                }
            ]
        },
        
        {
            path:'/weather',
            meta: { title: '天气助手' },
            component:Weather,
            children:[
                {
                    path:'/weather/diary',
                    meta: { title: '天气助手-日记' },
                    component:Diary
                },
                {
                    path:'',
                    component:WeatherInfo
                }
            ]
        },
        {
            path:'/detail',
            component:Detail,
            children:[
                {
                    path:'/detail/weather',
                    meta: { title: '天气助手开发文档' },
                    component:WeatherDetail
                },
                {
                    path:'/detail/questions',
                    meta: { title: '趣味问答开发文档' },
                    component:QuestionsDetail
                },
                {
                    path:'/detail/todos',
                    meta: { title: '待办事项开发文档' },
                    component:TodosDetail
                },
                {
                    path:'/detail/fitness',
                    meta: { title: '健康打卡开发文档' },
                    component:FitnessDetail
                },
                {
                    path:'/detail/chat',
                    meta: { title: '聊天室开发文档' },
                    component:ChatDetail
                }
            ]
        },
        {
            path:'/questions',
            meta: { title: '趣味问答' },
            component:Questions
        },
        {
            path:'/todos',
            meta: { title: '待办事项' },
            component:Todos
        },
        {
            path:'/fitness',
            meta: { title: '健康打卡' },
            component:Fitness
        },
        {
            path:'/chat',
            meta: { title: '在线聊天室' },
            component:Chat
        },
        {
            path:'/login',
            meta: { title: '用户登录' },
            component:Login
        },
        {
            path:'/register',
            meta: { title: '用户注册' },
            component:Register
        }
    ],

      scrollBehavior(to, from, savedPosition) {
    // 每次路由切换后，滚动到页面顶部
    return { top: 0, behavior: 'auto' }
    // behavior: 'smooth' 可选(auto立刻跳转,smooth平滑滚动,instant立刻跳转)，平滑滚动
  }

})
    // 在路由守卫中动态修改
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
export default router