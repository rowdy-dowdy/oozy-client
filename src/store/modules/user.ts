import userAPI from '../../api/user.api.ts'

// initial state
const state = () => ({
  user: {
    guest: true
  },
  arrayUsers: []
})

// getters
const getters = {}

// actions
const actions = {
  async logged ({commit,state}) {
    try {
      const result = await userAPI.logged()
      
      // commit('saveUser',result)
    }
    catch(err) {
      commit('saveUser',{
        guest: true
      })
    }
  },

  async getUserById({commit,state}, username) {
    try {
      const result = await userAPI.getUserById(username)

      return result
    }
    catch(err) {
      throw err
    }
  }
}

// mutations
const mutations = {
  saveUser (state,user) {
    state.user = user
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}