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
        }
    ]
})

export default router