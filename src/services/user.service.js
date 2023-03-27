import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import gUsers from '../../data/user.json' assert { type: 'json' }

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	getLoggedInUser,
	login,
	logout,
	signup,
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
<<<<<<< HEAD
  // const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  const str = localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  return JSON.parse(str)
=======
	//const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
	const str = localStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
	return JSON.parse(str)
>>>>>>> 3a62ae62c29fde6de45ba302253e15184972632d
}

async function login(userCred) {
	// const user = await httpService.post('auth/login', userCred)
	if (user) {
		return saveLocalUser(user)
	}
}
async function signup(userCred) {
	// const user = await httpService.post('auth/signup', userCred)
	return saveLocalUser(user)
}
async function logout() {
<<<<<<< HEAD
  localStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  // return await httpService.post('auth/logout')
}
function saveLocalUser(user) {
  user = {
    _id: utilService.makeId(),
    username: user.username,
    fullname: user.fullname,
    password: user.password,
    imgUrl: '',
    color: '#676879',
    boards: [],
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
=======
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	// return await httpService.post('auth/logout')
}
function saveLocalUser(user) {
	user = {
		_id: user._id,
		fullname: user.fullname,
	}
	sessionStorage.setItem(
		STORAGE_KEY_LOGGEDIN_USER,
		JSON.stringify(user)
	)
	return user
>>>>>>> 3a62ae62c29fde6de45ba302253e15184972632d
}

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
