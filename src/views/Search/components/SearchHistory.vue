<template>
  <div>
    <van-cell title="搜索历史">
      <div v-if="isShowDel">
        <span @click="$store.commit('SET_HISTORY', [])">全部删除 </span>
        <span @click="isShowDel = false">完成</span>
      </div>
      <div v-else>
        <van-icon name="delete-o" @click="isShowDel = true" />
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, i) in $store.state.searchHistory"
      :key="i"
      @click="$parent.keywords = item"
    >
      <van-icon
        v-show="isShowDel"
        name="delete-o"
        @click.stop="del(i)"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowDel: false
    }
  },
  methods: {
    del(i) {
      const list = this.$store.state.searchHistory
      list.splice(i, 1)
      this.$store.commit('SET_HISTORY', list)
    }
  }
}
</script>

<style></style>
