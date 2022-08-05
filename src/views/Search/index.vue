<template>
  <div>
    <!-- van-form用处：苹果手机键盘可以显示搜索按键 -->
    <van-form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </van-form>

    <!-- 搜索建议/结果/历史 -->
    <!-- <search-history></search-history>
    <search-result></search-result>
    <search-suggestion></search-suggestion> -->
    <component :keywords="keywords" :is="componentName"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  components: { SearchHistory, SearchResult, SearchSuggestion },
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  computed: {
    componentName() {
      // 关键字为空显示搜索历史
      if (this.keywords === '') {
        return 'SearchHistory'
      } else if (this.isShowSearchResult) {
        // 按下回车后显示搜索结果
        return 'SearchResult'
      }
      return 'SearchSuggestion' // 有字的时候显示搜索建议
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
