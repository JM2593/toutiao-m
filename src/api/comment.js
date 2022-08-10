import request from '@/utils/request'

export const getCommentList = (type, source, offset, limit) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}
/**
 *
 * @param {String} target 评论的目标文章或者评论
 * @param {String} content 评论的内容
 * @param {String} id 文章id(评论评论时传，评论文章不传)
 * @returns
 */
export const pubComment = (target, content, id) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: id
    }
  })
}
