<template>
  <div class="flex-none flex h-14 items-center px-4 shadow-sm">
    <router-link to="/messages" class="flex-none flex lg:hidden justify-center items-center cursor-pointer w-10 h-10 rounded-full overflow-hidden hover:bg-violet-100 mr-4">
      <span class="text-xl">
        <i class='bx bx-left-arrow-alt'></i>
      </span>
    </router-link>

    <div class="flex-grow min-w-0 flex items-center space-x-2 mr-4">
      <div class="flex-none">
        <div class="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-b from-green-600 to-violet-800">
          <span class="icon-bar font-black text-white text-xl select-none">T</span>
        </div>
      </div>

      <div class="flex-grow min-w-0 text-base">
        <p class="font-bold truncate">Tiện</p>
        <p class="flex-none text-sm font-semibold text-gray-600 truncate">
          Last seen
          <span>15 minutes ago</span>
        </p>
      </div>
    </div>

    <div class="flex-none flex justify-center items-center cursor-pointer w-10 h-10 rounded-full overflow-hidden hover:bg-violet-100">
      <span class="text-xl">
        <i class='bx bx-info-circle' ></i>
      </span>
    </div>
  </div>

  <div ref="scrollMessageTextBar" id="scrollMessageTextBar" class="relative flex-grow w-full overflow-auto bg-gradient-to-t from-violet-600 to-pink-600">
    <div class="flex-1 flex flex-col min-h-full">
      <div class="flex-grow min-h-0 w-full bg-white"></div>
      <template 
        v-if="groupMessages && groupMessages.textMessages.length > 0" 
        v-for="(v,i) in groupMessages.textMessages" :key="i"
      >
        <div 
          v-if="v.userId != user.id"
          :class="{'text-first' : i == 0 || (i != 0 && groupMessages.textMessages[i-1].userId == user.id), 'text-last' : i == (groupMessages.textMessages.length - 1) || (i != (groupMessages.textMessages.length - 1) && groupMessages.textMessages[i+1].userId == user.id)}"
          class="text-msg-l flex w-full px-4 bg-white">
          <div class="inline-flex items-end max-w-[85%] mr-auto">
            <div class="flex-none w-8 h-8 rounded-full overflow-hidden">
              <img src="" alt="" class="hidden avatar img-full">
            </div>
            <div class="content ml-3">
              <p>{{ v.content }}</p>
            </div>
          </div>
        </div>

        <div 
          v-else
          :class="{'text-first' : i == 0 || (i != 0 && groupMessages.textMessages[i-1].userId != user.id), 'text-last' : i == (groupMessages.textMessages.length - 1) || (i != (groupMessages.textMessages.length - 1) && groupMessages.textMessages[i+1].userId != user.id)}"
          class="text-msg-r flex w-full">
          <div class="flex-grow min-w-0 bg-white"></div>
          <div class="inline-flex items-end max-w-[85%] ml-auto">
            <div class="content">
              <p>{{ v.content }}</p>
            </div>
            <div class="flex-none flex items-end h-full bg-white">
              <div class="w-5 h-5 rounded-full overflow-hidden">
                <span class="icon-bar text-violet-600">
                  <i class='bx bx-check'></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <div class="flex-none w-full pt-1 pb-4 px-4 bg-white">
    <div class="flex items-center w-full">
      <div class="flex-grow flex px-2 items-center h-12 bg-white rounded-lg border border-gray-400 mr-2">
        <div class="flex-none w-8 h-8 flex justify-center items-center text-2xl text-gray-500 cursor-pointer">
          <i class='bx bx-smile' ></i>
        </div>
        <div class="flex-grow min-w-0 ml-2">
          <input @keydown.enter="sendTextMessage" v-model="textInputMessages" type="text" class="w-full border-none" placeholder="Bắt đầu một tin nhắn mới">
        </div>
      </div>

      <div class="flex-none w-12 h-12">
        <div class="relative w-full h-full rounded-full overflow-hidden border border-gray-400 bg-white">
          <transition name="fade">
            <button v-if="!allowedSend" class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl text-gray-600">
              <i class='bx bx-microphone' ></i>
            </button>
            <button v-else 
              @click.prevent="sendTextMessage"
              class="absolute top-0 left-0 w-full h-full flex items-center justify-center text-2xl text-violet-600">
              <i class='bx bxs-pen' ></i>
            </button>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import Scrollbar from 'smooth-scrollbar';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import messages from '../store/modules/messages';

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()

    // get messages text
    const user = computed(() => store.state.user.user)
    var groupMessages = computed(() => store.state.messages.groupMessages)


    // send messages
    var allowedSend = ref<boolean>(false)
    var textInputMessages = ref<string>('')

    watch(
      () => textInputMessages.value,
      text => {
        if (text == '')
          allowedSend.value = false
        else
          allowedSend.value = true
      }
    )

    var isSending = false
    var scrollbar
    var scrollMessageTextBar = ref<HTMLElement>(null)
    async function sendTextMessage () {
      try {
        if (!allowedSend.value || isSending) return

        isSending = true
        await store.dispatch('messages/sendMessages', {
          userId: user.value.id, 
          content: textInputMessages.value, 
          time_created: new Date(),
        })

        nextTick(() => {
          scrollbar.scrollTo(0, scrollMessageTextBar.value.scrollHeight)
          console.log(groupMessages.value);
        })
        
      } catch (err) {
        console.log(err);
      } finally {
        isSending = false
        textInputMessages.value = ''
      }
    }

    onMounted(() => {
      scrollbar = Scrollbar.init(document.querySelector('#scrollMessageTextBar'));
    })

    onUnmounted(() => {
      Scrollbar.destroy(document.querySelector('#scrollMessageTextBar'))
    })

    return {
      groupMessages,
      allowedSend,
      user,
      textInputMessages,
      sendTextMessage,
      scrollMessageTextBar
    }
  },
})
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s ease-in-out;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.1);
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: scale(1);
  }

  .text-first {
    @apply border-t-8 border-white;
  }

  .text-last img.avatar {
    @apply block;
  }

  .text-msg-l .content{
    @apply inline-block w-max mb-0.5 px-4 py-2 bg-violet-100 rounded-l-[18px] rounded-r-[56px] text-base;
  }
  .text-msg-l.text-first .content{
    @apply rounded-tl-[56px];
  }
  .text-msg-l.text-last .content{
    @apply rounded-bl-[56px] mb-0;
  }
  .text-msg-r .content{
    @apply overflow-hidden border-b-2 border-white flex;
  }
  .text-msg-r.text-first .content p{
    @apply after:!rounded-tr-[56px];
  }
  .text-msg-r.text-last .content p{
    @apply after:!rounded-br-[56px];
  }
  .text-msg-r .content p{
    @apply flex-none w-full min-h-[30px] min-w-[20px] px-4 py-2 bg-transparent text-white relative text-base;
  }
  .text-msg-r .content::before {
    @apply content-[""] flex-grow min-w-0 bg-white;
  }
  .text-msg-r .content p::after {
    @apply content-[""] absolute block inset-[-36px] border-[36px] border-solid border-white pointer-events-none select-none rounded-r-[42px] rounded-l-[56px];
  }
</style>