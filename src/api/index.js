import axios from 'axios'

// 获取药品列表
export const getDrugList = params => {
  return axios.get('http://localhost:4303/drug', {
    params: { _page: 1, _limit: 10, _sort: 'id', _order: 'desc', ...params }
  })
}

// 新增药品
export const addDrug = data => {
  return axios.post(`http://localhost:4303/drug`, data)
}

// 获取药品详情
export const getDrugInfo = id => {
  return axios.get(`http://localhost:4303/drug/${id}`)
}

// 修改药品
export const editDrug = params => {
  return axios.patch(`http://localhost:4303/drug/${params.id}`, params)
}

// 删除药品
export const delDrug = id => {
  return axios.delete(`http://localhost:4303/drug/${id}`)
}

// 获取药品类型列表
export const getCategoryList = () => {
  return axios.get(`http://localhost:4303/category`)
}

// 获取剂型列表
export const getDosageFormList = () => {
  return axios.get(`http://localhost:4303/dosageForm`)
}