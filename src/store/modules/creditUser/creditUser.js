import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

// 接口5-2征信账户

export default {
  state: {
    total: 0,
    list: []
  },
  mutations: {
    [mutations.RESIDENT_USER] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    },
    [mutations.USER_PERSON] (state, payload) {
      state.person = payload.data
    }
  },
  actions: {
    [actions.get.CREDIT_USER] ({ commit }, payload) { // userName
      let link = '/grid/CreditReportAccount/list?pageNum=' + payload.pageNum + '&pageSize=' + payload.pageSize
      if ('userName' in payload) link += '&userName=' + payload.userName
      return axios.get(link).then(({ data }) => {
        commit(mutations.RESIDENT_USER, data)
        return data
      })
    },
    [actions.get.CREDIT_USER_DETAILS] ({ commit }, id) { // userName
      return axios.get('/grid/CreditReportAccount/' + id + '?id=' + id)
    },
    [actions.put.CREDIT_USER] ({ commit }, payload) { // 编辑用户信息
      return axios.put('/grid/CreditReportAccount/' + payload.id, payload)
    },

    [actions.post.CREDIT_USER] (context, payload) { // 添加用户
      return axios.post('/grid/CreditReportAccount', payload)
    },
    [actions.delete.CREDIT_USER] (context, id) { // 删除用户
      return axios.delete('/grid/CreditReportAccount/' + id, id)
    }
  }
}
