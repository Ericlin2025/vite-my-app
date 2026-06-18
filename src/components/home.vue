<script setup>
import { features } from '@/api/features';
import { ref } from 'vue';
const loginUserInfo = ref(JSON.parse(localStorage.getItem('loginUserInfo')||'null'))
</script>

<template>
 <div class="banner">
       
          <el-carousel trigger="click" height="750px">
            <el-carousel-item 
            v-for="item in features" 
            :key="item" 
            >
              
                <img :src='item.src' alt="">
                <div class="app">
                    <h2 class="small justify-center" text="2xl">{{item.icon}}{{ item.title }}</h2>
                    <p>{{ item.description }}</p>
                    
                </div>
                <RouterLink :to="item.path" v-if="loginUserInfo!==null">
                  去使用
                  <svg t="1781771716401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="37074" width="20" height="20"><path d="M848.151014 395.2128h-2.88256c-19.0208 0-35.15904 5.632-50.14528 14.63296-13.2608-37.7088-47.26272-65.28512-91.06944-65.28512-19.0208 0-37.46304 5.62688-53.02784 14.63296-13.25568-37.7088-47.2576-65.29024-91.06432-65.29024-17.29536 0-32.85504 3.9424-46.68928 11.25888V207.79008c0-52.90496-40.92416-96.24064-96.256-96.24064-54.75328 0-99.13856 43.33568-99.13856 96.24064v373.71904l-60.5184-58.53184c-38.61504-37.71392-107.20768-32.08192-140.63616 0-32.85504 32.0768-54.75328 97.36704-7.49056 143.51872l277.23776 269.0304c5.76512 5.632 12.10368 10.13248 18.44224 14.06976C455.636454 990.12096 513.272294 1013.76 636.039654 1013.76c280.12032 0 306.05824-147.456 306.05824-329.25184V492.02176c1.152-53.46816-38.61504-96.80896-93.952-96.80896z m43.22816 288.73216c0 153.6512-0.57856 278.59968-253.60896 278.59968-107.20768 0-171.18208-23.07584-220.17536-70.35392l-262.83008-254.96064c-23.05536-22.51264-17.29024-51.78368 1.73056-70.35392 19.0208-18.57536 54.17984-19.13856 72.04864-1.1264 0 0 46.1056 44.46208 85.87776 83.3024a8047.14496 8047.14496 0 0 0 56.48384 54.58944V217.92256c0-25.32864 21.32992-45.58848 47.26272-45.58848 25.93792 0 43.80672 20.25984 43.80672 45.58848v308.992h0.57856c-0.57856 1.6896-0.57856 3.3792-0.57856 5.0688 0 14.06976 11.52512 25.32352 25.93792 25.32352 14.40768 0 25.93792-11.25376 25.93792-25.32864 0-1.6896 0-3.3792-0.57856-5.06368h0.57856V400.2816c0-25.32352 19.0208-45.58848 44.9536-45.58848 0 0 46.11072-0.5632 46.11072 45.58848v167.16288h0.57856c-0.57856 1.6896-0.57856 3.3792-0.57856 5.0688 0 14.06464 11.53024 25.32352 25.93792 25.32352 14.4128 0 25.93792-11.25888 25.93792-25.32864 0-1.6896 0-3.3792-0.57856-5.0688h0.57856V450.93888c0-25.32864 18.44224-45.58848 44.38016-45.58848 0 0 47.26272 2.816 47.26272 45.58848v146.8928h0.57856c-0.57856 1.6896-0.57856 3.3792-0.57856 5.0688 0 14.06976 11.53024 25.32864 25.93792 25.32864 14.4128 0 25.35936-11.25888 25.35936-25.32864 0-1.6896 0-3.3792-0.57344-5.0688h0.57344V497.65376c0-25.32864 19.59936-45.58848 45.53728-45.58848 0 0 45.53216-1.6896 45.53216 45.58848 0.57856 0 0.57856 145.77152 0.57856 186.29632zM279.841254 351.31392v-84.992c-8.06912-18.00704-13.2608-38.26688-13.2608-59.65312 0-80.4864 66.86208-146.33472 149.8624-146.33472 82.42176 0 149.85728 65.28512 149.85728 146.3296 0 11.264-1.152 21.95456-3.46112 32.08192 19.0208 0.5632 35.7376 8.448 48.41984 20.82816 4.608-16.88576 7.49056-34.33472 7.49056-52.34688C618.749414 98.6112 528.258534 10.24 417.021414 10.24 305.768934 10.24 215.278054 98.60608 215.278054 207.22688c-0.57344 56.84736 24.78592 108.06272 64.55808 144.08704z" fill="white" p-id="37075"></path></svg>
                </RouterLink>
              
            </el-carousel-item>
          </el-carousel>
        
    </div>
    <!-- 功能卡片网格 -->
    <!-- <img src="../assets/img/bg/weather.jpg" alt=""> -->
    <div class="cards">
        <div class="tt">
            <h2>全部功能</h2>
        </div>
        <div class="cards-grid">
       
        <!-- 遍历功能列表，生成卡片 -->
        <div
            v-for="feature in features"
            :key="feature.id"
            class="feature-card"
        >
            <div class="card-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
            
            
            <div class="more">
              <svg t="1781765899203" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="33699" width="20" height="20"><path d="M512 256a85.333333 85.333333 0 1 1 0-170.666667 85.333333 85.333333 0 0 1 0 170.666667z m0 341.333333a85.333333 85.333333 0 1 1 0-170.666666 85.333333 85.333333 0 0 1 0 170.666666z m0 341.333334a85.333333 85.333333 0 1 1 0-170.666667 85.333333 85.333333 0 0 1 0 170.666667z" fill="#2E2F30" p-id="33700"></path></svg>
              <!-- 开发过程笔记链接 -->
              <RouterLink :to="feature.detail" class="detail-link">
              <svg t="1781767609581" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="34721" width="20" height="20"><path d="M302.08 557.056c-7.68 0-14.848-3.072-20.992-8.704-11.264-11.264-11.264-30.208 0-41.472l166.912-165.376c9.728-9.728 25.088-11.264 36.352-4.096l86.016 55.296 123.392-94.72c12.8-9.728 31.232-7.168 40.96 5.632 9.728 12.8 7.168 31.232-5.632 40.96l-139.776 107.008c-9.728 7.68-23.04 8.192-33.792 1.536L472.576 399.872 322.56 548.864C316.928 554.496 309.248 557.056 302.08 557.056z" fill="white" p-id="34722"></path><path d="M332.288 379.904 332.288 379.904c-16.384 0-29.184-13.312-29.184-29.184l0-58.368c0-16.384 13.312-29.184 29.184-29.184 0 0 0 0 0 0 16.384 0 29.184 13.312 29.184 29.184l0 58.368C361.984 366.592 348.672 379.904 332.288 379.904z" fill="white" p-id="34723"></path><path d="M718.848 653.824 308.736 653.824c-16.384 0-29.184-13.312-29.184-29.184s13.312-29.184 29.184-29.184l410.112 0c16.384 0 29.184 13.312 29.184 29.184S734.72 653.824 718.848 653.824z" fill="white" p-id="34724"></path><path d="M718.848 695.808" p-id="34725"></path><path d="M308.736 695.808" fill="white" p-id="34726"></path><path d="M718.848 796.672 308.736 796.672c-16.384 0-29.184-13.312-29.184-29.184s13.312-29.184 29.184-29.184l410.112 0c16.384 0 29.184 13.312 29.184 29.184S734.72 796.672 718.848 796.672z" fill="white" p-id="34727"></path><path d="M398.848 206.336c-16.384 0-29.184-13.312-29.184-29.184L369.664 124.416c0-16.384 13.312-29.184 29.184-29.184s29.184 13.312 29.184 29.184l0 52.736C428.032 193.024 414.72 206.336 398.848 206.336z" fill="white" p-id="34728"></path><path d="M630.784 206.336c-16.384 0-29.184-13.312-29.184-29.184L601.6 124.416c0-16.384 13.312-29.184 29.184-29.184s29.184 13.312 29.184 29.184l0 52.736C659.968 193.024 647.168 206.336 630.784 206.336z" fill="white" p-id="34729"></path><path d="M790.528 182.784 308.736 182.784c-16.384 0-29.184-13.312-29.184-29.184s13.312-29.184 29.184-29.184l481.792 0c16.384 0 29.184 13.312 29.184 29.184S806.4 182.784 790.528 182.784z" fill="white" p-id="34730"></path><path d="M790.528 924.16 233.472 924.16c-40.448 0-73.216-32.768-73.216-73.216L160.256 198.656c0-40.448 32.768-73.216 73.216-73.216l74.752 0c16.384 0 29.184 13.312 29.184 29.184S324.608 184.32 308.736 184.32L233.472 184.32c-8.192 0-14.848 6.656-14.848 14.848l0 651.776c0 8.192 6.656 14.848 14.848 14.848l556.544 0c8.192 0 14.848-6.656 14.848-14.848L804.864 198.656c0-8.192-6.656-14.848-14.848-14.848l-72.192 0c-16.384 0-29.184-13.312-29.184-29.184s13.312-29.184 29.184-29.184l72.192 0c40.448 0 73.216 32.768 73.216 73.216l0 651.776C863.744 891.392 830.976 924.16 790.528 924.16z" fill="white" p-id="34731"></path></svg>
              查看详情
              <span class="arrow-icon">→</span>
              </RouterLink>
            </div>
            <div class="card-footer">
            <span class="badge" :style="{ backgroundColor: feature.completed?'#4caf50':'#9e9e9e' }">
                {{ feature.completed?'已完成':'开发中' }}
            </span>
            <RouterLink :to="feature.path" class="use-link" v-if="loginUserInfo!==null">
               <svg t="1781765265075" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32700" width="25" height="25"><path d="M757.810429 373.751333 325.645708 373.751333l0-83.895759c0-103.694687 81.507362-184.922686 185.559183-184.922686 78.121242 0 146.053424 46.74565 173.062568 119.090329 3.865028 10.352789 15.384385 15.609513 25.742291 11.746532 10.351766-3.866051 15.609513-15.390525 11.744485-25.742291C688.844707 121.877815 606.198405 64.918545 511.204891 64.918545c-61.918211 0-119.246895 23.662933-161.423483 66.63156-41.3692 42.142819-64.151066 98.363262-64.151066 158.305469l0 83.895759-20.007683 0c-60.774155 0-110.042255 49.267077-110.042255 110.042255l0 366.139981c0 60.774155 49.267077 110.042255 110.042255 110.042255l492.187769 0c60.775178 0 110.042255-49.267077 110.042255-110.042255L867.852684 483.793588C867.852684 423.01841 818.585607 373.751333 757.810429 373.751333zM827.837318 849.933569c0 38.674834-31.352055 70.02689-70.02689 70.02689L265.62266 919.960459c-38.674834 0-70.02689-31.352055-70.02689-70.02689L195.59577 483.793588c0-38.674834 31.352055-70.02689 70.02689-70.02689l492.187769 0c38.674834 0 70.02689 31.352055 70.02689 70.02689L827.837318 849.933569z" fill="white" p-id="32701"></path><path d="M509.715981 583.832002c-11.048637 0-20.007683 8.959046-20.007683 20.007683l0 110.042255c0 11.048637 8.958022 20.007683 20.007683 20.007683s20.007683-8.958022 20.007683-20.007683L529.723663 603.839685C529.723663 592.790024 520.765641 583.832002 509.715981 583.832002z" fill="white" p-id="32702"></path></svg>去使用
            </RouterLink>
            <div v-else>
              <RouterLink to="/login" class="locked">
                <svg t="1781764684494" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="27317" width="30" height="30"><path d="M923.927273 209.454545c-6.981818-9.309091-23.272727-11.636364-32.581818-4.654545-9.309091 6.981818-11.636364 23.272727-4.654546 32.581818C947.2 316.509091 977.454545 411.927273 977.454545 512c0 256-209.454545 465.454545-465.454545 465.454545S46.545455 768 46.545455 512 256 46.545455 512 46.545455c100.072727 0 195.490909 30.254545 274.618182 90.763636 9.309091 6.981818 25.6 4.654545 32.581818-4.654546s4.654545-25.6-4.654545-32.581818C726.109091 34.909091 621.381818 0 512 0 230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512c0-109.381818-34.909091-214.109091-100.072727-302.545455z" fill="gray" p-id="27318"></path><path d="M512 253.672727c-72.145455 0-132.654545 60.509091-132.654545 132.654546V442.181818c-37.236364 0-67.490909 32.581818-67.49091 69.818182v188.509091c0 39.563636 30.254545 69.818182 69.818182 69.818182h260.654546c39.563636 0 69.818182-30.254545 69.818182-69.818182V512c0-37.236364-30.254545-69.818182-67.49091-69.818182v-55.854545c0-72.145455-60.509091-132.654545-132.654545-132.654546z m0 46.545455c46.545455 0 86.109091 39.563636 86.109091 86.109091V442.181818h-172.218182v-55.854545c0-46.545455 39.563636-86.109091 86.109091-86.109091z m153.6 211.781818v188.509091c0 13.963636-9.309091 23.272727-23.272727 23.272727H381.672727c-13.963636 0-23.272727-9.309091-23.272727-23.272727V512c0-13.963636 9.309091-23.272727 23.272727-23.272727h260.654546c13.963636 0 23.272727 9.309091 23.272727 23.272727z" fill="gray" p-id="27319"></path></svg>
                <span>登录后解除</span>
              </RouterLink>
            </div>
            </div>
        </div>
    </div>

    </div>
   
 

</template>

<style scoped lang="scss">

.banner{
  width: 100%;
  height: 700px;
  margin: 0 auto;
  margin-bottom: 50px;
  /* border-bottom: 1px solid black; */
  .demonstration {
  color: var(--el-text-color-secondary);
  /* background-color: gray; */
}

//修改其他组件样式要使用深度选择器deep

:deep(.el-carousel__arrow) {
    background-color: rgb(0, 195, 255);
    width: 45px;
    height: 45px;
    
}
:deep(.el-carousel__indicators) {
        bottom: 20px;  // 调整到底部位置
        left: 80%;
    }
:deep(.el-carousel__indicator) {
    // position: absolute;
    // right: 0;
    // top: 80%;
    .el-carousel__button{
    width: 18px;
    height:18px;
    border-radius: 9px;
    background-color: rgb(0, 195, 255);
    }
    &.is-active{
        .el-carousel__button{
            width: 40px;
        }
    }
}
.el-carousel__item img{
    width: 100%;
    height: 100%;
    position: absolute;
}
.el-carousel__item .app{
    width: 200px;
    height: 200px;
    // border: 1px solid black;
    border-radius: 8px;
    position: absolute;
    top: 30%;
    left: 20%;
    background-color: rgba(255, 255, 255, 0.493);
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items: center;
    box-shadow: 10px 10px 30px black;
    // animation: fadeInUp 0.6s ease-out 0.2s both;
    
    
}
.el-carousel__item a{
        min-width: 160px;
        min-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(0, 195, 255);
        color: white;
        font-size: 20px;
        text-align: center;
        border-radius: 20px;
        // z-index: 888;
        position: absolute;
        top: 60%;
        left: 21%;
        &:hover{
          background-color: rgb(0, 160, 209);
        }
    }
.el-carousel__item h2 {
  color: #006eff;
//   opacity: 0.75;
//   line-height: 300px;
  margin: 0;
  text-align: center;
  margin-bottom: 10px;
}
.el-carousel__item p {
  color: #006eff;
//   opacity: 0.75;
//   line-height: 150px;
  margin: 0;
  text-align: center;
  margin-bottom: 40px;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
//  .el-carousel__item{

// //   background-color: rgba(209, 209, 209, 0.562);
//  }
}
.cards{
padding: 20px ;
.tt{
    width: 1600px;
    margin: 0 auto;
    h2{
        color: white;
    }
    margin-bottom: 20px;
}
}
/* 卡片网格 - 响应式布局 */
.cards-grid {
 
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  /* max-width: 1500px; */
  margin: 0 auto;
  /* border-top: 1px solid black; */
//   padding: 20px ;
  width: 1600px;
  /* height: 1000px; */
  padding-bottom: 2rem;
}

/* 单个卡片样式 */
.feature-card {
  /* display: flex;
  justify-content: center; */
  background: rgba(255, 255, 255, 0.808);
  border-radius: 24px;
  padding: 1.8rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(0px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 350px;
  width: 340px;
  position: relative;
  .locked{
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      background-color: rgb(165, 165, 165);
      border-radius: 8px;
    }
    
  }
  .more{
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 5px;
    position: absolute;
    top: 20px;
    right: 10px;
    // background-color: gray;
    &:hover .icon{
      background-color: rgb(179, 179, 179);
      border-radius: 50%;
    }
    &:hover  .detail-link{
      display: flex !important;
    }
  }
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  border-color: #fff;
}

/* 卡片图标 */
.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.feature-card p {
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 1.2rem;
  flex: 1;
}

/* 开发过程笔记链接样式 */
.detail-link {
  // display: inline-flex;
  display: none;
  justify-content: center;
  align-items: center;
  align-items: center;
  gap: 6px;
  background: #f0f4ff;
  color: #5b6ebe;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  transition: all 0.2s ease;
  width: fit-content;
  // position: absolute;
  // top: 50px;
  // right: 10px;
  .icon1{
    display: none;
  }
  
}

.detail-link .notes-icon {
  font-size: 1rem;
}

.detail-link .arrow-icon {
  display: none;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.detail-link:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateX(3px);
}
.detail-link:hover .icon1{
  display: block;
}

.detail-link:hover .arrow-icon {
  transform: translateX(3px);
  display: block;
}

/* 卡片底部：状态标签 + 使用链接 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.8rem;
  border-top: 1px solid #eef2ff;
}

.badge {
  display: inline-block;
  padding: 0.2rem 0.8rem;
  border-radius: 30px;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
}

/* 去使用链接样式 */
.use-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.use-link .use-arrow {
  font-size: 1rem;
  transition: transform 0.2s;
}

.use-link:hover {
  transform: translateX(3px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.use-link:hover .use-arrow {
  transform: translateX(3px);
}

/* 底部 Footer */


/* 简单动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .home-container {
    padding: 1rem;
  }
  .app-header h1 {
    font-size: 1.8rem;
  }
  .cards-grid {
    gap: 1rem;
    grid-template-columns: 1fr;
  }
  
  .feature-card {
    padding: 1.4rem;
  }
  
  .card-footer {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .use-link {
    justify-content: center;
  }
  
  .detail-link {
    width: auto;
    justify-content: center;
  }
}
</style>