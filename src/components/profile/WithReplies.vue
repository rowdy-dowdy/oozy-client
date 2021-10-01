<template>
  <h4 class="font-bold text-xl p-4 pb-2">Gợi ý theo dõi</h4>
  <ul class="flex flex-col text-sm">
    <template v-if="listSugges.length > 0">
      <li v-for="v in listSugges" :key="v.id" class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
        <router-link :to="`/${v.username}`" class="flex items-center space-x-3">
          <div class="flex-none w-11 h-11 rounded-full overflow-hidden">
            <img v-if="v.avatar != ''" :src="v.avatar" alt="" class="img-cover" loading="lazy">
            <div v-else :data-color="v.color" class="w-full h-full rounded-full overflow-hidden">
              <span class="icon-bar font-black text-white text-xl select-none uppercase">{{ v.shortName }}</span>
            </div>
          </div>
          <div class="flex-grow min-w-0">
            <h2 class="font-semibold truncate hover:underline">{{ v.name }}</h2>
            <p class="text-gray-600 truncate">@{{ v.username }}</p>
          </div>
          <button class="flex-none px-3.5 py-1.5 bg-trueGray-900 hover:bg-trueGray-800 text-white text-xs rounded-full font-semibold">Theo dõi</button>
        </router-link>
      </li>
    </template>

    <li class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
      <p class="text-violet-600 text-sm">Hiện thêm</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    var listSugges = computed(() => store.getters['user/getUserRandomInListUser'])

    return { listSugges }
  },
})
</script>
