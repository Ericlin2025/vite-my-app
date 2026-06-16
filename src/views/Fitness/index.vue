<!-- <script setup>
import checkinButton from '@/components/checkinButton.vue';
import checkinHistory from '@/components/checkinHistory.vue';
import heatMap from '@/components/heatMap.vue';
import dayjs  from 'dayjs';
import {ref,watch} from 'vue'
const checkList = ref(JSON.parse(localStorage.getItem('checkList')||'[]'))
const addToList = (n,wtime,wtype,nt) =>{
    // const now = dayjs().format('YYYY-MM-DD hh:mm:ss')
    const card = {
        time:n,
        user:'admin',
        workoutTime:wtime,
        workoutType:wtype,
        note:nt,
    }
    checkList.value.push(card)
}
watch(checkList,(newlist)=>{
    localStorage.setItem('checkList',JSON.stringify(newlist))
},{immediate:true,deep:true})
</script>


<template>
    <div class="fitness">
        <RouterLink to="/">返回首页</RouterLink>
        <h1>健身打卡</h1>
        <div class="data">
            <checkinButton :data="checkList" @checked="addToList"/>
        <heatMap :data="checkList"/>
        </div>
        <checkinHistory :data="checkList"/>
        
    </div>

</template>

<style scoped lang="scss">
.fitness{
    background-image: url(../../assets/img/bg/健身模块背景.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    .data{
        display: flex;
        justify-content: space-around;
    }
}

</style> -->
<script setup>
import checkinButton from '@/components/checkinButton.vue';
import checkinHistory from '@/components/checkinHistory.vue';
import heatMap from '@/components/heatMap.vue';
import dayjs  from 'dayjs';
import {ref,watch} from 'vue'
const checkList = ref(JSON.parse(localStorage.getItem('checkList')||'[]'))
const addToList = (n,wtime,wtype,nt) =>{
    // const now = dayjs().format('YYYY-MM-DD hh:mm:ss')
    const card = {
        time:n,
        user:'admin',
        workoutTime:wtime,
        workoutType:wtype,
        note:nt,
    }
    checkList.value.push(card)
}
watch(checkList,(newlist)=>{
    localStorage.setItem('checkList',JSON.stringify(newlist))
},{immediate:true,deep:true})
</script>


<template>
    <div class="fitness">
        <div class="header">
            <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
            <h1>💪 健身打卡</h1>
        </div>
        
        <div class="data">
            <div class="checkin-section">
                <checkinButton :data="checkList" @checked="addToList"/>
            </div>
            <div class="heatmap-section">
                <heatMap :data="checkList"/>
            </div>
        </div>
        
        <div class="history-section">
            <checkinHistory :data="checkList"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.fitness {
    min-height: 100vh;
    background-image: url(../../assets/img/bg/健身模块背景.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding: 30px;
    
    .header {
        text-align: center;
        margin-bottom: 40px;
        position: relative;
        
        .back-link {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            color: #00d4c0;
            text-decoration: none;
            font-size: 16px;
            padding: 8px 16px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 20px;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            
            &:hover {
                background: rgba(0, 180, 170, 0.3);
                transform: translateY(-50%) translateX(-5px);
            }
        }
        
        h1 {
            color: #00d4c0;
            font-size: 36px;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
    }
    
    .data {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-bottom: 40px;
        flex-wrap: wrap;
        
        .checkin-section {
            flex: 1;
            min-width: 350px;
            max-width: 500px;
        }
        
        .heatmap-section {
            flex: 1;
            min-width: 500px;
        }
    }
    
    .history-section {
        width: 100%;
    }
}

// 响应式布局
@media (max-width: 968px) {
    .fitness {
        padding: 20px;
        
        .data {
            flex-direction: column;
            align-items: center;
            
            .checkin-section {
                max-width: 100%;
                width: 100%;
            }
            
            .heatmap-section {
                min-width: auto;
                width: 100%;
            }
        }
    }
}
</style>