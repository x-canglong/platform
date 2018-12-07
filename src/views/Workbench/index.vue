<template>
    <div id="workbench">
        <ul class='qul'>
            <li v-for="(i,index) in listStatus.list" :key="index" class="classq" :class="  listStatus.status==index? 'ttt' : '' " @click="setStatus(index)">{{i.value}}&nbsp;&nbsp;({{i.index}})</li>
        </ul>
        <div class="divStyle">
            <div style="display: inline-block;width: 160px">
                待办类型:&nbsp;<Select v-model="standbyType" @on-change="changeStatus"
                                   style="max-width: 80px;text-align: center">
                <Option value="0">全部</Option>
                <Option value="1">提醒事项</Option>
                <Option value="2">客户建档</Option>
                <Option value="3">客户拜访</Option>
                <Option value="4">营销任务</Option>
                <Option value="5">面谈面签</Option>
                <Option value="6">客户授信</Option>
                <Option value="7">贷款审查</Option>
            </Select>
            </div>
            <DatePicker confirm v-model="dataList.dataOn" type="date" placeholder="选择起止时间" style="width: 150px"
                        @on-change="dataSet"></DatePicker>
            --
            <DatePicker confirm v-model="dataList.dataOff" type="date" placeholder="选择结束时间" style="width: 150px"
                        @on-change="dataSet"></DatePicker>
            <Button type="primary" icon="ios-search" @click="getList" style="margin-left: 20px">查询</Button>
            <Table class="tableStyle" :columns="columns" :data="list1" size="small" style="margin-top: 20px;"></Table>
            <div class="pagination">
                <!--<div class="text">共{{ total ? total : 0 }}条记录 第 {{ total ? pageNum : 0}} / {{total ? Math.ceil(total / pageSize)  : 0}} 页</div>-->
                <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts"
                      :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'

export default {
  name: 'workbench',
  data () {
    return {
      pageSize: 10,
      pageNum: 1,
      pageSizeOpts: [5, 10, 15, 20],
      // 选择展示数据得状态
      listStatus: {
        status: '0',
        list: [
          {
            value: '全部',
            index: 0
          },
          {
            value: '催办',
            index: 0
          },
          {
            value: '待办',
            index: 0
          },
          {
            value: '已完成',
            index: 0
          },
          {
            value: '已取消',
            index: 0
          }
        ]
      },
      standbyType: '0', // 待办类型 默认是0--全部
      userData: '',
      dataList: {
        dataOn: '',
        dataOff: ''
      }, // 搜索时间段  设置默认值可使用格式 1997-8-11 1997年8月11日
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '待办类型',
          align: 'center',
          key: 'type',
          minWidth: 20,
          render: (h, params) => {
            let typeList = ['提醒事项', '客户建档', '客户拜访', '营销任务', '面谈面签', '客户授信', '贷款审查']
            return h('p', {
              style: {
                display: 'inline-block'
              }
            }, typeList[params.row.type - 1])
          }
        },
        {
          title: '待办说明',
          align: 'center',
          key: 'description'
        },
        {
          title: '发起时间',
          align: 'center',
          key: 'startTime',
          sortable: true,
          render: (h, params) => {
            var then = this
            let dataOn = params.row.startTime ? then.dateFormat(params.row.startTime) : ''
            return h('p', {
              style: {
                display: 'inline-block'
              }
            }, dataOn)
          }
        },
        {
          title: '发起人',
          align: 'center',
          key: 'originator',
          tooltip: true
        },
        {
          title: '结束时间',
          align: 'center',
          key: 'endTime',
          sortable: true,
          render: (h, params) => {
            var then = this
            let dataOff = params.row.endTime ? then.dateFormat(params.row.endTime) : ''
            return h('p', {
              style: {
                display: 'inline-block'
              }
            }, dataOff)
          }
        },
        {
          title: '状态',
          align: 'center',
          key: 'status',
          render: (h, params) => {
            let colors = [' #F5222D ', '#1890FF', '#52C41A', 'rgb(168,168,168)'] // 蓝 红 绿  灰
            let statusList = ['催办', '待办', '已完成', '已取消']
            return h('div', [
              h('Icon', {
                props: {
                  type: 'ios-radio-button-on',
                  color: colors[params.row.status - 1],
                  size: 1
                },
                style: {
                  lineHeight: 3
                }
                /* on: {
                                         click: () => {
                                             this.iconClick(params.row)
                                         }
                                     } */
              }),
              h('p', {
                style: {
                  display: 'inline-block'
                }
              }, statusList[params.row.status - 1])
            ])
          }
        },
        {
          title: '快捷入口',
          key: 'entrance',
          align: 'center',
          render: (h, params) => {
            let routerList = ['/credit/result', '/credit/faceSigned', '', '']
            return h('div', [

              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push(routerList[params.row.entrance])
                  }
                }
              }, '查看')
            ])
          }
        }
      ], // 表格得表头配置
      list1: []// 表格信息
    }
  },
  computed: {
    ...mapState({
      // userList: state => state.user.userList,
      total: state => state.user.total
      // person: state => state.user.person
    })
  },
  mounted () {
    this.userData = JSON.parse(sessionStorage.getItem('userObj'))
    this.getTableList()
  },
  methods: {
    // 获取表格数据
    getTableList (params = {}) {
      var vue = this
      return this.$store.dispatch(actions.get.WORKBENCH_LIST, {
        pageNum: vue.pageNum,
        pageSize: vue.pageSize,
        accountId: vue.userData.accountId,
        type: vue.standbyType, // 待办类型
        startTime: vue.dataList.dataOn, // 开始时间
        endTime: vue.dataList.dataOff, // 结束时间
        status: vue.listStatus.status === '0' ? '' : vue.listStatus.status// 状态
      }).then(rep => {
        if (rep.code === 200) {
          vue.list1 = [...rep.data]
        } else if (rep.code === 204) {
          vue.list1 = []
        }
      })
    },
    // 通过状态调整战术数据
    setStatus (index) {
      if (this.listStatus.status !== index) {
        this.listStatus.status = index + ''
        this.dataList.dataOn = ''
        this.dataList.dataOff = ''
        this.standbyType = '0'
        this.getTableList()
      }
    },
    // 两个时间选择框事件
    dataSet (key, type) {

    },
    // 查询按钮事件
    getList () {
      if (this.dataList.dataOn !== '' && typeof this.dataList.dataOn !== 'string') {
        let dataon = this.dataList.dataOn
        let Y1 = dataon.getFullYear() + '-'
        let M1 = (dataon.getMonth() + 1 < 10 ? '0' + (dataon.getMonth() + 1) : dataon.getMonth() + 1) + '-'
        let D1 = dataon.getDate() < 10 ? '0' + (dataon.getDate()) + ' ' : dataon.getDate()
        this.dataList.dataOn = Y1 + M1 + D1
      }
      if (this.dataList.dataOff !== '' && typeof this.dataList.dataOff !== 'string') {
        let dataoff = this.dataList.dataOff
        let Y2 = dataoff.getFullYear() + '-'
        let M2 = (dataoff.getMonth() + 1 < 10 ? '0' + (dataoff.getMonth() + 1) : dataoff.getMonth() + 1) + '-'
        let D2 = dataoff.getDate() < 10 ? '0' + (dataoff.getDate()) + ' ' : dataoff.getDate()
        this.dataList.dataOff = Y2 + M2 + D2
      }
      this.getTableList()
    },
    // 选择待办事项类型后触发事件
    changeStatus (type) {
      this.getTableList()
    },
    // 表格下方 切换页码 功能
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
    },
    // 时间戳转化为日期格式
    dateFormat (num) {
      let date = new Date(num)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + (date.getDate()) + ' ' : date.getDate()
      // var h = date.getHours() < 10 ? '0'+ date.getHours() + ':' : date.getHours() + ':';
      // var m = date.getMinutes() < 10 ? '0'+ date.getMinutes() + ':' : date.getMinutes() + ':';
      // var s = date.getSeconds() < 10 ? '0'+ date.getSeconds() : date.getSeconds();
      return Y + M + D
    }
  }
}
</script>

<style lang="scss" scoped>
    #workbench {
        .divStyle {
            outline: 0;
            list-style: none;
            width: 97%;
            margin: 10px auto;
            padding: 20px;
            background-color: #fff;
            color: #515a6e;
            z-index: 900;
            border-radius: 6px;
        }
        /**/
        .qul {

            outline: 0;
            list-style: none;
            height: 60px;
            line-height: 60px;
            width: 97%;
            margin: 10px auto;
            padding: 0 0 0 5px;
            background: #fff;
            color: #515a6e;
            border-radius: 3px;
        }

        .ttt {
            color: #2d8cf0;
            border-bottom: 2px solid #2d8cf0;
        }

        .classq {
            display: block;
            outline: 0;
            list-style: none;
            font-size: 14px;
            position: relative;
            z-index: 1;
            cursor: pointer;
            transition: all .2s ease-in-out;
            float: left;
            padding: 0 20px;
            height: inherit;
            line-height: inherit;
        }
        .tableStyle {
            border: 0;
            :after {
                display: none;
            }
        }
        .pagination {
            width: 100%;
            height: 40px;
            .pager {
                float: right;
            }
        }
    }

</style>
