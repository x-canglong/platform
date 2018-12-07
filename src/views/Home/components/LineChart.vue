<template>
  <div class="chart">
    <div class="title">
      <span>{{ title }}</span>
      <div class="tabs">
        <span :class="type==1?'selected':''" @click="onType(1)">月</span>
        <span :class="type==2?'selected':''" @click="onType(2)">季</span>
        <span :class="type==3?'selected':''" @click="onType(3)">年</span>
      </div>
    </div>
    <ve-line
      height="222px"
      :data="chartData"
      :settings="chartSettings"
      :grid="grid"
    ></ve-line>
  </div>
</template>

<script>
import actions from '@/store/action-types'

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  name: 'LineChart',
  data () {
    return {
      roleId: user.roles[0].roleId,
      chartSettings: {
        metrics: ['存款', '贷款'],
        dimension: ['月份']
      },
      grid: {
        top: 40,
        bottom: 15
      },
      chartData: {
        columns: ['月份', '存款', '贷款'],
        rows: [
          {
            '月份': '09',
            '存款': 26,
            '贷款': 32
          },
          {
            '月份': '10',
            '存款': 45,
            '贷款': 44
          },
          {
            '月份': '11',
            '存款': 70,
            '贷款': 60
          },
          {
            '月份': '12',
            '存款': 56,
            '贷款': 46
          }
        ]
      },
      list: [],
      type: 1
    }
  },
  computed: {
    title () {
      if (this.roleId === 1) {
        return '存贷款金额'
      } else if (this.roleId === 3) {
        return '支行存贷款金额'
      } else {
        return '全行存贷款金额'
      }
    }
  },
  mounted () {
    this.onType(1)
  },
  methods: {
    onType (type) {
      this.type = type
      var vue = this
      vue.$store.dispatch(actions.get.STATISTICS_CHART, {
        timeType: type,
        amountType: 1
      }).then(rep => {
        if (rep.code === 200) {
          if (rep.data.length > 0) {
            vue.chartData.rows = []
            vue.list = [ ...rep.data ]
            let time = []
            for (let i in vue.list) {
              let obj = {
                '月份': vue.list[i].time,
                '存款': vue.list[i].amount,
                '贷款': 0
              }
              time.push(vue.list[i].time)
              vue.chartData.rows.push(obj)
            }
            vue.$store.dispatch(actions.get.STATISTICS_CHART, {
              timeType: type,
              amountType: 2
            }).then(rep => {
              if (rep.code === 200) {
                vue.list2 = [ ...rep.data ]
                for (let i in vue.list2) {
                  for (let j in time) {
                    if (vue.list2[i].time === time[j]) {
                      vue.chartData.rows[j]['贷款'] = vue.list2[i].amount
                    }
                  }
                  time.push(vue.list2[i].time)
                }
              } else if (rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })
          }
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  .title {
    padding: 10px 20px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }
  .tabs {
    float: right;
    display: table;
    width: 150px;
    height: 24px;
    font-size: 14px;
    font-weight: normal;
    line-height: 24px;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    & > span {
      display: table-cell;
      border-right: 1px solid #ddd;
      &:last-child {
        border-right-width: 0;
      }
      &:hover {
        background-color: #eee;
        cursor: pointer;
      }
      &.selected {
        background-color: #eee;
      }
    }
  }
}
</style>
