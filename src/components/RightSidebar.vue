<template>
  <div class="hidden mr-[10px] lg:block w-[290px] 2lg:w-[350px] h-screen">
    <div class="fixed w-inherit">
      <div class="w-full h-screen" :class="{'overflow-y-auto': !searchDropdown}">
        <!-- SEARCH -->
        <div v-if="showSearch" v-click-outside="searchDropdownHidden" class="relative w-full rounded-full flex items-center border border-violet-50 mt-2 focus-within:border-violet-600 bg-violet-50 focus-within:bg-white">
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
          <div v-if="searchDropdown" class="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 w-[calc(100%+2rem)]">
            <div class="rounded-lg bg-white shadow-lg border border-gray-100 min-h-[100px] max-h-[60vh] overflow-y-auto">
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
        <!-- XU HƯỚNG -->
        <div v-if="showTrend" class="mt-3 w-full rounded-2xl bg-violet-50 overflow-hidden">
          <div class="flex px-4 pt-3 pb-1 space-x-2 justify-between items-center">
            <h4 class="font-semibold">Xu hướng cho bạn</h4>
            <span class="flex w-7 h-7 rounded-full items-center justify-center hover:bg-violet-100 text-lg cursor-pointer">
              <i class='bx bx-cog' ></i>
            </span>
          </div>
          <ul class="flex flex-col text-xs">
            <li v-for="i in 4" :key="i" class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
              <div class="flex justify-between items-center text-gray-600 h-5">
                <p class="flex-grow min-w-0 truncate">Chủ đề nổi trội ở Việt Nam</p>
                <span class="flex-none w-8 h-8 rounded-full hover:bg-violet-300 hover:text-violet-600 flex items-center justify-center">
                  <i class='bx bx-dots-horizontal-rounded' ></i>
                </span>
              </div>
              <p class="font-semibold pb-1 text-base">#Trương Gia Nguyên</p>
              <p class="text-gray-600">2.012 Tweet</p>
            </li>
      
            <li class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
              <p class="text-violet-600 text-sm">Hiển thị thêm</p>
            </li>
          </ul>
        </div>
        <!-- GỢI Ý THEO DÕI -->
        <div v-if="showSugges" class="mt-3 w-full rounded-2xl bg-violet-50 overflow-hidden">
          <div class="flex px-4 pt-3 pb-1 space-x-2 justify-between items-center">
            <h4 class="font-semibold">Gợi ý theo dõi</h4>
          </div>
          <ul class="flex flex-col text-sm">
            <template v-if="listSugges.length > 0">
              <li v-for="v in listSugges" :key="v.id" class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
                <div class="flex items-center space-x-3">
                  <div class="flex-none w-11 h-11 rounded-full overflow-hidden">
                    <img v-if="v.avatar != ''" :src="v.avatar" alt="" class="img-cover" loading="lazy">
                    <div v-else :data-color="v.color" class="w-full h-full rounded-full overflow-hidden">
                      <span class="icon-bar font-black text-white text-xl select-none uppercase">{{ v.shortName }}</span>
                    </div>
                  </div>
                  <div class="flex-grow min-w-0">
                    <h2 class="font-semibold truncate">{{ v.name }}</h2>
                    <p class="text-gray-600 truncate">@{{ v.username }}</p>
                  </div>
                  <button class="flex-none px-3.5 py-1.5 bg-trueGray-900 hover:bg-trueGray-800 text-white text-xs rounded-full font-semibold">Theo dõi</button>
                </div>
              </li>
            </template>
      
            <li class="px-4 py-3 hover:bg-violet-100 cursor-pointer">
              <p class="text-violet-600 text-sm">Hiển thị thêm</p>
            </li>
          </ul>
        </div>
        <!-- FOOTER -->
        <div class="my-4 px-4 text-xs flex flex-wrap text-gray-600">
          <a href="#" class="pr-3 hover:underline">Điều khoản dịch vụ</a>
          <a href="#" class="pr-3 hover:underline">Chính sách riêng tư</a>
          <a href="#" class="pr-3 hover:underline">Chính sách cookie</a>
          <a href="#" class="pr-3 hover:underline">Thông tin quảng cáo</a>
          <a href="#" class="pr-3 hover:underline">Thêm ...</a>
          <a href="#" class="pr-3 hover:underline">@2021 Oozy, Inc.</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRef } from 'vue'
import { useStore } from 'vuex'
import Loading from '../components/loading/Loading.vue'

export default defineComponent({
  components: {
    Loading
  },
  props: {
    search: {
      type: Boolean,
      default: true
    },
    trend: {
      type: Boolean,
      default: true
    },
    sugges: {
      type: Boolean,
      default: true
    },
  },
  setup(props) {
    const store = useStore()
    //props
    const showSearch = toRef(props,'search')
    const showTrend = toRef(props,'trend')
    const showSugges = toRef(props,'sugges')

    // setup page
    var textSearch = ref<string>('')
    var searchDropdown = ref<boolean>(false)

    const searchDropdownHidden = () => {
      searchDropdown.value = false
    }

    var listSugges = computed(() => store.getters['user/getUserRandomInListUser'])

    return { 
      textSearch, searchDropdown, searchDropdownHidden, showSearch, 
      showTrend, showSugges, listSugges }
  },
})
</script>


