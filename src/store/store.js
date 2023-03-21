import Vuex from 'vuex'
import { boardStore } from './board.store.js'

export const store = Vuex.createStore({
	strict: true,
	modules: {
		boardStore,
	},
})
