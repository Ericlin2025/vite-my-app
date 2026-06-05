<script setup>
const props = defineProps({
    poem:{
        type:Object,
        required: true,
    },
    data:{
        type:Object,
        required:true
    }
})

</script>



<template>
    <div class="life">
        <div class="poem">
            <h3>每日文学推荐：</h3>
            <p>{{poem.data?.hitokoto}}——<small>{{ poem.data?.from_who||'无作者'}}</small></p>
            <span>来自：《{{ poem.data?.from }}》</span>
            
        </div>
        <div class="info">
            <h3 >今日天气评价：</h3>
            <p :class="{hot:data.main?.feels_like>25,
                cool:data.main?.feels_like>10&&data.main?.feels_like<25,
                cold:data.main?.feels_like<10}">今日体感温度为：{{ data.main?.feels_like }}℃</p>
            <p v-if="data.main?.feels_like>25?true:false" class="hot">今日体感温度较高，请注意防暑降温，尽量减少午后户外活动，多补充水分，穿着轻薄透气的衣物。</p>
            <p v-else-if="data.main?.feels_like<10?true:false" class="cold">今日体感温度偏低，天气较凉，请注意增添衣物，外出时穿戴外套、围巾等保暖装备，小心着凉感冒。</p>
            <p v-else class="cool">今日体感温度舒适，天气宜人，非常适合进行户外活动或出门散步，保持通风，享受这难得的好天气吧。</p>
            <p v-if="data.weather?.[0].main==='Clear'" class="clear">☀️ 今日阳光明媚，晴空万里，紫外线较强，出门请做好防晒措施，佩戴太阳镜和遮阳帽，适合晾晒衣物。</p>
            <p v-else-if="data.weather?.[0].main==='Rain'" class="rain">☔ 今日有雨，路面湿滑，出行请随身携带雨具，开车注意减速慢行，室内注意防潮，雨天适合宅家休息。</p>
            <p v-else class="cloud">☁️ 今日天空云量较多，阳光时而露脸，体感舒适，紫外线强度适中，适合外出活动，但早晚温差可能较大。</p>
        </div>
        <div class="advice">
            <h3>运动建议：</h3>
            <p v-if="data.weather?.[0].main === 'Clear'" class="sport-clear">
  🏃 今日天气晴好，阳光充足，非常适合户外跑步、骑行或登山等有氧运动，建议选择早晨或傍晚时段锻炼，避免中午暴晒。
</p>
<p v-else-if="data.weather?.[0].main === 'Rain'" class="sport-rain">
  🏠 今日有雨，路面湿滑，建议进行室内运动，如瑜伽、健身操、跳绳或使用跑步机，运动后记得更换干爽衣物防止着凉。
</p>
<p v-else-if="data.weather?.[0].main === 'Snow'" class="sport-snow">
  ⛄ 今日有雪，气温较低，建议进行室内运动为主，如想去雪地活动请注意保暖防滑，滑雪爱好者可前往正规滑雪场体验。
</p>
<p v-else-if="data.weather?.[0].main === 'Clouds'" class="sport-clouds">
  ☁️ 今日多云，阳光不刺眼，体感舒适，非常适合散步、慢跑或球类运动，全天都是不错的运动时段，记得做好热身。
</p>
<p v-else-if="data.main?.feels_like > 32" class="sport-hot">
  🥵 今日天气炎热，体感温度较高，建议避免剧烈户外运动，可选择游泳或清晨/傍晚进行轻度运动，注意及时补充水分。
</p>
<p v-else-if="data.main?.feels_like < 5" class="sport-cold">
  ❄️ 今日天气寒冷，体感温度较低，建议进行室内运动热身，户外运动需做好保暖措施，运动后及时擦汗防止感冒。
</p>
<p v-else class="sport-normal">
  🚶 今日天气舒适，体感温度适宜，无论是户外跑步、散步还是球类运动都很合适，保持适当运动量，享受健康生活。
</p>
        </div>
        <RouterLink to="/weather/diary">想要记录生活吗？去写日记→</RouterLink>
    </div>

</template>


<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-border-radius: 24px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

.life {
  margin-top: 20px;
  width: 400px;
  height: 690px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: $card-border-radius;
  padding: 24px;
  box-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.15);
  transition: $transition;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 40px -12px rgba(0, 0, 0, 0.2);
  }
  a{
        color: white;
        background-color: orange;
        display: flex;
        width: 300px;
        height: 30px;
        border-radius: 15px;
        justify-content: center;
        align-items: center;
      }
  .poem {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    
    h3 {
      color: #f472b6;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 8px;
      
      &::before {
        content: "📖";
        font-size: 18px;
      }
    }
    
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #374151;
      margin: 8px 0;
      font-style: italic;
      
      small {
        color: #9ca3af;
        font-style: normal;
      }
    }
    
    span {
      font-size: 12px;
      color: #9ca3af;
      display: inline-block;
      margin-top: 4px;
    }
  }

  .info {
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    
    h3 {
      color: #ec4899;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 8px;
      
      &::before {
        content: "🌤️";
        font-size: 18px;
      }
    }
    
    > p {
      margin: 10px 0;
      padding: 8px 12px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .hot {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      // border-left: 3px solid #ef4444;
    }
    
    .cool {
      background: rgba(34, 197, 94, 0.1);
      color: #16a34a;
      // border-left: 3px solid #22c55e;
    }
    
    .cold {
      background: rgba(59, 130, 246, 0.1);
      color: #3b82f6;
      // border-left: 3px solid #3b82f6;
    }
    
    .clear {
      background: rgba(251, 191, 36, 0.1);
      color: #d97706;
      // border-left: 3px solid #fbbf24;
    }
    
    .rain {
      background: rgba(96, 165, 250, 0.1);
      color: #3b82f6;
      // border-left: 3px solid #60a5fa;
    }
    
    .cloud {
      background: rgba(156, 163, 175, 0.1);
      color: #6b7280;
      // border-left: 3px solid #9ca3af;
    }
  }

  .advice {
    h3 {
      color: #14b8a6;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      gap: 8px;
      
      &::before {
        content: "🏃";
        font-size: 18px;
      }
    }
    
    .sport-clear,
    .sport-rain,
    .sport-snow,
    .sport-clouds,
    .sport-hot,
    .sport-cold,
    .sport-normal {
      padding: 12px 16px;
      border-radius: 16px;
      margin: 10px 0;
      font-size: 14px;
      line-height: 1.55;
      transition: $transition;
      
      &:hover {
        transform: translateX(4px);
      }
    }
    
    .sport-clear {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05));
      // border-left: 4px solid #fbbf24;
      color: #b45309;
    }
    
    .sport-rain {
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(96, 165, 250, 0.05));
      // border-left: 4px solid #60a5fa;
      color: #1d4ed8;
    }
    
    .sport-snow {
      background: linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(167, 139, 250, 0.05));
      // border-left: 4px solid #a78bfa;
      color: #6d28d9;
    }
    
    .sport-clouds {
      background: linear-gradient(135deg, rgba(156, 163, 175, 0.1), rgba(156, 163, 175, 0.05));
      // border-left: 4px solid #9ca3af;
      color: #4b5563;
    }
    
    .sport-hot {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
      // border-left: 4px solid #ef4444;
      color: #dc2626;
    }
    
    .sport-cold {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
      // border-left: 4px solid #3b82f6;
      color: #2563eb;
    }
    
    .sport-normal {
      background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
      // border-left: 4px solid #22c55e;
      color: #15803d;
    }
  }
}

// 响应式适配
@media (max-width: 550px) {
  .life {
    width: calc(100% - 32px);
    margin: 16px;
    padding: 18px;
    
    .poem p,
    .info > p,
    .advice p {
      font-size: 13px;
    }
  }
}
</style>