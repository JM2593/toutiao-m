<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="黑马头条"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="main">
      <div class="box">
        <header class="title">
          <h1>{{ detail.title }}</h1>
          <van-row class="">
            <van-col :span="4">
              <van-image round width="37" height="37" :src="detail.aut_photo" />
            </van-col>
            <van-col :span="14">
              <p>{{ detail.aut_name }}</p>
              <span>{{ detail.pubdate | formatDate }}</span>
            </van-col>
            <van-col :span="6" class="subscribe">
              <van-button
                :loading="loading"
                v-if="isFollowed"
                @click="tounfollowed"
                size="small"
                round
                >已关注</van-button
              >
              <van-button
                v-else
                :loading="loading"
                @click="followed"
                color="#3296fa"
                size="small"
                round
                >+关注</van-button
              >
            </van-col>
          </van-row>
        </header>
      </div>
      <main>
        <div class="markdown-body" ref="content" v-html="detail.content"></div>
      </main>
      <van-divider>正文结束</van-divider>

      <!-- 评论列表 -->
      <footer>
        <van-list
          v-model="commentloading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          ><comment-list :commentlist="CommentList"></comment-list>
        </van-list>
      </footer>

      <!-- 底部按钮栏 -->
      <van-row class="btnbar">
        <van-col class="write" :span="12">
          <van-button @click="showEditComment" round size="mini"
            >写评论</van-button
          >
        </van-col>
        <van-col :span="3">
          <van-icon name="comment-o" :badge="totalComment" />
        </van-col>
        <van-col :span="3">
          <van-icon
            color="#3296fa"
            name="star"
            @click="toUncollect"
            v-if="is_collected" />
          <van-icon name="star-o" @click="collect" v-else
        /></van-col>
        <van-col :span="3">
          <van-icon
            name="good-job-o"
            @click="likeArt"
            v-if="detail.attitude === -1" />
          <van-icon @click="dislikeArt" color="red" name="good-job" v-else
        /></van-col>
        <van-col :span="3"> <van-icon name="share" /> </van-col>
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

      <van-popup
        @close="$store.commit('SET_REPLY', false)"
        closeable
        close-icon-position="top-left"
        close-icon="arrow-left"
        v-model="$store.state.showReply"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <comment-reply :artId="$route.params.art_id"></comment-reply>
      </van-popup>
    </div>
  </div>
</template>

<script>
import {
  getArticleDetailByIdAPI,
  followedAPI,
  unfollowAPI,
  collectedArticleAPI,
  uncollectArticleAPI,
  likeArticleAPI,
  dislikeArticleAPI,
  getCommentList,
  pubComment
} from '@/api'
import { ImagePreview } from 'vant'
import CommentList from '@/components/CommentList.vue'
import CommentReply from '../Detail/CommentReply/CommentReply.vue'
export default {
  components: { CommentList, CommentReply },
  data() {
    return {
      art_id: this.$route.params.art_id,
      detail: {},
      isFollowed: '',
      is_collected: '',
      CommentList: [],
      loading: false,
      show: false,
      comment_content: '',
      commentloading: false,
      finished: false,
      offset: '',
      limit: 10,
      totalComment: ''
    }
  },
  created() {
    this.getArticleById()
  },
  mounted() {
    this.getComments()
  },
  methods: {
    getImg() {
      const content = this.$refs.content
      const imgs = content.querySelectorAll('img')
      console.log(imgs)
      const images = []
      imgs.forEach((item, index) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: index
          })
        }
      })
    },
    async getArticleById() {
      const { data } = await getArticleDetailByIdAPI(this.art_id)
      this.detail = data.data
      this.isFollowed = data.data.is_followed
      this.is_collected = data.data.is_collected
      setTimeout(() => {
        this.getImg()
      })
    },
    async tounfollowed() {
      this.loading = true
      try {
        this.isFollowed = false
        await unfollowAPI(this.detail.aut_id)
        this.loading = false
      } catch {
        this.$toast.fail('操作失败')
        this.loading = true
      }
    },
    async followed() {
      this.loading = true
      try {
        this.isFollowed = true
        await followedAPI(this.detail.aut_id)
        this.loading = false
      } catch {
        this.$toast.fail('请登录')
        this.loading = true
      }
    },
    async toUncollect() {
      try {
        this.is_collected = false
        await uncollectArticleAPI(this.detail.art_id)
        this.$toast('已取消收藏')
      } catch (error) {
        this.$toast.fail('请登录')
      }
    },
    async collect() {
      try {
        this.is_collected = true
        await collectedArticleAPI(this.detail.art_id)
        this.$toast.success('已添加收藏')
      } catch {
        this.$toast.fail('请登录')
      }
    },
    async likeArt() {
      this.detail.attitude = 1
      await likeArticleAPI(this.detail.art_id)
    },
    async dislikeArt() {
      this.detail.attitude = -1
      await dislikeArticleAPI(this.detail.art_id)
    },
    async getComments() {
      const { data } = await getCommentList('a', this.$route.params.art_id)
      this.offset = data.data.last_id
      this.CommentList = data.data.results
      this.totalComment = data.data.total_count
    },
    async onLoad() {
      const { data } = await getCommentList(
        'a',
        this.$route.params.art_id,
        this.offset,
        this.limit
      )
      this.CommentList.push(...data.data.results)
      if (data.data.last_id !== null) {
        this.offset = data.data.last_id
        this.commentloading = false
      } else {
        this.finished = true
        this.commentloading = false
      }
    },
    async pubcomment() {
      try {
        if (this.comment_content.length) {
          const { data } = await pubComment(
            this.$route.params.art_id,
            this.comment_content
          )
          console.log(data)
          this.CommentList.unshift(data.data.new_obj)
          this.comment_content = ''
          this.$toast.success('发布评论成功')
          this.show = false
        }
      } catch {
        this.$toast.fail('发布评论失败，请重试')
      }
    },
    showEditComment() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  max-height: calc(100vh - 46px - 1.8rem);
  overflow: auto;
}
.box {
  padding: 20px;
}
.markdown-body {
  font-size: 25px;
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.title {
  font-size: 0.28rem;
  color: #3a3a3a;
  h1 {
    margin: 0;
    padding-bottom: 30px;
  }
  .subscribe {
    margin-bottom: 10px;
    .van-button {
      width: 2.333rem;
    }
  }
}
.article-content {
  font-size: 25px;
}
.btnbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 1.17333rem;
  border-top: 0.01333rem solid #d8d8d8;
  background-color: #fff;
  font-size: 40px;
  .write {
    position: relative;
    .van-button {
      width: 300px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      line-height: 1;
    }
  }
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
:deep(.van-popup__close-icon) {
  position: fixed;
}
</style>
