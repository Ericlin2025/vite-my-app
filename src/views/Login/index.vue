


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref,onMounted } from 'vue';
import { getLogin } from '@/api/backend';

const userList = ref(JSON.parse(localStorage.getItem('userList')||'[]'))
const select = ref('密码登录')
const userName =ref('')
const userPassword = ref('')
const loginSelection = ['密码登录','扫码登录','短信登录']
const content = ref('获取验证码')
const status = ref(false)
const send = () =>{
    let timer
    let count = 15
    
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
const messageLogin = () =>{
    router.push('/')
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
                    <input type="password" placeholder="请输入密码" v-model="userPassword">
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
                    <input type="text" placeholder="请输入手机号码" maxlength="11">
                </div>
                <div class="code">
                    <span></span>
                    <input type="text" maxlength="6" placeholder="请输入验证码">
                    <button @click="send"  :disabled="status" :class="{sendActive:!status,sendDisabled:status}">{{content}}</button>
                </div>
                <button @click="messageLogin">登录</button>
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
        }

    }
    .ft{
        margin-top: 10px;
    }
   }
}

</style>