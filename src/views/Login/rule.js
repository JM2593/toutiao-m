export const mobileRules = [
  {
    required: true,
    message: '请填写手机号'
  },
  {
    pattern: /^1[35789]\d{9}/,
    message: '手机号格式不正确'
  }
]
export const codeRules = [
  { required: true, message: '请填写验证码' },
  { pattern: /^\d{6}$/, message: '请输入6位验证码' }
]
