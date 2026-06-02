<template>
  <div class="forecast-card">
    <div class="forecast-header">
      <span class="forecast-icon">📅</span>
      <h3 class="forecast-title">未来5天预报</h3>
    </div>
    
    <div class="forecast-list">
      <div 
        v-for="(day, index) in dailyForecast" 
        :key="index"
        class="forecast-item"
        :class="{ 'first-item': index === 0 }"
      >
        <div class="forecast-date">
          <span class="weekday">{{ day.weekday }}</span>
          <span class="date">{{ day.date }}</span>
        </div>
        
        <div class="forecast-icon-wrapper">
          <img 
            :src="`https://openweathermap.org/img/wn/${day.icon}@2x.png`" 
            :alt="day.description"
            class="weather-icon"
          />
        </div>
        
        <div class="forecast-temp">
          <span class="temp-max">{{ day.tempMax }}°</span>
          <span class="temp-min">{{ day.tempMin }}°</span>
        </div>
        
        <div class="forecast-desc">{{ day.description }}</div>
        
        <div class="forecast-details">
          <div class="detail-item">
            <span class="detail-icon">💧</span>
            <span>{{ day.humidity }}%</span>
          </div>
          <div class="detail-item">
            <span class="detail-icon">🌬️</span>
            <span>{{ day.windSpeed }} m/s</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  forecastData: {
    type: Object,
    required: true,
    default: () => ({ list: [] })
  }
})

// 将40条3小时间隔数据按天聚合为5条每日数据
const dailyForecast = computed(() => {
  if (!props.forecastData?.list || !Array.isArray(props.forecastData.list)) {
    return []
  }
  
  const dailyMap = new Map()
  
  props.forecastData.list.forEach(item => {
    // 提取日期部分（YYYY-MM-DD）
    const dateKey = item.dt_txt.split(' ')[0]
    const date = new Date(dateKey)
    const weekday = getWeekday(date)
    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`
    
    // 获取当天温度（从开尔文转摄氏度）
    const tempMax = Math.round(item.main?.temp_max - 273.15)
    const tempMin = Math.round(item.main?.temp_min - 273.15)
    const humidity = item.main?.humidity || 0
    const windSpeed = Math.round(item.wind?.speed || 0)
    const icon = item.weather?.[0]?.icon || '01d'
    const description = item.weather?.[0]?.description || ''
    
    if (!dailyMap.has(dateKey)) {
      // 第一天，初始化数据
      dailyMap.set(dateKey, {
        weekday,
        date: formattedDate,
        tempMax,
        tempMin,
        humidity,
        windSpeed,
        icon,
        description,
        tempMaxList: [tempMax],
        tempMinList: [tempMin]
      })
    } else {
      // 同一天，更新极值
      const dayData = dailyMap.get(dateKey)
      dayData.tempMaxList.push(tempMax)
      dayData.tempMinList.push(tempMin)
      dayData.tempMax = Math.max(...dayData.tempMaxList)
      dayData.tempMin = Math.min(...dayData.tempMinList)
      // 取中午12点左右的天气作为当天代表
      const hour = new Date(item.dt_txt).getHours()
      if (hour >= 11 && hour <= 14) {
        dayData.icon = icon
        dayData.description = description
      }
    }
  })
  
  // 转换为数组并取前5天
  return Array.from(dailyMap.values()).slice(0, 5)
})

// 获取星期几
const getWeekday = (date) => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[date.getDay()]
}
</script>

<style scoped lang="scss">
.forecast-card {
  width: 400px;
  height: 690px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 24px;
  padding: 20px;
  margin-top: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  .forecast-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7eb;

    .forecast-icon {
      font-size: 24px;
    }

    .forecast-title {
      font-size: 18px;
      font-weight: 600;
      color: #374151;
      margin: 0;
    }
  }

  .forecast-list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .forecast-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 14px 16px;
      background: #f9fafb;
      border-radius: 20px;
      transition: all 0.3s ease;
      flex-wrap: wrap;
      gap: 12px;

      &:hover {
        background: #f3f4f6;
        transform: translateX(4px);
      }

      &.first-item {
        background: linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%);
      }

      .forecast-date {
        min-width: 85px;
        display: flex;
        flex-direction: column;

        .weekday {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
        }

        .date {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }
      }

      .forecast-icon-wrapper {
        width: 50px;
        display: flex;
        justify-content: center;

        .weather-icon {
          width: 44px;
          height: 44px;
        }
      }

      .forecast-temp {
        min-width: 85px;
        display: flex;
        gap: 12px;
        justify-content: center;

        .temp-max {
          font-size: 18px;
          font-weight: 700;
          color: #ef4444;
        }

        .temp-min {
          font-size: 16px;
          font-weight: 500;
          color: #6b7280;
        }
      }

      .forecast-desc {
        flex: 1;
        font-size: 14px;
        color: #4b5563;
        text-transform: capitalize;
        min-width: 80px;
      }

      .forecast-details {
        display: flex;
        gap: 16px;

        .detail-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #6b7280;

          .detail-icon {
            font-size: 14px;
          }
        }
      }
    }
  }
}

// 响应式
@media (max-width: 768px) {
  .forecast-card {
    padding: 16px;

    .forecast-list {
      .forecast-item {
        padding: 12px;

        .forecast-date {
          min-width: 70px;
        }

        .forecast-temp {
          min-width: 70px;
          
          .temp-max {
            font-size: 16px;
          }
          
          .temp-min {
            font-size: 14px;
          }
        }

        .forecast-desc {
          font-size: 12px;
          min-width: 65px;
        }

        .forecast-details {
          gap: 12px;
          
          .detail-item {
            font-size: 11px;
          }
        }
      }
    }
  }
}

@media (max-width: 550px) {
  .forecast-card {
    .forecast-list {
      .forecast-item {
        flex-direction: column;
        text-align: center;
        
        .forecast-date {
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 1px dashed #e5e7eb;
          padding-bottom: 8px;
          margin-bottom: 4px;
        }

        .forecast-icon-wrapper {
          order: 1;
        }

        .forecast-temp {
          order: 2;
        }

        .forecast-desc {
          order: 3;
          width: 100%;
        }

        .forecast-details {
          order: 4;
          width: 100%;
          justify-content: center;
        }
      }
    }
  }
}
</style>