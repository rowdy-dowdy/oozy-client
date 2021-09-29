<template>
  <div class="flex-grow-[1.5] h-screen lg:flex-grow w-full sm:w-initial">
    <div class="relative flex h-full w-full sm:w-[550px] md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full overflow-hidden">
      <transition  name="move-left">
        <!-- left message -->
        <div v-if="showLeftMessages" class="move-left flex flex-col w-full h-full lg:max-w-xs 2lg:max-w-[390px] border border-gray-200">
          <div class="flex-none flex space-x-4 h-14 items-center px-4">
            <div class="flex-none">
              <div @click="searchFocus ? searchFocus = !searchFocus : searchFocus = searchFocus" :class="{'change' : searchFocus}" class="icon-ani">
                <p></p>
              </div>
            </div>
            <div class="flex-grow min-w-0">
              <div class="w-full rounded-full flex items-center border border-violet-50 focus-within:border-violet-600 bg-violet-50 focus-within:bg-white">
                <input type="text" id="search"
                  placeholder="Tìm kiếm người và nhóm"
                  v-model="textSearch"
                  @click="searchFocus = true"
                  class="w-full px-3 py-2 bg-transparent peer flex-grow min-w-0">
                <label for="search" class="pl-3 text-lg text-gray-600 mt-1 peer-focus:text-violet-600 order-first flex-none">
                  <i class='bx bx-search'></i>
                </label>
              </div>
            </div>
          </div>
          <div id="scrollMessagesLeft" class="relative flex-grow min-w-0 w-full overflow-auto pb-14 sx:pb-0">
            <transition name="zoom">
              <div v-if="!searchFocus" class="zoom-in">
                <div v-if="arrayId.length == 0" class="px-4 py-2 text-center">
                  <span class="block text-base">Bạn chưa nhắn tin với ai</span>
                  <button class="px-6 py-3 mt-6 rounded-full bg-violet-600 hover:bg-violet-700 text-sm font-semibold text-white">Tin nhắn mới</button>
                </div>
                <div v-else class="flex flex-col px-2">
                  <router-link
                    v-for="i in arrayId" :key="i"
                    :to="`/messages/${i}`"
                    custom
                    v-slot="{ href, route, navigate, isActive, isExactActive }"
                  >
                    <a
                      :href="href" @click="navigate" :class="[isExactActive && 'active']"
                      class="nav-link flex items-center space-x-3 px-2 py-3 rounded-md hover:bg-violet-100">
                      <div class="flex-none">
                        <div
                          data-color="violet"
                          class="w-12 h-12 rounded-full overflow-hidden">
                          <span class="icon-bar font-black text-white text-xl select-none">T</span>
                        </div>
                      </div>
                      <div class="flex-grow min-w-0 text-base">
                        <div class="flex w-full justify-between space-x-4">
                          <span class="font-bold truncate">Tiện</span>
                          <span class="flex-none text-sm font-semibold text-gray-700">08:12</span>
                        </div>
                        <p class="truncate text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam laborum expedita, omnis cupiditate aliquid eius voluptate facilis at obcaecati architecto quae velit quibusdam laudantium repellat quam et ullam ad reprehenderit!</p>
                      </div>
                    </a>
                  </router-link>
                </div>
              </div>
              <div v-else class="zoom-out">
                <p class="px-4 py-6 text-center">Thử tìm kiếm người hoặc nhóm</p>
              </div>
            </transition>
          </div>
        </div>
      </transition>

      <!-- right message -->
      <router-view v-slot="{ Component }">
        <transition  name="move-right">
          <div v-if="!showLeftMessages || responsive == 'desktop'" class="move-right flex flex-col w-full lg:w-[600px] h-full border-r border-gray-200">
            <component :is="Component" />
          </div>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import RightSidebar from '../components/RightSidebar.vue'
import Scrollbar from 'smooth-scrollbar';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    RightSidebar
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    
    // mobile messages template

    var showLeftMessages = ref<boolean>(true)
    var responsive = computed(() => store.state.app.responsive)
    
    function changeShowLeft (route) {
      if (responsive.value == 'mobile')
        if (route.params.idMessages && route.path.split('/')[1] == 'messages') {
          showLeftMessages.value = false
        } else {
          showLeftMessages.value = true
        }
    }

    changeShowLeft(route)

    router.beforeEach((to) => {
      changeShowLeft(to)
    })

    watch(
      responsive,
      (res) => {
        if (res == 'desktop') {
          showLeftMessages.value = true
          return
        } else {
          changeShowLeft(route)
        }
      }
    )

    // change id messages selected
    function changeIdMessages(id) {
      let newIdMessages = (id != undefined) ? id : ''
      store.commit('messages/changeIdMessages', id)
    }

    changeIdMessages(route.params.idMessages)

    watch(
      () => route.params,
      params => {
        if (route.path.split('/')[1] == 'messages') {
          changeIdMessages(params.idMessages)
        }
      }
    )
    
    var searchFocus = ref<boolean>(false)

    var arrayId = [123,43214,2314,423,624]

    var textSearch = ref<string>('')

    onMounted(() => {
      // Scrollbar.init(document.querySelector('#scrollMessagesLeft'));
    })

    onUnmounted(() => {
      Scrollbar.destroy(document.querySelector('#scrollMessagesLeft'))
    })

    return { searchFocus, textSearch, arrayId, showLeftMessages, responsive }
  },
})
</script>

<style scoped>
  .icon-ani {
    --width: 18px;
    @apply w-[calc(var(--width)*2)] h-[calc(var(--width)*2)] rounded-full cursor-pointer flex justify-center items-center transition-all duration-300 ease-in-out;
  }

  .icon-ani:hover {
    @apply bg-violet-100;
  }

  .icon-ani p {
    @apply w-[var(--width)] h-[calc(var(--width)/9)] rounded-full relative bg-violet-600;
  }

  .icon-ani p::before, 
  .icon-ani p::after {
    @apply content-[""] absolute right-0 w-full h-full bg-violet-600 rounded-full transition-all duration-300 ease-in-out;
  }

  .icon-ani p::before {
    @apply top-[200%];
  }

  .icon-ani p::after {
    @apply bottom-[200%];
  }

  .icon-ani.change {
    /* --width: 16px; */
    @apply rotate-180;
  }

  .icon-ani.change p::before {
    @apply top-[50%] right-[-15%] scale-x-75 origin-top-right rotate-45;
  }

  .icon-ani.change p::after {
    @apply bottom-[50%] right-[-15%] scale-x-75 origin-bottom-right -rotate-45;
  }

  .nav-link.active {
    @apply bg-violet-600 text-white;
  }
  .nav-link.active * {
    @apply text-white;
  }


  /* ZOOM TRANSITION */

  .zoom-enter-active,
  .zoom-leave-active {
    transition: all .3s ease-in-out;
  }
  .zoom-enter-active.zoom-in,
  .zoom-enter-active.zoom-out {
    @apply absolute w-full top-0 left-0;
    transition: all .3s ease-in-out foward;
  }

  .zoom-enter-from.zoom-in,
  .zoom-leave-to.zoom-in {
    opacity: 0;
    transform: scale(.95);
  }
  .zoom-enter-to.zoom-in,
  .zoom-leave-from.zoom-in {
    opacity: 1;
    transform: scale(1);
  }

  .zoom-enter-from.zoom-out,
  .zoom-leave-to.zoom-out {
    opacity: 0;
    transform: scale(1.2);
  }

  .zoom-enter-to.zoom-out,
  .zoom-leave-from.zoom-out {
    opacity: 1;
    transform: scale(1);
  }

  /* MOVE-LEFT TRANSITION */

  .move-left-enter-active,
  .move-left-leave-active {
    @apply absolute w-full top-0 left-0;
    transition: all .5s ease-in-out;
  }

  .move-left-enter-from,
  .move-left-leave-to {
    left: -100%;
  }
  .move-left-enter-to,
  .move-left-leave-from {
    left: 0;
  }

  /* MOVE-RIGHT TRANSITION */

  .move-right-enter-active,
  .move-right-leave-active {
    @apply absolute w-full top-0 left-0;
    transition: all .5s ease-in-out;
  }

  .move-right-enter-from,
  .move-right-leave-to {
    left: 100%;
  }
  .move-right-enter-to,
  .move-right-leave-from {
    left: 0;
  }
</style>
