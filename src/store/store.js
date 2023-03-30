import Vuex from 'vuex'
import { boardStore } from './board.store.js'
import { userStore } from './user.store.js'

export const store = Vuex.createStore({
  strict: true,
  state: {
    pageLoading: false
  },
  mutations: {
    setPageLoading({ pageLoading }, { isLoading }) {
      pageLoading = isLoading
      console.log('page loading', pageLoading);
    }
  },
  getters: {
    getPageLoading({ pageLoading }) {
      console.log('store getters', pageLoading);
      return pageLoading
    }
  },
  modules: {
    boardStore,
    userStore,
  },
})
