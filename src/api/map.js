import requestMap from "@/uitls/http3";


const API_KEY= '0685ac6965c1566c0d8b1e02c825c24a'
export const getMap = (str)=>{
    return requestMap({
        url:'/v3/staticmap',
        responseType: 'blob', 
        params:{
            key:API_KEY,
            location:str,
            zoom:12,
            size:'900*900'
        }
    })
}