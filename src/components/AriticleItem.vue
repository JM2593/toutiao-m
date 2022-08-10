<template>
  <!-- 无图片 -->
  <van-cell :title="articleInfo.title" v-if="articleInfo.cover.type === 0">
    <template #label>
      <p>
        {{ articleInfo.aut_name }} {{ articleInfo.comm_count }}评论
        {{ articleInfo.pubdate | formatDate }}
      </p>
    </template>
  </van-cell>
  <!-- 单张图片 -->
  <van-cell
    :title="articleInfo.title"
    v-else-if="articleInfo.cover.type === 1"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
    <template #label
      ><p>
        {{ articleInfo.aut_name }} {{ articleInfo.comm_count }}评论
        {{ articleInfo.pubdate | formatDate }}
      </p>
    </template>
  </van-cell>

  <!-- 三张图片 -->
  <van-cell :title="articleInfo.title"  v-else>
    <template #label>
      <van-image
        width="100"
        height="100"
        v-for="(item, index) in articleInfo.cover.images"
        :key="index"
        :src="item"
      />
      <p>
        {{ articleInfo.aut_name }} {{ articleInfo.comm_count }}评论
        {{ articleInfo.pubdate | formatDate }}
      </p>
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
  }
}
</script>

<style></style>
