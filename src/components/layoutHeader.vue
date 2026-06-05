<script setup>
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
    </div>
</template>

<style scoped lang="scss">
.active{
    border-bottom: 4px solid rgb(0, 195, 255);
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
}

</style>