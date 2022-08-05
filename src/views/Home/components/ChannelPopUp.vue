<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        color="red"
        @click="isEdit = !isEdit"
        plain
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.18rem">
      <van-grid-item
        v-for="(item, index) in channelList"
        :key="item.id"
        :text="item.name"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon name="close" v-show="isEdit && item.name !== '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <van-grid direction="horizontal" gutter="0.18rem">
      <van-grid-item
        v-for="item in recommendChannels"
        icon="plus"
        :key="item.id"
        :text="item.name"
        @click="$emit('addChannel', item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
export default {
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels() {
      const { data } = await getAllChannelsAPI()
      console.log(data)
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        // 如果为推荐，则直接return
        if (item.name === '推荐') return
        this.$emit('delChannel', item.id)
      } else {
        this.$parent.$parent.show = false
        this.$emit('changeActive', index)
      }
    },
    addChannel() {}
  },
  props: {
    channelList: {
      type: Array
    }
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter(
        (aitem) => !this.channelList.find((mitem) => aitem.id === mitem.id)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.3333rem;
  .van-button--default {
    width: 104px;
    height: 48px;
  }
  :deep(.mychannel-item) {
    .van-grid-item__icon-wrapper {
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 40px;
      z-index: 100;
    }
    .van-grid-item__text {
      margin-top: 0;
    }
  }
  :deep(.van-grid-item__content) {
    background-color: #eee;
  }
  :deep(.van-icon-plus) {
    font-size: 30px;
  }
}
</style>
