<template>
  <div class="app-container">
    <el-row type="flex" align="top" justify="space-between">
      <el-form size="small" :inline="true" :model="formInline">
        <el-form-item label="药品名称">
          <el-input v-model="formInline.drugName" clearable />
        </el-form-item>
        <el-form-item label="适用症状">
          <el-select v-model="formInline.indication" clearable>
            <el-option
              v-for="item in indicationList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="剂型">
          <el-select v-model="formInline.dosageFormId" clearable>
            <el-option
              v-for="item in dosageFormList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button size="small" type="primary" @click="add">新增</el-button>
    </el-row>

    <el-table size="small" v-loading="loading" :data="tableData">
      <el-table-column prop="drugName" label="药品名称" show-overflow-tooltip />
      <el-table-column
        prop="indication"
        label="适用症状"
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
        <template slot-scope="{ row }">
          <el-button size="mini" plain type="primary" @click="edit(row)">
            编辑
          </el-button>
          <el-button size="mini" plain type="danger" @click="del(row)">
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

    <el-dialog width="600px" :title="title" :visible.sync="visible">
      <el-form ref="form" label-width="6em" :model="form" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="药品名称" prop="drugName">
              <el-input v-model="form.drugName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="适用症状" prop="indicationId">
              <el-select
                style="width: 100%"
                v-model="form.indicationId"
                @change="changeindication"
              >
                <el-option
                  v-for="item in indicationList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剂型" prop="dosageFormId">
              <el-select
                style="width: 100%"
                v-model="form.dosageFormId"
                @change="changeDosageForm"
              >
                <el-option
                  v-for="item in dosageFormList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="售价" prop="price">
              <el-input-number
                style="width: 100%"
                v-model="form.price"
                :min="0"
                :precision="2"
                controls-position="right"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格" prop="specifications">
              <el-input v-model="form.specifications" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="批准文号" prop="approval">
              <el-input v-model="form.approval" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="form.manufacturer" />
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
  getDrugList,
  addDrug,
  getDrugInfo,
  editDrug,
  delDrug,
  getindicationList,
  getDosageFormList
} from '@/api/drug'

export default {
  data() {
    return {
      indicationList: [],
      dosageFormList: [],
      formInline: {},
      loading: false,
      tableData: [],
      currentPage: 1,
      total: 0,
      visible: false,
      title: '',
      form: {},
      rules: {
        drugName: [
          { required: true, message: '药品名称不能为空', trigger: 'blur' }
        ],
        indicationId: [
          { required: true, message: '药品分类不能为空', trigger: 'change' }
        ],
        dosageFormId: [
          { required: true, message: '剂型不能为空', trigger: 'change' }
        ],
        price: [{ required: true, message: '售价不能为空', trigger: 'blur' }],
        specifications: [
          { required: true, message: '规格不能为空', trigger: 'blur' }
        ],
        approval: [
          { required: true, message: '批准文号不能为空', trigger: 'blur' }
        ],
        manufacturer: [
          { required: true, message: '生产厂家不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    Promise.all([this.getindicationOption(), this.getDosageFormOption()])
    this.getList()
  },
  methods: {
    async getindicationOption() {
      const res = await getindicationList()
      this.indicationList = res.data
    },
    async getDosageFormOption() {
      const res = await getDosageFormList()
      this.dosageFormList = res.data
    },
    async getList() {
      this.loading = true
      const formInline = Object.keys(this.formInline).reduce((o, n) => {
        o[n + '_like'] = this.formInline[n]
        return o
      }, {})
      const res = await getDrugList({
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
      this.title = '新增药品'
      this.resetForm()
    },
    async edit({ id }) {
      this.visible = true
      this.title = '编辑药品'
      this.resetForm()
      const res = await getDrugInfo(id)
      this.form = res.data
    },
    changeindication(val) {
      const indication = this.indicationList.find(item => item.id === val).name
      this.$set(this.form, 'indication', indication)
    },
    changeDosageForm(val) {
      const dosageForm = this.dosageFormList.find(item => item.id === val).name
      this.$set(this.form, 'dosageForm', dosageForm)
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.form.id) {
            await editDrug(this.form)
            this.$message.success('修改成功')
          } else {
            await addDrug(this.form)
            this.$message.success('新增成功')
          }
          this.visible = false
          this.getList()
        }
      })
    },
    resetForm() {
      if (!this.$refs.form) return;
      this.$refs.form.resetFields()
      this.form = {}
    },
    async del({ id }) {
      this.$confirm('是否删除此数据?', {
        type: 'warning'
      })
        .then(async () => {
          await delDrug(id)
          this.$message.success('删除成功')
          this.getList()
        })
        .catch(() => {})
    }
  }
}
</script>
