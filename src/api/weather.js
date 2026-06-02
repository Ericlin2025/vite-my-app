import request from "@/uitls/http";
import dayjs  from "dayjs";
const API_KEY='6a9f3f4cb53242904de8c14546b8a8a0'
export function getWeather(lat,lon){
    return request({
        url:'/data/2.5/weather',
        params:{
            lat:lat,
            lon:lon,
            units: 'metric',
            appid: API_KEY,
            lang: 'zh_cn' 
            
        }
    })
}

export function getPosition(c){
    return request({
        url:'/geo/1.0/direct',
        params:{
            q:c,
            appid:API_KEY
        }
    })
}
//获取查询地址未来五天每3小时的天气信息
export function getHourly(lat,lon){
    return request({
        url:'/data/2.5/forecast',
        params:{
            lat:lat,
            lon:lon,
            appid:API_KEY
        }
    })
}
// //获取查询地址未来7日的天气(付费内容)
// export function getDaily(lat,lon){
//     return request({
//         url:'/data/2.5/forecast/daily',
//         params:{
//             lat:lat,
//             lon:lon,
//             appid:API_KEY,
//             cnt:7
//         }
//     })
// }