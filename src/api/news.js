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
