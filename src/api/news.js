import request from '@/utils/request'

/**
 * 获取文章列表
 * @param {Number} channelId 频道id
 * @param {Number} timestamp 当前时间戳
 * @returns
 */
export const getArticleAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}

/**
 * 根据文章id获取文章详情
 * @param {String} artid 文章id
 * @returns promise
 */
export const getArticleDetailByIdAPI = (artid) => {
  return request({
    url: `/v1_0/articles/${artid}`
  })
}
/**
 * 收藏文章
 * @param {String} target 收藏文章的id
 * @returns Promise
 */
export const collectedArticleAPI = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消文章收藏
 * @param {String} target 目标文章id
 * @returns Promise
 */
export const uncollectArticleAPI = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

/**
 * 给文章点赞
 * @param {String} target 目标文章id
 * @returns Promise
 */
export const likeArticleAPI = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消文章点赞
 * @param {String} target 目标文章id
 * @returns Promise
 */
export const dislikeArticleAPI = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
