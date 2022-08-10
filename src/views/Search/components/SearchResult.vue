<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell
        :value="item.title"
        v-for="(item, i) in searchResultList"
        :key="i"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      searchResultList: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResult(this.page, this.keywords)
        this.searchResultList.push(...data.data.results)
        const length = data.data.results.length
        this.loading = false
        if (length > 0) {
          this.page++
        } else {
          this.finished = true
        }
      } catch {
        this.error = true
      }
    }
  }
}
</script>

<style></style>
