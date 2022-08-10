// export * from '@/api/user'
// 从路径下引入所有"按需导出" 的东西，在原封不动的按需暴露出去
// 不包含默认导出的东西

export * from '@/api/user'
export * from '@/api/channel'
export * from '@/api/news'
export * from '@/api/search'
export * from '@/api/comment'

// 引入默认导出的东西，重新起名后按需导出，default(不常用)
// export { default as getUser } from './user'
