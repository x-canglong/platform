<template>
  <!--待面谈面签页面-->
  <div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>授信管理</BreadcrumbItem>
        <BreadcrumbItem to="/credit/result/checkUp">面签审查</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="grid">
      <div class="grid-top">
        <span>请选择网格:</span>
        <Button class="gridBtn" type="text" :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
        </Button>
        <Button class="gridBtn" type="text" v-for="(h, index) in gridNameList" :key="index" :class="uploadObj.gridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode)">{{ h.gridName }}
        </Button>
      </div>
    </div>
    <div class="page">
      <div class="searchDiv">
        <Button type="primary" icon="ios-add" v-if="roleId == 1">新建</Button>
        <Button style="margin-left: 10px" v-if="roleId == 1">批量提交</Button>
        <Button v-if="roleId == 2">批量审查</Button>
        <Button type="primary" icon="ios-search" @click="onSearch" style="float: right">查询</Button>
        <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull" style="float: right;margin-right: 10px">
        <Select v-model="search.type" slot="prepend" size="large" style="width: 90px;">
          <Option value="customerName">客户姓名</Option>
          <Option value="idNumber">身份证号</Option>
        </Select>
        </Input>
        <span class="search-span">
            流程状态:&nbsp;
            <Select v-model="search.approvalStatus" size="large" @on-change="onChangeTypeStatus" style="width: 90px;">
              <Option value="5" >全部</Option>
              <Option value="0" v-if="roleId == 1">待提交</Option>
              <Option value="1" >审查中</Option>
              <Option value="4" >已驳回</Option>
            </Select>
          </span>
        <span class="search-span" v-if="roleId == 1">
            资料状态:&nbsp;
            <Select v-model="search.attachFlag" size="large" @on-change="onChangeKeywordStatus" style="width: 90px;">
              <Option value="0">全部</Option>
              <Option value="1">部分上传</Option>
              <Option value="2">已上传</Option>
              <Option value="3">未上传</Option>
            </Select>
        </span>
      </div>
      <div class="table">
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="selectionRow"></Table>
      </div>
      <div class="pagination">
        <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
      </div>
      <!--
      <Modal v-model="approvalModel.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
          &lt;!&ndash;<Icon type="ios-information-circle" style="line-height:24px;"></Icon>&ndash;&gt;
          <span>您确定提交审批吗？</span>
        </div>
        <div style="padding-left: 20px;padding-bottom: 20px">
          <p>共选中 {{ approvalModel.content }} 条</p>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="approvalModel.loading" @click="approvalConfirm">确定</Button>
        </div>
      </Modal>
      <Modal v-model="approveModel.show" footer-hide width="500" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;">
          <span style="font-size: 16px;font-weight:bold;">审查</span>
        </div>
        <div style="padding-left: 20px;padding-bottom: 20px">
          <Form ref="form" :model="approveModel.data" :label-width="80" label-position="left">
            <Row>
              <Col>
              <FormItem label="审查结果" prop="approvalResult">
                <RadioGroup v-model="approveModel.data.approvalResult">
                  <Radio label="0" >通过</Radio>
                  <Radio label="1" >驳回</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col >
              <FormItem label="审查意见" prop="approvalOpinion1">
                <Select v-model="approveModel.data.approvalOpinion1" size="large">
                  <Option v-if="approveModel.data.approvalResult == 0" value="信息符实">信息符实</Option>
                  <Option v-if="approveModel.data.approvalResult == 1" value="借款利率不正确">借款利率不正确</Option>
                  <Option v-if="approveModel.data.approvalResult == 1" value="资料不全，有待完善">资料不全，有待完善</Option>
                  <Option v-if="approveModel.data.approvalResult == 1" value="不符合贷款资格">不符合贷款资格</Option>
                  <Option v-if="approveModel.data.approvalResult == 1" value="其他" >其他</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col >
              <FormItem label="" prop="approvalOpinion">
                <Input v-model="approveModel.data.approvalOpinion" type="textarea" :rows="4" placeholder="请输入意见"/>
              </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="approveModel.loading" @click="submitSelection">确定</Button>
        </div>
      </Modal>-->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'
import { UPLOAD_API_URL, LOGO_NAME } from '@/config'

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  data () {
    return {
      roleId: user.roles[0].roleId,
      headers: {
        'Authorization': sessionStorage.getItem('token')
      },
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      logoName: LOGO_NAME,
      uploadUrl: UPLOAD_API_URL,
      uploadObj: {
        gridCode: null
      },
      search: {
        type: 'customerName',
        keyword: '',
        attachFlag: '0',
        approvalStatus: '5'
      },
      gridNameList: [],
      list: [],
      columns: [
        {
          type: 'selection',
          align: 'left',
          fixed: 'left',
          width: 50
        },
        {
          title: '客户编号',
          key: 'customerId',
          align: 'left',
          width: 99
        },
        {
          title: '客户姓名',
          key: 'customerName',
          align: 'left',
          width: 99
        },
        {
          title: '身份证号',
          key: 'idNumber',
          align: 'left',
          minWidth: 200
        },
        {
          title: '预授信总额(万元)',
          key: 'rental',
          align: 'left',
          width: 110
        },
        {
          title: '资料信息',
          key: 'attachFlag',
          align: 'left',
          sortable: true,
          sortType: 'desc',
          width: 120,
          render: (h, params) => {
            let texts = ''
            if (params.row.attachFlag === '1.1') {
              texts = '已上传'
            } else if (params.row.attachFlag === '0.0') {
              texts = '未上传'
            } else {
              texts = '部分上传'
            }
            return h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.uploadAttach(params.row)
                }
              }
            }, texts)
          }
        },
        {
          title: '流程状态',
          key: 'approvalStatus',
          align: 'left',
          sortable: true,
          sortType: 'desc',
          width: 150,
          render: (h, params) => {
            let texts = ''
            let BadgeStatus = 'processing'
            let steps = []
            if (params.row.approvalStatusSteps.length === 0) {
              steps.push(h('Step', {
                props: {
                  title: '客户经理待提交',
                  content: '',
                  icon: 'md-checkmark-circle',
                  status: 'wait'
                }
              }))
            } else {
              for (let i in params.row.approvalStatusSteps) {
                if (params.row.approvalStatusSteps[i].approvalNode === '1') {
                  steps.push(h('Step', {
                    props: {
                      title: '客户经理提交',
                      content: params.row.approvalStatusSteps[i].approvalOpinion + ' ' + this.dateFormatStep(params.row.approvalStatusSteps[i].createdAt),
                      icon: 'md-checkmark-circle',
                      status: 'process'
                    }
                  }))
                } else if (params.row.approvalStatusSteps[i].approvalNode === '2') {
                  steps.push(h('Step', {
                    props: {
                      title: '会计审查驳回',
                      content: params.row.approvalStatusSteps[i].approvalOpinion + ' ' + this.dateFormatStep(params.row.approvalStatusSteps[i].createdAt),
                      icon: 'md-close-circle',
                      status: 'error'
                    }
                  }))
                }
              }
              let lastStep = params.row.approvalStatusSteps[params.row.approvalStatusSteps.length - 1]
              if (lastStep.approvalNode === '1' && params.row.approvalStatus === '1') {
                steps.push(h('Step', {
                  props: {
                    title: '会计审查中',
                    content: '',
                    icon: 'md-checkmark-circle',
                    status: 'wait'
                  }
                }))
              } else if (lastStep.approvalNode === '2' && params.row.approvalStatus === '4') {
                steps.push(h('Step', {
                  props: {
                    title: '客户经理待提交',
                    content: '',
                    icon: 'md-checkmark-circle',
                    status: 'wait'
                  }
                }))
              }
            }

            if (params.row.approvalStatus === '0') {
              texts = '待提交'
            } else if (params.row.approvalStatus === '1') {
              texts = '审查中'
              BadgeStatus = 'success'
            } else if (params.row.approvalStatus === '3') {
              texts = '已通过'
            } else if (params.row.approvalStatus === '4') {
              texts = '已驳回'
              BadgeStatus = 'error'
            }
            return h('Poptip', {
              props: {
                trigger: 'click',
                transfer: ''
              },
              placement: 'top'
            }, [
              h('Badge', {
                props: {
                  status: BadgeStatus
                }
              }),
              h('p', {
                style: {
                  display: 'inline-block',
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.iconClick(params.row)
                  }
                }
              }, texts),
              h('Icon', {
                props: {
                  type: 'ios-eye-outline',
                  size: 20
                },
                style: {
                  lineHeight: 3
                },
                on: {
                  click: () => {
                    this.iconClick(params.row)
                  }
                }
              }),
              h('Steps', {
                props: {
                  current: 1, // 当前步骤，从 0 开始计数
                  status: 'wait', // 当前步骤得状态 可选值为wait、process、finish、error  默认process
                  direction: 'vertical' // 水平 或者垂直
                },
                slot: 'content',
                style: {}
              },
              steps
              )
            ])
          }
        },
        {
          title: '授信开始日期',
          key: 'beginAt',
          align: 'left',
          minWidth: 120,
          render: (h, params) => {
            let beginAt = this.dateFormat2(params.row.beginAt)
            return h('span', {}, beginAt)
          }
        },
        {
          title: '授信结束日期',
          key: 'endAt',
          align: 'left',
          minWidth: 120,
          render: (h, params) => {
            let endAt = this.dateFormat2(params.row.endAt)
            return h('span', {}, endAt)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'left',
          fixed: 'right',
          width: 180,
          render: (h, params) => {
            // 客户经理
            let type1 = ''
            let type2 = ''
            // 会计
            let type3 = ''
            if (user.roles[0].roleId === 1) {
              if (params.row.approvalStatus === '0' || params.row.approvalStatus === '4') {
                type1 = 'Button'
                if (params.row.approvalStatus !== '4') {
                  type2 = 'Button'
                }
              }
            } else if (user.roles[0].roleId === '2' && params.row.approvalStatus !== '4') {
              type3 = 'Button'
            }
            return h('div', {
              style: {
                align: 'right'
              }
            }, [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/credit/result/showDetail?id=' + params.row.id + '&faceSignFlag=0')
                  }
                }
              }, '详情'),
              h(type1, {
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
              h(type2, {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.delete(params.row)
                  }
                }
              }, '删除'),
              h(type3, {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.approve(params.row)
                  }
                }
              }, '审查')
            ])
          }
        }
      ]
    }
  },
  computed: {
    ...mapState({
      person: state => state.result.resultperson,
      total: state => state.result.resulttotal
    })
  },
  mounted () {
    // 获取列表
    var vue = this
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    this.onSearch()
    this.$store.dispatch(actions.get.GRIDNAME_LIST, {}).then(rep => {
      if (rep.code === 200) {
        vue.gridNameList = [ ...rep.data ]
      } else if (rep.code !== 204) {
        vue.$Message.error(rep.message)
      }
    })
  },
  methods: {
    changeGrid (gridCode) {
      this.uploadObj.gridCode = gridCode
      this.onSearch()
    },
    changeState () {
      this.onSearch()
    },
    fetchList (params = {}) {
      var vue = this
      return this.$store.dispatch(actions.get.RESULT_LIST, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        attachFlag: this.search.attachFlag,
        approvalStatus: this.search.approvalStatus,
        ...params
      }).then(rep => {
        if (rep.code === 200) {
          vue.list = rep.data
          for (let i in vue.list) {
            vue.list[i].approvalStatusSteps = []
          }
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.onSearch()
      }
    },
    onChangeTypeStatus () {
      this.onSearch()
    },
    onChangeKeywordStatus () {
      this.onSearch()
    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    onSearch () {
      var param = {
        [this.search.type]: this.search.keyword
      }
      if (this.uploadObj.gridCode != null) {
        param = {
          [this.search.type]: this.search.keyword,
          gridCode: this.uploadObj.gridCode
        }
      }
      this.fetchList(param)
    },
    goBack () {
      if (this.model.show) {
        this.model.show = false
      }
      if (this.addModel.show) {
        this.addModel.show = false
      }
      if (this.approvalModel.show) {
        this.approvalModel.show = false
      }
      if (this.approveModel.show) {
        this.approveModel.show = false
      }
    },
    dateFormat2 (date) {
      let date1 = new Date(date)
      let month1 = date1.getMonth() + 1
      let day1 = date1.getDate()
      return date1.getFullYear() + '-' + (month1 >= 10 ? month1 : '0' + month1) + '-' + (day1 >= 10 ? day1 : '0' + day1)
    },
    dateFormatStep (stepDate) {
      let date = new Date()
      date.setTime(stepDate)
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours()
      let min = date.getMinutes()
      return `${date.getFullYear()}-${month >= 10 ? month : '0' + month}-${day >= 10 ? day : '0' + day} ${hours >= 10 ? hours : '0' + hours}:${min >= 10 ? min : '0' + min}`
    }
  }
}
</script>

<style lang="scss" scoped>
/* 面包屑 */
.breadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
}

/* 头部网格 */
.grid{
    margin: 16px 24px;
    padding: 10px 24px;
    border-radius: 4px;
    background-color: #fff;
}
.grid .grid-top {
    line-height: 30px;
    min-height: 30px
}
.grid .grid-top .gridBtn {
    padding: 0px 5px 3px 5px;
    margin-left: 10px;
    text-align: center;
    height:30px;
    border-radius:4px;
}
.grid .grid-top .gridBtn:hover {
    background: #1890FF;
    border-radius: 2px;
    color: #fff;
}
.grid .grid-top .gridBtn.active {
    background: #1890FF;
    border-radius: 2px;
    color: #fff;
}

/* 分页列表 查询  页码 */
.page {
    margin: 24px;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
}
.page .searchDiv {
    height: 35px;
    margin-bottom: 10px;
}
.page .searchBtn {
    float: right;
    margin-left: 10px;
}
.page .search-input {
    float: right;
    width: 400px;
}
.page .search-span {
     float: right;
     margin-right: 10px;
 }
.page .table {
    margin-bottom: 20px;
}
.page .table table {
    font-size: 14px;
}
.page .table button {
    color: #2d8cf0;
}
.page .pagination {
    width: 100%;
    height: 60px;
}
.page .pagination .text {
    float: left;
    line-height: 60px;
}
.page .pagination .pager {
    float: right;
}

/* 删除弹出窗 */
.delete-tip {
    padding: 0 0 10px 0;
    font-size: 16px;
}
.delete-tip i{
    color:#f60;
    line-height:24px;
}
.delete-content {
    padding-left: 20px;
    padding-bottom: 20px;
}
.delete-btn {
    text-align: right;
}
</style>
