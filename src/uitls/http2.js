import axios  from "axios";

const requestPoems = axios.create({
    //设置基础地址
    baseURL:'https://v1.hitokoto.cn',
    
    //设置超时时间
    timeout:10000
})
export default requestPoems