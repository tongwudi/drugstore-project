<template>
  <div class="drug-all">
    <el-form
      ref="form"
      label-width="100px"
      label-position="left"
      label-suffix=":"
      :model="form"
    >
      <el-form-item
        v-for="(item, index) in items"
        :key="index"
        :label="item.label"
        :prop="'radio' + [index]"
      >
        <el-radio-group v-model="form['radio' + [index]]">
          <el-row type="flex" style="flex-wrap: wrap">
            <el-radio
              v-for="(v, i) in item.children"
              :key="i"
              :disabled="i % 3 === 0"
              :label="v.label"
            >
              {{ v.label }}
            </el-radio>
          </el-row>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button size="small" @click="reset('form')">重置搜索</el-button>
      </el-form-item>
    </el-form>

    <el-row class="pagination" type="flex" justify="end" align="middle">
      <el-pagination background layout="prev, pager, next" :total="total" />
    </el-row>

    <drug-list />
  </div>
</template>

<script>
import DrugList from '@/components/DrugList'

export default {
  components: { DrugList },
  data() {
    return {
      form: {},
      items: [
        {
          label: '产品分类',
          children: [
            { label: '感冒' },
            { label: '肠胃痉挛' },
            { label: '止泻' },
            { label: '抗过敏' },
            { label: '外用消毒' },
            { label: '外用治痛' },
            { label: '减肥' },
            { label: '止咳化痰' },
            { label: '其他常备' }
          ]
        },
        {
          label: '厂家选择',
          children: [
            { label: '广东xx' },
            { label: '广西xx' },
            { label: '山东xx' },
            { label: '山西xx' },
            { label: '河南xx' },
            { label: '河北xx' },
            { label: '湖南xx' },
            { label: '湖北xx' }
          ]
        },
        {
          label: '品牌选择',
          children: [
            { label: '品牌1' },
            { label: '品牌2' },
            { label: '品牌3' },
            { label: '品牌4' },
            { label: '品牌5' },
            { label: '品牌6' }
          ]
        },
        {
          label: '剂型选择',
          children: [
            { label: '片剂' },
            { label: '颗粒' },
            { label: '合剂' },
            { label: '胶囊' },
            { label: '乳膏' },
            { label: '糖浆' },
            { label: '口服溶剂' }
          ]
        }
      ],
      total: 50
    }
  },
  methods: {
    reset(formName) {
      this.$refs[formName].resetFields()
      this.form = {}
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  border: 1px solid @borderColor;
  padding: 12px 20px;
}
.el-form-item {
  margin-bottom: 0;
}
.el-radio {
  line-height: 40px;
}
::v-deep {
  .el-radio__input {
    display: none;
  }
  .el-radio__label {
    padding-left: 0;
  }
}

.pagination {
  margin: 20px 0;
  padding: 8px;
  background-color: #f4f4f4;
}
</style>
