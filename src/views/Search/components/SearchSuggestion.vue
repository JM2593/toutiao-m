<template>
  <div>
    <van-cell
      v-for="(item, index) in getHighLightSuggestions()"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"> </span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  methods: {
    getSuggestion: debounce(async function () {
      const { data } = await getSearchSuggestion(this.keywords)
      console.log(data)
      //   去除数组中返回的null,undefined值
      this.suggestions = data.data.options.filter(Boolean)
    }, 300),
    getHighLightSuggestions() {
      // 如果想要传变量给正则，可以使用new RegExp(变量,'gi')
      // 字符串.replace(正则/要替换的字符传串，替换的字符串/function(match))
      // match匹配到的字符串
      const reg = new RegExp(this.keywords, 'gi')
      return this.suggestions.map((item) => {
        return item.replace(
          reg,
          (match) => `<span style='color:red;'>${match}</span>`
        )
      })
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler() {
        this.getSuggestion()
      }
    }
  }
}
</script>

<style></style>
