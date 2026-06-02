import axios  from "axios";
const API_KEY='gKsj1fRQcnX55DZMafeTNnS4wy7DsnC9ltTERlo7AYncqnsWPlmYA6Vt'
const requestImg = axios.create({
    //设置基础地址
    baseURL:'https://api.pexels.com',
    headers: {
        
        Authorization:API_KEY
    },
    //设置超时时间
    timeout:10000
})
export default requestImg