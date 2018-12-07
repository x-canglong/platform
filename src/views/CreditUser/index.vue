<template>
    <!--查征信账号管理-->
    <div>
        <div class="userBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>征信账号管理</BreadcrumbItem>
                <!--<BreadcrumbItem>用户管理</BreadcrumbItem>-->
            </Breadcrumb>
        </div>
        <div class="userPage">
            <div class="search">
                <Button class="createBtn" to="/creditUser/detail" type="primary" icon="ios-add">新建</Button>
                <Button class="searchBtn" type="primary" icon="ios-search" @click="onSearch">查询</Button>&nbsp;&nbsp;
                <Input class="search-input" placeholder="请输入 用户名 以进行查询" v-model="search.keyword" clearable
                       @on-change="onChangeNull">
                </Input>
            </div>
            <!--表格-->
            <div class="table">
                <Table :columns="columns" :data="creditUserList"></Table>
            </div>
            <!--表格底部-->
            <div class="pagination">
                <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
                <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts"
                      :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
            </div>
        </div>
        <!--删除此条用户信息时弹窗-->
        <Modal v-model="model.show" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>你确定要删除这行内容么？</span>
            </p>
            <div style="text-align:center">
                <p>{{ model.content }}</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="model.loading" @click="deleteUser">删除</Button>
            </div>
        </Modal>
        <!--查看用户详情-->
        <Modal width="50%" v-model="detail.show" :footer-hide="true" title="用户详情">
            <table class="detail-table">
                <tr>
                    <td class="tdDtyle">用户名：</td>
                    <td>{{ person.userName}}</td>
                    <td class="tdDtyle">用户ID：</td>
                    <td>{{ person.id }}</td>

                </tr>
                <tr>
                    <td class="tdDtyle">机构名称：</td>
                    <td>{{ person.orgName }}</td>
                    <td class="tdDtyle">机构号：</td>
                    <td>{{ person.orgCode }}</td>
                </tr>
                <tr>
                    <td class="tdDtyle">备注：</td>
                    <td>{{ person.comment }}</td>
                    <td class="tdDtyle">提醒：</td>
                    <td>{{ person.remind }}</td>
                </tr>
                <tr>
                    <td class="tdDtyle">创建时间：</td>
                    <td>{{ person.createdAt }}</td>
                    <td class="tdDtyle">修改时间：</td>
                    <td>{{ person.updatedAt }}</td>
                </tr>
                <tr>
                    <td class="tdDtyle">类型：</td>
                    <td>{{ person.type == 0 ? '查询账户' : '审批账号' }}</td>
                    <td class="tdDtyle">用户状态：</td>
                    <td>{{ person.status == 0 ? '启用' : '冻结' }}</td>
                </tr>
            </table>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'

export default {
  data () {
    return {
      person: {}, // 详情
      modal1: false,
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      showImportModal: false,
      model: {
        show: false,
        title: '你确定要删除这行内容么？',
        id: null,
        content: '',
        loading: false
      }, // 删除
      detail: {
        show: false
      },
      search: {
        type: 'userName',
        keyword: ''
      },
      columns: [
        {
          title: '用户名',
          key: 'userName',
          minWidth: 50,
          align: 'center'
        },
        {
          title: '机构名',
          key: 'orgName',
          minWidth: 80,
          align: 'center'
        },
        {
          title: '类型',
          key: 'type',
          align: 'center',
          minWidth: 40,
          render: (h, params) => {
            let listType = ['查询账户', '审批账号']
            return h('span', {
              props: {}
            }, listType[params.row.type])
          }
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            let listType = ['启用', '冻结']
            return h('span', {
              props: {}
            }, listType[params.row.status])
          }
        },
        {
          title: '备注',
          key: 'comment',
          width: 100,
          align: 'center'
        },
        {
          title: '提醒',
          key: 'remind',
          minWidth: 100,
          align: 'center'
        },
        {
          title: '创建时间',
          align: 'center',
          key: 'createdAt',
          minWidth: 40,
          // sortable: true,
          render: (h, params) => {
            var then = this
            let dataOff = params.row.createdAt ? then.dateFormat(params.row.createdAt) : ''
            return h('p', {
              style: {
                display: 'inline-block'
              }
            }, dataOff)
          }
        },
        {
          title: '修改时间',
          align: 'center',
          key: 'updatedAt',
          minWidth: 40,
          // sortable: true,
          render: (h, params) => {
            var then = this
            let dataOff = params.row.updatedAt ? then.dateFormat(params.row.updatedAt) : ''
            return h('p', {
              style: {
                display: 'inline-block'
              }
            }, dataOff)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 190,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.show(params.row)
                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.edit(params.row)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]// 表格列配置
    }
  },
  computed: {
    ...mapState({
      creditUserList: state => state.credituser.list,
      total: state => state.credituser.total
    })
  },
  mounted () {
    // 获取列表
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    this.fetchList()
  },
  methods: {
    fetchList (params = {}) {
      return this.$store.dispatch(actions.get.CREDIT_USER, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      })
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      if (this.search.keyword === '') {
        this.fetchList()
      } else {
        this.fetchList({
          [this.search.type]: this.search.keyword
        })
      }
    },
    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.fetchList()
      }
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    show (row) { // 1
      var vue = this
      this.$store.dispatch(actions.get.CREDIT_USER_DETAILS, row.id).then(rep => {
        if (rep.data.code === 200) {
          vue.person = rep.data.data
          vue.detail.show = true
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        } else {

        }
      })
    },
    edit (row) {
      this.$router.push('/creditUser/detail?id=' + row.id)
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.gridCode
      this.model.id = row.id
      this.model.show = true
    },
    deleteUser () {
      var that = this
      that.model.loading = true
      let id = that.model.id
      setTimeout(() => {
        that.model.loading = false
        that.model.show = false

        this.$store.dispatch(actions.delete.CREDIT_USER, id).then(rep => {
          if (rep.data.code !== 200) {
            this.$Message.error(rep.data.message)
          } else {
            this.$Message.success('删除成功')
          }
          that.fetchList()
        })
      }, 1000)
    },
    onSearch () {
      if (this.search.keyword.trim().length > 0) { // 把取到得查询条件处理一下 去掉两边得空格
        this.fetchList({
          [this.search.type]: this.search.keyword.trim()
        })
        console.log(this.search.keyword)
      }
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

<style lang="scss">
    .userBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .userPage {
        margin: 24px;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        .search {
            height: 35px;
            margin-bottom: 10px;
            .createBtn {
                float: left;
            }
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
        .ivu-table-column-center div{
            padding:0;
        }
    }

    .detail-table {
        width: 100%;
        font-size: 14px;
        line-height: 32px;
        .tdDtyle{
            text-align: right;
        }
        td{
            width: 25%;
        }
    }
</style>
