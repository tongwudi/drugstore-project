<template>
  <div class="login">
    <div class="login-box">
      <div class="big-title">我的药店</div>

      <el-form ref="loginForm" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="block" type="primary" @click="login">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <el-row class="tips" type="flex" justify="space-between">
        <span>
          还没有账号，前往
          <el-link
            type="primary"
            @click="$router.push({ path: '/website/register' })"
          >
            注册
          </el-link>
        </span>
        <el-link type="primary">忘记密码</el-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '账号必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const { username, password } = this.form
          if (username != 'lijiao' && password != '123456') {
            this.$message.error('没有此账号！')
            return
          }
          const userInfo = {
            ...this.form,
            name: '李娇'
          }
          this.SET_USERINFO(userInfo)
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(45deg, orange, green, skyblue);
}
.login-box {
  width: 420px;
  padding: 25px 50px;
  background-color: #fff;
  border: 1px solid @borderColor;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .block {
    width: 100%;
  }
  .tips {
    font-size: 12px;
    color: @textColor;
  }
}
.el-link {
  font-size: 12px;
  vertical-align: baseline;
}
</style>
