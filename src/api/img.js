import requestImg from "@/uitls/http1";


export const getImg = (q) =>{
    return requestImg({
        url:'/v1/search',
        params:{
            query:q,
            orientation: 'landscape',    // 横屏图片（适合做背景）
            per_page: 1,                 // 只返回1张就够了
            size: 'large'                // 大尺寸图片
        }
    })
}