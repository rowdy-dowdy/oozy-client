// initial state
const state = () => ({
  showPostWit: false,
  loadingBar: false,
  responsive: 'mobile',
})

// getters
const getters = {}

// actions
const actions = {

}

// mutations
const mutations = {
  changeShowPostWit (state,data) {
    state.showPostWit = data
  },
  changeLoadingBar (state,v) {
    state.loadingBar = v
  },
  changeResponsive(state,v) {
    if (state.responsive != v)
      state.responsive = v
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}