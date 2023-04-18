<template>
  <div class="app-container">
    <el-row type="flex" align="top" justify="space-between">
      <el-form size="small" :inline="true" :model="formInline">
        <el-form-item label="用户昵称">
          <el-input v-model="formInline.nickName" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button size="small" type="primary" @click="add">新增</el-button>
    </el-row>

    <el-table size="small" v-loading="loading" :data="tableData">
      <el-table-column type="selection" align="center" width="60" />
      <el-table-column prop="userName" label="用户名" align="center" />
      <el-table-column prop="nickName" label="用户昵称" align="center" />
      <el-table-column label="状态" align="center" width="120">
        <template #default="{ row }">
          <el-tooltip :content="row.status ? '启用' : '停用'" placement="top">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
              @change="e => changeStatus(e, row.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        width="180"
      />
      <el-table-column fixed="right" label="操作" align="center">
        <template #default="{ row }">
          <el-button size="mini" plain type="primary" @click="edit(row)">
            编辑
          </el-button>
          <el-button size="mini" plain type="danger" @click="del(row)">
            删除
          </el-button>
          <el-button size="mini" plain @click="resetPw(row)">
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :hide-on-single-page="total === 0"
      :current-page="currentPage"
      :total="total"
      @current-change="handleCurrentChange"
    />

    <el-dialog width="420px" :title="title" :visible.sync="visible">
      <el-form ref="form" label-width="6em" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" />
        </el-form-item>
        <el-form-item label="状态">
          <el-tooltip :content="form.status ? '启用' : '停用'" placement="top">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="0"
            />
          </el-tooltip>
        </el-form-item>
        <el-form-item class="diolog-footer">
          <el-button @click="visible = false">关 闭</el-button>
          <el-button type="primary" @click="submit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  addUser,
  getUserInfo,
  editUser,
  delUser
} from '@/api/users'
import { parseTime } from '@/utils/index'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,12}$/.test(value)) {
        callback(new Error('密码必须包含字母和数字, 且长度在6~12位之间'))
      } else {
        callback()
      }
    }
    return {
      formInline: {},
      loading: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      visible: false,
      title: '',
      form: {},
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        status: [{ required: true, message: '状态不能为空', trigger: 'change' }]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const formInline = Object.keys(this.formInline).reduce((o, n) => {
        o[n + '_like'] = this.formInline[n]
        return o
      }, {})
      const res = await getUserList({
        ...formInline,
        _page: this.currentPage
      })
      this.loading = false
      this.tableData = res.data
      this.total = Number(res.headers['x-total-count'])
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    search() {
      this.currentPage = 1
      this.getList()
    },
    add() {
      this.visible = true
      this.title = '新增用户'
      this.resetForm()
    },
    async edit({ id }) {
      this.visible = true
      this.title = '编辑用户'
      this.resetForm()
      const res = await getUserInfo(id)
      this.form = res.data
    },
    async changeStatus(status, id) {
      const params = { id, status }
      await editUser(params)
      this.$message.success('切换成功')
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.form.id) {
            await editUser(this.form)
            this.$message.success('修改成功')
          } else {
            this.$set(this.form, 'status', +!!this.form.status)
            this.$set(this.form, 'createTime', parseTime())
            await addUser(this.form)
            this.$message.success('新增成功')
          }
          this.visible = false
          this.getList()
        }
      })
    },
    resetForm() {
      if (!this.$refs.form) return
      this.$refs.form.resetFields()
      this.form = {}
    },
    async del({ id }) {
      this.$confirm('是否删除此数据?', {
        type: 'warning'
      })
        .then(async () => {
          await delUser(id)
          this.$message.success('删除成功')
          this.getList()
        })
        .catch(() => {})
    },
    async resetPw({ id }) {
      const params = { id, password: '123456' }
      await editUser(params)
      this.$message.success('重置成功')
    }
  }
}
</script>
