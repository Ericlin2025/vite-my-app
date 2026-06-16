<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router= useRouter()
const loginUserInfo = ref(JSON.parse(localStorage.getItem('loginUserInfo')||'null'))
const loginOut = () =>{
    localStorage.removeItem('loginUserInfo')
    alert('成功退出登录')
    router.push('/login')
    // location.href('/')
}
</script>

<template>

    <div class="hd">
        <div class="lt">
            <RouterLink to="/">
                <h1>🧩 我的功能中心</h1>
                <p>选择工具，提升效率</p>
            </RouterLink>
        </div>
        <div class="rt">
            <ul>
                <li>
                    <RouterLink to="/" exact-active-class="active">
                        首页
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/feature" active-class="active">
                        功能模块
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/progress" active-class="active">
                        模块进度
                    </RouterLink>
                </li>
                
            </ul>
        </div>
        <div class="loginStatus" v-if="loginUserInfo===null">
            <RouterLink to="/login">登录后使用，去登录</RouterLink>
        </div>
        <div v-else class="loginStatus">
            <p>欢迎你， {{ loginUserInfo.userName }} 
            <span v-if="loginUserInfo.isadmin" class="admin">(管理者)</span>
            <span v-else class="other">(普通用户)</span>
            </p>
           <button @click="loginOut">退出登录</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.active{
    border-bottom: 4px solid rgb(99, 215, 250);
}
.hd{
    position: fixed;
    background-color:rgba(48, 48, 48, 0.726);
    border-bottom: 1px solid #463d3c;
    width: 100%;
    height: 86px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    z-index: 3;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
    .lt{
        display: flex;
        flex-direction: column;
        justify-content: center;
        h1{
            color: white;
        }
        p{
            color: white;
            text-align: center;
        }
    }
    .rt{
        width: 60%;
        ul{
            // border: 1px solid #000;
            width: 100%;
            height: 100%;
            display: flex;
            // justify-content: space-around;
            gap: 100px;
            align-items: center;
            li{
                min-width: 100px;
                height: 100%;
                
                &:hover{
                    border-bottom: 4px solid rgb(0, 195, 255);
                }
                a{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    color: white;
                    font-size: 18px;
                    
                }

            }
        }
    }
    .loginStatus{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: rgb(0, 195, 255);
        a{
            color: yellow;
        }
        button{
            background-color: red;
            color: white;
            width: 80px;
            height: 30px;
            border: none;
            border-radius: 5px;
        }
        .admin{
            color: rgb(66, 231, 66);
            font-size: 12px;
        }
        .other{
            color: #b3b3b3;
            font-size: 12px;
        }
    }
}

</style>