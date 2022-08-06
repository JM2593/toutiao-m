<template>
  <div>
    <van-nav-bar
      title="个人信息"
      class="navbar"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>

    <van-popup
      v-if="isShowAvatar"
      class="avatar_pop"
      closeable
      v-model="isShowAvatar"
    >
      <update-avatar
        @update-avatar="userInfo.photo = $event"
        :isShow.sync="isShowAvatar"
        :photo="photo"
      ></update-avatar>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { resolveToBase64 } from '@/utils'
import UpdateAvatar from './UpdateAvatar/UpdateAvatar.vue'
export default {
  components: { UpdateAvatar },
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvatar: false,
      photo: ''
    }
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.data
      console.log(data)
    },
    async selectPhoto(e) {
      // 获取选择文件的文件对象，他是一个数组
      console.log(e.target.files)
      const file = e.target.files[0]
      // this.isShowAvatar = true
      // 将文件对象转化成img标签src属性可识别的url格式
      // const url = window.URL.createObjectURL(e.target.files[0])
      // console.log(url)
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   console.log(e)
      //   this.photo = e.target.result
      //   // change事件再次点击不显示bug
      //   e.target.value = ''
      //   // 展示弹出层
      //   this.isShowAvatar = true
      // }
      const url = await resolveToBase64(file)
      this.photo = url
      this.isShowAvatar = true
    }
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  .van-nav-bar__content {
    background: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
}
.avatar_pop {
  background-color: #000;
  width: 100%;
  height: 100%;
}
</style>
