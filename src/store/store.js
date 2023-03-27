import Vuex from 'vuex'
import { boardStore } from './board.store.js'
import { userStore } from './user.store.js'

export const store = Vuex.createStore({
  strict: true,
  modules: {
    boardStore,
    userStore,
  },
})
