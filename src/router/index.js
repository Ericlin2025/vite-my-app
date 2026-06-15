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
            component:Weather,
            children:[
                {
                    path:'/weather/diary',
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
                    component:WeatherDetail
                },
                {
                    path:'/detail/questions',
                    component:QuestionsDetail
                },
                {
                    path:'/detail/todos',
                    component:TodosDetail
                },
                {
                    path:'/detail/fitness',
                    component:FitnessDetail
                },
                {
                    path:'/detail/chat',
                    component:ChatDetail
                }
            ]
        },
        {
            path:'/questions',
            component:Questions
        },
        {
            path:'/todos',
            component:Todos
        },
        {
            path:'/fitness',
            component:Fitness
        },
        {
            path:'/chat',
            component:Chat
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        }
    ],
      scrollBehavior(to, from, savedPosition) {
    // 每次路由切换后，滚动到页面顶部
    return { top: 0, behavior: 'auto' }
    // behavior: 'smooth' 可选(auto立刻跳转,smooth平滑滚动,instant立刻跳转)，平滑滚动
  }

})

export default router