<template>
  <el-header class="header">
    <el-row class="container" type="flex" align="middle">
      <div class="header-left">
        <span class="logo" @click="goHome">我的药店</span>

        <div class="menu">
          <router-link
            class="menu-item"
            v-for="item in menus"
            :key="item.path"
            :to="item.path"
            exact
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>

      <div class="header-right">
        <el-dropdown v-if="isLogin" trigger="click" @command="handleClick">
          <span class="dropdown-link">
            {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>个人中心</el-dropdown-item> -->
            <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-row v-else type="flex">
          <el-link
            class="login"
            :underline="false"
            @click="$router.push({ path: '/website/login' })"
          >
            登录
          </el-link>
          <el-button
            class="register"
            size="mini"
            type="primary"
            @click="$router.push({ path: '/website/register' })"
          >
            注册
          </el-button>
        </el-row>
      </div>
    </el-row>
  </el-header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      menus: [
        { name: '首页', path: '/website' },
        { name: '全部药品', path: '/website/drug/all' },
        { name: '购物车', path: '/website/cart' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      isLogin: 'isLogin',
      userInfo: 'getUserInfo'
    })
  },
  methods: {
    ...mapMutations(['DELETE_USERINFO']),
    goHome() {
      if (this.$route.path === '/website') return
      this.$router.push('/website')
    },
    handleClick(key) {
      switch (key) {
        case 'logout':
          this.DELETE_USERINFO()
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: @headerHeight!important;
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
    .menu {
      margin-left: 70px;
      display: flex;
      align-items: center;
      &-item {
        text-decoration: none;
        color: @textColor;
        &:hover {
          color: @textActiveColor;
        }
        + .menu-item {
          margin-left: 45px;
        }
      }
      .router-link-active {
        color: @textActiveColor;
        font-weight: bold;
      }
    }
  }
  &-right {
    .dropdown-link {
      display: block;
      line-height: @headerHeight;
      cursor: pointer;
    }
    .register {
      margin-left: 20px;
    }
  }
}
</style>
