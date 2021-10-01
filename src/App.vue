<template>
  <loading-bar />
  <div class="flex">
    <left-sidebar v-if="!routeHasNotSidebarLeft"/>
    <router-view/>
    <bottom-sidebar />

    <!-- only use router post wit -->
    <router-view name="post"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import LeftSidebar from './components/LeftSidebar.vue'
import BottomSidebar from './components/BottomSidebar.vue'
import loadingBar from './components/LoadingBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    LeftSidebar,
    loadingBar,
    BottomSidebar
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const arrayHasNotSidebarLeft:string[] = ['login','signup','home-main','404','']
    var nameRoute = computed(():string => route.name)
    var routeHasNotSidebarLeft = ref<boolean>(true)

    router.isReady(async() => {
      routeHasNotSidebarLeft.value = false
    })

    const user = computed(() => store.state.user.user)

    watch(
      (user),
      async (v) => {
        if (!v.guest) {
          await store.dispatch('user/getRandomUser')
        }
      }
    )
    

    watch(
      nameRoute,
      newRouteName => {
        if (arrayHasNotSidebarLeft.indexOf(newRouteName) >= 0)
          routeHasNotSidebarLeft.value = true
        else
          routeHasNotSidebarLeft.value = false
      }
    )

    var firstLoad:boolean = false

    router.beforeEach(async (to, from, next) => {
      if (to.path.split('/').length < 3 && from.path.split('/')[1] != to.path.split('/')[1] || to.name == 'post_wit' || to.name == 'profile_list') {
        store.commit('app/changeLoadingBar',true)
      }

      if (!firstLoad) {
        await store.dispatch('user/logged')
        firstLoad = TextTrackCueList
        
      }
      
      if (user.value.guest) {
        if (to.name == 'home-main' || to.name == 'login' || to.name == 'signup') {
          next()
        } else {
          next({name: 'home-main'})
        }
      }
      else {
        if (to.name == 'home-main' || to.name == 'login' || to.name == 'signup') {
          next({name: 'home'})
        } else {
          next()
        }
      }
    })

    router.afterEach( (to) => {
      store.commit('app/changeLoadingBar',false)

      // change title
      if (to.meta.title) {
        if (to.matched[0].name == 'profile')
          document.title = `${user.value.name} (@${user.value.username}) / Oozy`
        else
          document.title = to.meta.title
      } 
    })

    // resize window
    function resizeWindow () {
      let v = 'mobile'

      let offsetWidth = window.innerWidth

      if (offsetWidth >= 1024)
        v = 'desktop'

      store.commit('app/changeResponsive', v)
    }

    onMounted(() => {
      resizeWindow()
      window.addEventListener('resize', resizeWindow)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', resizeWindow)
    })

    return { routeHasNotSidebarLeft }
  }
})
</script>

<style>
  #app {
    @apply text-warmGray-800 font-sans text-sm;
  }

  [data-color="violet"] {
    @apply bg-gradient-to-b from-violet-500 to-violet-900;
  }

  .scroll-content {
    @apply flex flex-col min-h-full;
  }

  [id^='scroll']:hover .scrollbar-track {
    @apply !opacity-100;
  }
  .scrollbar-track {
    @apply !transition-none !w-[6px] !bg-transparent;
  }
  .scrollbar-thumb {
    @apply !bg-gray-400 !w-full;
  }
</style>
