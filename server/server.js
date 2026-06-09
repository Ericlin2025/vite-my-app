import { WebSocketServer } from "ws";

//创建websocket服务器，并监听8080端口
const wss = new WebSocketServer({port:8080})
console.log('服务器已经启动')


wss.on('connection',(ws)=>{
    console.log('有用户连接上了')
    ws.on('message',(data)=>{
        const message = data.toString()
        console.log('接收到的信息为：',message)

        wss.clients.forEach(client=>{
            if(client.readyState===1){
                client.send(message)
            }
        })
    })
    ws.on('close',()=>{
        console.log('有用户离开了')
    })
})