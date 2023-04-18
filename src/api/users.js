import axios from 'axios'

// 获取用户列表
export const getUserList = params => {
  return axios.get('http://localhost:4303/users', {
    params: { _page: 1, _limit: 10, _sort: 'id', _order: 'desc', ...params }
  })
}

// 获取用户详情
export const getUserInfo = id => {
  return axios.get(`http://localhost:4303/users/${id}`)
}

// 新增用户
export const addUser = data => {
  return axios.post(`http://localhost:4303/users`, data)
}

// 修改用户
export const editUser = params => {
  return axios.patch(`http://localhost:4303/users/${params.id}`, params)
}

// 删除用户
export const delUser = id => {
  return axios.delete(`http://localhost:4303/users/${id}`)
}
