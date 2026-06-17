<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref,watch } from 'vue';
import { getRegister } from '@/api/backend';
const userList = ref(JSON.parse(localStorage.getItem('userList')||'[]'))
const userName = ref('')
const userPassword = ref('')
const confirm = ref('')

//正则表达式
const ureg = /^[a-zA-Z0-9_]{3,10}$/
const preg = /^[a-zA-Z0-9]{4,10}$/

const register = async() =>{
    // const found = userList.value.find(item=>item.userName===userName.value)
    // if(userName.value===''||userPassword.value===''||confirm.value===''){
    //     alert('请输入完整信息')
        
    // }
    //  else if(ureg.test(userName.value)===false){
    //     alert('输入的用户名不符合规范，请重新输入')
    // }

    // else if(preg.test(userPassword.value)===false){
    //     alert('输入的密码不符合规范，请重新输入')
    // }

    // else if(userPassword.value!==confirm.value){
    //     alert('两次密码输入不一致')
    // }
   
    // else if(found){
    //     alert('该用户名已被注册，请更换用户名')
    // }
    
    // else{
    //     alert('创建成功')
    //     userList.value.push({
    //         userName:userName.value,
    //         password:userPassword.value,
    //         isadmin:false
    //     })
    //     router.push('/login')
    // }

    //使用自己定义的注册接口来判断是否注册成功
    try{
        const res = await getRegister(userName.value,userPassword.value,confirm.value)
        console.log(res)
        alert(res.data.msg)
        router.push('/login')
    }catch(error){
        console.log(error.response)
        alert(error.response.data.msg)
    }
}
watch(userList,newValue=>{
    localStorage.setItem('userList',JSON.stringify(newValue))
},{immediate:true,deep:true})
</script>

<template>
<div class="body">
    <div class="register">
        <div class="hd">
            <h2>创建新用户</h2>
        </div>
        <div class="bd">
                <div class="input">
                    <div class="userName">
                    <span>👤</span>
                    <input type="text" placeholder='请输入要创建的用户名' v-model="userName">
                    
                    </div>
                    <span class="ts">提示：用户名可以由:a-z，A-Z，0-9，特殊字符：_ 这些字符组成，长度为:3-10</span>
                </div>
                <div class="input">
                    <div class="userPassword">
                    <span>🔑</span>
                    <input type="password" placeholder="请输入要创建的密码" v-model="userPassword">
                    </div>
                    <span class="ts">提示：密码可以由:a-z，A-Z，0-9，这些字符组成，长度为:4-10</span>
                
                </div>
                <div class="confirm">
                    <span>✅</span>
                    <input type="password" placeholder="请再次确认密码" v-model="confirm">
                </div>
                <button @click="register">创建</button>
                
        </div>
        <div class="ft">
            <RouterLink to="/login">已有账户？去登录→</RouterLink>
        </div>
    </div>
</div>
</template>


<style scoped lang="scss">
.body{
    height: 100vh;
    background-image: url(../../assets/img/bg/注册页背景.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    .register{
        position: absolute;
        top: 250px;
        right: 200px;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
        padding: 20px;
        // width: 400px;
        // height: 280px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .bd{
            margin-top: 10px;
            width: 420px;
            height: 320px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            gap: 20px;
            align-items: center;
            .ts{
                width: 380px;
                color: #a0a0a0;
                font-size: 12px;
            }
            .input{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            .userName,
            .userPassword,
            .confirm{
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
        
        }
        .ft{
            margin-top: 10px;
            width: 420px;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: red;
        }
    }
}
</style>