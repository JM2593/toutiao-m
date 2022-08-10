<template>
  <div class="box">
    <van-nav-bar class="title">
      <template #title>
        <span v-if="$store.state.commentitem.reply_count === 0">没有回复</span>
        <span v-else>{{ $store.state.commentitem.reply_count }}条回复</span>
      </template>
    </van-nav-bar>
    <div class="comment">
      <comment-item :commentItem="$store.state.commentitem"></comment-item>
      <van-cell class="allreplytitle" border value="全部回复" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment-item
          :commentItem="item"
          v-for="(item, index) in commentReplyList"
          :key="index"
        ></comment-item>
      </van-list>
    </div>
    <van-row class="pub">
      <van-button type="info" @click="show = true" round size="large"
        >评论</van-button
      >
    </van-row>
    <van-popup v-model="show" position="bottom" :style="{ height: '20%' }">
      <div class="comment-post">
        <van-field
          class="comment-input"
          v-model.trim="comment_content"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入评论"
          show-word-limit
        />
        <span
          @click="pubcomment"
          :style="{ color: comment_content.length ? '#6ba3d8' : '#b5d1ec' }"
          >发布</span
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getCommentList, pubComment } from '@/api'
import CommentItem from '@/components/CommentItem.vue'
export default {
  components: { CommentItem },
  props: {
    artId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      commentItem: this.$store.state.commentitem,
      commentReplyList: [],
      loading: false,
      finished: false,
      offset: '',
      limit: 10,
      comment_content: '',
      show: false
    }
  },
  async created() {
    try {
      const { data } = await getCommentList('c', this.commentItem.com_id)
      console.log(data)
      this.commentReplyList = data.data.results
      this.offset = data.data.last_id
    } catch {
      this.$toast.fail('获取列表失败，请刷新')
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getCommentList(
        'c',
        this.$route.params.art_id,
        this.offset,
        this.limit
      )
      this.commentReplyList.push(...data.data.results)
      if (data.data.last_id !== null) {
        this.offset = data.data.last_id
        this.loading = false
      } else {
        this.finished = true
        this.loading = false
      }
    },
    async pubcomment() {
      try {
        const { data } = await pubComment(
          this.commentItem.com_id,
          this.comment_content,
          this.artId
        )
        console.log(data)
        this.commentReplyList.unshift(data.data.new_obj)
        this.commentItem.reply_count++
        this.$store.commit('SET_COMMENTITEM', this.commentItem)
        this.show = false
        this.comment_content = ''
      } catch {
        this.$toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.allreplytitle {
  margin: 0 10px;
  border-bottom: 0.5px solid #eee;
  border-top: 0.5px solid #eee;
}
:deep(.title) {
  position: fixed;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  .van-nav-bar__title {
    width: 240px;
  }
}
.comment {
  margin: 100px 0 110px;
}
.pub {
  position: fixed;
  padding: 0 20px 0 20px;
  bottom: 0;
  left: 0;
  height: 110px;
  width: 95%;
  background-color: #fff;
}
.comment-post {
  height: 100%;
  display: flex;
  padding: 0 20px;
  justify-content: space-around;
  align-items: center;
  .comment-input {
    background-color: #eee;
    width: 85%;
  }
  span {
    font-size: 20px;
    color: #6ba3d8;
  }
}
</style>
