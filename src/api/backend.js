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
export const getRegister = (userName,userPassword,confirm)=>{
    return requestBackend({
        url:'api/register',
        data:{
            userName,
            userPassword,
            confirm,
        }
    })
}