


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
                    <span><svg t="1781763588939" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25206" width="20" height="20"><path d="M 925.072 866.338 c -22.55 -58.665 -54.879 -111.396 -96.079 -156.727 c -41.419 -45.572 -89.732 -81.389 -143.598 -106.458 a 428.81 428.81 0 0 0 -31.037 -12.991 c 23.153 -13.107 44.673 -29.438 63.998 -48.763 c 56.076 -56.076 86.959 -130.633 86.959 -209.936 s -30.881 -153.86 -86.959 -209.936 s -130.634 -86.959 -209.937 -86.959 s -153.86 30.883 -209.937 86.959 c -56.076 56.078 -86.959 130.633 -86.959 209.936 s 30.883 153.86 86.959 209.936 c 19.325 19.325 40.846 35.655 63.997 48.763 a 429.898 429.898 0 0 0 -31.037 12.991 c -53.866 25.068 -102.179 60.884 -143.598 106.458 c -41.202 45.332 -75.248 97.431 -96.08 156.727 c -17.385 49.481 -15.568 98.351 -16.45 121.174 h 69.838 C 142.848 824.515 297.84 633.689 508.42 633.689 c 210.579 0 369.644 197.809 370.256 353.823 h 69.837 c -1.243 -44.114 -0.159 -60.62 -23.438 -121.174 Z M 281.379 331.462 c 0 -125.188 101.85 -227.038 227.039 -227.038 c 125.188 0 227.039 101.85 227.039 227.038 S 633.606 558.5 508.418 558.5 c -125.189 0 -227.039 -101.85 -227.039 -227.038 Z" fill="gray" p-id="25207"></path></svg></span>
                    <input type="text" placeholder='请输入用户名' v-model="userName">
                </div>
                <div class="userPassword">
                    <span><svg t="1781762666466" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12310" width="20" height="20"><path d="M885.928318 1023.325039 138.071682 1023.325039C126.888593 1023.325039 117.822856 1014.259302 117.822856 1003.076213L117.822856 408.098212C117.822856 396.915123 126.888593 387.849386 138.071682 387.849386L264.289363 387.849386 264.289363 231.933427C295.503941-10.643458 519.087089 0.759331 519.087089 0.759331 742.193378 19.355853 759.028926 222.542696 759.688363 231.933427L759.710637 231.933427 759.710637 387.849386 885.928318 387.849386C897.111407 387.849386 906.177144 396.915123 906.177144 408.098212L906.177144 1003.076213C906.177144 1014.259302 897.111407 1023.325039 885.928318 1023.325039ZM512 43.281865C319.604431 54.615471 307.149378 232.608388 307.149378 232.608388L307.149378 387.849386 716.850622 387.849386 716.850622 232.270907C684.534171 37.777222 512 43.281865 512 43.281865ZM852.180275 451.633188C852.180275 440.450099 843.114538 431.384362 831.931449 431.384362L191.73107 431.384362C180.547981 431.384362 171.482244 440.450099 171.482244 451.633188L171.482244 959.878718C171.482244 971.061807 180.547981 980.127544 191.73107 980.127544L831.931449 980.127544C843.114538 980.127544 852.180275 971.061807 852.180275 959.878718L852.180275 451.633188ZM555.872456 709.840479 555.872456 778.651726C555.872456 800.086121 538.496601 817.461976 517.062206 817.461976L506.262833 817.461976C484.828438 817.461976 467.452583 800.086121 467.452583 778.651726L467.452583 709.543496C453.785638 697.429973 445.178875 679.811807 445.178875 660.196095 445.178875 623.664513 475.020244 594.04993 511.83126 594.04993 548.642275 594.04993 578.483645 623.664513 578.483645 660.196095 578.483645 679.972785 569.73514 697.719194 555.872456 709.840479Z" fill="gray" p-id="12311"></path></svg></span>
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
                    <span><svg t="1781763495801" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24205" width="20" height="20"><path d="M724.350707 63.353535H297.787475C253.310707 63.353535 217.212121 99.555556 217.212121 143.928889v736.245656c0 44.476768 36.20202 80.575354 80.575354 80.575354h426.563232c44.476768 0 80.575354-36.20202 80.575354-80.575354V143.928889c0-44.476768-36.098586-80.575354-80.575354-80.575354zM297.787475 104.727273h426.563232c21.617778 0 39.201616 17.583838 39.201616 39.201616V179.717172H258.585859v-35.788283C258.585859 122.311111 276.169697 104.727273 297.787475 104.727273zM258.585859 221.090909h505.069899v527.72202H258.585859V221.090909z m465.764848 698.285253H297.787475c-21.617778 0-39.201616-17.583838-39.201616-39.201617v-89.987878h505.069899v89.987878c-0.103434 21.617778-17.687273 39.201616-39.305051 39.201617z m0 0" fill="#565656" p-id="24206"></path><path d="M435.975758 149.721212h150.083232c8.274747 0 14.99798-6.723232 14.99798-14.99798 0-8.274747-6.723232-14.99798-14.99798-14.997979H435.975758c-8.274747 0-14.99798 6.723232-14.99798 14.997979 0 8.274747 6.723232 14.99798 14.99798 14.99798z m0 0M457.490101 855.660606c0 19.135354 10.214141 36.822626 26.789495 46.403232 16.575354 9.567677 37.003636 9.567677 53.57899 0a53.575111 53.575111 0 0 0 26.789495-46.403232c0-29.595152-23.983838-53.57899-53.57899-53.57899-29.595152 0-53.57899 23.983838-53.57899 53.57899z m0 0" fill="gray" p-id="24207"></path></svg></span>
                    <input type="text" placeholder="请输入手机号码" maxlength="11" v-model="phone">
                </div>
                <div class="code">
                    <span><svg t="1781763430700" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23065" width="20" height="20"><path d="M914.944 216.576c0-12.8-29.184-29.184-68.608-29.184h-670.72c-39.424 0-68.608 16.896-68.608 29.184v627.2c0 12.8 29.184 29.184 68.608 29.184h670.72c39.424 0 68.608-16.896 68.608-29.184V593.92h45.568v249.856c0 44.544-53.248 75.264-114.176 75.264h-670.72c-61.44 0-114.176-30.208-114.176-75.264V216.576c0-44.544 53.248-75.264 114.176-75.264h670.72c61.44 0 114.176 30.208 114.176 75.264v223.232L609.28 620.032 325.632 457.216l23.04-39.424 262.144 150.528 304.64-156.16V216.576z m-315.392 357.376l22.016 0.512-10.752-6.144-11.264 5.632z m327.68-168.448l-12.288 20.48v-13.824l12.288-6.656z" fill="gray" p-id="23066"></path></svg></span>
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