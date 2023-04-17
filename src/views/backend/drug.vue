<template>
  <div class="app-container">
    <el-row type="flex" align="top" justify="space-between">
      <el-button size="small" type="primary" @click="add"> 新增 </el-button>
      <el-form size="small" :inline="true" :model="formInline">
        <el-form-item label="药品名称">
          <el-input v-model="formInline.drugName" placeholder="药品名称" />
        </el-form-item>
        <el-form-item label="药品分类">
          <el-select v-model="formInline.indications" placeholder="药品分类">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-table size="small" :data="tableData">
      <el-table-column prop="drugName" label="药品名称" show-overflow-tooltip />
      <el-table-column
        prop="indications"
        label="药品分类"
        width="150"
        align="center"
      />
      <el-table-column prop="dosageForm" label="剂型" width="150" />
      <el-table-column prop="price" label="售价" width="120" />
      <el-table-column
        prop="manufacturer"
        label="生产厂家"
        show-overflow-tooltip
      />
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="{ row, $index }">
          <el-button size="mini" plain type="primary" @click="edit(row)">
            编辑
          </el-button>
          <el-button size="mini" plain type="danger" @click="del($index)">
            删除
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

    <el-dialog
      width="400px"
      :visible.sync="visible"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <el-form ref="form" label-width="6em" :model="form" :rules="rules">
        <el-form-item label="'药品名称" prop="drugName">
          <el-input v-model="form.drugName" />
        </el-form-item>
        <el-form-item label="药品分类" prop="indications">
          <el-select
            style="width: 100%"
            v-model="form.indications"
            placeholder="请选择药品分类"
          >
            <el-option value="1" label="fdf" />
          </el-select>
        </el-form-item>
        <el-form-item label="剂型" prop="dosageForm">
          <el-select
            style="width: 100%"
            v-model="form.dosageForm"
            placeholder="请选择剂型"
          >
            <el-option value="1" label="fdf" />
          </el-select>
        </el-form-item>
        <el-form-item label="售价" prop="price">
          <el-input-number
            style="width: 100%"
            v-model="form.price"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="form.manufacturer" />
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button @click="visible = false">关 闭</el-button>
          <el-button type="primary" @click="submit">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDrugList, getDrugInfo, delDrug } from '@/api/index'

export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      currentPage: 1,
      total: 0,
      visible: false,
      form: {},
      rules: {
        drugName: [
          { required: true, message: '药品名称不能为空', trigger: 'change' }
        ],
        indications: [
          { required: true, message: '药品分类不能为空', trigger: 'change' }
        ],
        dosageForm: [
          { required: true, message: '剂型不能为空', trigger: 'change' }
        ],
        price: [{ required: true, message: '售价不能为空', trigger: 'blur' }],
        manufacturer: [
          { required: true, message: '生产厂家不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getDrugList({
        ...this.formInline,
        _page: this.currentPage
      })
      this.tableData = res.data
      this.total = Number(res.headers['x-total-count'])
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    search() {},
    add() {
      this.visible = true
      this.resetForm()
    },
    async edit(row) {
      this.visible = true
      this.resetForm()
      const res = await getDrugInfo(row.id)
      this.form = res.data
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
        }
      })
    },
    resetForm() {
      if (!this.$refs.form) return
      this.$refs.form.resetFields()
      this.form = {}
    },
    async del(row) {
      this.$confirm('是否删除此数据?', {
        type: 'warning'
      })
        .then(async () => {
          await delDrug(row.id)
          this.$message.success('删除成功')
          this.getList()
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 15px;
}
</style>
