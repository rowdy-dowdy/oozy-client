<template>
  <div class="fixed z-20 w-screen h-0.5 top-0 left-0">
    <div ref="progressBar" id="progressBar" class="w-full h-full bg-violet-600 transition-all duration-200 ease-in-out"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    var isLoadingBar = computed(() => store.state.app.loadingBar)

    var progressBar = ref<HTMLElement>(null)

    function changeprogressBar () {
      if (isLoadingBar.value == true) {
				progressBar.value.style.transition = 'width 2s';
				progressBar.value.style.width = '80%';
			}else if (isLoadingBar.value == false){
				progressBar.value.style.width = '100%';
				progressBar.value.style.transition = '.1s';
				setTimeout(function () {
					progressBar.value.style.transition = 'none';
					progressBar.value.style.width = '0';
				}, 100)
			}
    }

    onMounted(() => {
      // progressBar.value = document.querySelector('#progressBar')
      changeprogressBar()
    })

    watch(
      () => isLoadingBar.value,
      () => {
        changeprogressBar()
      }
    )

    return { isLoadingBar, progressBar }
  },
})
</script>
