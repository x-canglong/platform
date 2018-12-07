import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

export default {
  state: {
    total: 0,
    list: [],
    person: {}
  },
  mutations: {
    [mutations.WORKBENCH_LIST] (state, payload) {
      state.total = payload.count
    }
  },
  actions: {
    [actions.get.WORKBENCH_LIST] ({ commit }, userData) {
      let link = 'platform/info/list?pageNum=' + userData.pageNum + '&pageSize=' + userData.pageSize + '&accountId=' + userData.accountId
      if ('startTime' in userData) link += '&startTime=' + userData.startTime
      if ('endTime' in userData) link += '&endTime=' + userData.endTime
      if ('type' in userData && userData.type !== '0') link += '&type=' + userData.type
      if ('status' in userData && userData.status !== '0') link += '&status=' + userData.status
      return axios.get(link).then(({ data }) => {
        commit(mutations.WORKBENCH_LIST, data)
        return data
      })
    }
  }
}
