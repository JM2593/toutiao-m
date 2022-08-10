import request from '@/utils/request'
/**
 * 获取搜索建议
 * @param {String} q 要搜索的关键字
 * @returns promise
 */
export const getSearchSuggestion = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })

export const getSearchResult = (page, q) =>
  request({
    url: '/v1_0/search',
    params: {
      page,
      q
    }
  })
