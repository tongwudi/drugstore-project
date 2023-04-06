<template>
  <div>
    <el-header class="header" :class="{ fixed }">
      <el-row class="container" type="flex" align="middle">
        <div class="header-left">
          <span class="logo">我的药店</span>

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

        <el-dropdown class="header-right" v-if="isLogin">
          <span>李娇</span>
        </el-dropdown>
        <div class="header-right" v-else>
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
        </div>
      </el-row>
    </el-header>

    <!-- 解决固定定位后高度塌陷问题 -->
    <div class="holder" v-show="fixed" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      menus: [
        { name: '首页', path: '/website' },
        { name: '全部药品', path: '/website/drug/list' },
        { name: '购物车', path: '/website/cart' }
      ],
      fixed: false
    }
  },
  computed: {
    ...mapGetters({ isLogin: 'isWebLogin' })
  },
  created() {
    window.addEventListener('scroll', () => {
      this.fixed = document.documentElement.scrollTop > 0
    })
  }
}
</script>

<style lang="less" scoped>
.holder {
  height: 60px;
}
.header {
  position: relative;
  left: 0;
  right: 0;
  background-color: #fff;
  border-bottom: 1px solid @borderColor;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  &.fixed {
    position: fixed;
  }
  &-left {
    flex: 1;
    display: flex;
    align-items: center;
    .logo {
      font-size: 20px;
      font-weight: bold;
      transition: transform 0.3s;
      // 文字渐变
      background-image: linear-gradient(45deg, orange, green, skyblue);
      background-clip: text;
      color: transparent;
      &:hover {
        transform: scale(1.05);
      }
    }
    .menu {
      margin-left: 60px;
      font-size: 14px;
      display: flex;
      align-items: center;
      &-item {
        text-decoration: none;
        color: @textColor;
        &:hover {
          color: @textActiveColor;
        }
        + .menu-item {
          margin-left: 40px;
        }
      }
      .router-link-active {
        color: @textActiveColor;
        font-weight: bold;
      }
    }
  }
  .login {
    margin-right: 20px;
  }
}
</style>
