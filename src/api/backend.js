import requestBackend from "@/uitls/http5";

export const getLogin = (userName,userPassword)=>{
    return requestBackend({
        url:'api/login',
        data:{
            userName,
            userPassword,
        }
    })
}
export const getMessageLogin = (phone,code)=>{
    return requestBackend({
        url:'api/message',
        data:{
            phone,
            code
        }
    })
}
export const getRegister = (userName,userPassword,phone,confirm)=>{
    return requestBackend({
        url:'api/register',
        data:{
            userName,
            userPassword,
            phone,
            confirm,
        }
    })
}