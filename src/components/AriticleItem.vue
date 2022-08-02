<template>
  <!-- 无图片 -->
  <van-cell
    :title="articleInfo.title"
    :label="label"
    v-if="articleInfo.cover.type === 0"
  />
  <!-- 单张图片 -->
  <van-cell
    :title="articleInfo.title"
    :label="label"
    v-else-if="articleInfo.cover.type === 1"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>

  <!-- 三张图片 -->
  <van-cell :title="articleInfo.title" :label="label" v-else>
    <template #label>
      <van-image
        width="100"
        height="100"
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        :src="item"
      />
      <p>{{ label }}</p>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const art = this.articleInfo
      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
