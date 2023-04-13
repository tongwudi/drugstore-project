<template>
  <div class="cart">
    <el-table
    style="width: 100%"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center" width="55" />
      <el-table-column prop="date" label="药品图片">
        <template slot-scope="scope">
          <el-image class="image" :src="url"></el-image>
        </template>
      </el-table-column>
      <el-table-column label="药品信息">
        <template slot-scope="scope">
          <div>肠胃宁片</div>
          <div>规格：8丸*15袋</div>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="{ row }">
          <span class="price">{{ row.price | filterPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" width="160">
        <template slot-scope="{ row }">
          <el-input-number size="mini" v-model="row.number" />
        </template>
      </el-table-column>
      <el-table-column label="小计" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price * row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="90">
        <template slot-scope="{ row, $index }">
          <el-button size="small" type="text" @click="del($index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row v-if="tableData.length > 0" type="flex" justify="space-between">
      <div class="amount">
        <span>
          已选中<i> {{ multipleSelection.length }} </i>种药品
        </span>
        <span>
          合计：<i>{{ total | filterPrice }}</i>
        </span>
      </div>
      <el-button
        type="danger"
        @click="goPay"
        :disabled="multipleSelection.length <= 0"
      >
        立即付款
      </el-button>
    </el-row>
    <el-row v-else style="text-align: center">
      <el-button type="danger" @click="goDrugList">去挑选</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: require('@/assets/drug.jpeg'),
      tableData: [{ price: 13, number: 3 }],
      multipleSelection: []
    }
  },
  filters: {
    filterPrice(val) {
      return `￥${val}.00`
    }
  },
  computed: {
    total() {
      const num = this.multipleSelection.reduce((a, v) => {
        return a + v.price * v.number
      }, 0)
      return num
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    del(idx) {
      this.tableData.splice(idx, 1)
    },
    goPay() {
      this.$router.push({ path: '/website/pay' })
    },
    goDrugList() {
      this.$router.push({ path: '/website/drug/all' })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 20px;
}
.amount {
  font-size: 14px;
  i {
    font-size: 16px;
    font-style: inherit;
    color: #e50000;
  }
}
</style>
