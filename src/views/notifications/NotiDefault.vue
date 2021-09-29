<template>
  <ul class="flex flex-col text-sm lg:text-base">
    <li class="border-b">
      <a href="#" 
        @click.prevent="changeModal()"
        class="flex items-center space-x-4 px-8 py-2.5 hover:bg-violet-100">
        <div class="flex-none">
          <img src="../../assets/logo.png" alt="logo" class="w-8">
        </div>
        <div class="flex-grow">
          <span class="">Có đăng nhập vào tài khoản @VietHung413313 của bạn từ một thiết bị mới trên 13 thg 9, 2021. Xem lại ngay.</span>
        </div>
      </a>
    </li>
  </ul>

  <!-- MODAL -->
  <div v-if="modalShow" @click.prevent.stop="modalShow = false" class="fixed w-screen min-h-screen top-0 left-0 bg-black/30 flex items-center justify-center z-50">
    <div @click.prevent.stop="" class="w-full md:max-w-[600px] mx-auto h-screen md:max-h-[90vh] md:h-max md:rounded-2xl bg-white overflow-auto">
      <!-- CONTENT -->
      <div class="flex flex-col px-4 py-12">
        <div class="flex-none py-8 text-center">
          <img src="../../assets/logo.png" alt="logo" class="h-10 mx-auto">
        </div>

        <div class="w-full max-w-[400px] mx-auto text-base">
          <h4 class="text-2xl font-bold">Cảnh báo đăng nhập mới</h4>
          <p class="text-gray-600 py-2">Có đăng nhập vào tài khoản @VietHung413313 của bạn từ một thiết bị mới</p>
          <p class="text-gray-600 py-2">
            Đăng nhập mới
            <br>
            Thiết bị: Firefox trên Windows Vị trí*: Không xác định Thời gian: Thứ Hai, 13 tháng 9, 2021 vào 2:21 SA PDT (2 giờ trước) *Vị trí ước tính dựa trên địa chỉ IP đăng nhập
          </p>
          <p class="text-gray-600 py-2">Nếu đó là bạn • Bạn có thể bỏ qua thông báo này. Không cần phải hành động gì.</p>
          <p class="text-gray-600 py-2">
            Nếu đó không phải là bạn • 
            <a href="#" class="text-violet-600 hover:underline">Thay đổi mật khẩu để bảo vệ tài khoản</a>
            . Bạn sẽ bị đăng xuất khỏi tất cả các phiên Twitter đang mở ngoại trừ phiên bạn đang sử dụng lúc này.
          </p>
          <button @click="changeModal()" 
            class="rounded-full w-full px-4 py-3 mt-6 mb-8 bg-gray-900 hover:bg-gray-800 text-white font-semibold">Đã hiểu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    var modalShow = ref<boolean>(false)

    const changeModal = () => {
      modalShow.value = !modalShow.value
    }

    return { modalShow, changeModal }
  },
})
</script>