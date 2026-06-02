<script setup>
import dayjs from 'dayjs';
import {ref,computed} from 'vue'
const now = ref('')
const now1 = ref()
const ls = ref()
const sunSet = ref()
const t1 = setInterval(()=>{
    now.value=dayjs().format('YYYY年MM月DD日 HH:mm:ss')
  },1000)

const props = defineProps({
  data:{
    type:Object,
    required:true
  }
})
const getSunset=() =>{
  
   const t2 = setInterval(()=>{
    sunSet.value = props.data?.sys?.sunset
    now1.value=dayjs().unix()
    // console.log(now1.value)
    ls.value = sunSet.value - now1.value
    // console.log(ls.value)
    // lstime.value = dayjs(ls.value).format('HH:mm:ss')
    // console.log(lstime.value)
  },1000)

}
const lstime = computed(() => {
  const totalSeconds = ls.value

  if (totalSeconds <= 0) {
    return '00:00:00 (太阳已落山)'
  }

  // 算出时、分、秒
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // 补零：比如把 5 秒变成 "05"
  const h = hours.toString().padStart(2, '0')
  const m = minutes.toString().padStart(2, '0')
  const s = seconds.toString().padStart(2, '0')

  return `${h}:${m}:${s}` // 返回拼接好的字符串，ls.value一变，这里跟着变
})
getSunset()
</script>




<template>
    <!-- 头部标题 -->
      <header class="header">
        <RouterLink to="/" class="back-btn">←返回功能中心</RouterLink>
        <h1 class="title">
        
          <span class="icon">🌤️</span>
          天气助手
        </h1>
        
        <p class="subtitle">实时天气，尽在掌握</p>
        <h2>{{ now }}</h2>
        <!-- <h3 >距离日落时间还有：{{lstime}}</h3> -->
      </header>
</template>

<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-border-radius: 24px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
.header{
    .title{
        color: #667eea;
    }
    h2{
      color: rgb(255, 104, 129);
    }
    p{
        color: #8397ec;
    }
}
.header {
    text-align: center;
    margin-bottom: 40px;
    animation: fadeInDown 0.6s ease-out;
    padding-left: 10px;
    padding-top: 10px;
    .back-btn {
      display: flex;
      width: 140px;
      align-items: center;
      gap: 6px;
      background: rgba(0, 47, 255, 0.5);
      backdrop-filter: blur(4px);
      padding: 8px 16px;
      border-radius: 30px;
      color: #ffffff;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 0.3s ease;
      margin-bottom: 24px;
      
      .back-icon {
        font-size: 1.1rem;
        transition: transform 0.2s;
      }
      
      &:hover {
        background: #667eea;
        color: white;
        transform: translateX(-4px);
        
        .back-icon {
          transform: translateX(-2px);
        }
      }
    }
    .title {
      font-size: 42px;
      font-weight: 700;
      background: $primary-gradient;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      margin-bottom: 10px;
      display: inline-flex;
      align-items: center;
      gap: 10px;

      .icon {
        font-size: 48px;
        background: none;
        -webkit-background-clip: unset;
        background-clip: unset;
        color: #fbbf24;
      }
    }

    .subtitle {
      color: #6b7280;
      font-size: 14px;
    }
  }
</style>