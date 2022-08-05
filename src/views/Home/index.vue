<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template></van-nav-bar
    >
    <van-tabs swipeable v-model="active">
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name"
        ><AriticleList :id="item.id"></AriticleList
      ></van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>

    <van-popup
      v-model="show"
      position="bottom"
      closeable
      close-icon-position="top left"
      :style="{ height: '100%' }"
    >
      <!-- $event=传过来的第一个参数 -->
      <channel-pop-up
        @changeActive="active = $event"
        @delChannel="delChannel"
        @addChannel="addChannel"
        :channelList="myChannels"
      ></channel-pop-up>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel,
  delChannelAPI,
  addChannelAPI,
  setMyChannelToLocal,
  getMyChannelByLocal
} from '@/api'
import AriticleList from './components/AriticleList.vue'
import ChannelPopUp from './components/ChannelPopUp.vue'
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  created() {
    this.initMyChannels()
  },
  methods: {
    initMyChannels() {
      // 如果登陆了则获取用户的频道列表
      if (this.isLogin) {
        this.getChannel()
      } else {
        // 如果没登录，则先查看本地是否有数据，如果本地有频道数据，那么就用本地的，没有就获取默认的频道列表
        const myChannels = getMyChannelByLocal()
        if (myChannels) {
          this.myChannels = myChannels
        } else {
          this.getChannel()
        }
      }
    },
    async getChannel() {
      try {
        const {
          data: { data }
        } = await getMyChannel()
        this.myChannels = data.channels
      } catch (e) {
        console.dir(e)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    // 删除频道，更新视图
    async delChannel(id) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          await delChannelAPI(id)
        } else {
          setMyChannelToLocal(newChannels)
        }
        this.myChannels = newChannels
        this.$toast.success('删除频道成功~')
      } catch {
        this.$toast.fail('删除频道失败')
      }
    },
    async addChannel(channel) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.isLogin) {
          await addChannelAPI(channel.id, this.myChannels.length)
        } else {
          setMyChannelToLocal([...this.myChannels, channel])
        }
        this.myChannels.push(channel)
        this.$toast.success('添加频道成功')
      } catch {
        this.$toast.fail('添加频道失败')
      }
    }
  },
  components: { AriticleList, ChannelPopUp }
}
</script>

<style lang="less" scoped>
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 81px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 1;
  border-bottom: 1px solid #eee;
  z-index: 999;
  position: fixed;
  top: 92px;
  background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}

:deep(.van-popup__close-icon) {
  position: absolute;
  top: 30px;
  left: 30px;
}

:deep(.van-grid-item__content--horizontal
    .van-grid-item__icon
    + .van-grid-item__text) {
  margin-left: -0.01rem;
}
</style>
