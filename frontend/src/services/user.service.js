import { httpService } from './http.service.js'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const ENDPOINT = 'auth'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  getUsers,
  getById,
  remove,
  update,
}

function getUsers() {
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
  if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
  return user
}

async function login(cred) {
  const user = await httpService.post(ENDPOINT + '/login', cred)
  if (cred) return _saveLocalUser(user)
}

async function signup(cred) {
  const user = await httpService.post(ENDPOINT + '/signup', cred)
  return _saveLocalUser(user)
}
async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return await httpService.post(ENDPOINT + '/logout')
}

function _saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

