<template>
  <div class="workBench">
    <div class="title">待办提醒</div>
    <div class="content" v-for="(h,index) in list" :key="index">
      <div class="c_title">{{ title[h.type-1] }} <span :class="'sta'+ h.status">{{ status[h.status-1] }}</span></div>
      <p>{{ h.description }} <span>{{ dateFormat2 (h.startTime) }}</span></p>
    </div>
  </div>
</template>

<script>
import actions from '@/store/action-types'
export default {
  name: 'workBench',
  data () {
    return {
      type: 'daiban',
      list: [
        {
          type: 1,
          status: 1,
          description: '提醒事项提醒事项提醒事项提醒事项提醒事项',
          startTime: 1542594987113
        },
        {
          type: 2,
          status: 2,
          description: '客户建档客户建档客户建档客户建档客户建档',
          startTime: 1542594987113
        },
        {
          type: 3,
          status: 3,
          description: '客户拜访客户拜访客户拜访客户拜访客户拜访',
          startTime: 1542594987113
        }
      ],
      title: ['提醒事项', '客户建档', '客户拜访', '营销任务', '面谈面签', '客户授信', '贷款审查'],
      status: ['催办', '待办', '已完成', '已取消']
    }
  },
  watch: {
    'type': function (newVal, oldVal) {
      if (newVal === 'daiban') {
        this.afx(1)
      } else {
        this.afx2(1)
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      let vue = this
      let user = JSON.parse(sessionStorage.getItem('userObj'))
      return this.$store.dispatch(actions.get.WORKBENCH_LIST, {
        pageNum: 1,
        pageSize: 3,
        accountId: user.accountId
      }).then(rep => {
        if (rep.code === 200) {
          vue.list = [ ...rep.data ]
        } else if (rep.code !== 204) {
          this.$Message.error(rep.message)
        }
      })
    },
    dateFormat2 (date) {
      let date1 = new Date(date)
      let year1 = date1.getFullYear()
      let month1 = date1.getMonth() + 1
      let day1 = date1.getDate()
      let a = year1 + `-` + (month1 >= 10 ? month1 : `0` + month1) + `-` + (day1 >= 10 ? day1 : `0` + day1)
      return a
    }
  }
}
</script>

<style lang="scss" scoped>
.workBench {
  margin: 0px 20px;
  padding-bottom: 15px;
  .title {
    padding-top:10px;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid #ddd;
  }
  .content {
    margin: 8px 0px;
    .c_title {
      height:22px;
      font-size:14px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,0.65);
      line-height:22px;
      .sta1 {
        width:65px;
        height:22px;
        color:#F5222D;
        text-align: center;
        background:rgba(255,241,240,1);
        border-radius:4px;
        border:1px solid;
        float: right;
      }
      .sta2 {
        width:65px;
        height:22px;
        color:#91D5FF;
        text-align: center;
        background:rgba(230,247,255,1);
        border-radius:4px;
        border:1px solid;
        float: right;
      }
      .sta3 {
        width:65px;
        height:22px;
        color:#52C41A;
        text-align: center;
        background:rgba(243,255,230,1);
        border-radius:4px;
        border:1px solid;
        float: right;
      }
      .sta4 {
        width:65px;
        height:22px;
        color:#D9D9D9;
        text-align: center;
        background:rgba(245,245,245,1);
        border-radius:4px;
        border:1px solid;
        float: right;
      }
    }
    p {
      height:20px;
      font-size:12px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,0.45);
      line-height:20px;
      span {
        float: right;
      }
    }
  }
}
</style>
