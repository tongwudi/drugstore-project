import Vue from 'vue'

Vue.filter('filterPrice', (val) => `￥${val}.00`)