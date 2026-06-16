<template>
  <div class="weather-app" >
    
    <!-- 头部区域 -->
      <!-- <headerCard :data="result"/> -->
    <!-- 主容器 -->
    <div class="container">

      

      <!-- 搜索区域 -->
      <div class="search">
        <searchCard @inputEvent="inputPosition"/>
      </div>
      
      

     
         <!-- 天气卡片 -->
      <div class="card-wrapper" v-if="result && Object.keys(result).length">
        <weatherCard 
          :weatherData="result"
          
        />
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <div class="empty-icon">☁️</div>
        <p class="empty-text">暂时未获取当日天气信息，请输入城市名称，查看天气信息</p>
      </div>
     
      <div class="hourly" v-if="status">  
        <!-- <forecastCard :forecastData="hour"/> -->
         <forecastCard1 :forecastData="hour"/>
      </div>
      <div v-else class="empty-state">
        <div class="empty-icon">☁️</div>
        <p class="empty-text">暂未获取未来城市天气信息，请输入城市名称，查看天气信息</p>
      </div>
      <div  v-if="result && Object.keys(result).length">
        <lifeCard :poem="poems" :data="result"/>
      </div>
      <div v-else class="empty-state">
        还没有搜索。请先进行搜索
      </div>
      <div v-if="mapImageUrl===''?false:true">
        <!-- <img :src="mapImageUrl" alt=""> -->
        <mapCard :map="mapImageUrl"/>
      </div>
    </div>

  </div>
 
</template>

<script setup>
import { getWeather, getPosition ,getHourly} from '@/api/weather';
import { getImg } from '@/api/img';
import { ref } from 'vue'
import headerCard from '@/components/header.vue';
import searchCard from '@/components/searchCard.vue';
import weatherCard from '@/components/weatherCard.vue';
import forecastCard from '@/components/forecastCard.vue';
import forecastCard1 from '@/components/forecastCard1.vue';
import lifeCard from '@/components/lifeCard.vue';
import mapCard from '@/components/mapCard.vue';
import { getPoems } from '@/api/poems';
import { getMap } from '@/api/map';

const result = ref({})
const hour = ref({})
const poems = ref({})
const status = ref(false)
const imglist = ref({})

// 获取图像
const img = async(q) =>{
  const res = await getImg(q)
  console.log('获取图片成功',res)
  imglist.value=res
}

// 获取当日天气信息
const search = async (lat, lon) => {
  console.log('开始获取天气...')
  const res = await getWeather(lat, lon)
  console.log('获取当日天气成功', res)
  // img(res.weather[0].main)
  result.value = res
}

//获取未来天气信息
const hourly =  async (lat, lon) => {
  console.log('开始获取小时天气...')
  const res = await getHourly(lat, lon)
  console.log('获取小时日天气成功', res)
  hour.value = res
}
//获取随机诗句
const poem = async() =>{
  const res = await getPoems()
  console.log('获取诗句成功',res)
  poems.value= res
}
//获取搜索地址的地图
const mapImageUrl = ref('')
const maps = ref({})
const map = async(s)=>{
  const res = await getMap(s)
  
  
  mapImageUrl.value = URL.createObjectURL(res.data)
  maps.value= res
  console.log('获取地图成功',res)
  // console.log('获取地图成功',mapImageUrl.value)
}
//付费接口没有使用
// const daily =  async (lat, lon) => {
//   console.log('开始获取未来天气...')
//   const res = await getDaily(lat, lon)
//   console.log('获取当地未来天气成功', res)
//   future.value = res
// }

// 根据输入城市获取相对应的经纬度接口，调用获取当日天气信息接口与未来天气信息接口
const inputPosition = async (city) => {
  
  console.log('搜索城市:', city)
  const res = await getPosition(city)
  console.log('获取输入城市经纬度成功', res)
  if (res && res.length > 0) {
    //接口要求location是：经度，纬度
    const str = `${res[0].lon},${res[0].lat}`
    status.value= true
    search(res[0].lat, res[0].lon)
    hourly(res[0].lat, res[0].lon)
    poem()
    map(str)
    // daily(res[0].lat, res[0].lon)
  } else {
    alert('未找到该城市')
  }
}

</script>

<style scoped lang="scss">
// 变量定义
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-border-radius: 24px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

// 主容器
.weather-app {
  min-height: 100vh;
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow-x: hidden;
  padding: 20px;

  // 主容器
  .container {
    width: 2000px;
    display: flex;
    // grid-template-columns: repeat(4,1fr);
    gap:20px;
    // max-width: 600px;
    // width: 1500px;
    // justify-content: space-around;
    // border: 1px solid black;
    flex-wrap: wrap;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  // 头部样式
  .header {
    text-align: center;
    margin-bottom: 40px;
    animation: fadeInDown 0.6s ease-out;

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


  // 天气卡片容器
  .card-wrapper {
    animation: fadeInUp 0.6s ease-out 0.2s both;
  }

  // 空状态
 
  .empty-state {
    width: 370px;
    height: 600px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: $card-border-radius;
    padding: 60px 24px;
    margin-top: 20px;
    text-align: center;
    // backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease-out 0.2s both;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    .empty-icon {
      font-size: 80px;
      margin-bottom: 20px;
      opacity: 0.5;
    }

    .empty-text {
      color: #6b7280;
      font-size: 16px;
    }
  }
}

// 动画定义
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

// 响应式
@media (max-width: 768px) {
  .weather-app {
    padding: 16px;

    .header {
      margin-bottom: 24px;

      .title {
        font-size: 32px;
      }
    }

    .search-section {
      padding: 16px;

      .search-box {
        .search-input {
          font-size: 14px;
        }

        .search-btn {
          padding: 8px 16px;
          font-size: 13px;
        }
      }

      .hot-cities {
        .city-tag {
          padding: 4px 12px;
          font-size: 12px;
        }
      }
    }

    .empty-state {
      padding: 40px 16px;

      .empty-icon {
        font-size: 60px;
      }
    }
  }
}
</style>