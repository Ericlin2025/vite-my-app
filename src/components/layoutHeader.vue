<script setup>
import { ref ,computed} from 'vue';
import { useRouter } from 'vue-router';
const router= useRouter()
const url = import.meta.env.VITE_API_BASE_URL
const loginUserInfo = ref(JSON.parse(localStorage.getItem('loginUserInfo')||'null'))
console.log(url)
// const avatar = computed(()=>{
//     return url+loginUserInfo.value.avatar
// })
// console.log(avatar.value)
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
            <RouterLink to="/login">登录后使用，去登录→</RouterLink>
        </div>
        <div v-else class="loginStatus">
            <p>
            <img src="" alt="" v-if="loginUserInfo.avatar">
            <div v-else class="none">暂无头像</div>
            <span>{{ loginUserInfo.userName }} </span>
            <span v-if="loginUserInfo.isadmin" class="admin">(管理者)</span>
            <span v-else class="other">(普通用户)</span>
            </p>
           <div class="detail"> 
            <img src="" alt="" v-if="loginUserInfo.avatar">
            <div class="none" v-else>暂无头像</div>
            <span class="name">用户名：{{ loginUserInfo.userName }}</span>
            
            <div>
                <span class="name">用户等级:</span>
                <span v-if="loginUserInfo.isadmin" class="admin">管理者</span>
            <span v-else class="other">普通用户</span>
            </div>
            
            <button @click="loginOut">退出登录</button>
           </div>
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
    z-index: 30;
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: rgb(255, 255, 255);
        p{
            display: flex;
            align-items: center;
            gap: 5px;
            .none{
                background-color: rgb(199, 199, 199);
                width: 35px;
                height: 35px;
                font-size: 8px;
                border-radius: 50%;
                color: #000;
                line-height: 35px;
                text-align: center;
            }
            img{
                width: 35px;
                height: 35px;
                border-radius: 50%;
            }
        }
        &:hover .detail{
            display: flex;
            transform: translateY(10px);
        }
        a{
            color: yellow;
        }
        .name{
            color: #000;
        }
        button{
            background-color: red;
            color: white;
            width: 80px;
            height: 30px;
            border: none;
            border-radius: 5px;
            &:hover{
                cursor: pointer;
            }
        }
        .admin{
            color: rgb(66, 231, 66);
            font-size: 12px;
        }
        .other{
            color: #b3b3b3;
            font-size: 12px;
        }
        .detail{
            display: none;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            border-radius: 8px;
            background-color: white;
            transition: all 1s;
            width: 240px;
            height: 300px;
            position: absolute;
            top: 0;
            left: 85%;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }
            .none{
                background-color: rgb(199, 199, 199);
                width: 60px;
                height: 60px;
                font-size: 15px;
                border-radius: 50%;
                color: #000;
                line-height: 60px;
                text-align: center;
            }
            .admin{
                // color: #31ff65;
                font-size: 15px;
                // border-top: 1px solid black;
            }
            .other{
                // color: #31ff65;
                font-size: 15px;
                // border-top: 1px solid black;
            }
        }
    }
}

</style>