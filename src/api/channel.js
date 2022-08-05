import request from '@/utils/request'
import storage from '@/utils/storage'
/**
 * 获取用户频道
 * @returns Promise
 */
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取全部频道
 * @returns Promise
 */
export const getAllChannelsAPI = () =>
  request({
    url: '/v1_0/channels'
  })

/**
 * 删除频道
 * @param {*} target 频道id
 * @returns Promise
 */
export const delChannelAPI = (target) =>
  request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })

export const addChannelAPI = (id, seq) =>
  request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })

const hmttLocalChannel = 'HEIMATOUTIAO_MY_CHANNELS'
export const setMyChannelToLocal = (channels) => {
  storage.set(hmttLocalChannel, channels)
}

export const getMyChannelByLocal = () => {
  return storage.get(hmttLocalChannel)
}
