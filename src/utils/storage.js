class Storage {
  // 非法字符串用JSON.parse解析会报错，可以用catch捕获，如果可以解析则返回解析的结果，如果报错则直接返回该字符串
  get(val) {
    const value = localStorage.getItem(val)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}
// 封装操作token本地存储的
export default new Storage()
