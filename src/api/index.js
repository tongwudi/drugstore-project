import axios from 'axios'

// 查询药品列表
export const getDrugList = params => {
  return axios.get('http://localhost:4303/drug', { params: { _page: 1, _limit: 10, ...params } })
}