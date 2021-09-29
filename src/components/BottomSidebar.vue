<template>
  <div :class="!hiddenBottomSidebar ? 'block' : 'hidden'" class="fixed xs:hidden left-0 bottom-0 w-screen pointer-events-none ani-bot-to-top">
    <div class="flex p-4 justify-end">
      <router-link to="/compose/wit" 
        class="w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-700 flex justify-center items-center text-3xl text-white pointer-events-auto" 
        title="Ozz">
        <span class="xl:hidden">
          <i class='bx bxs-pen' ></i>
        </span>
        <span class="hidden xl:inline text-base font-semibold">Đăng Wit</span>
      </router-link>
    </div>

    <!-- sidebar -->
    <div class="flex py-1 border-t bg-white pointer-events-auto">
      <router-link
        to="/home"
        custom
        v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <a :href="href" @click="navigate" :class="[isActive && 'active']" 
          title="Home"
          class="w-1/4 text-center group nav-link">
          <span class="w-10 h-10 rounded-full py-1 group-hover:bg-gray-200
          flex justify-center items-center mx-auto text-2xl">
            <i class='bx bxs-home-circle' ></i>
            <i class='bx bx-home-circle'></i>
          </span>
        </a>
      </router-link>
      <router-link
        to="/explore"
        custom
        v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <a :href="href" @click="navigate" :class="[isActive && 'active']" 
          title="Home"
          class="w-1/4 text-center group nav-link">
          <span class="w-10 h-10 rounded-full py-1 group-hover:bg-gray-200
          flex justify-center items-center mx-auto text-2xl">
            <i class='bx bxs-search' ></i>
            <i class='bx bx-search'></i>
          </span>
        </a>
      </router-link>
      <router-link
        to="/notifications"
        custom
        v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <a :href="href" @click="navigate" :class="[isActive && 'active']" 
          title="Home"
          class="w-1/4 text-center group nav-link">
          <span class="w-10 h-10 rounded-full py-1 group-hover:bg-gray-200
          flex justify-center items-center mx-auto text-2xl">
            <i class='bx bxs-bell' ></i>
            <i class='bx bx-bell' ></i>
          </span>
        </a>
      </router-link>
      <router-link
        :to="(idMessagesUsed == '' ||  idMessagesUsed == undefined) ? '/messages' : `/messages/${idMessagesUsed}`"
        custom
        v-slot="{ href, route, navigate, isActive, isExactActive }"
      >
        <a :href="href" @click="navigate" :class="[isActive && 'active']" 
          title="Home"
          class="w-1/4 text-center group nav-link">
          <span class="w-10 h-10 rounded-full py-1 group-hover:bg-gray-200
          flex justify-center items-center mx-auto text-2xl">
            <i class='bx bxs-envelope' ></i>
            <i class='bx bx-envelope' ></i>
          </span>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    var hiddenBottomSidebar = ref<boolean>(true)

    function changeHiddenBottom (name) {
      if (name == 'message_textbar')
        hiddenBottomSidebar.value = true
      else
        hiddenBottomSidebar.value = false
    }

    changeHiddenBottom(route.name)

    watch(
      () => route.name,
      name => {
        changeHiddenBottom(name)
      }
    )

    var idMessagesUsed = computed(() => store.state.messages.idMessagesUsed)

    return { hiddenBottomSidebar, idMessagesUsed }
  },
})
</script>


<style scoped>
  .nav-link.active i:nth-child(1){
    @apply inline;
  }
  .nav-link.active {
    @apply font-semibold;
  }
  .nav-link.active i:nth-child(2){
    @apply hidden;
  }
  .nav-link i:nth-child(1){
    @apply hidden;
  }
  .nav-link i:nth-child(2){
    @apply inline;
  }

  .ani-bot-to-top {
    animation: ani-bot-to-top 1s ease-in-out;
  }

  @keyframes ani-bot-to-top {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>