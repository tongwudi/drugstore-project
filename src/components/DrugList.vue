<template>
  <el-row class="drug-list" :gutter="20">
    <el-col class="drug-item" :span="6" v-for="item in list" :key="item.id">
      <div class="drug-item-box" @click="goDetail">
        <el-image :src="url"></el-image>
        <div class="info">
          <div class="info-name">{{ item.drugName }}</div>
          <div class="info-specification">{{ item.specification }}</div>
          <div class="info-price">{{ item.price | filterPrice }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    list: []
  },
  data() {
    return {
      url: require('@/assets/drug.jpeg')
    }
  },
  methods: {
    goDetail() {
      this.$router.push({ path: '/website/drug/detail' })
    }
  }
}
</script>

<style lang="less" scoped>
.drug-list {
  padding: 0 10px;
}
.drug-item {
  &:not(:nth-child(-n + 4)) {
    margin-top: 20px;
  }
  &-box {
    padding: 10px;
    border: 1px solid @borderColor;
    transition: transform 0.2s;
    cursor: pointer;
    &:hover {
      transform: scale(1.03);
    }
    .info {
      line-height: 20px;
      font-size: 14px;
      margin-top: 5px;
      &-name {
        color: #000;
      }
      &-specification {
        font-size: 12px;
        margin: 5px 0;
        color: @secondaryTextColor;
      }
      &-price {
        color: #e50000;
      }
    }
  }
}
</style>
