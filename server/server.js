
import { WebSocketServer } from "ws";

//创建websocket服务器，并监听8080端口
const wss = new WebSocketServer({port:8080})
console.log('服务器已经启动')
let count = 0

// const getCount = () =>{
//     console.log('目前有',count,'人在线')
// }
wss.on('connection',(ws)=>{
    console.log('有用户连接上了')
    //统计在线人数
    count = wss.clients.size
   
    console.log('目前有',count,'人在线')
    ws.on('message',(data)=>{
        const message = data.toString()
        console.log('接收到的信息为：',message)
        // const allData = JSON.stringify({
        //     content:message,
        //     onlineCount:count
        // })
        wss.clients.forEach(client=>{
            if(client.readyState===1){
                client.send(message)
                // client.send(allData)
            }
        })
    })
    ws.on('close',()=>{
        //统计在线人数
       
        console.log('有用户离开了')
        count = wss.clients.size
        console.log('目前有',count,'人在线')
    })
})