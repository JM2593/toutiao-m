import storage from './storage'
const TOKEN = 'HEIMA_TOUTIAO_TOKEN'
const HISTORY = 'HEIMA_TOUTIAO_SERACH_HISTORY'
// 封装token操作方法
export const getToken = () => storage.get(TOKEN)
export const setToken = (value) => storage.set(TOKEN, value)
export const removeToken = () => storage.remove(TOKEN)

export const getHistory = () => storage.get(HISTORY)
export const setHistory = (value) => storage.set(HISTORY, value)
