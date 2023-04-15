<template>
  <el-header class="header">
    <el-row type="flex" class="header-left">
      <span class="logo" @click="goHome">我的药店</span>
      <span class="go-website" @click="goWebsite">前台首页</span>
    </el-row>

    <el-row type="flex" class="header-right">
      <el-dropdown v-if="isLogin" trigger="click" @command="handleClick">
        <span class="dropdown-link">
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-link
        v-else
        class="login"
        :underline="false"
        @click="$router.push({ path: '/backend/login' })"
      >
        登录
      </el-link>
    </el-row>
  </el-header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLogin: 'isWebLogin',
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    ...mapMutations(['DELETE_USERINFO']),
    goHome() {
      if (this.$route.path === '/backend') return
      this.$router.push('/backend')
    },
    goWebsite() {
      this.DELETE_USERINFO()
      this.$router.push('/website')
    },
    handleClick(key) {
      switch (key) {
        case 'logout':
          this.DELETE_USERINFO()
          this.$router.push('/backend/login')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: @headerHeight;
  display: flex;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  &-left {
    flex: 1;
    display: flex;
    align-items: center;
    .logo {
      font-size: 24px;
      font-weight: bold;
      transition: transform 0.3s;
      // 文字渐变
      background-image: linear-gradient(45deg, orange, green, skyblue);
      background-clip: text;
      color: transparent;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
    }
    .go-website {
      line-height: 30px;
      margin-left: 15px;
      padding: 0 10px;
      font-weight: bold;
      border-radius: 4px;
      background-color: #ff9900;
      color: #000;
      cursor: pointer;
    }
  }
  &-right {
    .dropdown-link {
      line-height: @headerHeight;
      cursor: pointer;
    }
  }
}
</style>
