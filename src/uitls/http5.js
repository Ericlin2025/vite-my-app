import axios  from "axios";

const requestBackend = axios.create({
    //设置基础地址
    // baseURL:'http://localhost:3000/api',
    baseURL:import.meta.env.VITE_API_BASE_URL,
    method:'post',
    //设置超时时间
    timeout:10000
})
export default requestBackend