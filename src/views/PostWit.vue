<template>
  <div @click.prevent.stop="backRouter()" class="fixed w-screen h-screen bg-black/30 z-10 lg:py-12">
    <div class="w-full lg:max-w-[600px] mx-auto h-full lg:h-initial max-h-full overflow-auto">
      <div @click.prevent.stop="" class="w-full h-full lg:h-initial bg-white lg:rounded-2xl">
        <div class="py-2 px-4 border-b flex justify-between">
          <button @click.prevent.stop="backRouter()" class="w-9 h-9 rounded-full hover:bg-violet-100 hover:cursor-pointer 
            flex justify-center items-center text-2xl">
            <span class="hidden lg:inline"><i class='bx bx-x'></i></span>
            <span class="lg:hidden"><i class='bx bx-left-arrow-alt' ></i></span>
          </button>

          <button 
            :disabled="textWit.length == 0 || textWit.length > 250"
            class="px-4 py-1 text-sm font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-default">
            Đăng Wit
          </button>
        </div>

        <div class="flex px-4 py-2">
          <div class="flex-none">
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img src="../assets/default_profile_normal.png" alt="" class="img-full">
            </div>
          </div>

          <div class="flex-grow ml-4 min-w-0">
            <div class="py-3">
              <textarea type="text" rows="3" v-model="textWit"
                @input="autoResizeHight($event.target)"
                class="w-full text-lg focus:outline-none max-h-[600px]" 
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
                  class="hidden lg:inline px-4 py-2 text-sm font-semibold rounded-full bg-violet-600 text-white hover:bg-violet-700 disabled:bg-violet-300 disabled:cursor-default">
                  Đăng Wit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <div v-if="showModal" @click.prevent.stop="showModal = false" class="fixed w-screen h-screen bg-black/50 z-10 flex justify-center items-center">
    <div class="w-[320px] max-w-[90vw] bg-white rounded-2xl px-8 py-8">
      <h4 class="font-bold text-xl">Đóng Wit</h4>
      <p class="text-gray-600 text-base mt-4 mb-6">Wit đang viết dở, bạn có chắc chắn muốn đóng Wit</p>
      <button @click.prevent.stop="$router.go(-1)" class="w-full rounded-full btn px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold">Đóng</button>
      <button @click.prevent.stop="showModal = false" class="w-full rounded-full btn px-4 py-2 bg-white hover:bg-gray-200 font-semibold mt-3 border border-gray-300">Hủy bỏ</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import router from '../router'
import {store} from '../store'

export default defineComponent({
  setup() {
    const router = useRouter()

    const autoResizeHight = (that) => {
      that.style.height = 'auto';
      that.style.height = that.scrollHeight + 'px';
    }

    var textWit = ref<string>('') 

    var showModal = ref<boolean>(false)

    function backRouter () {
      if (textWit.value == '')
        router.go(-1)

      else {
        showModal.value = true
      }
    }

    return { autoResizeHight, textWit, backRouter, showModal }
  },
  beforeRouteEnter(to,from,next) {
    if (from == undefined || from.matched.length == 0)
      next()
    
    else if (to.path == '/compose/wit' && from.path != '/compose/wit' && !store.state.app.showPostWit) {
      // console.log(router.getRoutes(),from);
      
      let componentParent = router.getRoutes().filter( v => v.name == from.matched[0].name)
      let componentChild = router.getRoutes().find( v => v.name == from.name)
      if(componentParent.length == 0 || componentChild == undefined)
        next()
      
      router.removeRoute('post_wit')
      router.addRoute({
        path: '/compose/wit',
        name: 'post_wit',
        meta: { title: 'Soạn Wit mới / Oozy' },
        components: {
          default: componentParent[0].components.default,
          post: () => import('../views/PostWit.vue')
        },
        children: [{
          path: '',
          components: {
            default: componentChild.components.default
          }
        }]
      })

      router.push({path: '/compose/wit'})
      store.commit('app/changeShowPostWit', true)     
    } else {
      next()
    }
  },
  beforeRouteLeave() {
    store.commit('app/changeShowPostWit', false)
  }
})
</script>
