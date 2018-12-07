import axios from '../../axios'
import actions from '../../action-types'

export default {
  state: {
  },
  mutations: {

  },
  actions: {
    [actions.get.OVER_VIEW] ({ commit }, payload) {
      let usr = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = usr.roles[0].roleId
      let role = '/president'
      if (roleId === 4) {
        role = '/president'
      } else if (roleId === 5) {
        role = '/middle'
      } else { // 角色id   1，2，3
        role = '/basic'
      }
      let link = '/home/basicinfo' + role
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [actions.get.HOME_INFORMATION] ({ commit }, payload) {
      let usr = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = usr.roles[0].roleId
      let role = '/president'
      let amount = 0
      if (roleId === 4) {
        role = '/president'
        amount = 5000000
      } else if (roleId === 5) {
        amount = 1000000
        role = '/middle'
      } else { // 角色id   1，2，3
        amount = 100000
        role = '/basic'
      }
      let link = '/home/warn' + role + '?pageNum=1&pageSize=8&amount=' + amount
      if ('amountType' in payload) link = link + '&amountType=' + payload.amountType
      if (role === '/basic') link = link + '&orgCode=' + usr.orgCode
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [actions.get.STATISTICS_CHART] ({ commit }, payload) {
      let usr = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = usr.roles[0].roleId
      let role = '/president'
      if (roleId === 4) {
        role = '/president'
      } else if (roleId === 5) {
        role = '/middle'
      } else { // 角色id   1，2，3
        role = '/basic'
      }
      let link = '/home/statistics' + role + '?orgCode=' + usr.orgCode
      if ('amountType' in payload) link += '&amountType=' + payload.amountType
      // if ('time' in payload) link += '&time=' + payload.time+''
      if ('timeType' in payload) link += '&timeType=' + payload.timeType
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [actions.get.RANKING] ({ commit }, payload) {
      let usr = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = usr.roles[0].roleId
      let role = '/president'
      if (roleId === 4) {
        role = '/president'
      } else if (roleId === 5) {
        role = '/middle'
      } else { // 角色id   1，2，3
        role = '/basic'
      }
      let type = '/branchinfosort'
      if (type === 1) {
        type = '/accountinfosort'
      }
      let link = '/home' + type + role + '?sortType=' + payload.sortType
      return axios.get(link).then(({ data }) => {
        return data
      })
    },
    [actions.get.GRID_HOME] ({ commit }, payload) {
      let link = '/gridmap/list/' + payload.roleId + '/' + payload.orgCode
      return axios.get(link).then(({ data }) => {
        return data
      })
    }
  }
}
