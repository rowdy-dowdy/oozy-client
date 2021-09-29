// initial state
const state = () => ({
  idMessagesUsed : '',
  groupMessages: {
    idGroupMessages: 1,
    title: 'Hihi Haha',
    users: [14297252630,14297252631],
    textMessages: [
      {
        messageId : 1,
        userId: 14297252630, 
        content: 'hello', 
        time_created: new Date(1632244852383),
      },
      {
        messageId : 1,
        userId: 14297252630, 
        content: 'hello 2', 
        time_created: new Date(1632244852383),
      },
      {
        messageId : 1,
        userId: 14297252631, 
        content: 'hi', 
        time_created: new Date(1632244852385),
      },
      {
        messageId : 1,
        userId: 14297252631, 
        content: 'hi2', 
        time_created: new Date(1632244852385),
      },
      {
        messageId : 1,
        userId: 14297252630, 
        content: 'how are you?', 
        time_created: new Date(1632244852388),
      },
      {
        messageId : 1,
        userId: 14297252631, 
        content: "i'm fine", 
        time_created: new Date(1632244852389),
      },
    ]
  }
})

// getters
const getters = {}

// actions
const actions = {
  async sendMessages ({commit,state}, data) {
    try {
      commit('addTextMessages',data)
    } catch (error) {
      throw error
    }
  }
}

// mutations
const mutations = {
  changeIdMessages (state,data) {
    state.idMessagesUsed = data
  },
  addTextMessages(state,data) {
    state.groupMessages.textMessages = [...state.groupMessages.textMessages,data]
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}