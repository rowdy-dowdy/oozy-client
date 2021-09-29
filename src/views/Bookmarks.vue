<template>
  <div class="flex-grow-[1.5] lg:flex-grow w-full sm:w-initial">
    <div class="flex justify-between w-full sm:w-[550px] md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full">
      <div class="w-full max-w-[600px] min-h-screen h-full pb-24 xs:pb-0 border border-gray-200">
        <div class="flex items-center space-x-4 px-3 py-2 border-b">
          <div class="flex-none">
            <span @click.prevent.stop="$router.go(-1)" class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 text-xl cursor-pointer">
              <i class='bx bx-left-arrow-alt'></i>
            </span>
          </div>

          <div class="flex-grow">
            <h2 class="text-lg font-semibold">Dấu trang</h2>
            <p class="text-gray-600 -mt-1">@{{ user.username }}</p>
          </div>
        </div>

        <div class="mx-auto max-w-xs my-4 text-base">
          <h3 class="text-3xl font-black">
            Hiện tại chưa có gì để xem ở đây
          </h3>
          <p class="text-gray-600 mt-2 pb-4">
            Khi ai đó đề cập đến bạn, bạn sẽ tìm thấy nó tại đây.
          </p>
        </div>
      </div>

      <!-- RIGHT HOME -->
      <right-sidebar />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import RightSidebar from '../components/RightSidebar.vue'

export default defineComponent({
  components: {
    RightSidebar
  },
  setup() {
    const store = useStore()

    const user = computed(() => store.state.user.user)

    return { user }
  },
})
</script>
