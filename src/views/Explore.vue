<template>
 <div class="flex-grow-[1.5] lg:flex-grow w-full sm:w-initial">
    <div class="flex justify-between w-full sm:w-[550px] md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full">
      <div class="w-full max-w-[600px] min-h-screen h-full pb-24 xs:pb-0 border border-gray-200">
        <div class="relative xs:static flex items-center space-x-4 px-3 py-2 border-b border-gray-200">
           <!-- mobile profile sidebar -->
          <div class="flex-none xs:hidden">
            <mobile-profile-sidebar />
          </div>

          <div class="flex-grow flex items-center">
            <search-default/>
          </div>
          <div class="flex-none">
            <span class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-100 text-xl cursor-pointer" title="Wit hàng đầu">
              <i class="bx bx-cog"></i>
            </span>
          </div>
        </div>

        <div class="relative">
          <div class="pb-[56.25%]"></div>
          <div class="absolute w-full h-full top-0 left-0">
            <img src="../assets/EGGl1Kc6.jpeg" alt="" class="img-cover">
          </div>
          <div class="absolute w-full h-full top-0 left-0 flex items-end p-4"
            style="background: linear-gradient(transparent 0%, transparent 25%, rgba(0, 0, 0, 0.7) 75%, rgba(0, 0, 0, 0.8) 100%)"
          >
            <div class="text-white">
              <p class="uppercase mb-1 text-xs">Covid-19 . trực tuyến</p>
              <h3 class="text-xl font-extrabold tracking-wide">Cập nhập về tình hình covid Việt Nam</h3>
            </div>
          </div>
        </div>

        <!-- XU HUONG -->
        <div>
          <h4 class="font-bold text-xl p-4 pb-2">Gợi ý theo dõi</h4>
          <ul class="flex flex-col text-sm">
            <li v-for="i in 4" :key="i" class="px-4 py-3 hover:bg-violet-50 cursor-pointer">
              <div class="flex space-x-3">
                <div class="flex-grow min-w-0">
                  <p class="truncate text-gray-600 text-xs">Nhạc sĩ · Nổi bật</p>
                  <p class="font-semibold truncate">#FREEJUNGKOOK</p>
                  <p class="truncate text-gray-600 text-xs">47,2 N Tweet</p>
                </div>
                <button class="flex-none w-8 h-8 rounded-full hover:bg-violet-200 hover:text-violet-600">
                  <i class='bx bx-dots-horizontal-rounded' ></i>
                </button>
              </div>
            </li>

            <li class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
              <p class="text-violet-600 text-sm">Hiện thêm</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- RIGHT HOME -->
      <right-sidebar :search="false" :trend="false"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RightSidebar from '../components/RightSidebar.vue'
import SearchDefault from '../components/SearchDefault.vue'
import MobileProfileSidebar from '../components/MobileProfileSidebar.vue'

export default defineComponent({
  components: {
    RightSidebar,
    SearchDefault,
    MobileProfileSidebar
  },
  setup() {
    
  },
})
</script>
