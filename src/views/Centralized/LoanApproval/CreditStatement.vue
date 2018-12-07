<template>
    <div class="creditDiv">
        <!--信贷系统报表-->
        <div class="loanApproval-Breadcrumb">
            <Breadcrumb style="float: left">
                <BreadcrumbItem>集中授信</BreadcrumbItem>
                <BreadcrumbItem to="/credit/faceSigned">已面谈面签</BreadcrumbItem>
                <BreadcrumbItem>信贷系统报表</BreadcrumbItem>
            </Breadcrumb>
            <Button type="primary" style="float: right;margin: 6px 24px 6px 0px" @click="getPdf()">下载</Button>
        </div>
        <div id="pdfDom" style="background: #fff;margin: 16px 24px;"> <!--  要打印得区域 以id为记号-->
            <div style="margin:10px 24px;padding-top: 50px">
                <p style="text-align: center;font-size: 24px;font-weight:bold">信贷信息报表</p>
            </div>
            <div style="margin:8px 24px;background: #f8f8f9">
                <Card title="身份信息" icon="ios-bookmark" :padding="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="10">
                            客户姓名：
                            <span style="color: rgba(0,0,0,0.65)">
                                        {{list.CustomerInfo.customerName?list.CustomerInfo.customerName:'&nbsp;'}}
                                    </span>
                            </Col>
                            <Col offset="1" span="10">
                            性别：
                            <span style="color: rgba(0,0,0,0.65)">
                                        {{list.CustomerInfo.sex ? list.CustomerInfo.sex : '&nbsp;'}}
                                    </span>
                            </Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="10">
                            出生日期：
                            <span style="color: rgba(0,0,0,0.65)">
                                        {{list.CustomerInfo.birthday?list.CustomerInfo.birthday:'&nbsp;'}}
                                    </span>
                            </Col>
                            <Col offset="1" span="10">
                            移动电话：
                            <span style="color: rgba(0,0,0,0.65)">
                                        {{list.CustomerInfo.phoneNumber?list.CustomerInfo.phoneNumber:'&nbsp;'}}
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
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.idNumber?list.CustomerInfo.idNumber:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="10">
                            国籍：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.nationality?list.CustomerInfo.nationality:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="10">
                            政治面貌：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.politicsStatus?list.CustomerInfo.politicsStatus:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="10">
                            婚姻状况：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.maritalStatus?list.CustomerInfo.maritalStatus:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="10">
                            文化水平：
                            <span style="color: rgba(0,0,0,0.65)">
                                    {{list.CustomerInfo.educationLevel?list.CustomerInfo.educationLevel:'&nbsp;'}}
                                </span>
                            </Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="10">
                            是否本行股东：<span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.isStockholder?list.CustomerInfo.isStockholder:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="10">
                            年收入：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FinanceInfo.yearSalary?list.FinanceInfo.yearSalary:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="10">
                            居住状况：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.livingSituation?list.CustomerInfo.livingSituation:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="10">
                            行政区域：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.registerOrg?list.CustomerInfo.registerOrg:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="10">
                            身体状况：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.physicalCondition?list.CustomerInfo.physicalCondition:'&nbsp;'}}</span></Col>

                            <Col offset="1" span="10">
                            是否农户：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.isFarmer}}</span></Col>
                        </Row>
                        <!--<Row class="rowStyle">
                            <Col span="10">
                            是否本行股东：<span
                                style="color: rgba(0,0,0,0.65)">{{customerList.CustomerInfo.isStockholder?customerList.CustomerInfo.isStockholder:'&nbsp;'}}</span></Col>
                        </Row>-->
                        <Row class="rowStyle">
                            <Col span="10">
                            是否企业主：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.isOwner?list.CustomerInfo.isOwner:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="10">
                            本行员工标志：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.isStaff?list.CustomerInfo.isStaff:'&nbsp;'}}</span></Col>
                        </Row>
                    </CellGroup>
                </Card>
            </div>
            <div style="margin:8px 24px;background: #f8f8f9">
                <Card title="家庭信息" icon="ios-bookmark" :padding="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="8">
                            档案编号(户号)：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.householdId?list.CustomerInfo.householdId:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="8">
                            家庭人口：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.population?list.FamilyInfo.population:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="6">
                            家庭是否和睦：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.isHarmony?list.FamilyInfo.isHarmony:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="8">
                            邮政编码：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.postcode?list.CustomerInfo.postcode:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="8">
                            当地信用环境：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.localCredit?list.FamilyInfo.localCredit:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="6">
                            社会评价：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.socialEvaluation?list.FamilyInfo.socialEvaluation:'&nbsp;'}}</span></Col>

                        </Row>
                        <Row class="rowStyle">
                            <!--<Col span="8">
                            维护客户经理：
                            <span style="color: rgba(0,0,0,0.65)">{{customerList.FamilyInfo.accountId?customerList.FamilyInfo.accountId:'&nbsp;'}}</span></Col>
-->
                            <Col span="8">
                            主营业务是不是自办实体：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.isSelfEntity?list.FamilyInfo.isSelfEntity:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="8">
                            是否欠缴税收(除个税)：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.isOweTax?list.FamilyInfo.isOweTax:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="8">
                            生产经营能力：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.produceCapacity?list.FamilyInfo.produceCapacity:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="8">
                            生产经营场景：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.produceScene?list.FamilyInfo.produceScene:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="13">
                            参加保险情况：
                            <span style="color: rgba(0,0,0,0.65)">{{list.FamilyInfo.insuranceType?list.FamilyInfo.insuranceType:'&nbsp;'}}</span></Col>
                        </Row>
                        <Row class="rowStyle">
                            <Col span="13">
                            详细地址：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.residenceAddress?list.CustomerInfo.residenceAddress:'&nbsp;'}}</span></Col>
                        </Row>
                    </CellGroup>
                </Card>
            </div>
            <div style="margin:8px 24px;background: #f8f8f9">
                <Card title="职业信息" icon="ios-bookmark" :padding="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="8">
                            职业：
                            <span style="color: rgba(0,0,0,0.65)">{{(list.FinanceInfo && list.FinanceInfo.career)?list.FinanceInfo.career:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="8">
                            行业类别：
                            <span style="color: rgba(0,0,0,0.65)">{{(list.FinanceInfo && list.FinanceInfo.industry)?list.FinanceInfo.industry:'&nbsp;'}}</span></Col>
                        </Row>
                    </CellGroup>
                </Card>

            </div>
            <div style="margin:8px 24px;background: #f8f8f9">
                <Card title="地址信息" icon="ios-bookmark" :padding="50" :bordered="false" shadow>
                    <CellGroup>
                        <Row class="rowStyle">
                            <Col span="8">
                            地址类型：
                            <span style="color: rgba(0,0,0,0.65)">常住地址</span></Col>
                            <Col span="10">
                            地址：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.residenceAddress?list.CustomerInfo.residenceAddress:'&nbsp;'}}</span></Col>
                            <Col offset="1" span="4">
                            邮编：
                            <span style="color: rgba(0,0,0,0.65)">{{list.CustomerInfo.postcode?list.CustomerInfo.postcode:'&nbsp;'}}</span></Col>
                        </Row>
                    </CellGroup>
                </Card>
            </div>
        </div>
    </div>
</template>

<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import actions from '@/store/action-types'

export default {
  name: 'credit-statement',
  data () {
    return {

      htmlTitle: '',
      list: {
        FinanceInfo: {},
        CustomerInfo: {},
        FamilyInfo: {
          population: '0'
        }

      } // 客户信息
    }
  },
  mounted () {
    // let idIndex = JSON.parse(sessionStorage.getItem("rowTatement")).idNumber//拿到存在session里的数据 也就是要显示谁的信贷系统报表
    let idNumber = this.$route.query.idNumber
    let vue = this
    vue.$store.dispatch(actions.get.CREDIT_LIST, idNumber).then(rep => { // 请求客户个人信息
      if (rep.data.code === 200) {
        vue.list.CustomerInfo = rep.data.CustomerInfo
        if (rep.data.FamilyInfo) {
          vue.list.FamilyInfo = rep.data.FamilyInfo
        }
        if (rep.data.FinanceInfo) {
          vue.list.FinanceInfo = rep.data.FinanceInfo
        }
      } else {
        vue.$router.go(-1)
        vue.$Message.error(rep.data.message)
      }

      // this.htmlTitle=rep.data.CustomerInfo.customerName+'的信贷系统报表'
    })
  },
  methods: {
    getPdf () {
      var title = this.list.CustomerInfo.customerName + '-信贷系统报表'
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 392.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28 // 控制pdf宽度
        let imgHeight = 692.28 / contentWidth * contentHeight // 控制pdf高度
        let pageData = canvas.toDataURL('image/jpeg', 2.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}
</script>

<style scoped>
    .loanApproval-Breadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family:PingFangSC-Regular;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .creditDiv {
        font-size: 14px;
    }

    .rowStyle {
        margin: 12px 0;
    }
</style>
