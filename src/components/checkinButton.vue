<script setup>
import {ref,watch,onUnmounted} from 'vue'
import dayjs, { duration } from 'dayjs'
const emits = defineEmits(['checked'])

// const ctime = ref(JSON.parse(localStorage.getItem('ctime')||'[]'))
const props = defineProps({
    data:{
        type:Array,
        required:true
    }
})
const note = ref('')
const workoutTime = ref()
const workoutType = ref('')
// const now = ref(dayjs().format('YYYY-MM-DD'))
//判断今天是否打过卡
const status = ref('今日未打卡，请打卡')
const checkStatus = ()=>{
    const now = dayjs().format('YYYY-MM-DD')
    const found = props.data?.find(i=>i.time===now)
    if(found){
        status.value= '今日已打卡'
    }else{
        status.value= '今日未打卡，请打卡'
    }
}
checkStatus()
// let  timer
let timer = setInterval(()=>{
    checkStatus()
},5000)
//点击打卡，并记录
const checked = () =>{
    
    console.log('点击了打卡')
    // console.log(ctime.value)
    const now = dayjs().format('YYYY-MM-DD')
    const found = props.data.find(i=>i.time===now)
    if(found){
        alert('今天已经打过卡了')
    }else{
        
        alert('打卡成功')
        // ctime.value.push(now)
        emits('checked',now,workoutTime.value,workoutType.value,note.value)
        note.value=''
        workoutTime.value=''
        workoutType.value=''
        
    }
    checkStatus()
    
}
// watch(ctime,(newlist)=>{
//     localStorage.setItem('ctime',JSON.stringify(newlist))
// },{immediate:true,deep:true})

onUnmounted(()=>{
    if(timer){
        clearInterval(timer)
        timer=null
    }
})
</script>
<!-- 
<template>

    <div class="check">
        <span>锻炼时长（分钟）：</span><input type="number" placeholder="训练时长" v-model="workoutTime"><br>
        <span>训练部位：</span><select name="" id="" v-model="workoutType">
            <option value="腿部训练">腿部训练</option>
            <option value="胸部训练">胸部训练</option>
            <option value="肩部训练">肩部训练</option>
            <option value="手臂训练">手臂训练</option>
            <option value="背部训练">背部训练</option>
            <option value="腹部训练">腹部训练</option>
        </select>
        <p>训练笔记：</p>
        <textarea name="" id="" placeholder="训练笔记" v-model="note"></textarea><br>

        <button @click="checked" >{{status}}</button>
    </div>
</template> -->
<template>
    <div class="check">
        <h2 class="list-title">⌨️打卡输入</h2>
        <div class="form-group">
            <label>锻炼时长（分钟）：</label>
            <input type="number" placeholder="训练时长" v-model="workoutTime">
        </div>
        
        <div class="form-group">
            <label>训练部位：</label>
            <select v-model="workoutType">
                <option value="腿部训练">🦵 腿部训练</option>
                <option value="胸部训练">💪 胸部训练</option>
                <option value="肩部训练">🎯 肩部训练</option>
                <option value="手臂训练">💪 手臂训练</option>
                <option value="背部训练">🔙 背部训练</option>
                <option value="腹部训练">🏋️ 腹部训练</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>训练笔记：</label>
            <textarea placeholder="记录今天的训练的内容与感受..." v-model="note"></textarea>
        </div>

        <button class="check-btn" @click="checked">{{status}}</button>
    </div>
</template>

<style scoped lang="scss">
.list-title {
    color: #00d4c0;
    font-size: 24px;
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 180, 170, 0.3);
}
.check {
    background: linear-gradient(135deg, #0f20278f 0%, #203a4388 50%, #2c536486 100%);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    // width: 30%;
    // margin: 0 auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
    margin-bottom: 20px;
    
    label {
        display: block;
        color: #e0e0e0;
        font-weight: 500;
        margin-bottom: 8px;
        font-size: 14px;
        letter-spacing: 0.5px;
    }
    
    input, select, textarea {
        width: 100%;
        padding: 12px 15px;
        border: none;
        border-radius: 10px;
        font-size: 14px;
        background: rgba(30, 30, 40, 0.9);
        color: #e0e0e0;
        transition: all 0.3s ease;
        box-sizing: border-box;
        
        &:focus {
            outline: none;
            background: #2a2a35;
            box-shadow: 0 0 0 2px #00b4aa;
            transform: translateY(-1px);
        }
        
        &:hover {
            background: #2a2a35;
        }
    }
    
    input, select {
        height: 45px;
    }
    
    textarea {
        min-height: 80px;
        resize: vertical;
        font-family: inherit;
    }
}

.check-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #00b4aa 0%, #00d4c0 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(0, 180, 170, 0.4);
        background: linear-gradient(135deg, #00c4b8 0%, #00e4d0 100%);
    }
    
    &:active {
        transform: translateY(0);
    }
}
</style>