<template>
  <div class="flex-grow-[1.5] lg:flex-grow w-full sm:w-initial">
    <div class="flex justify-between w-full sm:w-[550px] md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full">
      <!-- main-content -->
      <div class="w-full max-w-[600px] min-h-screen h-full pb-24 xs:pb-0 border border-gray-200">
        <div class="flex space-x-4 px-3 py-2 border-b border-gray-200">
          <div class="flex-none">
            <span @click.prevent.stop="$router.go(-1)" class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 text-xl cursor-pointer">
              <i class='bx bx-left-arrow-alt'></i>
            </span>
          </div>

          <div class="flex-grow min-w-0">
            <h2 class="text-lg font-semibold">{{ userInfo?.name || 'Name' }}</h2>
            <p class="text-xs text-gray-600 -mt-1">0 Wit</p>
          </div>
        </div>

        <div class="w-full">
          <div class="relative pt-[33.3333%]">
            <div class="absolute w-full h-full top-0 left-0 bg-violet-200"></div>
          </div>

          <div class="p-3 pb-0">
            <div class="flex h-11 items-end justify-between">
              <div class="w-1/4 flex-none">
                <div class="pt-[100%] relative">
                    <router-link :to="`/${userInfo?.username}/photo`" class="group absolute w-full h-full top-0 left-0 rounded-full bg-violet-200 border-4 border-white overflow-hidden cursor-pointer">
                      <img v-if="!userInfo?.avatar" src="../assets/default_profile_200x200.png" alt="" class="img-full">
                      <img v-else :src="userInfo?.avatar" alt="" class="img-full">
                      <div class="absolute w-full h-full top-0 left-0 bg-transparent group-hover:bg-black/30 transition-all duration-300 ease-in-out"></div>
                    </router-link>
                </div>
              </div>

              <button v-if="myself" class="bg-white px-4 py-2 border border-violet-300 rounded-full font-semibold text-xs hover:bg-violet-300">
                Thiết lập hồ sơ
              </button>
              <template v-else>
                <button v-if="friendShip == 'request-sent'" class="relative group bg-white px-4 py-2 border overflow-hidden border-violet-300 rounded-full font-semibold text-xs hover:bg-violet-300">
                  Chờ xác nhận
                  <span class="absolute w-full h-full top-0 left-0 opacity-0 group-hover:opacity-100 bg-violet-500 text-white  flex items-center justify-center">Hủy kết bạn</span>
                </button>
                <button v-else-if="friendShip == 'friends'" class="bg-white px-4 py-2 border border-red-500 rounded-full font-semibold text-xs hover:bg-red-500 hover:text-white">
                  <span>Xóa bạn</span>
                </button>
                <button v-else class="bg-white px-4 py-2 border border-violet-300 rounded-full font-semibold text-xs hover:bg-violet-300">
                  Kết bạn
                </button>
              </template>
            </div>

            <div>
              <h2 class="font-semibold text-base">{{ userInfo?.name || 'Name' }}</h2>
              <p class="text-gray-600">@{{ userInfo?.username || 'Username' }}</p>
              <p class="text-gray-600 pt-2">
                <span class="">
                  <i class='bx bx-calendar' ></i>
                </span>
                Đã tham gia tháng {{ new Date(userInfo?.createdAt).getMonth() + 1 }} năm {{ new Date(userInfo?.createdAt).getFullYear() }}
              </p>

              <p class="pt-2 text-gray-600">
                <span class="pr-3">
                  <b class="text-trueGray-800">0</b>
                  Đang theo dõi
                </span>
                <span>
                  <b class="text-trueGray-800">0</b>
                  Người theo dõi
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-shrink-0 overflow-x-auto w-full mt-3 border-b">
          <router-link 
            :to="`/${user.username}`"
            custom
            v-slot="{ href, route, navigate, isActive, isExactActive }"
          >
            <a 
              :href="href" 
              @click="navigate" 
              :class="[isExactActive && 'active']"
              class="nav-link flex-auto max-w-max cursor-pointer px-8 hover:bg-violet-200 text-gray-600 font-semibold"
            >
              <div class="py-3 relative w-max">Wit</div>
            </a>
          </router-link>
          <router-link 
            :to="`/${user.username}/with_replies`"
            custom
            v-slot="{ href, route, navigate, isActive, isExactActive }"
          >
            <a 
              :href="href" 
              @click="navigate" 
              :class="[isExactActive && 'active']"
              class="nav-link flex-auto max-w-max cursor-pointer px-8 hover:bg-violet-200 text-gray-600 font-semibold"
            >
              <div class="py-3 relative w-max">Các Wit & trả lời</div>
            </a>
          </router-link>
          <router-link 
            :to="`/${user.username}/media`"
            custom
            v-slot="{ href, route, navigate, isActive, isExactActive }"
          >
            <a 
              :href="href" 
              @click="navigate" 
              :class="[isExactActive && 'active']"
              class="nav-link flex-auto max-w-max cursor-pointer px-8 hover:bg-violet-200 text-gray-600 font-semibold"
            >
              <div class="py-3 relative w-max">Phương tiện</div>
            </a>
          </router-link>
          <router-link 
            :to="`/${user.username}/like`"
            custom
            v-slot="{ href, route, navigate, isActive, isExactActive }"
          >
            <a 
              :href="href" 
              @click="navigate" 
              :class="[isExactActive && 'active']"
              class="nav-link flex-auto max-w-max cursor-pointer px-8 hover:bg-violet-200 text-gray-600 font-semibold"
            >
              <div class="py-3 relative w-max">Lượt thích</div>
            </a>
          </router-link>
        </div>

        <div>
          <router-view/>
        </div>

      </div>

      <!-- right sidear -->
      <right-sidebar />

    </div>
  </div>

  <!-- modal -->
  <div class="fixed"></div>

  <router-view name="photo" :avatar="userInfo?.avatar"/>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Loading from '../components/loading/Loading.vue'
import RightSidebar from '../components/RightSidebar.vue'

export default defineComponent({
  components: {
    Loading,
    RightSidebar
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const user = computed(() => store.state.user.user)
    var userInfo = ref()
    var myself = ref<boolean>(true)
    var friendShip = ref<string>("")

    async function checkYourProfile (params) {
      if (params.username == user.value.username) {
        userInfo.value = user.value
        myself.value = true
      } else {
        myself.value = false
        try {
          var resultUser = await store.dispatch('user/getUserByUsername', params.username)
          userInfo.value = resultUser

          var type = await store.dispatch('user/checkTypeFriend',resultUser.id)
          friendShip.value = type
        } catch (err) {
          router.push('/home')
        }
        
      }
    }

    checkYourProfile(route.params)

    watch(
      (route),
      async (v) => {
        if (route.name != 'profile_default')
          return
        
        await checkYourProfile(route.params)
      }
    )


    // change route
    const defaultPathRoute = route.path.split('/')[1]

    router.beforeEach( async (to) => {
      if (to.path.split('/')[1] == defaultPathRoute) {
        router.removeRoute('profile_photo')
        router.addRoute('profile', { 
          path: 'photo',
          name: 'profile_photo',
          components: {
            default: () => {
              switch (to.path.split('/')[2]) {
                case '':
                  return import('../components/profile/ProfileDefault.vue')
                case 'with_replies':
                  return import('../components/profile/WithReplies.vue')
                case 'media':
                  return import('../components/profile/Media.vue')
                case 'like':
                  return import('../components/profile/Like.vue')
                default :
                  return import('../components/profile/ProfileDefault.vue')
              }
            },
            photo: () => import('../views/Photo.vue')
          }
        })
        // console.log(router.getRoutes())
        // return to.fullPath
      }
    })

    return { user, userInfo, myself, friendShip }
  },
})
</script>

<style scoped>
  .nav-link.active > div::after {
    @apply content-[''] absolute bottom-0 left-1/2 w-[calc(100%+1rem)] -translate-x-1/2 h-1.5 block rounded-full bg-violet-400;
  }
</style>
