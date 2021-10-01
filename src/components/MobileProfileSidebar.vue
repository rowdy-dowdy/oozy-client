<template>
  <div class="xs:hidden">
    <div @click.prevent="showModal = true" class="w-8 h-8 rounded-full overflow-hidden bg-violet-100 hover:cursor-pointer">
      <img src="../assets/default_profile_normal.png" alt="" class="w-full">
    </div>

    <transition name="fade">
      <div v-if="showModal" @click.prevent="showModal = false"  class="fixed w-screen h-screen overflow-y-auto left-0 top-0 bottom-0 bg-black/50 z-20">
        <div @click.stop="" class="modal absolute min-w-[280px] max-w-[70%] min-h-full top-0 bg-white">
          <div class="flex px-4 py-2 space-x-4 border-b">
            <div class="flex-grow min-w-0">
              <h2 class="text-lg font-semibold truncate">Thông tin tài khoản</h2>
            </div>
            <div class="flex-none">
              <span 
                @click.prevent="showModal = false"
                class="flex w-8 h-8 rounded-full hover:bg-violet-100 text-xl justify-center items-center">
                <i class='bx bx-x'></i>
              </span>
            </div>
          </div>

          <div class="px-4 py-4">
            <div class="flex justify-between items-center">
              <div class="w-10 h-10 rounded-full overflow-hidden">
                <img src="../assets/default_profile_normal.png" alt="" class="w-full">
              </div>

              <div class="w-8 h-8 rounded-full border-2">
                <span class="flex w-full h-full rounded-full hover:bg-violet-100 text-xl justify-center items-center">
                  <i class='bx bx-plus'></i>
                </span>
              </div>
            </div>

            <router-link :to="`/${user.username}`" class="block text-sm py-2">
              <h3 class="font-semibold truncate text-base">{{ user.name }}</h3>
              <p class="text-gray-600 truncate">@{{ user.username }}</p>
            </router-link>

            <div class="flex">
              <div class="flex-1">
                <span class="font-semibold">0</span>
                <span> Đang theo dõi</span>
              </div>
              <div class="flex-1">
                <span class="font-semibold">0</span>
                <span> Người theo dõi</span>
              </div>
            </div>
          </div>

          <!-- list -->
          <ul class="flex flex-col">
            <li>
              <router-link :to="`/${user.username}`" class="flex items-center space-x-3 px-4 py-3 hover:bg-violet-100">
                <span class="flex-none text-xl">
                  <i class='bx bx-user' ></i>
                </span>
                <span>Hồ sơ</span>
              </router-link>
            </li>
            <li>
              <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-violet-100">
                <span class="flex-none text-xl">
                  <i class='bx bx-detail' ></i>
                </span>
                <span>Danh sách</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-violet-100">
                <span class="flex-none text-xl">
                  <i class='bx bx-bookmark' ></i>
                </span>
                <span>Dấu trang</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center space-x-3 px-4 py-3 hover:bg-violet-100">
                <span class="flex-none text-xl">
                  <i class='bx bx-cog' ></i>
                </span>
                <span>Cài đặt</span>
              </a>
            </li>
          </ul>

          <!-- LOGOUT -->
          <div class="pb-6 border-t">
            <router-link to="/logout" class="block px-4 py-3 hover:bg-violet-100 text-red-600 font-semibold">Đăng xuất</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    var showModal = ref<boolean>(false)
    const store = useStore()

    var user = computed(() => store.state.user.user)

    return { showModal, user }
  },
})
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-active .modal,
  .fade-leave-active .modal {
    transition: all .5s ease-in-out;
  }

  .fade-enter-from .modal,
  .fade-leave-to .modal {
    left: -100%;
  }
  .fade-enter-to .modal,
  .fade-leave-from .modal {
    left: 0;
  }
</style>
