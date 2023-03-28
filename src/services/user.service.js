import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import gUsers from '../../data/user.json' assert { type: 'json' }
import { httpService } from './http.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getLoggedinUser,
	saveLocalUser,
	query,
	getById,
	remove,
	update,
}

function query() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}
function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update(user) {
	user = await httpService.put(`user/${user._id}`, user)
	// Handle case in which admin updates other user's details
	if (getLoggedinUser()._id === user._id) saveLocalUser(user)
	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) {
		socketService.login(user._id)
		return saveLocalUser(user)
	}
}
async function signup(userCred) {
	const user = await httpService.post('auth/signup', userCred)
	socketService.login(user._id)
	return saveLocalUser(user)
}
async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	socketService.logout()
	return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
	user = {
		_id: user._id,
		fullname: user.fullname,
		imgUrl: user.imgUrl,
		color: user.color,
	}
	sessionStorage.setItem(
		STORAGE_KEY_LOGGEDIN_USER,
		JSON.stringify(user)
	)
	return user
}

function getLoggedinUser() {
	const user = JSON.parse(
		sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
	)
	if (user) return user
	const guestUser = { _id: utilService.makeId(), fullname: 'guest', color: 'black' }
	saveLocalUser(guestUser)
	socketService.login(guestUser._id)
	return guestUser

}

// function saveLocalUser(user) {
// 	user = {
// 		_id: utilService.makeId(),
// 		username: user.username,
// 		fullname: user.fullname,
// 		password: user.password,
// 		imgUrl: '',
// 		color: '#676879',
// 		boards: [],
// 	}
// 	sessionStorage.setItem(
// 		STORAGE_KEY_LOGGEDIN_USER,
// 		JSON.stringify(user)
// 	)
// 	return user
// }

// function login(credentials) {
// 	return axios
// 		.post('/api/auth/login', credentials)
// 		.then(res => res.data)
// 		.then(user => {
// 			sessionStorage.setItem(
// 				STORAGE_KEY_LOGGEDIN_USER,
// 				JSON.stringify(user)
// 			)
// 			return user
// 		})
// }

// function logout() {
// 	return axios.post('/api/auth/logout').then(() => {
// 		sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
// 	})
// }

// function signup(credentials) {
// 	return axios
// 		.post('/api/auth/signup', credentials)
// 		.then(res => res.data)
// 		.then(user => {
// 			sessionStorage.setItem(
// 				STORAGE_KEY_LOGGEDIN_USER,
// 				JSON.stringify(user)
// 			)
// 			return user
// 		})
// }

// function get(userId) {
// 	return axios.get(`/api/user/${userId}`).then(res => res.data)
// }
