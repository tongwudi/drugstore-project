<template>
  <div class="app-container">
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

    <el-table size="small" :data="tableData">
      <el-table-column prop="drugName" label="药品名称" />
      <el-table-column
        prop="indications"
        label="药品分类"
        width="150"
        align="center"
      />
      <el-table-column prop="dosageForm" label="剂型" width="150" />
      <el-table-column prop="price" label="售价" width="120" />
      <el-table-column prop="manufacturer" label="生产厂家" />
    </el-table>

    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :hide-on-single-page="total === 0"
      :page-size="10"
      :current-page="currentPage"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getDrugList } from '@/api/index'

export default {
  data() {
    return {
      formInline: {},
      tableData: [],
      currentPage: 1,
      total: 0
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await getDrugList({ ...this.formInline })
      this.tableData = res.data
      this.total = Number(res.headers['x-total-count'])
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    search() {}
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 15px;
}
</style>
