//axios基础封装
import axios from 'axios'

//openWeather获取天气公共接口axios封装
const request = axios.create({
    //设置基础地址
    baseURL:'https://api.openweathermap.org',
    // headers: {
    //     'Content-Type': 'application/json'  // 确保是 JSON 格式
    // },
    //设置超时时间
    timeout:10000
})

// 设置拦截器

//axios请求拦截器
request.interceptors.request.use(config=>{
    return config
},e=>Promise.reject(e))

//axios响应式拦截器
request.interceptors.response.use(res=>res.data,e=>{
    return Promise.reject(e)
})


export default request
