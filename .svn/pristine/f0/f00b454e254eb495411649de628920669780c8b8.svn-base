import Vue from 'vue'
import mutations from './mutations'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  lineUser: {},
  token: '',
  code: '',
  payFinish: {},
  filterKey: {}
}
const persistedStateOptions = {
  paths: ['lineUser', 'token', 'code', 'payFinish']
}

export default new Vuex.Store({
  plugins: [createPersistedState(persistedStateOptions)],
  state,
  mutations
})

