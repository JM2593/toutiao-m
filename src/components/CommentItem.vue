<template>
  <div>
    <van-cell class="item">
      <template #icon>
        <van-image round width="40" height="40" :src="commentItem.aut_photo" />
      </template>
      <template #title>
        <div class="comment-text">
          <p>{{ commentItem.aut_name }}</p>
          <p>{{ commentItem.content }}</p>
          <div class="return">
            <span>{{ commentItem.pubdate | formatDate }}</span>
            <van-button size="mini" round @click="showCommentReply(commentItem)"
              >回复{{ commentItem.reply_count }}</van-button
            >
          </div>
        </div>
      </template>
      <template #right-icon>
        <div><van-icon name="good-job-o" /><span> 赞</span></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    commentItem: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showCommentReply(obj) {
      this.$store.commit('SET_REPLY', true)
      this.$store.commit('SET_COMMENTITEM', obj)
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  .comment-text {
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    .return {
      height: 60px;
      font-size: 20px;
      display: flex;
      align-items: center;
      .van-button {
        width: 100px;
        margin-left: 20px;
      }
    }
  }
}
</style>
