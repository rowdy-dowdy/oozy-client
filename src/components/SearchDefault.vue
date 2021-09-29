<template>
  <div v-click-outside="searchDropdownHidden" class="xs:relative w-full rounded-full flex items-center border border-violet-50 focus-within:border-violet-600 bg-violet-50 focus-within:bg-white">
    <input @click="searchDropdown = true" type="text" id="search" placeholder="Tìm kiếm oozy" v-model="textSearch"
      class="w-full px-3 py-2 bg-transparent peer flex-grow min-w-0">
    <label for="search" class="pl-3 text-lg text-gray-600 mt-1 peer-focus:text-violet-600 order-first flex-none">
      <i class='bx bx-search'></i>
    </label>
    <button
      @click.prevent.stop="textSearch = ''"
      :class="searchDropdown ? 'flex' : 'hidden'"
      class="flex-none peer-placeholder-shown:!hidden order-3 mr-3 w-5 h-5 rounded-full bg-violet-600 hover:bg-violet-700 text-white items-center justify-center text-lg">
      <i class='bx bx-x' ></i>
    </button>
    <!-- DROPDOWN -->
    <div v-if="searchDropdown" class="absolute top-full xs:top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-full z-10">
      <div class="xs:rounded-lg bg-white shadow-lg border border-gray-100 min-h-[100px] max-h-[60vh] overflow-y-auto">
        <div v-if="textSearch.length == 0">
          <p class="block text-center text-gray-600 px-4 py-6 text-xs">Thử kiếm kiếm chủ đề, mọi người hoặc từ khóa"</p>
        </div>
        <div v-else>
          <a href="#" class="block px-4 py-3 hover:bg-violet-200 break-words">Tìm kiếm "{{ textSearch }}"</a>
          <loading/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Loading from '../components/loading/Loading.vue'

export default defineComponent({
  components: {
    Loading
  },
  setup() {
    // setup page
    var textSearch = ref<string>('')
    var searchDropdown = ref<boolean>(false)

    const searchDropdownHidden = () => {
      searchDropdown.value = false
    }

    return { textSearch, searchDropdown, searchDropdownHidden }
  },
})
</script>
