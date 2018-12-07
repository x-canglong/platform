import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

export default {
  state: {
    gridtotal: 0,
    gridlist: [],
    gridperson: {},
    gridNameList: []
  },
  mutations: {
    [mutations.GRID_PERSON] (state, payload) {
      if (payload.data) {
        state.gridperson = payload.data
      } else {
        state.gridperson = {}
      }
    },
    [mutations.GRID_LIST] (state, payload) {
      state.gridtotal = payload.count
      state.gridlist = payload.data
    },
    [mutations.GRIDNAME_LIST] (state, payload) {
      state.gridNameList = payload.data
    }
  },
  actions: {
    [actions.get.GRID_LIST] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/gridinfo/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&accountId=` + user.accountId
      link = link + '&roleId=' + user.roles[0].roleId + '&orgCode=' + user.orgCode
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      if ('gridName' in payload) link += '&gridName=' + payload.gridName
      return axios.get(link).then(({ data }) => {
        commit(mutations.GRID_LIST, data)
        return data
      })
    },
    [actions.get.GRID_PERSON] ({ commit }, idNumber) {
      return axios.get('/gridinfo/' + idNumber).then(({ data }) => {
        commit(mutations.GRID_PERSON, data)
        return data
      })
    },
    [actions.delete.GRID_PERSON] (context, id) {
      return axios.delete('/gridinfo/' + id)
    },
    [ actions.put.GRID_PERSON ] (context, payload) {
      return axios.put('/gridinfo/' + payload.gridCode, payload)
    },
    [ actions.post.GRID_PERSON ] (context, payload) {
      return axios.post('/gridinfo', payload)
    },
    [actions.get.GRID_MAP] ({ commit }, gridCode) {
      return axios.get('/gridmap/' + gridCode).then(({ data }) => {
        return data
      })
    },
    [actions.get.GRIDNAME_LIST] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = user.roles[0].roleId
      let link = '/gridinfo/list/account?accountId=' + user.accountId +
          '&roleId=' + roleId + '&orgCode=' + user.orgCode
      return axios.get(link).then(({ data }) => {
        // commit(mutations.GRIDNAME_LIST, data)
        return data
      })
    }
  }
}
