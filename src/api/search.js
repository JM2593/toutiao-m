import request from '@/utils/request'

export const getSearchSuggestion = (q) =>
  request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
