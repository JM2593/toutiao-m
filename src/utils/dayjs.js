const dayjs = require('dayjs')
require('dayjs/locale/zh-cn')
const relativeTime = require('dayjs/plugin/relativeTime')
// 使用插件
dayjs.extend(relativeTime)
// 转中文
dayjs.locale('zh-cn')

export default dayjs
