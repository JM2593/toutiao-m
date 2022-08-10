<template>
  <div class="userpannel">
    <!-- 头部 -->
    <header>
      <div class="back" v-if="isLogin">
        <div class="usericon">
          <div class="user"><img :src="userInfo.photo" alt="" /></div>
          <span>{{ userInfo.name }}</span>
          <button class="edit" @click="$router.push('/user')">编辑资料</button>
        </div>
        <van-grid :border="false" class="about">
          <van-grid-item icon="photo-o" text="头条">
            <template #icon>
              <span class="">0</span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="粉丝">
            <template #icon>
              <span class="">0</span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="关注">
            <template #icon>
              <span class="">0</span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="获赞">
            <template #icon>
              <span class="">0</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div v-else>
        <div class="back">
          <div class="logouticon">
            <div class="iconBox">
              <img
                @click="$router.push('/login')"
                src="@/assets/images/mobile.png"
                alt=""
              />
            </div>
            <div class="register">
              <p>登录/注册</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- main -->
    <main>
      <div class="favorite interval">
        <van-grid column-num="2">
          <van-grid-item icon="photo-o" text="收藏">
            <template #icon>
              <span
                class="toutiao toutiao-shoucang1"
                style="font-size: 0.6rem; color: #eb5253"
              ></span>
            </template>
          </van-grid-item>
          <van-grid-item icon="photo-o" text="历史">
            <template #icon>
              <span
                class="toutiao toutiao-lishi1"
                style="font-size: 0.6rem; color: #eb5253"
              ></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 消息通知、小智同学 -->
      <div class="message interval">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <!-- 底部按钮 -->
    <footer class="logout">
      <van-cell v-if="isLogin" @click="logout" clickable>
        <span style="color: red; width: 100%; text-align: center">退出</span>
      </van-cell>
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      // !!将后面的值转成布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  async created() {
    const {
      data: { data }
    } = await getUserInfo()
    console.log(data)
    this.userInfo = data
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="less">
.userpannel {
  background-color: #f5f7f9;
  height: 16.5333rem;
}
.back {
  height: 400px;
  background: url('@/assets/images/banner.png');
  overflow: hidden;
  .usericon {
    display: flex;
    color: #fff;
    padding: 0 40px;
    margin-top: 116px;
    font-size: 35px;
    justify-content: space-between;
    align-items: center;
    .user {
      width: 150px;
      height: 150px;
      border: 1px solid #fff;
      background-color: transparent;
      overflow: hidden;
      border-radius: 50%;
      img {
        width: 100%;
      }
    }
    span {
      margin-right: 100px;
      font-size: 30px;
    }
    .edit {
      color: #000;
      width: 140px;
      height: 50px;
      font-size: 20px;
      border-radius: 20px;
      border-color: #fff;
    }
  }
}
.about {
  font-size: 30px;
  :deep(.van-grid-item) {
    .van-grid-item__content {
      color: #fff;
      background-color: transparent;
      .van-grid-item__text {
        color: #fff;
      }
    }
  }
}
.interval {
  margin-bottom: 10px;
}
.logout {
  :deep(.van-cell__value) {
    text-align: center;
  }
}
.logouticon {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .iconBox {
    width: 132px;
    height: 132px;
    img {
      width: 100%;
    }
  }
  .register {
    font-size: 30px;
    color: #fff;
    margin-top: 20px;
  }
}
</style>
