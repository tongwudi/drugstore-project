<template>
  <div class="pay">
    <el-divider content-position="left">1.选择收货地址</el-divider>
    <el-row class="address-list" :gutter="20">
      <el-col
        class="address"
        :class="{ active: activeIndex === index }"
        :span="6"
        v-for="index in 5"
        :key="index"
      >
        <el-card
          header="卡片名称"
          shadow="hover"
          @click.native="changeAddress(index)"
        >
          <div class="address-info">
            <div class="info-nicknamn">乱世佳人</div>
            <div class="info-name">
              <span>收货人：</span>
              <span>李娇</span>
            </div>
            <div class="info-phone">
              <span>联系方式：</span>
              <span>150xxxxxxxx</span>
            </div>
            <div class="info-btns">
              <el-tag size="small" type="warning" v-if="index === 1">
                默认地址
              </el-tag>
              <el-link type="warning" :underline="false"> 修改地址 </el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider content-position="left">2.确认订单信息</el-divider>
    <el-table style="width: 100%" :data="tableData">
      <el-table-column prop="date" label="药品图片" align="center">
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
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="小计" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.price * row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="90">
        <template slot-scope="scope">
          <el-button size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider content-position="left">3.提交订单</el-divider>
    <el-row type="flex" justify="space-between">
      <el-form inline label-suffix=":">
        <el-form-item label="订单备注">
          <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div class="order">
        <div class="amount">
          <span>共<i> 1 </i>种药品</span>
          <span>
            合计：<i>{{ 8 | filterPrice }}</i>
          </span>
        </div>
        <span>
          运费：<i>{{ 8 | filterPrice }}</i>
        </span>
        <span class="money">
          付款金额：<i>{{ 16 | filterPrice }}</i>
        </span>
      </div>
    </el-row>
    <el-row style="text-align: right">
      <el-button type="danger" @click="paymentNow">立即结算</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      url: require('@/assets/drug.jpeg'),
      tableData: [{ price: 13, number: 3 }]
    }
  },
  methods: {
    changeAddress(idx) {
      this.activeIndex = idx
    },
    paymentNow() {
      this.$message.success('付款成功')
      this.$router.push({ path: '/website' })
    }
  }
}
</script>

<style lang="less" scoped>
.address-list {
  padding: 0 20px;
}
::v-deep {
  .el-card__header,
  .el-card__body {
    padding: 10px 15px;
  }
}
.el-card {
  position: relative;
  cursor: pointer;
}
.active .el-card::before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  border: 3px dashed @borderActiveColor;
  border-radius: 8px;
  box-sizing: border-box;
}
.address {
  &:not(:nth-child(-n + 4)) {
    margin-top: 15px;
  }
  &-info {
    font-size: 12px;
    line-height: 20px;
    color: @secondaryTextColor;
    .info-name,
    .info-phone {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info-btns {
      line-height: 24px;
      margin-top: 10px;
      display: flex;
    }
    .el-link {
      font-size: 12px;
      margin-left: auto;
    }
  }
}
.image {
  width: 120px;
}
.order {
  display: flex;
  flex-direction: column;
  line-height: 24px;
  font-size: 14px;
  color: @textColor;
  .amount {
    margin-bottom: 8px;
  }
  .money {
    margin-top: 8px;
    margin-bottom: 15px;
  }
  i {
    font-size: 16px;
    font-style: inherit;
    color: #e50000;
  }
}
</style>
