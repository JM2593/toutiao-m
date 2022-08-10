<template>
  <div>
    <van-nav-bar
      title="个人信息"
      class="navbar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 修改头像区域 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input type="file" hidden ref="file" @change="selectPhoto" />
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

    <!-- 修改昵称 -->
    <van-cell
      @click="isShowNick = true"
      title="昵称"
      is-link
      :value="userInfo.name"
    />
    <van-popup
      v-model="isShowNick"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateNick
        v-if="isShowNick"
        @changeName="userInfo.name = $event"
      ></UpdateNick>
    </van-popup>

    <!-- 修改性别 -->
    <van-cell
      @click="isShowGender = true"
      title="性别"
      is-link
      :value="genderList[genderIndex]"
    />

    <van-popup
      v-model="isShowGender"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        v-if="isShowGender"
        title="更新性别"
        show-toolbar
        :columns="genderList"
        @confirm="ConfirmGender"
        @cancel="isShowGender = false"
        :default-index="genderIndex"
      />
    </van-popup>

    <!-- 修改生日 -->
    <van-cell @click="isShowBorn = true" title="生日" is-link :value="date" />
    <van-popup
      v-model="isShowBorn"
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-if="isShowBorn"
        swipe-duration="500"
        :value="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthdayConfirm"
        @cancel="isShowBorn = false"
        ref="birthday"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo, uploadGender, uploadBirthday } from '@/api'
import { resolveToBase64 } from '@/utils'
import UpdateAvatar from './UpdateAvatar/UpdateAvatar.vue'
import UpdateNick from './UpdateNick/index.vue'
export default {
  components: { UpdateAvatar, UpdateNick },
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvatar: false,
      isShowNick: false,
      isShowGender: false,
      isShowBorn: false,
      photo: '',
      genderList: ['男', '女'],
      genderIndex: '',
      date: '',
      minDate: new Date(1970, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.data
      this.date = data.data.birthday
      this.genderIndex = data.data.gender
    },
    async selectPhoto(e) {
      // 获取选择文件的文件对象，他是一个数组
      console.log(e.target.files)
      const file = e.target.files[0]
      const url = await resolveToBase64(file)
      this.photo = url
      this.isShowAvatar = true
    },
    async ConfirmGender(val, index) {
      this.genderIndex = index
      await uploadGender(index)
      this.isShowGender = false
    },
    onCancel() {
      this.isShowGender = false
    },
    async birthdayConfirm() {
      this.date = this.$refs.birthday.getPicker().getValues().join('-')
      await uploadBirthday(this.date)
      this.isShowBorn = false
    }
  },
  created() {
    this.getUserInfo()
  },
  computed: {
    currentDate: {
      get() {
        const arr = this.date.split('-')
        arr[1] -= 1
        return new Date(...arr)
      },
      set(val) {
        console.log(val)
      }
    }
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
:deep(.van-picker__toolbar) {
  position: sticky;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
