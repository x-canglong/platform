<template>
    <div>
        <div class="faceSignedBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>授信管理</BreadcrumbItem>
                <BreadcrumbItem>已面谈面签</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="faceSignedPageTop">
            <div style="min-height: 30px">
                <span>请选择网格:</span>
                <Button class="topButton" type="text" :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
                </Button>
                <Button class="topButton" type="text" v-for="(h, index) in gridNameList" :key="index" :class="uploadObj.gridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode)">{{ h.gridName }}
                </Button>
            </div>
        </div>
        <div class="faceSignedPage">
            <div class="search">
                <Button type="primary" v-if="roleId == 1" @click="onPrint()">信贷下载</Button>
                <Button type="primary" icon="ios-search" @click="onSearch" style="float: right">查询</Button>
                <Input class="search-input" v-model="search.keyword" clearable @on-change="onChangeNull" style="float: right;margin-right: 10px">
                <Select v-model="search.type" slot="prepend" size="large" style="width: 90px;">
                    <Option value="customerName">客户姓名</Option>
                    <Option value="idNumber">身份证号</Option>
                </Select>
                </Input>
            </div>
            <div class="table">
                <Table ref="selection" :columns="columns" :data="list" @on-selection-change="printCancel"></Table>
            </div>
            <div class="pagination">
                <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
                <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
            </div>
        </div>
        <!--确认批量下载弹窗-->
        <Modal v-model="modelTips.show" width="320" footer-hide :styles="{top: '120px'}">
            <div style="padding: 0 0 10px 0;font-size: 16px;color:rgba(0,0,0,0.85);">
                <Icon style="color:#1890FF;line-height:24px;" type="ios-paper"></Icon>
                <span> 确定要下载信贷系统报表吗？</span>
            </div>
            <p style="margin:0 0 30px 10px;padding-left: 20px;font-size:14px;color:rgba(0,0,0,0.65);">您共选择 <span
                    style="color: red">{{ modelTips.num }}</span> 份信贷系统报表。</p>
            <div style="width: 100%;text-align: right">
                <Button style="width:65px;height:32px;" size="large" @click="goBack">取消</Button>
                <Button type="primary" style="margin-left:10px;width:65px;height:32px;background-color:#1890FF"
                        size="large" @click="perviewShow">确定
                </Button>
            </div>

        </Modal>
        <!--征信查看-->
        <Modal v-model="modalCredit.show" fullscreen>
            <div v-html="modalCredit.data">{{ modalCredit.data }}</div>
        </Modal>
        <!--要打印得部分v-show="divPdf"-->
        <div v-show="divPdf" id="print"> <!--  要打印得区域 以id为记号-->
            <div v-for="(customerList,index) in perviewList" :key="index" style="font-size: 20px;color: rgba(0,0,0,0.85)">
                <div style="padding:50px 20px;background: #f8f8f9">
                    <p style="text-align: center;font-size: 24px;font-weight:bold">信贷信息报表</p>
                </div>
                <div style="padding:15px 20px;background: #f8f8f9">
                    <Card title="身份信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                        <CellGroup>
                            <Row class="rowStyle">
                                <Col span="10">
                                    客户姓名：
                                    <span style="color: rgba(0,0,0,0.65)">
                                        {{customerList.CustomerInfo.customerName?customerList.CustomerInfo.customerName:'&nbsp;'}}
                                    </span>
                                </Col>
                                <Col offset="1" span="10">
                                    性别：
                                    <span style="color: rgba(0,0,0,0.65)">
                                        {{customerList.CustomerInfo.sex ? customerList.CustomerInfo.sex : '&nbsp;'}}
                                    </span>
                                </Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="10">
                                    出生日期：
                                    <span style="color: rgba(0,0,0,0.65)">
                                        {{customerList.CustomerInfo.birthday?customerList.CustomerInfo.birthday:'&nbsp;'}}
                                    </span>
                                </Col>
                                <Col offset="1" span="10">
                                    移动电话：
                                    <span style="color: rgba(0,0,0,0.65)">
                                        {{customerList.CustomerInfo.phoneNumber?customerList.CustomerInfo.phoneNumber:'&nbsp;'}}
                                    </span>
                                </Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="10">
                                    证件类型：
                                    <span style="color: rgba(0,0,0,0.65)">
                                        居民身份证
                                    </span>
                                </Col>
                                <Col offset="1" span="10">
                                    证件号码：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.idNumber?customerList.CustomerInfo.idNumber:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="10">
                                    国籍：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.nationality?customerList.CustomerInfo.nationality:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="10">
                                    政治面貌：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.politicsStatus?customerList.CustomerInfo.politicsStatus:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="10">
                                    婚姻状况：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.maritalStatus?customerList.CustomerInfo.maritalStatus:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="10">
                                    文化水平：
                                    <span style="color: rgba(0,0,0,0.65)">
                                    {{customerList.CustomerInfo.educationLevel?customerList.CustomerInfo.educationLevel:'&nbsp;'}}
                                </span>
                                </Col>
                            </Row>
                            <Row class="rowStyle">
                                <!-- <Col span="10">
                                 最高学位：<span
                                     style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.academicDegree?customerList.CustomerInfo.academicDegree:'&nbsp;'}}</span></Col>
                                -->
                                <Col span="10">
                                    是否本行股东：<span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isStockholder?customerList.CustomerInfo.isStockholder:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="10">
                                    年收入：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.yearSalary?customerList.CustomerInfo.yearSalary:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="10">
                                    居住状况：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.livingSituation?customerList.CustomerInfo.livingSituation:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="10">
                                    行政区域：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.nativePlace?customerList.CustomerInfo.nativePlace:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="10">
                                    身体状况：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.physicalCondition?customerList.CustomerInfo.physicalCondition:'&nbsp;'}}</span></Col>

                                <Col offset="1" span="10">
                                    借贷人性质：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.borrowerNature?customerList.CustomerInfo.borrowerNature:'&nbsp;'}}</span></Col>
                            </Row>
                            <!--<Row class="rowStyle">
                                <Col span="10">
                                是否本行股东：<span
                                    style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isStockholder?customerList.CustomerInfo.isStockholder:'&nbsp;'}}</span></Col>
                            </Row>-->
                            <Row class="rowStyle">
                                <Col span="10">
                                    是否企业主：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isOwner?customerList.CustomerInfo.isOwner:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="10">
                                    本行员工标志：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isStaff?customerList.CustomerInfo.isStaff:'&nbsp;'}}</span></Col>
                            </Row>
                        </CellGroup>
                    </Card>
                </div>
                <div style="padding:15px 20px;background: #f8f8f9">
                    <Card title="家庭信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                        <CellGroup>
                            <Row class="rowStyle">
                                <Col span="8">
                                    档案编号(户号)：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.householdId?customerList.CustomerInfo.householdId:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="8">
                                    家庭人口：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.population?customerList.FamilyInfo.population:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="6">
                                    家庭是否和睦：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.isHarmony?customerList.FamilyInfo.isHarmony:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="8">
                                    邮政编码：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.postcode?customerList.CustomerInfo.postcode:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="8">
                                    当地信用环境：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.localCredit?customerList.FamilyInfo.localCredit:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="6">
                                    社会评价：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.socialEvaluation?customerList.FamilyInfo.socialEvaluation:'&nbsp;'}}</span></Col>

                            </Row>
                            <Row class="rowStyle">
                                <!--<Col span="8">
                                维护客户经理：
                                <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.accountId?customerList.FamilyInfo.accountId:'&nbsp;'}}</span></Col>
-->
                                <Col span="8">
                                    主营业务是不是自办实体：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.isSelfEntity?customerList.FamilyInfo.isSelfEntity:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="8">
                                    是否欠缴税收(除个税)：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.isOweTax?customerList.FamilyInfo.isOweTax:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="8">
                                    生产经营能力：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.produceCapacity?customerList.FamilyInfo.produceCapacity:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="8">
                                    生产经营场景：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.produceScene?customerList.FamilyInfo.produceScene:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="13">
                                    参加保险情况：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.insuranceType?customerList.FamilyInfo.insuranceType:'&nbsp;'}}</span></Col>
                            </Row>
                            <Row class="rowStyle">
                                <Col span="13">
                                    详细地址：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.residenceAddress?customerList.CustomerInfo.residenceAddress:'&nbsp;'}}</span></Col>
                            </Row>
                        </CellGroup>
                    </Card>
                </div>
                <div style="padding:15px 20px;background: #f8f8f9">
                    <Card title="职业信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                        <CellGroup>
                            <Row class="rowStyle">
                                <Col span="8">
                                    职业：
                                    <span style="color: rgba(0,0,0,0.65)">{{(customerList.FinanceInfo && customerList.FinanceInfo.career)?customerList.FinanceInfo.career:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="8">
                                    行业类别：
                                    <span style="color: rgba(0,0,0,0.65)">{{(customerList.FinanceInfo && customerList.FinanceInfo.industry)?customerList.FinanceInfo.industry:'&nbsp;'}}</span></Col>
                            </Row>
                        </CellGroup>
                    </Card>

                </div>
                <div style="padding:15px 20px;background: #f8f8f9">
                    <Card title="地址信息" icon="ios-bookmark" :paddomg="50" :bordered="false" shadow>
                        <CellGroup>
                            <Row class="rowStyle">
                                <Col span="8">
                                    地址类型：
                                    <span style="color: rgba(0,0,0,0.65)">常住地址</span></Col>
                                <Col span="10">
                                    地址：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.residenceAddress?customerList.CustomerInfo.residenceAddress:'&nbsp;'}}</span></Col>
                                <Col offset="1" span="4">
                                    邮编：
                                    <span style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.postcode?customerList.CustomerInfo.postcode:'&nbsp;'}}</span></Col>
                            </Row>
                        </CellGroup>
                    </Card>
                </div>
                <div class="PageNext" v-if="index<=perviewList.length-1">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import actions from '@/store/action-types'

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  data () {
    return {
      roleId: user.roles[0].roleId,
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      showImportModal: false,
      uploadObj: {
        gridCode: null
      },
      search: {
        type: 'customerName',
        keyword: '',
        attachFlag: '0',
        approvalStatus: '3'
      },
      gridNameList: [],
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
          width: 120,
          render: (h, params) => {
            let texts = ''
            if (params.row.approvalStatus === '0') {
              texts = '待提交'
            } else if (params.row.approvalStatus === '1') {
              texts = '审查中'
            } else if (params.row.approvalStatus === '3') {
              texts = '已通过'
            } else if (params.row.approvalStatus === '4') {
              texts = '驳回'
            }
            return h('div', {
              props: {
                type: 'text',
                size: 'small'
              }
            }, texts)
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
            return h('div', {
              style: {
                align: 'right',
                fontSize: '14px'
              }
            }, [
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$router.push('/credit/result/showDetail?id=' + params.row.id + '&faceSignFlag=1')
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showCredit(params.row)
                  }
                }
              }, '信贷'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.creditChecked(params.row)
                  }
                }
              }, '征信')
            ])
          }
        }
      ],
      modelTips: {
        show: false,
        title: '提示',
        num: ''
      }, // 批量下载
      modalCredit: {
        show: false,
        data: ''
      }, // 征信查看
      perviewList: [], // 批量下载时 查询到的客户详细信息
      divPdf: false, // 批量下载弹窗
      printlist: [], // 表格多选--被选中得信息
      // 打印功能,
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
              // textareas[k2].innerHTML = textareas[k2].value
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
            /* console.log('err', err); */
          }
        }
      }
    }
  },
  computed: {
    ...mapState({
      list: state => state.result.resultlist,
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
    creditChecked (row) {
      this.modalCredit.show = true
      var vue = this
      this.$store.dispatch(actions.get.file_TEST_LIST, row.id).then(rep => {
        let a = rep.data.data
        let b = a.split('报告结束')
        vue.modalCredit.data = '<!DOCTYPE HTML' + b[0].split('<!DOCTYPE HTML')[1]
      })
    },
    showCredit (row) {
      this.$router.push('/credit/loanApproval/tatement?idNumber=' + row.idNumber)
    },
    uploadAttach (row) {
      // 上传附件(合同/申请表) 已面签页面只有查看功能
      this.$router.push('/credit/result/upload?id=' + row.id + '&approvalStatus=' + row.approvalStatus)
    },
    changeGrid (gridCode) {
      this.uploadObj.gridCode = gridCode
      this.onSearch()
    },
    onChangeNull () {
      if (this.search.keyword === '') {
        this.$router.replace({ query: { pageNum: this.pageNum } })
        this.onSearch()
      }
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
        if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
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
    // 选择按钮事件  把选中得信息存起来  selection：被选中得信息集合 数组
    printCancel (selection) {
      this.printlist = selection
      sessionStorage.setItem('printlist', JSON.stringify(this.printlist))
    },
    // 批量下载按钮
    onPrint () {
      if (this.printlist.length > 0) {
        this.modelTips.num = this.printlist.length
        this.modelTips.show = true
      } else {
        this.$Message.error('请先选择客户信息')
      }
    },
    // 批量下载弹窗里的确定按钮 触发
    perviewShow () {
      this.modelTips.show = false
      var vue = this
      this.perviewList = []
      let len = 0
      for (let i in this.printlist) {
        let row = this.printlist[i]

        this.$store.dispatch(actions.get.CREDIT_LIST, row.idNumber).then(rep => {
          if (rep.data.code === 200) {
            let customer = {
              CustomerInfo: rep.data.CustomerInfo,
              FamilyInfo: rep.data.FamilyInfo,
              FinanceInfo: rep.data.FinanceInfo
            }
            vue.perviewList.push(customer)
          } else if (rep.data.code !== 204) {
            vue.$Message.error(rep.data.message)
          }
          len++
          if (len === vue.printlist.length) {
            if (vue.perviewList.length === 0) {
              this.$Message.error('您选择的客户皆找不到对应信息！')
            } else {
              setTimeout(() => {
                this.print.init()
              }, 1000)
            }
          }
        })
      }
    },
    // 批量下载弹窗里的取消按钮
    goBack () {
      this.modelTips.show = false
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

<style lang="scss">
    @page {
        size:A4 portrait;
        margin: 0px 30px;
    }
    .PageNext{
        page-break-after:always;
    }
    .faceSignedBreadcrumb{
        height: 54px;
        background-color: #fff;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .faceSignedPageTop {
        margin: 16px 24px;
        padding: 10px 20px;
        border-radius: 4px;
        background-color: #fff;
        button:hover, button.active {
            background: #1890FF;
            border-radius: 2px;
            color: #fff;
        }
        .topButton {
            padding: 0px 5px 3px 5px;
            margin-left: 10px;
            text-align: center;
            height:30px;
            border-radius:4px;
        }
    }
    .faceSignedPage{
        margin: 16px 24px;
        padding: 20px;
        background-color: #fff;
        border-radius: 4px;
        .search {
            height: 32px;
            margin-bottom: 16px;
            .search-input {
                float: left;
                width: 400px;
            }
            Button {
                float: left;
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
</style>
