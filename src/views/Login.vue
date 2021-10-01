<template>
  <div @click.prevent="$router.push('/')" class="fixed top-0 left-0 w-full h-screen bg-black/30 overflow-y-auto">
    <div @click.stop="" class="relative w-full h-full md:h-inherit md:max-w-[450px] mx-auto bg-white md:my-12 px-8 py-8 md:rounded-xl">
      <div class="absolute md:hidden right-8 top-4 rounded-md px-4 py-1 bg-violet-500 text-white">
        <button @click.prevent.stop="$router.push('/')">Đóng</button>
      </div>
      <div class="w-12">
        <img src="../assets/logo.png" alt="logo" class="w-full">
      </div>
      <form action="post" class="mt-6" @submit.prevent="submit">
        <h3 class="text-3xl font-semibold tracking-wide">Đăng nhâp vào Ozzy</h3>
        <div class="mt-4">
          <div class="relative bg-white border border-gray-300 rounded px-2 h-[58px]
            focus-within:border-violet-500 focus-within:border-2
            flex items-end">
            <input type="text" id="username" v-model="username" autofocus
              placeholder=" "
              autocomplete="new-password"
              class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
            <label for="username"
              class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
              peer-focus:text-xs peer-focus:text-violet-600
              peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
              transition-all duration-100 ease truncate w-full"
            >Điện thoại, email, hoặc tên người dùng</label>
          </div>
        </div>
        <div class="mt-6">
          <div class="relative bg-white border border-gray-300 rounded px-2 h-[58px]
            focus-within:border-violet-500 focus-within:border-2
            flex items-end">
            <input type="password" id="password" v-model="password"
              placeholder=" "
              autocomplete="new-password"
              class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
            <label for="password"
              class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
              peer-focus:text-xs peer-focus:text-violet-600
              peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
              transition-all duration-100 ease truncate w-full"
            >
              <span>Mật khẩu</span>
            </label>
          </div>
        </div>
        <p v-if="textLoginError != ''" class="mt-4 text-red-500 text-base">*{{textLoginError}}</p>
        <div class="mt-6">
          <button :disabled="!isSubmit || isLoading" type="submit"
            class="w-[calc(100%+.5rem)] h-[52px] rounded-full bg-violet-600
            justify-center px-2 py-3.5 -mx-1 text-white font-bold flex
            disabled:bg-violet-300 disabled:cursor-default items-center"
          >
            <span v-if="!isLoading">Đăng nhập</span>
            <span v-else class="text-[2rem] inline-flex"><i class='bx bx-loader-alt bx-spin' ></i></span>
          </button>
        </div>
        <div class="mt-8 text-violet-600 text-center text-sm">
          <router-link to='' class="hover:underline">Quên mật khẩu?</router-link>
          <span class="px-1">.</span>
          <router-link to='/i/signup' class="hover:underline">Đăng ký Ozzy</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    var username = ref<string>('')
    var password = ref<string>('')
    var isSubmit = ref<boolean>(false)
    var isLoading = ref<boolean>(false)
    var textLoginError = ref('')

    watch([username, password], ([newUsername, newPassword]) => {
      if (newUsername != '' && newPassword != '')
        isSubmit.value = true
      else
        isSubmit.value = false
    })

    // SUBMIT FORM LOGIN
    const submit = async () => {
      isLoading.value = true
      textLoginError.value = ''
      try {
        const result = await store.dispatch('user/login', {
          username: username.value,
          password: password.value
        })
        
        router.push('/home')

      } catch (err) {
        textLoginError.value = err.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      username,password,isSubmit,isLoading,submit,textLoginError
    }
  },
})
</script>
