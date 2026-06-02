import axios  from "axios";

const requestQuestions = axios.create({
    //设置基础地址
    baseURL:'https://opentdb.com',
    
    //设置超时时间
    timeout:10000
})
export default requestQuestions