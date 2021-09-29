<template>
  <div class="flex-grow-[1.5] lg:flex-grow w-full sm:w-initial">
    <div class="flex justify-between w-full sm:w-[550px] md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full">
      <div class="w-full max-w-[600px] min-h-screen h-full pb-24 xs:pb-0 border border-gray-200">
        <div class="flex items-center space-x-4 px-3 py-2">
          <!-- mobile profile sidebar -->
          <div class="flex-none xs:hidden">
            <mobile-profile-sidebar />
          </div>
          
          <div class="flex-grow flex items-center">
            <h2 class="text-lg font-semibold">Thông báo</h2>
          </div>
          <div class="flex-none">
            <span class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-100 text-xl cursor-pointer" title="Wit hàng đầu">
              <i class="bx bx-cog"></i>
            </span>
          </div>
        </div>

        <div class="flex border-b">
          <router-link 
            to="/notifications"
            custom
            v-slot="{ href, route, navigate, isActive, isExactActive }"
          >
            <a 
              :href="href" 
              @click="navigate" 
              :class="[isExactActive && 'active']"
              class="nav-link w-1/2 flex cursor-pointer px-8 hover:bg-violet-200 text-gray-600 font-semibold"
            >
              <div class="py-3 relative w-max mx-auto">Tất cả</div>
            </a>
          </router-link>
          <router-link 
              to="/notifications/mentions"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a 
                :href="href" 
                @click="navigate" 
                :class="[isExactActive && 'active']"
                class="nav-link w-1/2 flex cursor-pointer px-8 hover:bg-violet-200 text-gray-600 font-semibold"
              >
                <div class="py-3 relative w-max mx-auto">Đề cập</div>
              </a>
            </router-link>
        </div>

        <!-- router child -->
        <router-view />
      </div>

      <!-- RIGHT HOME -->
      <right-sidebar />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RightSidebar from '../components/RightSidebar.vue'
import MobileProfileSidebar from '../components/MobileProfileSidebar.vue'

export default defineComponent({
  components: {
    RightSidebar,
    MobileProfileSidebar
  },
  setup() {
    
  }
})
</script>

<style scoped>
  .nav-link.active > div::after {
    @apply content-[''] absolute bottom-0 left-1/2 w-[calc(100%+1rem)] -translate-x-1/2 h-1.5 block rounded-full bg-violet-400;
  }
</style>
