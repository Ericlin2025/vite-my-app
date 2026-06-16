


<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref,onMounted } from 'vue';


const userList = ref(JSON.parse(localStorage.getItem('userList')||'[]'))
const select = ref('密码登录')
const userName =ref('')
const userPassword = ref('')
const loginSelection = ['密码登录','扫码登录']
const login = () =>{
    const found = userList.value.find(item => item.userName===userName.value&&item.password===userPassword.value)
    if(found){
        alert('登录成功')
        localStorage.setItem("loginUserInfo",JSON.stringify(found))
        router.push('/')

    }else{
        alert('账号或者密码错误')
    }
}
// onMounted(()=>{
//     const localStorageUsers = localStorage.getItem('userList')
//     if(localStorageUsers){
//         return
//     }else{
//         localStorage.setItem('userList',JSON.stringify(users))
//     }
// })
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
                请扫描二维码登录
                
            </div>
           
        </div> 
        
    </div>
</template>

<style scoped lang="scss">
.active{
    border-bottom: 3px solid rgb(61, 166, 251);
}
.body{
    min-height: 100vh;
    box-sizing: border-box;
    background-image: url(../../assets/img/bg/登录页背景.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 40px;
    padding: 80px 24px 40px;
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
    flex: 1;
    min-width: 280px;
    max-width: 520px;
    text-align: center;
    h1{
      font-size: clamp(2rem, 5vw, 4.5rem);
      color: white;
      font-weight: 700;
    }
    p{
        font-size: clamp(1rem, 2.5vw, 2.25rem);
        margin-top: 16px;
        color: rgb(207, 215, 231);
    }
}
.login{
    width: 100%;
    max-width: 420px;
    border-radius: 10px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
   .hd{
    min-height: 80px;
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
    width: 100%;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 16px;
    box-sizing: border-box;
    .userName,
    .userPassword{
        display: flex;
        align-items: center;
        border-radius: 4px;
        border: 1px solid rgb(211, 220, 230);
        outline: none;
        width: 100%;
        max-width: 380px;
        height: 50px;
        box-sizing: border-box;
        span{
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            text-align: center;
        }
        input{
            outline: none;
            border: none;
            flex: 1;
            min-width: 0;
            height: 42px;
        }
    }
    button{
        background-color: rgb(61, 166, 251);
        color: white;
        border: none;
        width: 100%;
        max-width: 380px;
        height: 42px;
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

@media (max-width: 768px) {
    .body{
        flex-direction: column;
        padding: 70px 16px 32px;
        gap: 24px;
    }
    .title{
        max-width: 100%;
    }
}

</style>