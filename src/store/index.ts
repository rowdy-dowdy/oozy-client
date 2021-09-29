import { InjectionKey } from 'vue'
import { createStore } from 'vuex'

import app from './modules/app'
import user from './modules/user'
import messages from './modules/messages'


export const store = createStore({
  modules: {
    app,
    user,
    messages,
  }
})
