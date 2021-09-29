<template>
  <div class="flex-grow-[1.5] lg:flex-grow w-full sm:w-initial">
    <div class="flex justify-between w-full sm:w-[550px] md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full">
      <div class="w-full max-w-[600px] min-h-screen h-full pb-24 xs:pb-0 border border-gray-200">
        <div class="flex items-center space-x-4 px-3 py-2 border-b border-gray-200">
          <!-- mobile profile sidebar -->
          <div class="flex-none xs:hidden">
            <mobile-profile-sidebar />
          </div>

          <div class="flex-grow flex items-center">
            <h2 class="text-lg font-semibold">Trang chủ</h2>
          </div>

          <div class="flex-none">
            <span class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-100 text-xl cursor-pointer" title="Wit hàng đầu">
              <i class='bx bx-cycling'></i>
            </span>
          </div>
        </div>

        <div class="hidden xs:flex space-x-4 px-3 pt-2 border-b border-gray-200">
          <div class="flex-none">
            <div class="w-12 h-12 rounded-full overflow-hidden relative group cursor-pointer">
              <img src="../assets/default_profile_normal.png" alt="" class="img-full">
              <div class="absolute w-full h-full top-0 left-0 group-hover:bg-black/20 transition-all duration-300 ease-in-out"></div>
            </div>
          </div>

          <div class="flex-grow">
            <div class="py-3">
              <textarea type="text" rows="1" v-model="textWit"
                @input="autoResizeHight($event.target)"
                class="w-full text-lg focus:outline-none max-h-[700px]" 
                placeholder="Chuyện gì đang xảy ra?"></textarea>

              <div class="-ml-1.5 text-violet-600 mt-2 rounded-full hover:bg-violet-100 px-2 py-0.5 inline-block cursor-pointer text-xs">
                <span class="text-lg align-sub inline-flex">
                  <i class='bx bx-globe' ></i>
                </span>
                <span class="font-semibold">
                  Mọi người đều có thể trả lời
                </span>
              </div>
            </div>

            <div class="border-t border-gray-200 py-3 flex space-x-3 justify-between">
              <ul class="-ml-2.5 text-violet-600 flex">
                <li class="w-9 h-9 rounded-full hover:bg-violet-100 flex 
                  items-center justify-center cursor-pointer text-xl">
                  <i class='bx bx-image' ></i>
                </li>
                <li class="w-9 h-9 rounded-full hover:bg-violet-100 flex 
                  items-center justify-center cursor-pointer text-xl">
                  <i class='bx bxs-file-gif' ></i>
                </li>
                <li class="w-9 h-9 rounded-full hover:bg-violet-100 flex 
                  items-center justify-center cursor-pointer text-xl">
                  <i class='bx bx-bar-chart-alt-2 bx-rotate-90' ></i>
                </li>
                <li class="w-9 h-9 rounded-full hover:bg-violet-100 flex 
                  items-center justify-center cursor-pointer text-xl">
                  <i class='bx bx-smile' ></i>
                </li>
                <li class="w-9 h-9 rounded-full hover:bg-violet-100 flex 
                  items-center justify-center cursor-pointer text-xl">
                  <i class='bx bx-calendar' ></i>
                </li>
              </ul>

              <div class="flex items-center space-x-3">
                <div v-if="textWit != ''">
                  <div class="flex items-center justify-end w-[30px] h-[30px]">
                    <div class="-rotate-90 relative transition-all duration-300 ease-in-out"
                      :class="textWit.length > 230 ? 'w-[30px] h-[30px]' : 'w-[20px] h-[20px]'">
                      <svg v-if="textWit.length < 260" height="100%" style="overflow: visible;" viewBox="0 0 20 20" width="100%">
                        <circle cx="50%" cy="50%" fill="none" stroke-width="2" r="9" stroke="#EFF3F4"></circle>
                        <circle cx="50%" cy="50%" fill="none" stroke-width="2" r="9" 
                          :stroke="textWit.length > 230 ? textWit.length >= 250 ? '#F4212E' :'#FFAD1F' : '#7c3aed'" stroke-linecap="round"
                          :style="'stroke-dashoffset:' + (textWit.length <=250 ? (100-textWit.length/2.5)*56.5487/100 : '0') + 'px'"
                          style="stroke-dasharray: 56.5487px;"></circle>
                      </svg>
                      
                      <span v-if="textWit.length > 230"
                        :class="{'text-red-500': textWit.length >= 250}" 
                        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        rotate-90 text-xs">
                        {{ 250 - textWit.length}}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-if="textWit != ''" class="w-[1px] h-full bg-gray-200"></div>
                <button 
                  :disabled="textWit.length == 0 || textWit.length > 250"
                  class="px-4 py-2 text-sm font-semibold rounded-full 
                  bg-violet-600 text-white hover:bg-violet-700
                  disabled:bg-violet-300 disabled:cursor-default">
                  Đăng Wit
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- CONTENT -->
        <div class="py-4">
          <loading />

          <div class="w-full max-w-[360px] px-4 mt-4 mx-auto">
            <h2 class="text-[28px] leading-tight font-semibold">Chào mừng đến với Oozy!</h2>
            <p class="pt-2">Đây là nơi tốt nhất để thấy điều gì đang xảy ra trong thế giới của bạn. Hãy tìm một số người và chủ đề để theo dõi ngay.</p>

            <button class="px-6 py-3 mt-6 rounded-full bg-violet-600 hover:bg-violet-700 text-sm font-semibold text-white">Hãy đi thôi</button>
          </div>
        </div>
      </div>

      <!-- RIGHT HOME -->
      <right-sidebar />
      
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue'
import Loading from '../components/loading/Loading.vue'
import RightSidebar from '../components/RightSidebar.vue'
import MobileProfileSidebar from '../components/MobileProfileSidebar.vue'

export default defineComponent({
  components: {
    Loading,
    RightSidebar,
    MobileProfileSidebar
  },
  setup() {
    const autoResizeHight = (that) => {
      that.style.height = 'auto';
      that.style.height = that.scrollHeight + 'px';
    }

    var textWit = ref<string>('') 

    return { autoResizeHight, textWit }
  },
})
</script>
