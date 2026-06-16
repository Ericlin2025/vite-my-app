<script setup>
    import {ref,computed} from 'vue'

    const city = ref('')
    const list = ref([])
    const emits = defineEmits(['inputEvent'])
    const inputEvent = ()=>{
        if(!city.value){
            alert('还未输入城市名，请输入！')
            return
        }
        emits('inputEvent',city.value)
        console.log('子组件进行了搜索，搜索的城市名为：'+city.value)
        list.value.push(city.value)
        console.log(list.value)
        city.value=''
    }
    const deleteItem= (i) =>{
        list.value.splice(i,1)
        console.log('成功删除')
    }
    const delAll = ()=>{
        list.value=[]
    }
    const count = computed(()=>list.value.length)
 </script>

<template>
    <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            v-model="city" 
            placeholder="输入城市名称，例如：Beijing、上海、London"
            class="search-input"
            @keyup.enter="inputEvent"
            
          />
          <button @click="inputEvent" class="search-btn">
            查询天气情况
          </button>
        </div>
        
        <!-- 热门城市快速选择 -->
        <div class="hot-cities">
          <span class="hot-label">热门搜索城市：</span>
          <div class="city-list">
            <span @click="city = '北京'; inputEvent()" class="city-tag">北京</span>
            <span @click="city = '上海'; inputEvent()" class="city-tag">上海</span>
            <span @click="city = '广州'; inputEvent()" class="city-tag">广州</span>
            <span @click="city = '深圳'; inputEvent()" class="city-tag">深圳</span>
            <span @click="city = '成都'; inputEvent()" class="city-tag">成都</span>
            <span @click="city = '伦敦'; inputEvent()" class="city-tag">伦敦</span>
            <span @click="city = '东京'; inputEvent()" class="city-tag">东京</span>
            <span @click="city = '纽约'; inputEvent()" class="city-tag">纽约</span>
          </div>
        </div>
      </div>
      <div class="history">
        <div class="list" v-if="list.length===0?false:true">
            <div class="hd">
                <p>搜索历史({{ count }})：</p>
                <span @click="delAll">清空历史</span>
            </div>
            <ul>
                <li v-for="(i,index) in list" @click="city=i">
                   <div class="cname">{{ index+1 }}.{{ i }}</div>
                   <button @click="deleteItem(index)">X</button>
                </li>
            </ul>
            
        </div>
        <div class="empty" v-else>
            搜索记录为空，请先进行搜索
        </div>
      </div>
</template>


<style scoped lang="scss">
$primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$card-border-radius: 24px;
$transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
  .history {
  animation: fadeInUp 0.6s ease-out 0.2s both;
  width: 637px;

  .list {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    width: 637px;
    height: 490px;
    border-radius: $card-border-radius;
    padding: 20px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    transition: $transition;

    .hd {
      // width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      p {
        font-size: 15px;
        font-weight: 600;
        color: #374151;
        margin: 0;
      }

      span {
        padding: 6px 14px;
        border-radius: 20px;
        background: linear-gradient(135deg, #ef4444, #dc2626);
        color: white;
        font-size: 12px;
        font-weight: 500;
        transition: $transition;

        &:hover {
          cursor: pointer;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }

    ul {
      margin-top: 16px;
      width: 100%;
      height: 350px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      overflow-y: auto;
      padding-right: 8px;

      // 自定义滚动条
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.05);
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(102, 126, 234, 0.5);
        border-radius: 10px;

        &:hover {
          background: rgba(102, 126, 234, 0.8);
        }
      }

      li {
        border: 1px solid rgba(0, 0, 0, 0.08);
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        width: 100%;
        max-width: 560px;
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
          transform: translateX(6px);
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
          border-color: rgba(102, 126, 234, 0.3);
        }

        .cname {
          margin-left: 16px;
          font-size: 14px;
          color: #374151;
          font-weight: 500;
        }

        button {
          background: rgba(239, 68, 68, 0.1);
          border: none;
          margin-right: 12px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          font-size: 14px;
          color: #ef4444;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;

          &:hover {
            background: #ef4444;
            color: white;
            transform: scale(1.05);
          }
        }
      }
    }
  }

  .empty {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: $card-border-radius;
    width: 637px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #9ca3af;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }
}
    .search-section {
    width: 635px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: $card-border-radius;
    padding: 24px;
    margin-top: 20px;
    margin-bottom: 30px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(10px);
    animation: fadeInUp 0.6s ease-out 0.2s both;
    // @keyframes fadeInUp {
    // from {
    //     opacity: 0;
    //     transform: translateY(30px);
    // }
    // to {
    //     opacity: 1;
    //     transform: translateY(0);
    // }
    // }
    .search-box {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #f3f4f6;
      border-radius: 50px;
      padding: 4px 4px 4px 16px;
      transition: $transition;

      &:focus-within {
        box-shadow: 0 0 0 2px #667eea, 0 0 0 4px rgba(102, 126, 234, 0.1);
        background: white;
      }

      .search-icon {
        font-size: 18px;
        color: #9ca3af;
      }

      .search-input {
        flex: 1;
        border: none;
        background: transparent;
        padding: 14px 0;
        font-size: 16px;
        outline: none;
        color: #1f2937;

        &::placeholder {
          color: #9ca3af;
        }
      }

      .search-btn {
        background: $primary-gradient;
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 50px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: $transition;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        &:active {
          transform: translateY(0);
        }
      }
    }
    .hot-cities {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;

      .hot-label {
        font-size: 13px;
        color: #6b7280;
      }

      .city-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;

        .city-tag {
          padding: 6px 14px;
          background: #f3f4f6;
          border-radius: 20px;
          font-size: 13px;
          color: #374151;
          cursor: pointer;
          transition: $transition;

          &:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
          }
        }
      }
    }
  }
</style>