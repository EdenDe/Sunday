import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	getLoggedInUser,
	login,
	logout,
	signup,
	get,
}

localStorage.setItem(
	STORAGE_KEY_LOGGEDIN_USER,
	JSON.stringify({
		_id: 'u102',
		fullname: 'Eden Derhy',
		imgUrl:
			'http://res.cloudinary.com/decasx192/image/upload/v1679764197/eden_nsjpcz.jpg',
		color: 'black',
	})
)

function getLoggedInUser() {
	//const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
	const str = localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
	return JSON.parse(str)
}

function login(credentials) {
	return axios
		.post('/api/auth/login', credentials)
		.then(res => res.data)
		.then(user => {
			sessionStorage.setItem(
				STORAGE_KEY_LOGGEDIN_USER,
				JSON.stringify(user)
			)
			return user
		})
}

function logout() {
	return axios.post('/api/auth/logout').then(() => {
		sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	})
}

function signup(credentials) {
	return axios
		.post('/api/auth/signup', credentials)
		.then(res => res.data)
		.then(user => {
			sessionStorage.setItem(
				STORAGE_KEY_LOGGEDIN_USER,
				JSON.stringify(user)
			)
			return user
		})
}

function get(userId) {
	return axios.get(`/api/user/${userId}`).then(res => res.data)
}
