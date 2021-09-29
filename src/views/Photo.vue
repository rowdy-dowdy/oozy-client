<template>
  <div @click.prevent.stop.self="backRouter()" class="fixed w-full h-screen bg-black/95 flex items-center justify-center z-50">
    <button @click.prevent.stop.self="backRouter()" class="absolute top-4 left-4 text-white rounded-full 
      hover:bg-white/10 w-6 h-6"
    >X</button>
    <div class="w-[90vmin] h-[90vmin] sm:w-[400px] sm:h-[400px] p-4">
      <div @click.prevent.stop.self="" class="w-full h-full rounded-full overflow-hidden">
        <img src="../assets/default_profile_400x400.png" alt="" class="img-full">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const backRouter = () => {
      router.go(-1)
    }

    return {backRouter}
  },
})
</script>
