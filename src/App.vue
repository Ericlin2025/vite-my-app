<script setup>
import { onMounted } from 'vue';

import { users } from './api/users';
// import { users } from '@/api/users';
// localStorage.setItem('userList',JSON.stringify(users))

//初始化已注册用户列表，如果本地存在该用户列表就不用初始化
onMounted(()=>{
    const localStorageUsers = localStorage.getItem('userList')
    if(localStorageUsers){
        return
    }else{
        localStorage.setItem('userList',JSON.stringify(users))
    }
})
</script>

<template>
  <RouterView/>
</template>