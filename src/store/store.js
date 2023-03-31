import Vuex from 'vuex'
import { boardStore } from './board.store.js'
import { userStore } from './user.store.js'

export const store = Vuex.createStore({
	strict: true,
	state: {
		pageLoading: false,
	},
	mutations: {
		setPageLoading(state, { isLoading }) {
			state.pageLoading = isLoading
		},
	},
	getters: {
		getPageLoading({ pageLoading }) {
			return pageLoading
		},
	},
	modules: {
		boardStore,
		userStore,
	},
})
