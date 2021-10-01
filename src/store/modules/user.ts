import userAPI from '../../api/user.api.ts'

// initial state
const state = () => ({
  user: {
    guest: true
  },
  listUser: []
})

// getters
const getters = {
  getUserByEmailControl: state => {
    return userAPI.getUserByEmail()
  },
  getUserByPhoneControl: state => {
    return userAPI.getUserByPhone()
  },
  getUserRandomInListUser: state => {
    return state.listUser.filter(function (v) {
      if (this.count < 3) {
        this.count++;
        return true;
      }
      return false;
    }, {count: 0})
  },
}

// actions
const actions = {
  async logged ({commit,state}) {
    try {
      const result = await userAPI.logged()
      
      commit('saveUser',result)
    }
    catch(err) {
      console.log(err);
      
      commit('saveUser',{
        guest: true
      })
    }
  },

  async login ({commit,state},data) {
    try {
      const result = await userAPI.login(data)
      
      commit('saveUser',result)
      console.log(result);
      
    }
    catch(err) {
      throw err
    }
  },

  async logout ({commit,state}) {
    try {
      const result = await userAPI.logout()

      commit('saveUser',{
        guest: true
      })
    }
    catch(err) {
      throw err
    }
  },

  async signup ({commit,state}, data) {
    try {
      const result = await userAPI.signup(data)
      
      commit('saveUser',result)
    }
    catch(err) {
      throw err
    }
  },

  async getUserByUsername({commit,state}, username) {
    try {
      const result = await userAPI.getUserByUsername(username)

      return result
    }
    catch(err) {
      throw err
    }
  },

  async getRandomUser({commit,state}) {
    try {
      const result = await userAPI.getRandomUser()

      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          await commit('addToListUser',result[i])
        }
      }
      console.log(result);
      
    }
    catch(err) {
      console.log(err);
    }
  },

  async checkTypeFriend({commit,state},id) {
    try {
      const result = await userAPI.getTypeFriend(id)

      return result
    }
    catch(err) {
      console.log(err);
    }
  },
}

// mutations
const mutations = {
  saveUser (state,user) {
    if (!user.guest) {
      let str = ""
      str = user.name.replace(/([^0-9a-z-A-Z ]|[\s])/g, "")

      if (str == "")
        str = user.username.replace(/([^0-9a-z-A-Z ]|[\s])/g, "")
      
      user.shortName = str[0]
    }
    state.user = user
  },

  addToListUser (state,user) {
    if (state.listUser.findIndex(v => v.id == user.id) < 0) {
      if (!user.guest) {
        let str = ""
        str = user.name.replace(/([^0-9a-z-A-Z ]|[\s])/g, "")

        if (str == "")
          str = user.username.replace(/([^0-9a-z-A-Z ]|[\s])/g, "")
        
        user.shortName = str[0]
      }
      state.listUser = [...state.listUser, user]
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}