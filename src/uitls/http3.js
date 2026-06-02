import axios  from "axios";

const requestMap = axios.create({
    //设置基础地址
    baseURL:'https://restapi.amap.com',
    
    //设置超时时间
    timeout:10000
})
export default requestMap