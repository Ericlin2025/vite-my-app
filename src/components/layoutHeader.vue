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
    top: 0;
    left: 0;
    right: 0;
    background-color:rgba(48, 48, 48, 0.726);
    border-bottom: 1px solid #463d3c;
    width: 100%;
    min-height: 86px;
    padding: 0 24px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    z-index: 3;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", Arial, sans-serif;
    .lt{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        h1{
            color: white;
            font-size: 1.5rem;
            white-space: nowrap;
        }
        p{
            color: white;
            text-align: center;
            font-size: 0.85rem;
        }
    }
    .rt{
        flex: 1;
        min-width: 0;
        ul{
            width: 100%;
            display: flex;
            justify-content: center;
            gap: 48px;
            align-items: center;
            flex-wrap: wrap;
            li{
                min-width: auto;
                
                &:hover{
                    border-bottom: 4px solid rgb(0, 195, 255);
                }
                a{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 8px 4px;
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
        flex-shrink: 0;
        color: rgb(0, 195, 255);
        p{
            margin: 0;
            white-space: nowrap;
        }
        a{
            color: yellow;
            font-size: 0.9rem;
        }
        button{
            background-color: red;
            color: white;
            width: 80px;
            height: 30px;
            border: none;
            border-radius: 5px;
            flex-shrink: 0;
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

@media (max-width: 768px) {
    .hd{
        padding: 10px 16px;
        min-height: auto;

        .lt{
            h1{
                font-size: 1.1rem;
            }
            p{
                display: none;
            }
        }

        .rt{
            order: 3;
            flex-basis: 100%;
            ul{
                gap: 20px;
                li a{
                    font-size: 15px;
                }
            }
        }

        .loginStatus{
            p{
                font-size: 12px;
                white-space: normal;
                max-width: 140px;
                line-height: 1.3;
            }
            a{
                font-size: 12px;
            }
        }
    }
}

</style>