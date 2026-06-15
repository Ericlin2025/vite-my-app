<script setup>

</script>
<template>
  <div class="home-container">
    <!-- 顶部 Header -->
    <layoutHeader/>
    <RouterView/>
    
    <layoutFooter/>
    </div>
</template>

<script setup>
//导入头部组件
import layoutHeader from '@/components/layoutHeader.vue';
import layoutFooter from '@/components/layoutFooter.vue';
import { users } from '@/api/users';
localStorage.setItem('userList',JSON.stringify(users))
</script>

<style scoped>
h2{
  color: #00f7ff;
}
/* 整体容器 */
.home-container {
  min-height: 100vh;
 background-image: url(../../assets/img/bg/主页背景.png);
  background-repeat: no-repeat;
  background-size: cover;
  /* padding: 2rem; */
  display: flex;
  flex-direction: column;
  /* background-color: #ffbd5a; */
  
}



</style>