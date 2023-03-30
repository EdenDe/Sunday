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
			console.log('page loading', state.pageLoading)
		},
	},
	getters: {
		getPageLoading({ pageLoading }) {
			console.log('store getters', pageLoading)
			return pageLoading
		},
	},
	modules: {
		boardStore,
		userStore,
	},
})
