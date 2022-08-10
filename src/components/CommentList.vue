<template>
  <div>
    <comment-item
      :commentItem="item"
      v-for="(item, index) in commentlist"
      :key="index"
    >
    </comment-item>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
export default {
  components: { CommentItem },
  props: {
    commentlist: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
