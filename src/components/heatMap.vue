<script setup>
import dayjs from 'dayjs';
import { ref ,onMounted,watch, computed} from 'vue';
import 'echarts'  // 全量引入，所有图表和组件都可用
import VChart from 'vue-echarts'
const props = defineProps({
    data:{
        type:Object,
        required:true
    }
})
const total = ref()
const days = ref([])
const month = ref(0)
const count  = computed(()=>{
    return props.data.length
})
const getDays = () =>{
    days.value=[]
    total.value = dayjs().daysInMonth()
    const yearMonth = dayjs().format('YYYY-MM')
    for(let i=1;i<=total.value;i++){
        const found = props.data.find(item=>item.time=== `${yearMonth}-${String(i).padStart(2,'0')}`)
        if(found){
            days.value.push( {
                time:`${yearMonth}-${String(i).padStart(2,'0')}`,
                checked:true
            })
        }else{
            days.value.push( {
                time:`${yearMonth}-${String(i).padStart(2,'0')}`,
                checked:false
            })
        }
    }
    console.log(days.value)
}
const reCheck = (t,i) =>{
    const now = dayjs().format('YYYY-MM-DD')
    if(now<t){
        alert('当前不可以补签')
        return
    }
    alert('确定要补签吗？')
    days.value[i].checked=true
    props.data.unshift({
        
        time:t,
        user:'admin',
        workoutType:'',
        workoutTime:'',
        note:''
    })
console.log(props.data)
}

//根据打卡数据获取x,y轴的数据
const xdata = computed(()=>{
    return props.data.map(i=>i.time)
})
const ydata = computed (()=>{
    return props.data.map(i=>i.workoutTime)
})
//折线图
const option = ref({
  title: { text: '训练时长趋势',textStyle: { color: '#e0e0e0' }  },
  xAxis: {  type: 'category',
            name:'日期',
            data:xdata ,
            nameTextStyle: { color: '#ccc' }, 
            axisLabel: { color: '#ccc' },  
            axisLine: { lineStyle: { color: '#666' } } }  ,
  yAxis: {  type: 'value', 
            name: '分钟' ,  
            nameTextStyle: { color: '#ccc' },  // Y轴名称颜色
            axisLabel: { color: '#ccc' },  
            axisLine: { lineStyle: { color: '#666' } }}  ,
  series: [{
    data: ydata,
    type: 'line',
    smooth: true
  }]
})

//获取不同部位的训练次数
const LegDay = computed(()=>{
    return props.data.filter(i=>i.workoutType==='腿部训练').length
})
const ShoulderDay = computed(()=>{
    return props.data.filter(i=>i.workoutType==='肩部训练').length
})
const ChestDay = computed(()=>{
    return props.data.filter(i=>i.workoutType==='胸部训练').length
})
const ArmDay = computed(()=>{
    return props.data.filter(i=>i.workoutType==='手臂训练').length
})
const BackDay = computed(()=>{
    return props.data.filter(i=>i.workoutType==='背部训练').length
})
const AbdominalDay = computed(()=>{
    return props.data.filter(i=>i.workoutType==='腹部训练').length
})
//饼图
const pieOption = ref({
  title: { text: '训练部位占比分布',textStyle: { color: '#e0e0e0' }   },
  tooltip: { trigger: 'item' },
  legend: {
    textStyle: { color: '#ccc' },  // 图例文字颜色
    pageTextStyle: { color: '#ccc' }  // 翻页文字颜色（如果图例太多）
  },
  series: [{
    name: '训练部位',
    type: 'pie',  // 关键：类型改成 pie
    radius: '50%',  // 饼图半径
    data: [
      { name: '腿部', value: LegDay},
      { name: '肩部', value: ShoulderDay },
      { name: '胸部', value: ChestDay },
      { name: '手臂', value: ArmDay},
      { name: '背部', value: BackDay },
      { name: '腹部', value: AbdominalDay }

    ],
    label: {
      show: true,  // 显示标签
      formatter: '{b}: {d}%'  // 显示名称和百分比
    }
  }]
})


onMounted(()=>{
    getDays()
})
watch(props.data,(newl)=>{
    getDays()
},{immediate:true,deep:true})
</script>

<template>
<div class="map">
    <h2>📅 打卡热力图</h2>
    <p v-if="count<total" class="progress-text">本月已签到：{{count}}/{{ total }}天</p>
    <p v-else class="progress-text success">本月已签满，真自律！(๑•̀ㅂ•́)و✧</p>
    
    <ul class="list">
        <li v-for="(d,index) in days" :class="{active:d.checked}" @click="reCheck(d.time,index)">
            {{ d.time.slice(5) }}
        </li>
    </ul>
    
    <div class="echart">
        <div class="chart-wrapper">
            <h3>📈 训练时长趋势</h3>
            <VChart class="chart" :option="option" />
        </div>
        <div class="chart-wrapper">
            <h3>🥧 训练部位占比</h3>
            <VChart class="pie-chart" :option="pieOption" />
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.map {
    background: linear-gradient(135deg, #0f20278f 0%, #203a4388 50%, #2c536486 100%);
    border-radius: 20px;
    padding: 25px;
    // margin: 20px 0;
    border: 1px solid rgba(0, 180, 170, 0.2);
    
    h2 {
        color: #00d4c0;
        margin: 0 0 15px 0;
        font-size: 24px;
    }
    
    .progress-text {
        color: #e0e0e0;
        margin-bottom: 20px;
        padding: 10px;
        background: rgba(30, 30, 40, 0.6);
        border-radius: 10px;
        text-align: center;
        
        &.success {
            color: #00d4c0;
            background: rgba(0, 180, 170, 0.1);
        }
    }
    
    .list {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 8px;
        padding: 0;
        margin: 0 0 30px 0;
        list-style: none;
        
        li {
            background: rgba(30, 30, 40, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            text-align: center;
            padding: 8px 4px;
            font-size: 12px;
            color: #ccc;
            cursor: pointer;
            transition: all 0.3s ease;
            
            &:hover {
                background: rgba(0, 180, 170, 0.2);
                border-color: #00b4aa;
                transform: translateY(-2px);
            }
            
            &.active {
                background: linear-gradient(135deg, #00b4aa 0%, #00d4c0 100%);
                color: white;
                border-color: #00d4c0;
                box-shadow: 0 2px 8px rgba(0, 180, 170, 0.3);
            }
        }
    }
    
    .echart {
        display: flex;
        flex-direction: column;
        gap: 30px;
        
        .chart-wrapper {
            background: rgba(30, 30, 40, 0.6);
            border-radius: 16px;
            padding: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 180, 170, 0.2);
            
            h3 {
                color: #00d4c0;
                margin: 0 0 15px 0;
                font-size: 18px;
            }
            
            .chart, .pie-chart {
                height: 350px;
                width: 100%;
            }
        }
    }
}
</style>