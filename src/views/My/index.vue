<template>
  <div>
    <!-- 头部 -->
    <header>
      <div v-if="isLogin">登陆的盒子</div>
      <div v-else>未登录</div>
    </header>

    <!-- main -->
    <main>收藏/历史/小志同学/。。。</main>

    <!-- 底部按钮 -->
    <footer>
      <button @click="logout" v-if="isLogin">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      // !!将后面的值转成布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
