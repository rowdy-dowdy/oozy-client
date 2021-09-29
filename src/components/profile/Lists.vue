<template>
  <div class="flex-grow w-full md:w-initial">
    <div class="w-full flex justify-between md:w-[600px] lg:w-[920px] 2lg:w-[990px] min-h-full">
      <div class="w-full max-w-[600px] min-h-screen h-full border border-gray-200">
        <div class="flex items-center space-x-4 px-3 py-2 border-b">
          <div class="flex-none">
            <span @click.prevent.stop="$router.go(-1)" class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-200 text-xl cursor-pointer">
              <i class='bx bx-left-arrow-alt'></i>
            </span>
          </div>
          <div class="flex-grow">
            <h2 class="text-lg font-semibold">Danh sách</h2>
            <p class="text-gray-600 -mt-1">@{{ user.username }}</p>
          </div>
          <div class="flex-none">
            <span class="flex justify-center items-center w-9 h-9 rounded-full hover:bg-gray-100 text-xl cursor-pointer" title="Wit hàng đầu">
              <i class='bx bx-list-plus'></i>
            </span>
          </div>
        </div>

        <div class="text-base">
          <div class="border-b p-4">
            <h4 class="text-xl font-bold">Danh sách đã ghim</h4>
            <p class="text-gray-600 px-4 py-8">
              Không có gì ở đây cả - hãy ghim các Danh sách yêu thích của mình để truy cập chúng nhanh.
            </p>
          </div>
          <div class="p-4">
            <h4 class="text-xl font-bold">Danh sách của bạn</h4>
            <p class="text-gray-600 px-4 py-8">
              Bạn chưa tạo hoặc theo dõi bất kỳ Danh sách nào. Khi bạn làm vậy, những danh sách đó sẽ hiển thị ở đây.
            </p>
          </div>
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
import RightSidebar from '../../components/RightSidebar.vue'

export default defineComponent({
  components: {
    RightSidebar
  },
  setup() {
    document.title = 'Danh sách / Oozy'

    const store = useStore()

    const user = computed(() => store.state.user.user)

    return { user }
  },
})
</script>
