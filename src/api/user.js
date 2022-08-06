import request from '@/utils/request'

/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns
 */
export const getMobileCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

export const getUserInfo = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}
// 如果传的是对象，axios默认将对象转成json并且加上content-type = application/json
// 如果传的是formData表单,那么axios会将提交给后端,并且默认的加上content-type=mutipart/form-data
// 如果后端要的是表单(formdata)
// const fm = new FormData()
// fm.appen(表单的那么,表单项)

/**
 * 上传头像的
 * @param {*} file 图片的file对象
 * @returns Promise
 */
export const uploadAvatar = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}
