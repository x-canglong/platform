<template>
    <div>
        <div class="faceSignDetailBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>授信管理</BreadcrumbItem>
                <BreadcrumbItem to="/credit/result">待面谈面签</BreadcrumbItem>
                <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
                <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="faceSignDetailPageTop">
            <p>面签信息汇总表</p>
            <div>
            <Button size="large" @click="tmpSubmit('form')">返回</Button>
            <Button type="primary" size="large" @click="handleSubmit('form')">保存</Button>
            </div>
        </div>
        <div class="faceSignDetailPage">
            <Form ref="form" :model="form" :rules="ruleValidate" :label-width="150">
                <div class="pageDiv">
                    <div><p>客户管理</p></div>
                    <Divider style="margin: 14px 0;"/>
                    <div>
                        <Row>
                            <Col span="8">
                            <FormItem label="客户编号" prop="customerId">
                                <Input v-model="form.customerId" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="7">
                            <FormItem label="姓名" prop="customerName">
                                <Input v-model="form.customerName" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="1" style="text-align: center;margin-top: 6px;">
                            <a @click="checkCustomer">查看</a>
                            </Col>
                            <Col span="8">
                            <FormItem label="身份证号" prop="idNumber">
                                <Input v-model="form.idNumber" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="性别" prop="sex">
                                <RadioGroup v-model="form.sex">
                                    <Radio label="男" disabled>男</Radio>
                                    <Radio label="女" disabled>女</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="配偶姓名" prop="spouseName">
                                <Input v-model="form.spouseName" placeholder="请输入配偶姓名"></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="配偶身份证号" prop="spouseIdNumber">
                                <Input v-model="form.spouseIdNumber" placeholder="请输入配偶身份证号"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="文化水平" prop="educationLevel">
                                <Input v-model="form.educationLevel" disabled></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="手机号码" prop="phoneNumber">
                                <Input v-model="form.phoneNumber" placeholder="请输入11有效手机号码"></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="家庭人数" prop="memberCount">
                                <Input v-model="memberCount" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="经营(工作)单位" prop="companyName">
                                <Input v-model="form.companyName" placeholder="请输入经营(工作)单位"></Input>
                            </FormItem>
                            </Col>
                            <Col span="16">
                            <FormItem label="经营(工作)地址" prop="companyAddress">
                                <Input v-model="form.companyAddress" placeholder="请输入经营(工作)地址"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="户籍地址" prop="nativeAddress">
                                <Input v-model="form.nativeAddress" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            <FormItem label="常住地址" prop="residenceAddress">
                                <Input v-model="form.residenceAddress" disabled></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="金农易贷户名" prop="jnydName">
                                <Input v-model="form.jnydName" placeholder="请输入金农易贷户名"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="金农易贷账(卡)号" prop="jnydId">
                                <Input v-model="form.jnydId" placeholder="请输入金农易贷账(卡)号"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="pageDiv">
                    <div><p>申请</p></div>
                    <Divider style="margin: 14px 0;"/>
                    <div>
                        <Row>
                            <Col span="8">
                            <FormItem label="授信金额" prop="rental">
                                <Input v-model="form.rental" placeholder="请输入授信金额">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="授信期限" prop="deadline">
                                <Input v-model="form.deadline" placeholder="请输入授信期限">
                                    <span slot="append">年</span>
                                </Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="授信开始时间" prop="beginAt">
                                <DatePicker v-model="form.beginAt" type="date" @on-change="datePickerOnChange" placeholder="请输入授信开始时间"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="授信结束时间" prop="endAt">
                                <DatePicker v-model="form.endAt" v-if="endAtflag" type="date" :options="optionsEndAt" placeholder="请输入授信结束时间"></DatePicker>
                                <DatePicker v-model="form.endAt" v-if="!endAtflag" type="date" :options="optionsEndAt" disabled placeholder="请输入授信结束时间"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="借款利率选择" prop="rateType">
                                <Select v-model="form.rateType" size="large">
                                    <Option value="固定利率" >固定利率</Option>
                                    <Option value="浮动利率" >浮动利率</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="8" v-if="form.rateType == '固定利率'">
                            <FormItem label="年利率" prop="yearRate">
                                <Input v-model="form.yearRate" placeholder="请输入年利率">
                                    <span slot="append">%</span>
                                </Input>
                            </FormItem>
                            </Col>
                            <Col span="8" v-if="form.rateType == '浮动利率'">
                            <FormItem label="利率浮动" prop="rateFloat">
                                <Input v-model="form.rateFloat" placeholder="请输入利率浮动">
                                    <span slot="append">%</span>
                                </Input>
                            </FormItem>
                            </Col>
                            <Col span="8" v-if="form.rateType == '浮动利率'">
                            <FormItem label="利率调整日为" prop="rateUpdateDate">
                                <Select v-model="form.rateUpdateDate" size="large">
                                    <Option value="立即调整" >立即调整</Option>
                                    <Option value="每年1月1日调整" >每年1月1日调整</Option>
                                    <Option value="每月1日调整" >每月1日调整</Option>
                                    <Option value="每季度首月1日调整" >每季度首月1日调整</Option>
                                    <Option value="每年对月对日调整" >每年对月对日调整</Option>
                                    <Option value="其他约定的方式调整" >其他约定的方式调整</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="发放方式" prop="disbursement">
                                <Input v-model="form.disbursement" placeholder="请输入发放方式"></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="还款方式" prop="refundType">
                                <Select v-model="form.refundType" size="large">
                                    <Option value="等额本息还款法" >等额本息还款法</Option>
                                    <Option value="等额本金还款法" >等额本金还款法</Option>
                                    <Option value="到期一次性还本付息" >到期一次性还本付息</Option>
                                    <Option value="按期结息,到期还本" >按期结息,到期还本</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="借款用途" prop="creditUseType">
                                <Input v-model="form.creditUseType" placeholder="请输入借款用途"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="pageDiv">
                    <div><p>面谈面签</p></div>
                    <Divider style="margin: 14px 0;"/>
                    <div>
                        <Row>
                            <Col span="8">
                            <FormItem label="个人年收入" prop="income">
                                <Input v-model="form.income" placeholder="请输入个人年收入">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="家庭年收入" prop="familyIncome">
                                <Input v-model="form.familyIncome" placeholder="请输入家庭年收入">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="是否有金融顾问意见" prop="advisersFlag">
                                <RadioGroup v-model="form.advisersFlag">
                                    <Radio label="是">是</Radio>
                                    <Radio label="否">否</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="form.advisersFlag=='是'">
                            <Col span="8">
                            <FormItem label="收入" prop="advisersIncome">
                                <Input v-model="form.advisersIncome" placeholder="请输入收入">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="支出" prop="advisersExpense">
                                <Input v-model="form.advisersExpense" placeholder="请输入支出">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="授信额度" prop="advisersRental">
                                <Input v-model="form.advisersRental" placeholder="请输入授信额度">
                                    <span slot="append">万元</span>
                                </Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-if="form.advisersFlag=='是'">
                            <Col span="8">
                            <FormItem label="金融顾问姓名" prop="advisersName">
                                <Input v-model="form.advisersName" placeholder="请输入金额顾问姓名"></Input>
                            </FormItem>
                            </Col>
                            <Col span="16">
                            <FormItem label="备注" prop="advisersComment">
                                <Input v-model="form.advisersComment" placeholder="请输入备注"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="客户资料是否真实" prop="trueCustomerInfo">
                                <RadioGroup v-model="form.trueCustomerInfo">
                                    <Radio label="是">是</Radio>
                                    <Radio label="否">否</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="谈话内容是否真实" prop="trueCustomerTalk">
                                <RadioGroup v-model="form.trueCustomerTalk">
                                    <Radio label="是">是</Radio>
                                    <Radio label="否">否</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                            <FormItem label="银行受理人员" prop="staffName">
                                <Input v-model="form.staffName" placeholder="请输入银行受理人员"></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="面谈面签日期" prop="talkDate">
                                <!--<Input v-model="form.talkDate" placeholder="请输入面谈面签日期"></Input>-->
                                <DatePicker v-model="form.talkDate" type="date" placeholder="请输入面谈面签日期"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div class="pageDiv">
                    <Row>
                        <Col span="8">
                        <FormItem label="网格号" prop="gridCode">
                            <Input v-model="form.gridCode" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="网格名称" prop="gridName">
                            <Input v-model="form.gridName" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="登记人" prop="registrant">
                            <Input v-model="form.registrant" disabled></Input>
                        </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                        <FormItem label="登记机构" prop="registerOrg">
                            <Input v-model="form.registerOrg" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="登记日期" prop="createdAt">
                            <Input v-model="this.createdAt" disabled></Input>
                        </FormItem>
                        </Col>
                        <Col span="8">
                        <FormItem label="更新日期" prop="updatedAt">
                            <Input v-model="this.updatedAt" disabled></Input>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    </div>
</template>

<script>
import actions from '@/store/action-types'

const user = JSON.parse(sessionStorage.getItem('userObj'))
export default {
  data () {
    return {
      flag: false,
      endAtflag: false,
      form: { beginAt: '' },
      beginAt: '',
      endAt: '',
      optionsEndAt: { },
      createdAt: '',
      updatedAt: '',
      memberCount: '',
      ruleValidate: {
        phoneNumber: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          { type: 'string', min: 11, max: 11, pattern: '^1[34578]\\d{9}', message: '手机号码必须是1开头11位手机号', trigger: 'blur' }
        ],
        companyName: [
          { required: false, message: '经营(工作)单位不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 50, message: '经营(工作)单位最大长度为50位', trigger: 'blur' }
        ],
        companyAddress: [
          { required: false, message: '经营(工作)地址不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 100, message: '经营(工作)地址最大长度为100位', trigger: 'blur' }
        ],
        jnydName: [
          { required: false, message: '金农易贷户名不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '金农易贷户名最大长度为20位', trigger: 'blur' }
        ],
        jnydId: [
          { required: false, message: '金农易贷账(卡)号不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '金农易贷账(卡)号最大长度为20位', trigger: 'blur' },
          { pattern: '^[0-9]{1,20}$', message: '金农易贷账(卡)号应为数字', trigger: 'blur' }
        ],
        rental: [
          { required: true, message: '授信金额不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '^[0-9]{1}([0-9]{0,16})(.[0-9]{0,2})?$', message: '授信金额长度为1～18位,可保留2位小数', trigger: 'blur' }
        ],
        deadline: [
          { required: true, message: '授信期限不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '(^[1-9]([0-9]{0,19})$)|(^0$)', message: '授信期限为长度1～20位的整数', trigger: 'blur' }
        ],
        rateType: [
          { required: true, message: '借款利率不能为空', trigger: 'change' }

        ],
        yearRate: [
          { required: true, message: '年利率不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 5, pattern: '^([0-9]){1,2}(.[0-9]{0,2})?$', message: '年利率长度为1～2位,可保留2位小数', trigger: 'blur' }
        ],
        rateFloat: [
          { required: true, message: '利率浮动不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 5, message: '利率浮动最大长度为5位', trigger: 'blur' }
        ],
        rateUpdateDate: [
          { required: true, message: '利率调整日不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '利率调整日最大长度为20位', trigger: 'blur' }
        ],
        disbursement: [
          { required: true, message: '发放方式不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '发放方式最大长度为20位', trigger: 'blur' }
        ],
        refundType: [
          { required: true, message: '还款方式不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '还款方式最大长度为20位', trigger: 'blur' }
        ],
        creditUseType: [
          { required: true, message: '借款用途不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '借款用途最大长度为20位', trigger: 'blur' }
        ],
        income: [
          { required: true, message: '个人年收入不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '^[0-9]{1}([0-9]{0,16})(.[0-9]{0,2})?$', message: '个人年收入长度为1～18位,可保留2位小数', trigger: 'blur' }
        ],
        familyIncome: [
          { required: true, message: '家庭年收入不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '^[0-9]{1}([0-9]{0,16})(.[0-9]{0,2})?$', message: '家庭年收入长度为1～18位,可保留2位小数', trigger: 'blur' }
        ],
        advisersFlag: [
          { required: true, message: '是否有金融顾问意见不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 100, message: '是否有金融顾问意见最大长度为100位', trigger: 'blur' }
        ],
        advisersIncome: [
          { required: true, message: '收入不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '^[0-9]{1}([0-9]{0,16})(.[0-9]{0,2})?$', message: '收入长度为1～18位,可保留2位小数', trigger: 'blur' }
        ],
        advisersExpense: [
          { required: true, message: '支出不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '^[0-9]{1}([0-9]{0,16})(.[0-9]{0,2})?$', message: '支出长度为1～18位,可保留2位小数', trigger: 'blur' }
        ],
        advisersRental: [
          { required: true, message: '授信额度不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, pattern: '^[0-9]{1}([0-9]{0,16})(.[0-9]{0,2})?$', message: '授信额度长度为1～18位,可保留2位小数', trigger: 'blur' }
        ],
        advisersName: [
          { required: true, message: '金融顾问姓名不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '金融顾问姓名最大长度为20位', trigger: 'blur' }
        ],
        advisersComment: [
          { required: false, message: '', trigger: 'blur' },
          { type: 'string', min: 1, max: 100, message: '备注最大长度为100位', trigger: 'blur' }
        ],
        trueCustomerInfo: [
          { required: true, message: '客户资料是否真实不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 5, message: '客户资料是否真实为5位', trigger: 'blur' }
        ],
        trueCustomerTalk: [
          { required: true, message: '谈话内容是否真实不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 5, message: '谈话内容是否真实为5位', trigger: 'blur' }
        ],
        staffName: [
          { required: true, message: '银行受理人员姓名不能为空', trigger: 'blur' },
          { type: 'string', min: 1, max: 20, message: '银行受理人员姓名为20位', trigger: 'blur' }
        ],
        talkDate: [
          { required: true, type: 'date', message: '面谈面签日期不能为空', trigger: 'change' }
          /* { type: 'date', min: 1,max: 20, message: '面谈面签日期为20位', trigger: 'blur' } */
        ],
        beginAt: [
          { required: true, type: 'date', message: '授信开始时间不能为空', trigger: 'change' }
          /* { type: 'date', min: 1,max: 20, message: '面谈面签日期为20位', trigger: 'blur' } */
        ],
        endAt: [
          { required: true, type: 'date', message: '授信结束时间不能为空', trigger: 'change' }
          /* { type: 'date', min: 1,max: 20, message: '面谈面签日期为20位', trigger: 'blur' } */
        ]

      }
    }
  },
  mounted () {
    // 新建待面谈面签客户信息时 传入客户id 查询客户信息 回写
    if ('customerId' in this.$route.query) {
      this.getDetail(this.$route.query.customerId)
    }
    // 编辑时 传入的是待面谈面签id 直接查询该条数据
    if ('id' in this.$route.query) {
      let vue = this
      vue.flag = true
      return this.$store.dispatch(actions.get.RESULT_PERSON, this.$route.query.id).then(rep => {
        if (rep.code === 200) {
          vue.form = { ...rep.data }
          vue.memberCount = vue.form.memberCount
          vue.form.beginAt = vue.dateFormat2(vue.form.beginAt)
          vue.form.endAt = vue.dateFormat2(vue.form.endAt)
          vue.createdAt = vue.dateFormat(vue.form.createdAt)
          vue.updatedAt = vue.dateFormat(vue.form.updatedAt)
          vue.form.registrant = vue.form.accountName
          vue.form.registerOrg = vue.form.orgName
          vue.endAtflag = true
          vue.optionsEndAt = {
            disabledDate (date) {
              return date && date.valueOf() < vue.form.beginAt
            }
          }
          vue.status = rep.data.status
        } else if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    }
  },
  methods: {
    datePickerOnChange (beginAt) {
      if (beginAt !== '') {
        this.endAtflag = true
        beginAt = beginAt.replace(new RegExp('-', 'gm'), '/')
        let startDateM = (new Date(beginAt)).getTime() // 得到毫秒数
        this.optionsEndAt = {
          disabledDate (date) {
            return date && date.valueOf() < startDateM
          }
        }
      } else {
        this.endAtflag = false
      }
    },
    getDetail (id) {
      var vue = this
      /* 根据客户id查询客户基本信息 */
      return this.$store.dispatch(actions.get.CUSTOMER_PERSON, id).then(rep => {
        if (rep.code === 200) {
          vue.form = { ...rep.data }
          if (vue.form.accountId !== user.accountId) {
            vue.form.accountId = user.accountId
          }
          if (vue.form.accountName !== vue.form.registrant) {
            vue.form.accountName = vue.form.registrant
          }
          if (vue.form.orgName !== vue.form.registerOrg) {
            vue.form.orgName = vue.form.registerOrg
          }
          vue.createdAt = vue.dateFormat(vue.form.createdAt)
          vue.updatedAt = vue.dateFormat(vue.form.updatedAt)
          // 根据客户户号调用查看客户家庭信息---得到客户家庭人数
          this.$store.dispatch(actions.get.CUSTOMER_INFOFORM, id).then(fam => {
            if (fam.code === 200) {
              vue.memberCount = fam.data.familyPopulation + ''
              vue.form.memberCount = vue.memberCount
              vue.form.spouseIdNumber = fam.spouseIdNumber
              vue.form.spouseName = fam.spouseName
            }
          })
          for (var k in vue.form) {
            if (typeof (vue.form[k]) === 'number') {
              vue.form[k] = vue.form[k] + ''
            }
          }
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    },
    checkCustomer () {
      this.$router.push('/customer/Detail?customerId=' + this.form.customerId)
    },
    tmpSubmit (name) {
      if (this.status === '0') {
        this.$router.go(-1)
        return false
      }
      var vue = this
      let payload = { ...this[name] }
      payload.orgCode = user.orgCode
      if (payload.talkDate) {
        const date = new Date(payload.talkDate)
        const month = date.getMonth() + 1
        const day = date.getDate()
        payload.talkDate = date.getFullYear() + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day)
      }
      if (payload.rateType === '固定利率') {
        payload.rateFloat = ''
        payload.rateUpdateDate = ''
      } else if (payload.rateType === '浮动利率') {
        payload.yearRate = ''
      }
      if (payload.advisersFlag === '否') {
        payload.advisersIncome = ''
        payload.advisersExpense = ''
        payload.advisersRental = ''
        payload.advisersName = ''
        payload.advisersComment = ''
      }
      payload.beginAt = vue.dateFormat2(vue.form.beginAt)
      payload.endAt = vue.dateFormat2(vue.form.endAt)
      vue.$store.dispatch(actions.post.RESULT_PERSON, payload).then(rep => {
        // 判断返回的消息，若返回得code为200 则认为操作成功 否则返回一个警告窗 并把错误信息显示
        if (rep.data.code !== 200 && rep.data.code !== 204) {
          this.$Message.error(rep.data.message)
        } else { // 否则返回一个警告窗 并把错误信息显示
          this.$Message.success('暂存待面谈面签信息成功！')
          this.$router.go(-1)
        }
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          var vue = this
          let payload = { ...this[name] }
          payload.orgCode = user.orgCode
          if (payload.talkDate) {
            const date = new Date(payload.talkDate)
            const month = date.getMonth() + 1
            const day = date.getDate()
            payload.talkDate = date.getFullYear() + '-' + (month >= 10 ? month : '0' + month) + '-' + (day >= 10 ? day : '0' + day)
          }
          if (payload.rateType === '固定利率') {
            payload.rateFloat = ''
            payload.rateUpdateDate = ''
          } else if (payload.rateType === '浮动利率') {
            payload.yearRate = ''
          }
          if (payload.advisersFlag === '否') {
            payload.advisersIncome = ''
            payload.advisersExpense = ''
            payload.advisersRental = ''
            payload.advisersName = ''
            payload.advisersComment = ''
          }
          payload.beginAt = vue.dateFormat2(vue.form.beginAt)
          payload.endAt = vue.dateFormat2(vue.form.endAt)
          vue.$store.dispatch(actions.put.RESULT_PERSON, payload).then(rep => {
            // 判断返回的消息，若返回得code为200 则认为操作成功
            if (rep.data.code !== 200 && rep.data.code !== 204) {
              this.$Message.error(rep.data.message)
            } else { // 否则返回一个警告窗 并把错误信息显示
              this.$Message.success('待面谈面签信息修改成功！')
              this.$router.go(-1)
            }
          })
        } else {
          this.$Message.error('表单验证错误!')
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    // 时间转换
    dateFormat (num) {
      if (num) {
        var date = new Date(num)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = date.getDate() < 10 ? '0' + (date.getDate()) + ' ' : date.getDate() + ' '
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      } else {
        return null
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
    }
  }
}
</script>

<style lang="scss">
.faceSignDetailBreadcrumb{
    height: 54px;
    background-color: #fff;
    line-height: 54px;
    padding-left: 24px;
    border-radius: 4px;
    border: 1px solid #eee;
}
.faceSignDetailPageTop{
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    padding-left: 24px;
    border-radius: 4px;
    border: 1px solid #eee;
    p{
        float: left;
        font-size: 20px;
    }
    div{
        float: right;
        margin-right: 24px;
        Button{
            margin-left: 10px;
            margin-bottom: 5px;
        }
    }
}
.faceSignDetailPage{
    height: calc(77vh);
    width: 100%;
    overflow-y:auto;
    overflow-x:auto;
    .ivu-form .ivu-form-item-label {
        font-size: 14px;
    }
    .ivu-input{
        font-size: 14px;
    }
    .pageDiv{
        margin: 16px 24px;
        padding: 20px 20px 0px 20px;
        background-color: #fff;
        border-radius: 4px;
        p{
            font-size: 16px;
            font-weight:bold;
        }
    }
}
</style>
