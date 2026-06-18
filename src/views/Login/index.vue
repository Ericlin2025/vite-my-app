


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref,onMounted } from 'vue';
import { getLogin } from '@/api/backend';
import { getMessageLogin } from '@/api/backend';

// import { number } from 'echarts';

const userList = ref(JSON.parse(localStorage.getItem('userList')||'[]'))
const select = ref('密码登录')
const userName =ref('')
const userPassword = ref('')
const loginSelection = ['密码登录','扫码登录','短信登录']
const content = ref('获取验证码')
const status = ref(false)
const phone = ref('')
const code = ref('')
const eyes = ref(false)
const change = () =>{
    eyes.value=!eyes.value
}
const send = () =>{
    if(!phone.value){
        alert('请先输入手机号再发送验证码')
        return
    }
    let timer
    let count = 15
    const codeNumber= Math.floor(Math.random()*900000)+100000
    setTimeout(()=>{
        alert(`你收到的验证码为：${codeNumber}`)
    },3000)
    timer = setInterval(()=>{
        status.value=true
        if(count===1){
            content.value='获取验证码'
            clearInterval(timer)
            timer=null
            status.value=false
            return
        }
        count--
        content.value=`(${count})秒后，再次获取`
    },1000)
}
//手机号登录
const messageLogin = async() =>{
    try{
        // if(!code.value){
        //     alert('验证码不能为空')
        //     return
        // }
        const res = await getMessageLogin(phone.value,code.value)
        console.log(res)
        alert(res.data.msg)
        localStorage.setItem("loginUserInfo",JSON.stringify(res.data.data))
        router.push('/')
    }catch(error){
        console.log(error.response)
        alert(error.response.data.msg)
    }
}
const login = async() =>{
    // const found = userList.value.find(item => item.userName===userName.value&&item.password===userPassword.value)
    // if(found){
    //     alert('登录成功')
    //     localStorage.setItem("loginUserInfo",JSON.stringify(found))
    //     router.push('/')

    // }else{
    //     alert('账号或者密码错误')
    // }

    //访问自己创建的后端服务器后端登录接口进行用户身份判断
    try{
        const res = await getLogin(userName.value,userPassword.value)
        console.log(res)
        alert(res.data.msg)
        localStorage.setItem("loginUserInfo",JSON.stringify(res.data.data))
        router.push('/')
    }catch(error){
        console.log(error.response)
        alert(error.response.data.msg)
    }
}

</script>

<template>
    <div class="body">
        <div class="back">
            <RouterLink to="/">←返回首页</RouterLink>
        </div>
        <div class="title">
            <h1>🧩 我的功能中心</h1>
            <p>选择工具，提升效率</p>
        </div>
        <div class="login">
            <div class="hd">
                <h2>欢迎登录</h2>
                <ul>
                    <li v-for="s in loginSelection"
                    @click="select=s"
                    :class="{active:select===s}"
                    >
                        {{ s }}
                    </li>
                </ul>
            </div>
            <div class="bd" v-if="select==='密码登录'">
                <div class="userName">
                    <span>👤</span>
                    <input type="text" placeholder='请输入用户名' v-model="userName">
                </div>
                <div class="userPassword">
                    <span>🔑</span>
                    <input :type="eyes===false?'password':'text'" placeholder="请输入密码" v-model="userPassword">
                    <span class="eye" v-if="eyes" @click="change"><svg t="1781752622976" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6518" width="20" height="20"><path d="M512 373.312a138.688 138.688 0 1 0 0 277.376 138.688 138.688 0 0 0 0-277.376zM437.312 512a74.688 74.688 0 1 1 149.376 0 74.688 74.688 0 0 1-149.376 0z" fill="#333333" p-id="6519"></path><path d="M512 224c-128.96 0-242.88 69.632-322.112 135.36A912.96 912.96 0 0 0 69.12 480.832a520.256 520.256 0 0 0-6.912 8.64l-1.856 2.432-0.512 0.64-0.128 0.192-0.064 0.128a32.064 32.064 0 0 0 0 38.336l0.192 0.256 0.512 0.64 1.856 2.432c1.6 2.048 3.84 4.928 6.912 8.64a913.28 913.28 0 0 0 120.704 121.472C269.184 730.368 383.04 800 512 800c128.96 0 242.816-69.632 322.112-135.36a913.472 913.472 0 0 0 120.704-121.472l6.912-8.64 1.856-2.432 0.512-0.64 0.128-0.192 0.064-0.128a32.064 32.064 0 0 0 0-38.336l-0.192-0.256-0.512-0.64-1.856-2.432a793.6 793.6 0 0 0-32.832-38.912c-22.336-24.832-54.72-57.984-94.72-91.2C754.752 293.632 640.896 224 512 224zM938.688 512l25.6 19.2-25.6-19.2z m25.6-19.2l-25.6 19.2 25.6-19.2zM85.312 512l-25.6-19.2 25.6 19.2z m-25.6 19.2l25.6-19.2-25.6 19.2z m82.944-0.64c-6.272-6.976-11.712-13.248-16.192-18.56a848.96 848.96 0 0 1 104.32-103.36C305.792 346.368 405.248 288 511.936 288c106.688 0 206.08 58.368 281.28 120.64A848.704 848.704 0 0 1 897.6 512a848.704 848.704 0 0 1-104.32 103.36C718.144 677.632 618.688 736 512 736c-106.688 0-206.08-58.368-281.28-120.64-37.12-30.72-67.2-61.632-88.064-84.736z" fill="#333333" p-id="6520"></path></svg></span>
                    <span class="eye" v-else @click="change"><svg t="1781752762895" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6673" width="20" height="20"><path d="M112 323.648v-0.064a32 32 0 1 0-53.248 35.52v0.128l0.192 0.192 0.448 0.64a259.008 259.008 0 0 0 8 11.264 785.024 785.024 0 0 0 72.512 83.52L62.72 532.032a32 32 0 0 0 45.248 45.248l79.168-79.168c40.832 34.368 91.328 68.992 149.824 94.08l-44.416 73.984a32 32 0 1 0 54.912 32.96l51.2-85.312A427.008 427.008 0 0 0 512 629.312c39.936 0 77.824-5.76 113.408-15.488l51.2 85.312a32 32 0 1 0 54.848-32.96l-44.416-73.984c58.496-25.088 108.992-59.712 149.824-94.08l79.168 79.168a32 32 0 1 0 45.248-45.248l-77.184-77.184a784 784 0 0 0 72.512-83.52 432.448 432.448 0 0 0 8-11.2l0.448-0.704 0.128-0.192 0.128-0.128a32 32 0 0 0-53.248-35.52l-0.32 0.448-1.28 1.856a597.888 597.888 0 0 1-27.072 35.008c-19.136 22.912-47.232 53.568-82.88 84.16-71.872 61.568-171.328 120.32-288.512 120.32s-216.64-58.752-288.512-120.32a715.264 715.264 0 0 1-104.576-111.744 372.096 372.096 0 0 1-5.376-7.488l-1.28-1.792-0.256-0.384z" fill="#333333" p-id="6674"></path></svg></span>
                </div>  
                <button @click="login">登录</button>
                <div class="ft">
                    <RouterLink to="/register">还没有账号？去注册→</RouterLink>
                </div>
            </div>
            <div v-else-if="select==='扫码登录'" class="bd">
                请扫描二维码登录（暂无二维码登录）
                
            </div>
            <div v-else-if="select==='短信登录'" class="bd">

                <div class="number">
                    <span>📱</span>
                    <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone">
                </div>
                <div class="code">
                    <span>💬</span>
                    <input type="text" maxlength="6" placeholder="请输入6位验证码" v-model="code">
                    <button @click="send"  :disabled="status" :class="{sendActive:!status,sendDisabled:status}">{{content}}</button>
                </div>
                <button @click="messageLogin">登录</button>
                <div class="ft">
                    <RouterLink to="/register">手机号未注册？去注册→</RouterLink>
                </div>
            </div>
           
        </div> 
        
    </div>
</template>

<style scoped lang="scss">
.active{
    border-bottom: 3px solid rgb(61, 166, 251);
}
.sendActive{
    background-color: rgb(61, 166, 251) !important;
}
.sendDisabled{
    background-color: #a3a3a3 !important;
}
.eye{
    &:hover{
        cursor: pointer;
    }
}
.body{
    height: 100vh;
    background-image: url(../../assets/img/bg/登录页背景.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    .back{
        
        position: absolute;
        top: 20px;
        left: 20px;
        a{
            padding: 10px;
            border-radius: 8px;
            background-color:rgb(61, 166, 251);
            color: white;
            &:hover{
                background-color: rgb(0, 140, 255);
            }
        }

    }
}
.title{
    position: absolute;
    top: 250px;
    left: 400px;
    h1{
      font-size: 72px;  
      color: white;
      font-weight: 700;
    }
    p{
        font-size: 36px;
        margin-top: 16px;
        color: rgb(207, 215, 231);
        text-align: center;
    }
}
.login{
    border-radius: 10px;
    padding: 20px;
    position: absolute;
    right: 200px;
    top:250px ;
    background-color: #fff;
   .hd{
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ul{
        display: flex;
        gap: 18px;
        li{
            height: 45px;
            line-height: 45px;
            &:hover{
                cursor: pointer;
                border-bottom: 3px solid rgb(61, 166, 251);
            }
        }
    }
   }
   .bd{
    width: 400px;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    // gap: 30px;
    // align-items: center;
    .userName,
    .userPassword,
    .number,
    .code{
        display: flex;
        align-items: center;
        border-radius: 4px;
            border: 1px solid rgb(211, 220, 230);
            outline: none;
            width: 380px;
            height: 50px;
            span{
                display: flex;
                justify-content: center;
                align-items: center;
                min-width: 40px;
                text-align: center;

                // background-color: red;

            }
            button{
                background-color: rgb(61, 166, 251);
                width: 220px;
                height: 50px;
                &:hover{
                    background-color: rgb(0, 140, 255) !important;
                }
                
            
            }
            input{
                // border-radius: 4px;
                // border: 1px solid rgb(211, 220, 230);
                outline: none;
                border: none;
                width: 380px;
                height: 42px;
            }
    }
    button{
        background-color: rgb(61, 166, 251);
        color: white;
        border: none;
        width: 380px;
        height: 42px;
        // margin-top: 16px;
        border-radius: 4px;
        font-size: 14px;
        &:hover{
            cursor: pointer;
            background-color: rgb(0, 140, 255);
        }

    }
    .ft{
        margin-top: 10px;
    }
   }
}

</style>