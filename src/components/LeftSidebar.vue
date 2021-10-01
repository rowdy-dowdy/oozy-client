<template>
  <div class="hidden xs:block main flex-grow flex-none min-w-0 min-h-screen z-10">
    <div class=" relative flex w-[68px] sm:w-[88px] min-h-full xl:w-[275px] ml-auto">
      <div 
        :class="menuUserShow ? 'overflow-y-hidden' : 'overflow-y-auto'"
        class="fixed flex flex-col justify-between w-inherit h-screen bg-white sm:px-3 xl:pr-6">
        <div class="flex flex-col items-center xl:items-start space-y-2">
          <div class="mb-2 sm:ml-2">
            <router-link to="/home" class="w-12 h-12 rounded-full py-1 hover:bg-violet-100
              flex justify-center items-center">
                <img src="../assets/logo.png" class="w-9">
            </router-link>
          </div>

          <div class="flex">
            <router-link
              to="/home"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Home"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-home-circle' ></i>
                <i class='bx bx-home-circle'></i>
                <span class="hidden xl:inline text-lg pl-2">Trang chủ</span>  
              </a>
            </router-link>
          </div>

          <div class="flex">
            <router-link
              to="/explore"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Explore"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-ghost' ></i>
                <i class='bx bx-ghost'></i>
                <span class="hidden xl:inline text-lg pl-2">Khám phá</span>
              </a>
            </router-link>
          </div>

          <div class="flex">
            <router-link
              to="/notifications"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Notifications"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-bell' ></i>
                <i class='bx bx-bell' ></i>
                <span class="hidden xl:inline text-lg pl-2">Thông báo</span>
              </a>
            </router-link>
          </div>

          <div class="flex">
            <router-link
              :to="(idMessagesUsed == '' ||  idMessagesUsed == undefined) ? '/messages' : `/messages/${idMessagesUsed}`"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Messages"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-envelope' ></i>
                <i class='bx bx-envelope' ></i>
                <span class="hidden xl:inline text-lg pl-2">Tin nhắn</span>
              </a>
            </router-link>
          </div>

          <div class="flex">
            <router-link
              to="/bookmarks"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Bookmarks"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-bookmark' ></i>
                <i class='bx bx-bookmark' ></i>
                <span class="hidden xl:inline text-lg pl-2">Dấu trang</span>
              </a>
            </router-link>
          </div>

          <div class="flex">
            <router-link
              to="/user/lists"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Lists"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-detail' ></i>
                <i class='bx bx-detail' ></i>
                <span class="hidden xl:inline text-lg pl-2">Danh sách</span>
              </a>
            </router-link>
          </div>

          <div class="flex">
            <router-link
              :to="`/${user.username}`"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <a :href="href" @click="navigate" :class="[isActive && 'active']" 
                title="Profile"
                class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
                flex justify-center items-center text-3xl nav-link">
                <i class='bx bxs-user' ></i>
                <i class='bx bx-user' ></i>
                <span class="hidden xl:inline text-lg pl-2">Hồ sơ</span>
              </a>
            </router-link>
          </div>

          <div class="flex">
            <button class="w-12 xl:w-full xl:pl-3 xl:pr-5 h-12 rounded-full py-1 hover:bg-gray-200
              flex justify-center items-center text-3xl"
              title="More">
              <i class='bx bx-dots-horizontal-rounded' ></i>
              <span class="hidden xl:inline text-lg pl-2">Thêm</span>
            </button>
          </div>

          <div class="flex xl:w-full">
            <router-link to="/compose/wit" class="w-14 xl:w-full h-14 xl:h-12 rounded-full bg-violet-600
             hover:bg-violet-700 flex justify-center items-center text-3xl text-white"
              title="Ozz">
                <span class="xl:hidden">
                  <i class='bx bxs-pen' ></i>
                </span>
                <span class="hidden xl:inline text-base font-semibold">Đăng Wit</span>
            </router-link>
          </div>
        </div>

        <div class="relative w-full">
          <div 
            v-click-outside="dropdownHiden"
            @click="menuUserShow = true"
            class="flex mx-auto xl:ml-0 xl:px-3 w-16 xl:w-full h-16 rounded-full hover:bg-gray-200 justify-center space-x-3 items-center cursor-pointer" title="Accounts">
            <span class="w-10 h-10 rounded-full overflow-hidden bg-violet-200">
              <img src="../assets/default_profile_200x200.png" alt="" 
              class="img-full">
            </span>

            <div class="hidden flex-grow min-w-0 xl:flex space-x-2 items-center">
              <div class="flex-grow min-w-0 text-sm">
                <h3 class="font-semibold truncate">{{ user.name }}</h3>
                <p class="text-gray-600 truncate">@{{ user.username }}</p>
              </div>
              <div class="flex-none">
                <span class="">
                  <i class='bx bx-dots-horizontal-rounded' ></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div @click.prevent.stop="dropdownHiden = true" v-if="menuUserShow" class="absolute bottom-[70px] left-4">
        <div class="w-[300px] bg-white py-2 rounded-xl shadow-md border border-gray-200">
          <div class="flex space-x-2 border-b mx-3 py-4 border-gray-200/80">
            <div class="flex-none w-12 h-12 rounded-full overflow-x-hidden">
              <img src="../assets/default_profile_normal.png" alt="" class="img-full">
            </div>

            <div class="flex-grow min-w-0 flex space-x-2 items-center">
              <div class="flex-grow min-w-0 text-sm">
                <h3 class="font-semibold truncate">{{ user.name }}</h3>
                <p class="text-gray-600 truncate">@{{ user.username }}</p>
              </div>
              <div class="flex-none">
                <span class="text-green-600">
                  <i class='bx bx-check' ></i>
                </span>
              </div>
            </div>
          </div>
          
          <ul class="flex flex-col text-sm">
            <li class="">
              <a href="#" class="block px-3 py-4 hover:bg-gray-100">Thêm một tài khoản hiện có</a>
            </li>
            <li class="">
              <a @click.prevent.stop="logout()" href="#" class="block px-3 py-4 hover:bg-gray-100">
                Đăng xuất
                <span>@{{ user.username }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div class="absolute left-4 top-[calc(100%-1px)]">
          <div class="drop-shadow-md">
            <div class="w-[20px] h-[10px] bg-white" style="clip-path: polygon(50% 100%, 0 0, 100% 0);"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    var menuUserShow = ref<boolean>(false)
    const dropdownHiden = () => {
      menuUserShow.value = false
    }

    const user = computed(() => store.state.user.user)
    var idMessagesUsed = computed(() => store.state.messages.idMessagesUsed)

    async function logout () {
      try {

        await store.dispatch('user/logout')
        router.push('/')

      } catch (err) {
        console.log(err);
      }

    }

    return { menuUserShow, dropdownHiden, user, idMessagesUsed, logout }
  },
})
</script>


<style scoped>
  .nav-link.active > i:nth-child(1){
    @apply inline;
  }
  .nav-link.active {
    @apply font-semibold;
  }
  .nav-link.active > i:nth-child(2){
    @apply hidden;
  }
  .nav-link > i:nth-child(1){
    @apply hidden;
  }
  .nav-link > i:nth-child(2){
    @apply inline;
  }
</style>