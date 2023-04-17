import axios from 'axios'

// 查询药品列表
export const getDrugList = params => {
  return axios.get('http://localhost:4303/drug', {
    params: { _page: 1, _limit: 10, ...params }
  })
}

// 获取药品详情
export const getDrugInfo = id => {
  return axios.get(`http://localhost:4303/drug/${id}`)
}

// 删除药品
export const delDrug = id => {
  return axios.delete(`http://localhost:4303/drug/${id}`)
}
