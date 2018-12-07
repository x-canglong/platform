<template>
  <!--待面谈面签页面-->
  <div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>授信管理</BreadcrumbItem>
        <BreadcrumbItem to="/credit/result">待面谈面签</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="respagetop">
      <div style="line-height: 30px;min-height: 30px">
        <span>请选择网格:</span>
        <Button class="topButton" type="text" :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
        </Button>
        <Button class="topButton" type="text" v-for="(h, index) in gridNameList" :key="index" :class="uploadObj.gridCode==h.gridCode?'active':''" @click="changeGrid(h.gridCode,h.gridName)">{{ h.gridName }}
        </Button>
      </div>
      <Divider style="margin: 14px 0;" v-if="roleId == 1"/>
      <div class="import" v-if="roleId == 1">导入名单:   <Button class="import" @click="onImport"  icon="ios-download-outline">上传文件</Button></div>
      <Modal v-model="showImportModal" title="批量导入" width="400px" :footer-hide="true" :styles="{top: '200px'}">
        <Upload ref="upload" multiple type="drag" :headers="headers" :data="uploadObj" :action="uploadUrl+'/file/credit/detail'" :on-success="onUpload">
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击或将文件拖拽到这里上传</p>
          </div>
          <div></div>
        </Upload>
        <p style="margin-top: 16px">注：导入用户请先下载<a :href="uploadUrl+'/template/BackToBackCreditDetail.xls'">模板</a>，按要求填写、上传进行导入。</p>
      </Modal>
    </div>
    <div class="resultPage">
      <div class="search">
        <Button type="primary" icon="ios-add" @click="addCustomer" v-if="roleId == 1">新建</Button>
        <Button style="margin-left: 10px;"  @click="onPrint" v-if="roleId == 1">打印申请表</Button>
        <!-- <Button @click="clickSubmint" v-if="roleId == 2">批量审查</Button> -->
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
              <Option value="5" v-if="roleId == 1" >全部</Option>
              <Option value="0" >未提交</Option>
              <Option value="4" >驳回</Option>
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
        <Table ref="dataList" :columns="columns" :data="list" @on-selection-change="printCancel"></Table>
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
      <Modal v-model="addModel.show" title="新增客户" width="60%" :closable="false">
        <div>
          <Input v-model="addSearch.keyword" clearable @on-change="onChangeNull" style="float: left;margin-right: 10px;width: 400px">
              <Select v-model="addSearch.type" slot="prepend" size="large" style="width: 90px;">
                <Option value="customerName">客户姓名</Option>
                <Option value="idNumber">身份证号</Option>
              </Select>
          </Input>
          <Button type="primary" icon="ios-search" @click="addOnSearch" style="margin-bottom: 16px;">查询</Button>
          <div>
            <Table ref="selection" height="280" highlight-row
                   @on-current-change="selectionLine"
                   :columns="customerColumns" :data="customerColumnsList">
            </Table>
          </div>
          <div style="height: 32px;margin-bottom: 10px;">
            <div style="line-height: 32px; float: left;margin-top: 14px;">共{{ addModel.count }}条记录 第 {{ cPageNum }} / {{ Math.ceil(addModel.count / cPageSize) }} 页</div>
            <Page style="float: right;" show-sizer @on-page-size-change="cOnPageSizeChange" :page-size-opts="cPageSizeOpts" :current="cPageNum" :page-size="cPageSize" :total="addModel.count" @on-change="cChangePage" show-elevator/>
          </div>
        </div>
        <div slot="footer">
          <Button size="large" @click="goBack">取消</Button>
          <Button type="primary" size="large" @click="selectionAddCustomer">确定</Button>
        </div>
      </Modal>
      <Modal v-model="modelPreview.show" width="60%" :footer-hide="true">
        <div class="printpage">
          <div >
            <Button type="primary" @click="Print">打印</Button>
          </div>
          <div id="print">
            <div v-for="(person,index) in perviewList" :key="index" style="font-family : SimSun;">
              <div style="margin-bottom: 10px;" >
                <br/>
                <br/>
                <br/>
                <h1 style="text-align: center;margin-bottom: 10px;">{{ logoName }}网格化授信面签申请表</h1>
                <p style="margin: 10px 0;text-align: left;text-indent: 2em;font-size: 14px;">“今天的信用是您明天的财富”，{{ logoName }}特别提醒您:积累提升自己的信用记录，会给您的家庭生活、子女学习工作等带来宝贵的财富。珍爱信用记录，享受幸福人生。</p>
              </div>
              <table class="detail-table" border="1" cellspacing="0" cellpadding="0" align="center">
                <tr>
                  <td rowspan="8" width="4%" style="text-align:center;"><h4>客<br/>户<br/>信<br/>息</h4></td>
                  <td width="15%" style="text-align:center;"><div style="line-height:30px;"><b>姓名</b></div></td>
                  <td width="17%" style="text-align:center;">{{ person.name }}</td>
                  <td width="16%" style="text-align:center;"><b>身份证号码</b></td>
                  <td colspan="3" width="48%" style="text-align:center;">{{ person.idNumber }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>性别</b></div></td>
                  <td style="text-align:center;">{{ person.sex }}</td>
                  <td style="text-align:center;"><b>婚姻状况</b></td>
                  <td colspan="3" style="text-align:center;">{{ person.maritalStatus }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>配偶姓名</b></div></td>
                  <td style="text-align:center;">{{ person.spouseName }}</td>
                  <td style="text-align:center;"><b>身份证号码</b></td>
                  <td colspan="3" style="text-align:center;">{{ person.spouseIdNumber }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>文化水平</b></div></td>
                  <td style="text-align:center;">{{ person.educationLevel }}</td>
                  <td style="text-align:center;"><b>手机号</b></td>
                  <td width="28%" style="text-align:center;">{{ person.phoneNumber }}</td>
                  <td width="12%" style="text-align:center;"><b>家庭人数</b></td>
                  <td width="8%" style="text-align:center;">{{ person.familyPopulation }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><b>经营(工作)单位</b></td>
                  <td colspan="2" style="text-align:center;">{{ person.companyName  }}</td>
                  <td colspan="3" style="text-align: left;">
                    <div style="width:38%;float:left;border-right:1px solid #000;line-height:65px;text-align: center;"><b>经营(工作)地址</b></div>
                    <div style="width:62%;float:left;text-align:center;line-height:65px;">{{ person.companyAddress  }}</div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>户籍住址</b></div></td>
                  <td colspan="5" style="text-align:center;">{{ person.nativeAddress }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>常驻地址</b></div></td>
                  <td colspan="5" style="text-align:center;">{{ person.residenceAddress }}</td>
                </tr>
                <tr>
                  <td style="text-align:center;"><b>金农易贷户名</b></td>
                  <td style="text-align:center;"> </td>
                  <td style="text-align:center;"><b>金农易贷账(卡)号</b></td>
                  <td colspan="3" style="text-align: left;"> </td>
                </tr>
                <tr>
                  <td rowspan="2" width="4%" style="text-align:center;"><h4>申<br/>请</h4></td>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>授信金额大写</b></div></td>
                  <td colspan="2" style="text-align:center;"> </td>
                  <td colspan="3" style="text-align: left;">
                    <div style="width:25%;float:left;border-right:1px solid #000;line-height:30px;;text-align: center;"><b>期限</b></div>
                    <div style="width:23%;float:left;border-right:1px solid #000;line-height:30px;;text-align: center;">&nbsp;</div>
                    <div style="width:25%;float:left;border-right:1px solid #000;line-height:30px;;text-align: center;"><b>发放方式</b></div>
                    <div style="width:25%;float:left;line-height:30px;;text-align: center;">&nbsp;</div>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;"><div style="line-height:30px;"><b>借款用途</b></div></td>
                  <td colspan="2" style="text-align:center;"> </td>
                  <td style="text-align:center;"><b>还款方式</b></td>
                  <td colspan="2" style="text-align:center;"> </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <h4>面<br/>谈<br/>面<br/>签</h4>
                  </td>
                  <td colspan="6" style="text-align: left;line-height: 30px;">
                    <b>
                      <p style='margin-left: 20px;'>1.您个人年收入_________元；家庭的全年经济收入__________万元；</p>
                      <p style='margin-left: 20px;'>2.您所提供的个人的身份、职业、工作单位、住址、联系电话等个人资料是否准确？□是  □否（客户信息资料是否真实）</p>
                      <p style='margin-left: 20px;'>3.以上谈话内容是否真实？是否是您真实的意思表示？□是   □否</p>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td style="text-align:center;">
                    <h4>申<br/>请<br/>人<br/>签<br/>名</h4>
                  </td>
                  <td colspan="6" style="text-align: left;line-height: 30px;">
                    <b>
                      <p style='margin-left: 20px;'>
                        &nbsp;&nbsp;本人声明:本人保证以上信息及提供给贵行资料的真实性，贵行可就本人或家庭的收入、财产状况及经营情况等进行调查评估、采集照片等资料。无论贵行是否发放贷款，贵行均有权保留此申请书及相关资料。本人承诺自主支付方式的贷款资金严格履行约定的用途，否则承担相应违约责任。
                      </p>
                      <p style='margin-left: 20px;'>
                        &nbsp;&nbsp;本人授权贵行在办理本笔业务审批、贷后管理过程中（从业务申请至业务终止）将本人信用信息提供给中国人民银行个人信用信息基础数据库及信贷征信主管部门批准建立的其他个人信用信息数据库。并授权贵行向上述个人信用信息数据库或有关单位、部门及个人查询本人的信用状况，查询获得的信用报告限用于中国人民银行颁布的《个人信用信息基础数据库管理暂行办法》规定用途范围内。贵行不得超出本授权查询，否则由贵行承担由此引发一切后果及法律责任。本授权人对上述授权条款含义及相应的法律后果已全部通晓并充分理解。
                      </p>
                      <p style='margin-left: 20px;'>
                        &nbsp;&nbsp;借款申请人签名:
                      </p>
                      <p style='float: right;margin-right: 20px;'>
                        日期:&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日
                      </p>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colspan="7" style="text-align: left;">
                    <p style="line-height:30px;float:left;padding-left: 40px"><b>银行受理人员:</b></p>
                    <p style="line-height:30px;float: right;margin-right: 20px;"><b>日期:&nbsp;&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;月&nbsp;&nbsp;日</b></p>
                  </td>
                </tr>
              </table>
              <div class="PageNext" v-if="index<perviewList.length-1"></div>
            </div>
          </div>
        </div>
      </Modal>
      <Modal v-model="modelTips.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
        <div style="padding: 0 0 10px 0;font-size: 16px;">
          <Icon type="ios-paper" style="color:#2d8cf0;line-height:24px;"></Icon>
          <span>确定要下载申请表吗？</span>
        </div>
        <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
          <p>您共选择 {{ modelTips.num }} 份授信申请表。</p>
        </div>
        <div style="text-align: right">
          <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
          <Button type="primary" size="large"  @click="perviewShow">确定</Button>
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
        gridCode: null,
        gridName: null,
        accountId: user.accountId,
        accountName: user.accountName,
        orgCode: user.orgCode,
        orgName: user.orgName
      },
      model: {
        show: false,
        title: '你确定要删除这行内容么？',
        id: null,
        content: '',
        loading: false
      },
      addModel: {
        show: false,
        title: '新增客户',
        count: 0,
        selectLine: { customerId: '' }
      },
      modelTips: {
        show: false,
        title: '提示',
        num: ''
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
            if (params.row.approvalStatus === '0' && params.row.attachFlag === '1.1' && params.row.status !== '2') {
              texts = '未提交'
              BadgeStatus = 'default'
            } else if (params.row.approvalStatus === '4') {
              texts = '驳回'
              BadgeStatus = 'error'
            } else {
              texts = '待完善'
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
                    if (BadgeStatus === 'error') {
                      this.iconClick(params.row)
                    }
                  }
                }
              }, texts),
              h(BadgeStatus === 'error' ? 'Icon' : '', {
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
          width: 240,
          render: (h, params) => {
            // 客户经理
            let type1 = ''
            // 申请表
            let type4 = ''
            // 提交
            let type5 = ''
            if (user.roles[0].roleId === 1) {
              if (params.row.approvalStatus === '0' || params.row.approvalStatus === '4') {
                type1 = 'Button'
              }
              if (params.row.status === '0' && params.row.attachFlag === '1.1') {
                type5 = 'Button'
              } else {
                type4 = 'Button'
              }
            }
            return h('div', {
              style: {
                align: 'right'
              }
            }, [
              h(type4, {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.showApplication(params.row)
                  }
                }
              }, '申请表'),
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
              h(type5, {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.submitDetail(params.row)
                  }
                }
              }, '提交'),
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
        }
        // {
        //   title: '网格',
        //   key: 'gridName',
        //   minWidth: 10,
        //   align: 'center'
        // },
        // {
        //   title: '户号',
        //   key: 'householdId',
        //   align: 'center'
        // }
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
              setTimeout(function () {
                if (frameWindow) {
                  document.body.removeChild(frameWindow)
                }
              }, 300)
            }, 100)
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
    showApplication (row) {
      var vue = this
      this.perviewList = []
      this.$store.dispatch(actions.get.PREVIEWS_PERSON, row.customerId).then(rep => {
        if (rep.code === 200) {
          vue.perviewList.push(rep.data)
          vue.modelPreview.show = true
        } else {
          vue.$Message.error(rep.message)
        }
      })
    },
    // 资料打印
    onPrint () {
      if (this.perviewList.length > 0) {
        this.printlist = [...this.perviewList]
        this.modelTips.num = this.printlist.length
        this.modelTips.show = true
        this.$refs.dataList.selectAll(false)
      } else {
        this.$Message.error('请先选择客户信息')
      }
    },
    // 批量获取客户ID,改变状态
    printCancel (selection) {
      this.perviewList = []
      for (let i in selection) {
        this.perviewList.push(selection[i])
      }
    },
    Print () {
      this.print.init()
    },
    perviewShow () {
      this.modelTips.show = false
      var vue = this
      this.perviewList = []
      let len = 0
      for (let i in this.printlist) {
        this.$store.dispatch(actions.get.PREVIEWS_PERSON, this.printlist[i].customerId).then(rep => {
          if (rep.code === 200) {
            vue.perviewList.push(rep.data)
          } else {
            vue.$Message.error(rep.message)
          }
          len++
          if (len === vue.printlist.length && vue.perviewList.length !== 0) {
            setTimeout(() => {
              this.print.init()
            }, 1000)
          }
        })
      }
    },
    // 提交
    submitDetail (row) {
      this.$store.dispatch(actions.post.APPROVAL_RECORD, {
        list: [{
          creditDetailId: row.id,
          approvalNode: '1',
          approvalAccountId: user.accountId,
          idNumber: row.idNumber,
          approvalName: user.realName, // 审批人姓名 为真实姓名
          approvalResult: '0',
          approvalOpinion: '提交审批'
        }],
        roleId: 1
      }).then(rep => {
        if (rep.code !== 200 && rep.code !== 204) {
          this.$Message.error(rep.message)
        } else {
          this.$Message.success('提交成功')
        }
        this.onSearch()
      })
    },
    // 新建
    addCustomer () {
      this.addOnSearch()
    },
    // table中选中客户;currentRow:当前选中行数据,oldCurrentRow:上次选中行数据
    selectionLine (currentRow, oldCurrentRow) {
      this.addModel.selectLine = currentRow
    },
    // 选中客户保存
    selectionAddCustomer () {
      if (this.addModel.selectLine.customerId !== '') {
        this.addModel.show = false
        this.$store.dispatch(actions.get.CUSTOMERS_PERSON, this.addModel.selectLine.idNumber).then(rep => {
          if (rep.code === 200) {
            this.addModel.selectLine = {
              ...rep.data,
              accountName: user.realName,
              accountId: user.accountId,
              orgCode: user.orgCode,
              orgName: user.orgName
            }
            this.$store.dispatch(actions.post.RESULT_PERSON, this.addModel.selectLine).then(resp => {
              if (resp.data.code === 200 || resp.data.code === 204) {
                // 跳转新增页面(回写选中客户信息，补充面签数据)
                this.$router.push('/credit/result/detail?id=' + resp.data.data.id)
              } else {
                this.$Message.error(resp.data.message)
              }
            })
          } else if (rep.code !== 200 && rep.code !== 204) {
            this.$Message.error(rep.message)
          }
        })
      } else {
        this.$Message.error('请选择客户')
      }
    },
    changeGrid (gridCode, gridName) {
      this.uploadObj.gridCode = gridCode
      this.uploadObj.gridName = gridName
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
            if (vue.list[i].approvalStatus === '4') {
              vue.list[i]._disabled = true
            }
          }
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    changePage (num) {
      console.log(123)
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    cChangePage (num) {
      this.cPageNum = num
      // this.$router.replace({ query: { pageNum: this.cPageNum } })
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
      return this.$store.dispatch(actions.get.WHITE_LIST, {
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
        this.$Message.success('有' + data.data.successCount + '条记录导入成功，有' + data.data.failCount + '条记录导入失败')
      } else {
        this.$Message.error(data.message)
      }
    },
    goBack () {
      if (this.model.show) {
        this.model.show = false
      }
      if (this.addModel.show) {
        this.addModel.show = false
      }
      if (this.modelTips.show) {
        this.modelTips.show = false
      }
    },
    dateFormat2 (date) {
      if (date) {
        let date1 = new Date(date)
        let month1 = date1.getMonth() + 1
        let day1 = date1.getDate()
        return date1.getFullYear() + '-' + (month1 >= 10 ? month1 : '0' + month1) + '-' + (day1 >= 10 ? day1 : '0' + day1)
      } else {
        return null
      }
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
