<template>
<!--失信人查询页面-->
<div>
  <div class="dishonestBreadcrumb">
      <Breadcrumb>
          <BreadcrumbItem>统计查询</BreadcrumbItem>
          <BreadcrumbItem>失信人信息</BreadcrumbItem>
      </Breadcrumb>
  </div>
  <div class="dishonestPage">
    <div class="searchDiv">
      <Button class="searchBtn" type="primary" icon="ios-search" @click="onSearch">查询</Button>
      <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull">
        <Select v-model="search.type" slot="prepend" style="width: 80px">
          <Option value="performedName">姓名</Option>
          <Option value="cardNumber">证件号</Option>
        </Select>
      </Input>
    </div>
    <div class="table">
      <Table :columns="columns" :data="list"></Table>
    </div>
    <div class="pagination">
      <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
    </div>
    <!-- 失信人查询 -->
    <Modal width="60%"  v-model="detail.showDishonest" :footer-hide="true"  title="失信记录">
      <table border class="detail-dishonestTable">
        <tr>
          <td width="36%" class="tds1">被执行人姓名/名称</td>
          <td width="64%" class="tds2">{{ dishonest.performedName }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">身份证号码/组织机构代码</td>
          <td width="64%" class="tds2">{{ dishonest.cardNumber }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">性别</td>
          <td width="64%" class="tds2">{{ dishonest.sex }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">年龄</td>
          <td width="64%" class="tds2">{{ dishonest.age }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">省份</td>
          <td width="64%" class="tds2">{{ dishonest.areaName }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">执行法院</td>
          <td width="64%" class="tds2">{{ dishonest.courtName }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">执行依据文号</td>
          <td width="64%" class="tds2">{{ dishonest.gistId }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">立案时间</td>
          <td width="64%" class="tds2">{{ dishonest.registerDate }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">案号</td>
          <td width="64%" class="tds2">{{ dishonest.caseCode }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">做出执行依据单位</td>
          <td width="64%" class="tds2">{{ dishonest.gistInstitution }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">生效法律文书确定的义务</td>
          <td width="64%" class="tds2">{{ dishonest.duty }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">被执行人的履行情况</td>
          <td width="64%" class="tds2">{{ dishonest.performance }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">失信被执行人行为具体情形</td>
          <td width="64%" class="tds2">{{ dishonest.concreteReason }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">失信类别</td>
          <td width="64%" class="tds2">{{ dishonest.type }}</td>
        </tr>
        <tr>
          <td width="36%" class="tds1">发布时间戳</td>
          <td width="64%" class="tds2">{{ dishonest.publishedAt }}</td>
        </tr>
      </table>
    </Modal>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  user,
  data () {
    return {
      user,
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      dishonestperson: [],
      dishonestlen: 0,
      dishonest: {},
      detail: {
        // show: false,
        showDishonest: false
      },
      search: {
        type: 'performedName',
        keyword: ''
      },
      columns: [
        {
          title: '姓名',
          key: 'performedName',
          width: 100,
          align: 'center'
        },
        {
          title: '证件号码',
          key: 'cardNumber',
          width: 190,
          align: 'center'
        },
        {
          title: '立案时间',
          key: 'registerDate',
          width: 120,
          align: 'center'
        },
        {
          title: '失信被执行人行为具体情形',
          key: 'concreteReason',
          minWidth: 48,
          tooltip: 'true',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'publishedAt',
          width: 120,
          align: 'center',
          render: (h, params) => {
            var date = new Date()
            date.setTime(params.row.publishedAt)
            var month = date.getMonth() + 1
            var day = date.getDate()
            var dateType = `${date.getFullYear()}${month >= 10 ? month : '0' + month}${day >= 10 ? day : '0' + day}`
            return h('span', {
              props: {
              }
            }, dateType)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showDishonest(params.row)
                  }
                }
              }, '查看')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      list: state => state.dishonest.list,
      person: state => state.dishonest.person,
      total: state => state.dishonest.total
    })
  },
  mounted () {
    let vue = this
    // 获取列表
    if ('pageNum' in vue.$route.query) {
      vue.pageNum = parseInt(vue.$route.query.pageNum)
    }
    vue.onSearch()
  },
  methods: {
    dateFormat (num) {
      var date = new Date(num)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + (date.getDate()) + ' ' : date.getDate() + ' '
      return Y + M + D
    },
    fetchList (params = {}) {
      var vue = this
      return this.$store.dispatch(actions.get.DISHONEST_LIST, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
        if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    onSearch () {
      var param = {
        [this.search.type]: this.search.keyword
      }
      this.fetchList(param)
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    // 查询失信人失信信息
    showDishonest (row) {
      var vue = this
      this.$store.dispatch(actions.get.DISHONEST_PERSON, row.id).then(rep => {
        if (rep.code !== 200) {
          vue.$Message.error(rep.message)
        } else {
          vue.dishonest = rep.data
          vue.detail.showDishonest = true
          vue.dishonest.publishedAt = vue.dateFormat(this.dishonest.publishedAt)
          vue.dishonestlen = vue.dishonestperson.length
        }
      })
    },
    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.onSearch()
      }
    }
  }
}
</script>

<style lang="scss">
.dishonestBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
}
.dishonestPage {
  margin: 24px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  .searchDiv {
    height: 35px;
    margin-bottom: 10px;
    .searchBtn {
      float: right;
      margin-left: 10px;
    }
    .search-input {
      float: right;
      width: 400px;
    }
  }
  .table {
    margin-bottom: 20px;
    Table {
      font-size: 14px;
    }
    Button {
      color: #2d8cf0;
    }
  }
  .pagination {
    width: 100%;
    height: 60px;
    .text {
      float: left;
      line-height: 60px;
    }
    .pager {
      float: right;
    }
  }
}
.ivu-modal {
  top: 50px
}
.detail-dishonestTable {
  width: 100%;
  font-size: 12px;
  line-height: 25px;
  border-collapse: collapse;
  border-color: #A6A6A6;
  border:0px solid rgba(166,166,166,1);
  .tds1 {
    margin-right: 10px;
    background:rgba(0,18,31,0.05);
    text-align: right;
    padding-right: 10px;
  }
  .tds2 {
    text-align: left;
    padding-left: 10px;
  }
}
</style>
