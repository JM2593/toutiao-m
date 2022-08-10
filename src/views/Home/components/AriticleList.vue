<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        :finished="isFinished"
        finished-text="没有更多文章咯~"
        :immediate-check="false"
        :error.sync="error"
        error-text="加载失败，点击重试"
        offset="0"
        @load="loadNextPageArticle"
      >
        <AriticleItem
          v-for="item in articleList"
          :articleInfo="item"
          :key="item.art_id"
          @click.native="toDetail(item.art_id)"
        ></AriticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import AriticleItem from '../../../components/AriticleItem.vue'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articleList: [],
      loading: false,
      pre_timestamp: '',
      isFinished: false,
      time: +new Date(),
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPage()
  },
  methods: {
    async getFirstPage() {
      try {
        const {
          data: { data }
        } = await getArticleAPI(this.id, this.time)
        this.articleList = data.results
        this.pre_timestamp = data.pre_timestamp
      } catch (e) {
        console.log(e)
      }
    },
    async loadNextPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        if (timestamp === null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articleList.unshift(...results)
        } else {
          this.articleList.push(...results)
        }
        this.pre_timestamp = timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      }
    },
    toDetail(id) {
      this.$router.push({
        name: 'detail',
        params: {
          art_id: id
        }
      })
    }
  },
  components: { AriticleItem }
}
</script>

<style></style>
