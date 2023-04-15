<template>
  <div class="register">
    <div class="register-box">
      <div class="big-title">我的药店</div>

      <el-form
        ref="registerForm"
        :model="form"
        :rules="rules"
        label-width="6em"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" clearable />
        </el-form-item>
        <!-- <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="form.email"/>
        </el-form-item> -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" clearable />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" clearable />
        </el-form-item>
        <el-form-item>
          <el-button class="block" type="primary" @click="register">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const validator = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      rules: {
        username: [{ required: true, message: '用户名必填', trigger: 'blur' }],
        password: [{ required: true, message: '密码必填', trigger: 'blur' }],
        checkPass: [{ required: true, validator, trigger: 'blur' }]
      }
    }
  },
  methods: {
    register() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          console.log(valid)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  height: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(45deg, orange, green, skyblue);
}
.register-box {
  width: 420px;
  padding: 25px 50px;
  background-color: #fff;
  border: 1px solid @borderColor;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  .block {
    width: calc(100% - 6em);
  }
}
</style>
