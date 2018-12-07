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
    [ mutations.DISHONEST_PERSON ] (state, payload) {
      state.person = payload.data
    },
    [ mutations.DISHONEST_LIST ] (state, payload) {
      state.total = payload.count
      state.list = payload.data
    }
  },
  actions: {
    [ actions.get.DISHONEST_LIST ] ({ commit }, payload) {
      let link = `/customer/dishonesty/list?pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`
      if ('performedName' in payload) link += '&performedName=' + payload.performedName
      if ('cardNumber' in payload) link += '&cardNumber=' + payload.cardNumber
      return axios.get(link).then(({ data }) => {
        commit(mutations.DISHONEST_LIST, data)
        return data
      })
    },
    [ actions.get.DISHONEST_PERSON ] ({ commit }, id) {
      return axios.get('/customer/dishonesty/' + id).then(({ data }) => {
        commit(mutations.DISHONEST_PERSON, data)
        return data
      })
    }
  }
}
