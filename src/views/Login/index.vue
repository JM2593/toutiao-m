<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar title="登录" />

    <!-- 表单区域 -->
    <van-form class="form" ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="codebtn"
            size="mini"
            round
            native-type="button"
            @click="sendCode"
            v-if="isShowCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format=" ss 秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
import { login, getMobileCode } from '@/api'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit(values) {
      this.loading()
      try {
        const {
          data: { data }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', data)
        this.$router.push('/profile')
        this.$toast.success('登陆成功')
      } catch (e) {
        const status = e.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.loginForm.validate('mobile').then(async () => {
        try {
          this.loading()
          await getMobileCode(this.mobile)
          this.$toast.success('获取验证码成功')
        } catch (e) {
          const status = e.response.status
          let message = '手机号格式不对'
          if (status === 429) {
            message = e.response.data.message
          }
          this.$toast.fail(message)
        }
        this.isShowCode = false
      })
    }
  }
}
</script>

<style scoped lang="less">
// scoped只对当前组件样式生效，不能修改其他组件的样式
// 当需要修改其他组件内部样式是使用样式穿透
// 用法：:deep(需要修改组件内部样式的类名)
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

.toutiao {
  font-size: 40px;
}
:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-field__value {
    flex: 20;
  }
}
:deep(.codebtn) {
  &.van-button--mini {
    padding: 0 0.16rem;
  }
  &.van-button--default {
    background: #eee;
    color: #a9929b;
  }
}
</style>
