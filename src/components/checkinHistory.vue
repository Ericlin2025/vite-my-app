<!-- <script setup>
import Index from '@/views/Layout/index.vue';


const props = defineProps({
    data:{
        type:Array,
        required:true
    }
})
const deleteChecked= (i) =>{
    props.data.splice(i,1)
}
</script>


<template>
<div class="list">
    <p>打卡记录：</p>
    <ul>
        <li v-for="(i,index) in data">
            <p>打卡者：{{ i.user }}</p>
            <p>打卡时间：{{ i.time }}</p>
            <p>训练部位：{{ i.workoutType || "无"}}</p>
            <p>训练时长：{{ i.workoutTime || "无 "}}分钟</p>
            <p>训练笔记：{{ i.note||"无 "}}</p>
            <button @click="deleteChecked(index)">取消打卡</button>
        </li>
    </ul>
</div>
</template>

<style scoped lang="scss">
ul{
    display: grid;
    grid-template-columns: repeat(7,1fr);
}

</style> -->
<script setup>
import Index from '@/views/Layout/index.vue';


const props = defineProps({
    data:{
        type:Array,
        required:true
    }
})
const deleteChecked= (i) =>{
    props.data.splice(i,1)
}
</script>


<template>
<div class="list">
    <h2 class="list-title">📋 打卡记录</h2>
    <ul>
        <li v-for="(i,index) in data" :key="index" class="record-card">
            <div class="record-header">
                <span class="user-icon">👤</span>
                <span class="user-name">{{ i.user }}</span>
                <span class="record-date">{{ i.time }}</span>
            </div>
            <div class="record-body">
                <div class="record-item">
                    <span class="item-label">🎯 训练部位：</span>
                    <span class="item-value">{{ i.workoutType || "无" }}</span>
                </div>
                <div class="record-item">
                    <span class="item-label">⏱️ 训练时长：</span>
                    <span class="item-value">{{ i.workoutTime || "无" }} 分钟</span>
                </div>
                <div class="record-item notes">
                    <span class="item-label">📝 训练笔记：</span>
                    <span class="item-value">{{ i.note || "无" }}</span>
                </div>
            </div>
            <button class="delete-btn" @click="deleteChecked(index)">🗑️ 取消打卡</button>
        </li>
    </ul>
</div>
</template>

<style scoped lang="scss">
.list {
    background: linear-gradient(135deg, #0f20278f 0%, #203a4388 50%, #2c536486 100%);
    border-radius: 20px;
    padding: 20px;
    margin-top: 20px;
}

.list-title {
    color: #00d4c0;
    font-size: 24px;
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 180, 170, 0.3);
}

ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;
}

.record-card {
    background: rgba(30, 30, 40, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 16px;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 180, 170, 0.2);
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: rgba(0, 180, 170, 0.5);
        background: rgba(30, 30, 40, 0.9);
    }
}

.record-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    padding-bottom: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-icon {
    font-size: 20px;
}

.user-name {
    font-weight: bold;
    color: #00d4c0;
    font-size: 16px;
}

.record-date {
    margin-left: auto;
    color: #888;
    font-size: 12px;
}

.record-body {
    margin-bottom: 15px;
}

.record-item {
    display: flex;
    margin-bottom: 10px;
    font-size: 14px;
    
    &.notes {
        flex-direction: column;
        gap: 5px;
    }
}

.item-label {
    color: #aaa;
    min-width: 90px;
}

.item-value {
    color: #e0e0e0;
    word-break: break-word;
}

.delete-btn {
    width: 100%;
    padding: 10px;
    background: rgba(220, 60, 60, 0.8);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(220, 60, 60, 1);
        transform: translateY(-1px);
    }
    
    &:active {
        transform: translateY(0);
    }
}
</style>