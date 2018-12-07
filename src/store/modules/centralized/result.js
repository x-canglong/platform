import axios from '../../axios'
import actions from '../../action-types'
import mutations from '../../mutation-types'

export default {
  state: {
    resulttotal: 0,
    resultlist: [],
    resultperson: {}
  },
  mutations: {
    [mutations.RESULT_PERSON] (state, payload) {
      state.resultperson = payload.data
    },
    [mutations.RESULT_LIST] (state, payload) {
      if (payload.code === 200) {
        state.resulttotal = payload.count
        /* let user = JSON.parse(sessionStorage.getItem('userObj'))
        for (var i in payload.data) {
          if ((payload.data[i].approvalStatus === '1' || payload.data[i].attachFlag !== '1.1') && user.roles[0].roleId === 1) {
            payload.data[i]._disabled = true
          }
          if (payload.data[i].approvalStatus === '4' && user.roles[0].roleId === 2) {
            payload.data[i]._disabled = true
          }
        } */
        state.resultlist = payload.data
      } else {
        state.resulttotal = 0
      }
    },
    [mutations.APPROVAL_LIST] (state, payload) {
      state.resulttotal = payload.count
      state.resultlist = payload.data
    }
  },
  actions: {
    [actions.get.RESULT_LIST] ({ commit }, payload) {
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      let link = `/customer/creditdetail/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&roleId=` + user.roles[0].roleId + `&orgCode=` + user.orgCode + `&accountId=` + user.accountId + `&approvalStatus=` + payload.approvalStatus
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if ('gridCode' in payload) link += '&gridCode=' + payload.gridCode
      if ('attachFlag' in payload) link += '&attachFlag=' + payload.attachFlag
      return axios.get(link).then(({ data }) => {
        commit(mutations.RESULT_LIST, data)
        return data
      })
    },
    [actions.get.RESULT_PERSON] ({ commit }, id) {
      return axios.get('/customer/creditdetail/' + id).then(({ data }) => {
        commit(mutations.RESULT_PERSON, data)
        return data
      })
    },
    [ actions.put.RESULT_PERSON ] (context, payload) {
      return axios.put('/customer/creditdetail/' + payload.id, payload)
    },
    [actions.post.RESULT_PERSON] (context, payload) {
      return axios.post('/customer/creditdetail', payload)
    },
    [actions.delete.RESULT_PERSON] (context, id) {
      return axios.delete('customer/creditdetail/' + id)
    },
    [actions.get.PREVIEW_PERSON] ({ commit }, idNumber) {
      return axios.get('/customer/info/idnumber/' + idNumber).then(({ data }) => {
        return data
      })
    },
    [actions.get.CUSTOMER_INFOFORM] ({ commit }, id) {
      return axios.get('/customer/info/form/' + id).then(({ data }) => {
        return data
      })
    },
    // 审批
    [actions.post.APPROVAL_RECORD] (context, payload) {
      return axios.post('/customer/creditapproval', payload).then(({ data }) => {
        return data
      })
    },
    // 征信
    [ actions.get.file_TEST_LIST ] ({ commit }, creditDetailId) {
      return axios.get('/customer/creditdetail/report/' + creditDetailId)
    },

    /* [actions.post.APPROVAL_RECORD]({commit}, list) {
            return axios.post('/customer/creditapproval', list)
        }, */
    [actions.get.APPROVAL_RECORD] ({ commit }, creditDetailId) {
      return axios.get('/customer/creditapproval/' + creditDetailId)
    },
    [actions.get.APPROVAL_LIST] ({ commit }, payload) {
      let link = `/customer/creditdetail/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}&status=${payload.status}&roleId=${payload.roleId}&orgCode=${payload.orgCode}&accountId=${payload.accountId}`
      if ('customerName' in payload) link += '&customerName=' + payload.customerName
      if ('idNumber' in payload) link += '&idNumber=' + payload.idNumber
      if (payload.gridCode != null) link += '&gridCode=' + payload.gridCode
      if ('attachFlag' in payload) link += payload.attachFlag === 3 ? ('&attachFlag=' + payload.attachFlag) : (payload.attachFlag === 4 ? '' : '&attachFlag=0')
      if ('approvalStatus' in payload) link += '&approvalStatus=' + payload.approvalStatus
      return axios.get(link).then(({ data }) => {
        commit(mutations.APPROVAL_LIST, data)
        return data
      })
    },
    [actions.get.CREDIT_LIST] ({ commit }, ids) { // 获取审批报表信息
      return axios.get('/customer/creditapproval/report/' + ids)
    }
  }
}
