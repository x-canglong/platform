<template>
  <!--待面谈面签页面-->
  <div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>授信管理</BreadcrumbItem>
        <BreadcrumbItem to="/credit/review">面谈面签审核</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="respagetop">
      <div style="line-height: 30px;min-height: 30px">
        <span>请选择网格:</span>
        <Button class="topButton" type="text" :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
        </Button>
        <Button class="topButton" type="text" v-for="(h, index) in gridNameList" :key="index" :class="uploadObj.gridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode)">{{ h.gridName }}
        </Button>
      </div>
    </div>
    <div class="resultPage">
      <div class="search">
        <Button type="primary" @click="clickSubmint" v-if="roleId == 2">批量审查</Button>
        <Button type="primary" icon="ios-search" @click="onSearch" style="float: right">查询</Button>
        <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull" style="float: right;margin-right: 10px">
        <Select v-model="search.type" slot="prepend" size="large" style="width: 90px;">
          <Option value="customerName">客户姓名</Option>
          <Option value="idNumber">身份证号</Option>
        </Select>
        </Input>
      </div>
      <div class="table">
        <Table ref="selection" :columns="columns" :data="list" @on-selection-change="selectionRow"></Table>
      </div>
      <div class="pagination">
        <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
      </div>
      <Modal v-model="model.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
          <Icon type="ios-information-circle" style="color:#f60;line-height:24px;"></Icon>
          <span>你确定要删除这行内容么？</span>
        </div>
        <div style="padding-left: 20px;padding-bottom: 20px">
          <p>{{ model.content }}</p>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="model.loading" @click="deleteUser">确定</Button>
        </div>
      </Modal>
      <!-- <Modal v-model="approvalModel.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
          <span>您确定提交审批吗？</span>
        </div>
        <div style="padding-left: 20px;padding-bottom: 20px">
          <p>共选中 {{ approvalModel.content }} 条</p>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large" :loading="approvalModel.loading" @click="approvalConfirm">确定</Button>
        </div>
      </Modal> -->
      <Modal v-model="approveModel.show" footer-hide width="500" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;">
          <span style="font-size: 16px;font-weight:bold;">审查</span>
        </div>
        <div style="padding-left: 20px;padding-bottom: 20px">
          <Form ref="form" :model="approveModel.data" :label-width="80" label-position="left">
            <Row>
              <Col>
              <FormItem label="审查结果" prop="approvalResult">
                <RadioGroup v-model="approveModel.data.approvalResult" @on-change="changeStatus">
                  <Radio label="0" >通过</Radio>
                  <Radio label="1" >驳回</Radio>
                </RadioGroup>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col >
              <FormItem label="审查意见" prop="approvalOpinion1">
                <Select v-if="approveModel.data.approvalResult == 0" v-model="approveModel.data.approvalOpinion1" size="large">
                  <Option value="信息符实">信息符实</Option>
                </Select>
                <Select v-else v-model="approveModel.data.approvalOpinion1" size="large">
                  <Option value="借款利率不正确">借款利率不正确</Option>
                  <Option value="资料不全，有待完善">资料不全，有待完善</Option>
                  <Option value="不符合贷款资格">不符合贷款资格</Option>
                  <Option value="其他" >其他</Option>
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
          <Button type="primary" size="large" :loading="approveModel.loading" @click="approvalConfirm">确定</Button>
        </div>
      </Modal>
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
      selectList: [],
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      cPageNum: 1,
      cPageSize: 10,
      cPageSizeOpts: [5, 10, 15, 20],
      showImportModal: false,
      logoName: LOGO_NAME,
      uploadUrl: UPLOAD_API_URL,
      uploadObj: {
        gridCode: null
      },
      model: {
        show: false,
        title: '你确定要删除这行内容么？',
        id: null,
        content: '',
        loading: false
      },
      approvalModel: {
        show: false,
        title: '提交审批',
        data: { },
        content: '',
        loading: false
      },
      approveModel: {
        show: false,
        title: '审查',
        data: {
          approvalResult: '0',
          approvalOpinion: '',
          approvalOpinion1: ''
        },
        content: '',
        loading: false
      },
      modelPreview: {
        show: false,
        title: '打印预览',
        list: [],
        loading: false
      },
      detail: {
        show: false
      },
      search: {
        type: 'customerName',
        keyword: '',
        attachFlag: '0',
        approvalStatus: '5'
      },
      addSearch: {
        type: 'customerName',
        keyword: ''
      },
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
          title: '授信金额(万)',
          key: 'rental',
          align: 'left',
          width: 130
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
          align: 'center',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            // 会计
            let type1 = ''
            if (user.roles[0].roleId === 2 && params.row.status === '0' && params.row.approvalStatus === '1') {
              type1 = 'Button'
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
                    this.$router.push('/credit/result/showDetail?id=' + params.row.id + '&faceSignFlag=2')
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
                    this.approve(params.row)
                  }
                }
              }, '审查')
            ])
          }
        }
      ],
      customerColumns: [
        {
          title: '姓名',
          key: 'customerName',
          width: 99,
          align: 'center'
        },
        {
          title: '身份证',
          key: 'idNumber',
          width: 190,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phoneNumber',
          minWidth: 10,
          align: 'center'
        },
        {
          title: '网格',
          key: 'gridName',
          minWidth: 10,
          align: 'center'
        },
        {
          title: '户号',
          key: 'householdId',
          align: 'center'
        }
        /* {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
                let type=""
                let status=params.row.status
                if(status==0){
                    type='暂存'
                }else if(status==5){
                    type='正常'
                }else if(status==6){
                    type='冻结'
                }
                return h('span', {
                    props: {
                    },
                },type)
            }
        }, */
      ],
      customerColumnsList: [],
      gridNameList: [],
      list: [],
      // 打印申请表
      perviewList: [],
      print: {
        options: {
          'noPrint': '.no-print'
        },
        init: function () {
          var content = this.getStyle() + this.getHtml()
          this.writeIframe(content)
        },
        getStyle: function () {
          var str = ''
          var styles = document.querySelectorAll('style,link')
          for (var i = 0; i < styles.length; i++) {
            str += styles[i].outerHTML
          }
          str += '<style>' + (this.options.noPrint ? this.options.noPrint : '.no-print') + '{display:none;}</style>'
          return str
        },
        getHtml: function () {
          var inputs = document.querySelectorAll('input')
          var textareas = document.querySelectorAll('textarea')
          var selects = document.querySelectorAll('select')
          for (var k in inputs) {
            if (inputs[k].type === 'checkbox' || inputs[k].type === 'radio') {
              if (inputs[k].checked === true) {
                inputs[k].setAttribute('checked', 'checked')
              } else {
                inputs[k].removeAttribute('checked')
              }
            } else if (inputs[k].type === 'text') {
              inputs[k].setAttribute('value', inputs[k].value)
            }
          }
          for (var k2 in textareas) {
            if (textareas[k2].type === 'textarea') {
              textareas[k2].innerHTML = textareas[k2].value
            }
          }
          for (var k3 in selects) {
            if (selects[k3].type === 'select-one') {
              var child = selects[k3].children
              for (var i in child) {
                if (child[i].tagName === 'OPTION') {
                  if (child[i].selected === true) {
                    child[i].setAttribute('selected', 'selected')
                  } else {
                    child[i].removeAttribute('selected')
                  }
                }
              }
            }
          }
          return document.getElementById('print').innerHTML
        },
        writeIframe: function (content) {
          var w
          var doc
          var iframe = document.createElement('iframe')
          var f = document.body.appendChild(iframe)
          iframe.id = 'myIframe'
          iframe.style = 'position:absolute;width:0;height:0;top:-10px;left:-10px;'
          w = f.contentWindow || f.contentDocument
          doc = f.contentDocument || f.contentWindow.document
          doc.open()
          doc.write(content)
          doc.close()
          this.toPrint(w)
          setTimeout(function () {
            document.body.removeChild(iframe)
          }, 100)
        },
        toPrint: function (frameWindow) {
          try {
            setTimeout(function () {
              frameWindow.focus()
              try {
                if (!frameWindow.document.execCommand('print', false, null)) {
                  frameWindow.print()
                }
              } catch (e) {
                frameWindow.print()
              }
              frameWindow.close()
            }, 10)
          } catch (err) {
          }
        }
      }
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
    // 会计单条审查
    approve (row) {
      this.approveModel.data = {
        approvalResult: '0',
        approvalOpinion: '',
        approvalOpinion1: ''
      }
      this.approveModel.show = true
      this.selectList = []
      this.selectList.push(row)
    },
    // 选中待面谈面签
    selectionRow (selection) {
      this.selectList = selection
    },
    clickSubmint () {
      this.approveModel.data = {
        approvalResult: '0',
        approvalOpinion: '',
        approvalOpinion1: ''
      }
      if (this.selectList.length > 0) {
        this.approveModel.show = true
      } else {
        this.$Message.error('请选择客户')
      }
    },
    // 选中(批量)提交审批
    submitSelection () {
      let payload = { }
      payload.roleId = user.roles[0].roleId
      payload.list = [ ]
      this.selectList.forEach(item => {
        let j = {
          creditDetailId: item.id,
          approvalNode: '2',
          approvalAccountId: user.accountId,
          idNumber: item.idNumber,
          approvalName: user.realName, // 审批人姓名 为真实姓名
          approvalResult: this.approveModel.data.approvalResult,
          approvalOpinion: (this.approveModel.data.approvalOpinion === '' ? this.approveModel.data.approvalOpinion1 : this.approveModel.data.approvalOpinion)
        }
        payload.list.push(j)
      })
      this.approveModel.data = payload
    },
    // 确定提交
    approvalConfirm () {
      this.submitSelection()
      if (user.roles[0].roleId === 1) {
        this.approvalModel.loading = true
      } else if (user.roles[0].roleId === 2) {
        this.approveModel.loading = true
      }
      setTimeout(() => {
        if (this.approvalModel.loading) {
          this.approvalModel.loading = false
          this.approvalModel.show = false
        } else if (this.approveModel.loading) {
          this.approveModel.loading = false
          this.approveModel.show = false
        }
        this.$store.dispatch(actions.post.APPROVAL_RECORD, this.approveModel.data).then(rep => {
          if (rep.code !== 200 && rep.code !== 204) {
            this.$Message.error(rep.message)
          } else {
            if (user.roles[0].roleId === 1) {
              this.$Message.success('提交成功')
            } else if (user.roles[0].roleId === 2) {
              this.$Message.success('审查成功')
            }
          }
          this.onSearch()
        })
      }, 1000)
    },
    changeStatus () {
      this.approveModel.data.approvalOpinion1 = ''
    },
    // table中选中客户;currentRow:当前选中行数据,oldCurrentRow:上次选中行数据
    selectionLine (currentRow, oldCurrentRow) {
      this.addModel.selectLine = currentRow
    },
    // 选中客户保存
    selectionAddCustomer () {
      if (this.addModel.selectLine.customerId !== '') {
        this.addModel.show = false
        setTimeout(() => {
          // 跳转新增页面(回写选中客户信息，补充面签数据)
          this.$router.push('/credit/result/detail?customerId=' + this.addModel.selectLine.customerId)
        }, 100)
      } else {
        this.$Message.error('请选择客户')
      }
    },
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
        attachFlag: 2,
        approvalStatus: 1,
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
    cChangePage (num) {
      this.cPageNum = num
      this.$router.replace({ query: { pageNum: this.cPageNum } })
      this.addOnSearch()
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
    cOnPageSizeChange (pageSize1) {
      this.cPageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.cPageNum } })
      this.addOnSearch()
    },
    show (row) {
      this.detail.show = true
    },
    uploadAttach (row) {
      // 上传附件(合同/申请表)
      this.$router.push('/credit/result/upload?id=' + row.id + '&approvalStatus=' + row.approvalStatus)
    },
    edit (row) {
      this.$router.push('/credit/result/detail?id=' + row.id)
    },
    quit () {
      this.detail.show = false
    },
    delete (row) {
      this.model.data = row
      this.model.content = row.customerName
      this.model.id = row.id
      this.model.show = true
    },
    deleteUser () {
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.delete.RESULT_PERSON, this.model.id).then(rep => {
          if (rep.data.code !== 200) {
            this.$Message.error(rep.data.message)
          } else {
            this.$Message.success('删除成功')
          }
          this.onSearch()
        })
      }, 1000)
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
    addOnSearch () {
      if (!this.addModel.show) {
        this.addModel.show = true
      }
      var param = {
        [this.addSearch.type]: this.addSearch.keyword
      }
      if (this.uploadObj.gridCode != null) {
        param = {
          [this.addSearch.type]: this.addSearch.keyword,
          gridCode: this.uploadObj.gridCode
        }
      }
      this.fetchCustomerList(param)// 应调用查询客户接口
    },
    fetchCustomerList (params = {}) {
      var vue = this
      return this.$store.dispatch(actions.get.CUSTOMER_LIST, {
        pageNum: this.cPageNum,
        pageSize: this.cPageSize,
        status: 5,
        ...params
      }).then(rep => {
        if (rep.code === 200) {
          vue.customerColumnsList = rep.data
          vue.addModel.count = rep.count
        } else if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    // 查询流程列表
    iconClick (row) {
      var vue = this
      if (row.approvalStatusSteps.length === 0) {
        this.$store.dispatch(actions.get.APPROVAL_RECORD, row.id).then(rep => {
          if (rep.data.code === 200) {
            row.approvalStatusSteps = [ ...rep.data.data ]
          } else if (rep.data.code !== 204) {
            vue.$Message.error(rep.data.message)
          }
        })
      }
    },
    onImport () {
      if (this.uploadObj.gridCode == null) {
        this.$Message.error('请先选择网格')
      } else {
        this.$refs.upload.clearFiles()
        this.showImportModal = true
      }
    },
    onUpload (data) {
      if (data.code === 200) {
        this.showImportModal = false
        this.onSearch()
        this.$Message.success('有' + data.data.sum + '条记录导入成功')
      } else {
        this.$Message.error(data.message)
      }
    },
    goBack () {
      if (this.model.show) {
        this.model.show = false
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

<style lang="scss">
  /*页面面包屑样式*/
  .breadcrumb{
    height: 54px;
    background-color: #fff;
    line-height: 54px;
    padding-left: 24px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
  /*页面选择网格样式*/
  .respagetop {
    margin: 16px 24px;
    padding: 10px 24px;
    border-radius: 4px;
    background-color: #fff;
    .topButton {
      padding: 0px 5px 3px 5px;
      margin-left: 10px;
      text-align: center;
      height:30px;
      border-radius:4px;
    }
    button:hover, button.active {
      background: #1890FF;
      border-radius: 2px;
      color: #fff;
    }
  }
  /*页面内容显示样式*/
  .resultPage {
    margin: 16px 24px;
    padding: 20px;
    background-color: #fff;
    border-radius: 4px;
    .search {
      height: 32px;
      margin-bottom: 16px;
      .search-input {
        float: left;
        width: 300px;
      }
      .search-span {
        float: right;
        margin-right: 10px
      }
      Button {
        float: left;
      }
    }
    .button-group {
      margin-top: 20px;
      margin-bottom: 20px;
      .import {
        margin-left: 10px;
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
  }
  .detail-table {
    width: 100%;
    font-size: 10px;
    line-height: 32px;
  }
</style>
