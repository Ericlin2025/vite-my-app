<script setup>
import dayjs from 'dayjs';
import { ref ,onMounted,watch} from 'vue';

const props = defineProps({
    data:{
        type:Object,
        required:true
    }
})
const total = ref()
const days = ref([])
const month = ref(0)
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
    alert('确定要补签吗？')
    days.value[i].checked=true
    props.data.push({
        
        time:t,
        user:'admin',
    })
console.log(props.data)
}
onMounted(()=>{
    getDays()
})
watch(props.data,(newl)=>{
    getDays()
},{immediate:true,deep:true})
</script>

<template>
<div class="map">
    <h2>打卡热力图</h2>
    <!-- <input type="text"  placeholder="请选择月份" v-model="month">
    <button @click="getDays(month)">确认</button> -->
    <p>这个月有:{{ total }}天</p>
    <ul>
        <li v-for="(d,index) in days" :class="{active:d.checked}" @click="reCheck(d.time,index)">
            {{ d.time}}
        </li>
    </ul>
</div>
</template>

<style scoped lang="scss">
.active{
    background-color: rgb(0, 201, 0);
}
ul{
    display: grid;
    grid-template-columns: repeat(7,1fr);
    gap: 10px;
    li{
        min-width: 150px;
        border: 1px solid black;
        &:hover{
            cursor: pointer;
            background-color: #b3b3b3;
        }
    }
}
</style>