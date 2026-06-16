
<template>
  <div class="home-container">
    <layoutHeader/>
    <main class="page-main">
      <RouterView/>
      <layoutFooter/>
    </main>
  </div>
</template>

<script setup>
//导入头部组件
import layoutHeader from '@/components/layoutHeader.vue';
import layoutFooter from '@/components/layoutFooter.vue';

</script>

<style scoped>
h2{
  color: #00f7ff;
}
/* 整体容器 */
.home-container {
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  background-image: url(../../assets/img/bg/主页背景.png);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}

.page-main {
  width: 100%;
  padding-top: 86px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .page-main {
    padding-top: 110px;
  }
}



</style>