<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="确定"
      @click-right="confirmNick"
      @click-left="$parent.$parent.isShowNick = false"
    />
    <van-field
      v-model="name"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { getUserInfo, uploadName } from '@/api'
export default {
  props: {},
  data() {
    return {
      name: ''
    }
  },
  async created() {
    const { data } = await getUserInfo()
    this.name = data.data.name
  },
  methods: {
    async confirmNick() {
      const res = await uploadName(this.name)
      console.log(res)
      this.$emit('changeName', this.name)
      this.$parent.$parent.isShowNick = false
    }
  }
}
</script>

<style></style>
