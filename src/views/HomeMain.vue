<template>
  <div class="w-full h-screen bg-white overflow-hidden flex">
    <div class="relative hidden md:block w-[55%] h-full text-white bg-whiteflex items-center">
      <div v-for="(v,i) in randomLogo" :key="i" class="absolute text-[.5rem] lg:text-xs xl:text-sm" 
        :style="`top: ${v.y}%;left: ${v.x}%; width: ${v.size}em; animation: moveSkill ${v.time}s ease-in-out infinite`">
        <img src="../assets/logo.png" alt="" class="w-full">
      </div>

      <div class="absolute w-full h-full top-0 left-0 mix-blend-exclusion bg-gradient-to-br from-lime-500 to-green-300"></div>
    </div>
    <div class="relative w-full mx-auto md:mx-0 md:w-[45%] max-w-[600px] h-full flex items-center">
      <div class="flex max-h-screen overflow-auto">
        <div class="h-max px-12 pt-6 pb-24 xs:pb-6">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800">Đang diễn ra ngay bây giờ. Tham gia Oozy hôm nay.</h2>
          <p class="text-base md:text-lg mt-4 mb-12">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt excepturi illum exercitationem deserunt quae sit placeat quia minima laboriosam.</p>
          <router-link to="/i/login" class="block xs:inline-block px-4 py-2 rounded-md bg-violet-600 hover: text-white text-lg font-medium">Đăng nhập</router-link>
          <router-link to="/i/signup" class="block xs:inline-block ml-0 mt-4 xs:mt-0 xs:ml-4 px-4 py-2 rounded-md border border-violet-200 hover:bg-violet-600 hover:text-white text-lg font-medium">Đăng ký</router-link>
          <div class="w-full h-[1px] bg-gray-200 mt-8"></div>
          <p class="mt-4 text-base">
            <a href="#" class="text-violet-700 hover:text-violet-500">Tìm hiểu thêm</a> về Oozy
          </p>
        </div>
      </div>
    </div>
  </div>

  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
  },
  setup() {
    var randomLogo = []

    for(let i = 0; i < 20; i++) {
      randomLogo = [...randomLogo, {
        size: Math.random(3) * (7) + 3,
        x: Math.random(3) * (90),
        y:Math.random(3) * (100),
        time: Math.random(3) * (3) + 3
      }]
    }

    return { randomLogo }
  },
})
</script>

<style>
  @keyframes moveSkill {
    0%,100%{
      transform: translateX(0);
    }50% {
      transform: translateX(20%);
    }
  }
</style>
