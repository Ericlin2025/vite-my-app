<!-- WeatherCard.vue -->
<template>
  <div class="weather-card" :class="weatherTheme">
    <!-- 城市信息 -->
    <div class="city-info">
      <h2>{{ weatherData.name}}</h2>
      <p class="country">{{ weatherData.sys.country }}</p>
    </div>

    <!-- 主要天气信息 -->
    <div class="weather-main">
      <img 
        :src="weatherIconUrl" 
        :alt="weatherDescription"
        class="weather-icon"
      />
      <div class="temperature">
        <span class="temp-value">{{ formattedTemp }}</span>
        <span class="temp-unit">°C</span>
      </div>
      <p class="weather-desc">{{ weatherDescription }}</p>
    </div>

    <!-- 详细信息网格 -->
    <div class="details-grid">
      <div class="detail-item">
        <span class="detail-label">体感温度</span>
        <span class="detail-value">{{feelsLike }}°C</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">湿度</span>
        <span class="detail-value">{{ humidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">气压</span>
        <span class="detail-value">{{ pressure }} hPa</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">风速</span>
        <span class="detail-value">{{ weatherData.wind.speed }} m/s</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">降水量</span>
        <span class="detail-value">{{ rainfall }} mm</span>
      </div>
      <div class="detail-item">
        <span class="detail-label">能见度</span>
        <span class="detail-value">{{ visibility }} km</span>
      </div>
    </div>

    <!-- 日出日落 -->
    <div class="sun-info">
      <div class="sun-item">
        <span>🌅 日出</span>
        <span>{{ sunriseTime }}</span>
      </div>
      <div class="sun-item">
        <span>🌇 日落</span>
        <span>{{ sunsetTime }}</span>
      </div>
    </div>

    <!-- 按钮区域 -->
    <!-- <div class="card-footer">
      <button @click="handleRefresh" class="refresh-btn">
        🔄 刷新
      </button>
      <button @click="handleToggleUnit" class="unit-btn">
        🌡️ 切换单位
      </button>
    </div> -->
  </div>
</template>

<script setup>
import { computed } from 'vue'

// 接收父组件传递的数据
const props = defineProps({
  weatherData: {
    type: Object,
    required: true,
    // default: () => ({})
  },
  unit: {
    type: String,
    default: 'metric' // metric: 摄氏度, imperial: 华氏度
  }
})

// 定义事件
const emit = defineEmits(['refresh', 'toggle-unit'])

// 计算属性：提取和格式化数据
// const cityName = computed(() => props.weatherData.name || '未知城市')
// const country = computed(() => props.weatherData.sys?.country || '')
const weatherDescription = computed(() => props.weatherData.weather?.[0]?.description || '未知')
const weatherIcon = computed(() => props.weatherData.weather?.[0]?.icon || '01d')
const weatherIconUrl = computed(() => `https://openweathermap.org/img/wn/${weatherIcon.value}@2x.png`)

// 温度处理
const formattedTemp = computed(() => {
  const temp = props.weatherData.main?.temp
  if (!temp) return '--'
  
  if (props.unit === 'metric') {
    // 如果返回的是开尔文，减去273.15；如果已经是摄氏度，直接使用
    return temp > 200 ? Math.round(temp - 273.15) : Math.round(temp)
  } else {
    const celsius = temp > 200 ? temp - 273.15 : temp
    return Math.round((celsius * 9/5) + 32)
  }
})

const feelsLike = computed(() => {
  const temp = props.weatherData.main?.feels_like
  if (!temp) return '--'
  
  if (props.unit === 'metric') {
    return temp > 200 ? Math.round(temp - 273.15) : Math.round(temp)
  } else {
    const celsius = temp > 200 ? temp - 273.15 : temp
    return Math.round((celsius * 9/5) + 32)
  }
})

const humidity = computed(() => props.weatherData.main?.humidity || '--')
const pressure = computed(() => props.weatherData.main?.pressure || '--')

const windSpeed = computed(() => {
  const speed = props.weatherData.wind?.speed
  if (!speed) return '--'
  
  if (props.unit === 'metric') {
    return speed
  } else {
    return (speed * 2.237).toFixed(1)
  }
})

const rainfall = computed(() => props.weatherData.rain?.['1h'] || 0)
const visibility = computed(() => (props.weatherData.visibility / 1000)?.toFixed(1) || '--')

// 时间格式化
const sunriseTime = computed(() => {
  const timestamp = props.weatherData.sys?.sunrise
  if (!timestamp) return '--'
  return new Date(timestamp * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

const sunsetTime = computed(() => {
  const timestamp = props.weatherData.sys?.sunset
  if (!timestamp) return '--'
  return new Date(timestamp * 1000).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
})

// 天气主题
const weatherTheme = computed(() => {
  const weatherMain = props.weatherData.weather?.[0]?.main
  switch(weatherMain) {
    case 'Rain': return 'theme-rain'
    case 'Clear': return 'theme-clear'
    case 'Clouds': return 'theme-clouds'
    case 'Snow': return 'theme-snow'
    default: return 'theme-default'
  }
})

// 事件处理
const handleRefresh = () => {
  emit('refresh')
}

const handleToggleUnit = () => {
  emit('toggle-unit')
}
</script>

<style lang="scss" scoped>
// 变量定义
$border-radius: 20px;
$transition: all 0.3s ease;
$spacing-sm: 5px;
$spacing-md: 15px;
$spacing-lg: 20px;

// 混合宏
@mixin glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 主卡片样式
.weather-card {
  width: 400px;
  margin: $spacing-lg auto;
  padding: $spacing-lg;
  border-radius: $border-radius;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: $transition;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  &.theme-clear {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }
  
  &.theme-rain {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  }
  
  &.theme-clouds {
    background: linear-gradient(135deg, #757f9a 0%, #d7dde8 100%);
  }
  
  &.theme-snow {
    background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  }
  
  .city-info {
    text-align: center;
    margin-bottom: $spacing-lg;
    
    h2 {
      font-size: 28px;
      margin: 0;
    }
    
    .country {
      font-size: 14px;
      opacity: 0.9;
      margin-top: $spacing-sm;
    }
  }
  
  .weather-main {
    text-align: center;
    margin-bottom: $spacing-lg;
    
    .weather-icon {
      width: 100px;
      height: 100px;
    }
    
    .temperature {
      font-size: 48px;
      font-weight: bold;
      margin: 10px 0;
      
      .temp-unit {
        font-size: 24px;
      }
    }
    
    .weather-desc {
      font-size: 18px;
      text-transform: capitalize;
    }
  }
  
  .details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin: $spacing-lg 0;
    padding: $spacing-md;
    @include glass-effect;
    border-radius: $border-radius;
    
    .detail-item {
      @include flex-center;
      flex-direction: column;
      
      .detail-label {
        font-size: 12px;
        opacity: 0.8;
        margin-bottom: $spacing-sm;
      }
      
      .detail-value {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
  
  .sun-info {
    display: flex;
    justify-content: space-around;
    margin: $spacing-lg 0;
    padding: $spacing-md;
    @include glass-effect;
    border-radius: $border-radius;
    
    .sun-item {
      @include flex-center;
      flex-direction: column;
      gap: $spacing-sm;
    }
  }
  
  .card-footer {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: $spacing-lg;
    
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.2);
      color: white;
      cursor: pointer;
      transition: $transition;
      
      &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }
    }
  }
}

// 响应式
@media (max-width: 768px) {
  .weather-card {
    margin: 10px;
    padding: $spacing-md;
    
    .temperature {
      font-size: 36px !important;
    }
  }
}

// 动画
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.weather-card {
  animation: fadeIn 0.5s ease-out;
}
</style>