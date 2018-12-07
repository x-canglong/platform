<template>
    <!--待面谈面签查看详情-->
    <div>
        <div class="faceSignDetailBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>授信管理</BreadcrumbItem>
                <BreadcrumbItem to="/credit/result" v-if="this.$route.query.faceSignFlag == 0 ">待面谈面签</BreadcrumbItem>
                <BreadcrumbItem to="/credit/review" v-if="this.$route.query.faceSignFlag == 2 ">面谈面签审核</BreadcrumbItem>
                <BreadcrumbItem to="/credit/faceSigned" v-if="this.$route.query.faceSignFlag == 1 ">已面谈面签</BreadcrumbItem>
                <BreadcrumbItem>详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="faceSignDetailPageTop">
            <p>面签信息汇总表</p>
        </div>
        <div class="faceSignDetailPage">
           <table class="detail-table" cellspacing="0" cellpadding="0" align="center">
               <p style="font-size: 16px;font-weight:bold;margin-top: 16px;">客户管理</p>
               <Divider style="margin: 14px 0;"/>
               <tr>
                   <td width="12%"><b>客户编号：</b></td>
                   <td width="18%">{{ form.customerId }}</td>
                   <td width="12%"><b>姓名：</b></td>
                   <td width="18%">{{ form.customerName }}</td>
                   <td width="12%"><b>身份证号码：</b></td>
                   <td width="18%">{{ form.idNumber }}</td>
                </tr>
                <tr>
                    <td><b>性别：</b></td>
                    <td>{{ form.sex }}</td>
                    <td><b>配偶姓名：</b></td>
                    <td>{{ form.spouseName }}</td>
                    <td><b>配偶身份证号：</b></td>
                    <td>{{ form.spouseIdNumber }}</td>
                </tr>
                <tr>
                   <td><b>文化水平：</b></td>
                   <td>{{ form.educationLevel }}</td>
                   <td><b>手机号码：</b></td>
                   <td>{{ form.phoneNumber }}</td>
                   <td><b>家庭人数：</b></td>
                   <td>{{ form.memberCount }}</td>
                </tr>
               <tr>
                   <td><b>经营(工作)单位：</b></td>
                   <td>{{ form.companyName }}</td>
                   <td><b>经营(工作)地址：</b></td>
                   <td colspan="3">{{ form.companyAddress }}</td>
               </tr>
               <tr>
                   <td><b>户籍地址：</b></td>
                   <td colspan="5">{{ form.nativeAddress }}</td>
               </tr>
               <tr>
                   <td><b>常住地址：</b></td>
                   <td colspan="5">{{ form.residenceAddress }}</td>
               </tr>
               <tr>
                   <td><b>金农易贷户名：</b></td>
                   <td colspan="2">{{ form.jnydName }}</td>
                   <td><b>金农易贷账(卡)号：</b></td>
                   <td colspan="2">{{ form.jnydId }}</td>
               </tr>
               <p style="font-size: 16px;font-weight:bold;margin-top: 16px;">申请</p>
               <Divider style="margin: 14px 0;"/>
               <tr>
                   <td><b>授信金额：</b></td>
                   <td colspan="2">{{ form.rental }}万元</td>
                   <td><b>授信期限：</b></td>
                   <td colspan="2">{{ form.deadline }}年</td>
               </tr>
               <tr>
                   <td><b>授信开始时间：</b></td>
                   <td colspan="2">{{ beginAt }}</td>
                   <td><b>授信结束时间：</b></td>
                   <td colspan="2">{{ endAt }}</td>
               </tr>
               <tr>
                   <td><b>借款利率选择：</b></td>
                   <td colspan="2">{{ form.rateType }}</td>
                   <td v-if="form.rateType=='固定利率'"><b>年利率：</b></td>
                   <td colspan="2" v-if="form.rateType=='固定利率'">{{ form.yearRate }}%</td>

                   <td v-if="form.rateType=='浮动利率'"><b>利率浮动：</b></td>
                   <td colspan="1" v-if="form.rateType=='浮动利率'">{{ form.rateFloat }}%</td>
                   <td v-if="form.rateType=='浮动利率'"><b>利率调整日为：</b></td>
                   <td colspan="1" v-if="form.rateType=='浮动利率'">{{ form.rateUpdateDate }}</td>
               </tr>
               <tr>
                   <td width="12%"><b>发放方式：</b></td>
                   <td width="18%">{{ form.disbursement }}</td>
                   <td width="12%"><b>还款方式：</b></td>
                   <td width="18%">{{ form.refundType }}</td>
                   <td width="12%"><b>借款用途：</b></td>
                   <td width="18%">{{ form.creditUseType }}</td>
               </tr>
               <p style="font-size: 16px;font-weight:bold;margin-top: 16px;">面谈面签</p>
               <Divider style="margin: 14px 0;"/>
               <tr>
                   <td><b>个人年收入：</b></td>
                   <td>{{ form.income }}万元</td>
                   <td><b>家庭年收入：</b></td>
                   <td>{{ form.familyIncome }}万元</td>
               </tr>
               <tr>
                   <td><b>是否有金融顾问意见：</b></td>
                   <td>{{ form.advisersFlag }}</td>
               </tr>
               <tr v-if="form.advisersFlag=='是'">
                   <td><b>收入：</b></td>
                   <td>{{ form.advisersIncome }}万元</td>
                   <td><b>支出：</b></td>
                   <td>{{ form.advisersExpense }}万元</td>
                   <td><b>授信额度：</b></td>
                   <td>{{ form.advisersRental }}万元</td>
               </tr>
               <tr v-if="form.advisersFlag=='是'">
                   <td><b>金融顾问姓名：</b></td>
                   <td colspan="2">{{ form.advisersName }}</td>
                   <td><b>备注：</b></td>
                   <td colspan="2">{{ form.advisersComment }}</td>
               </tr>
               <tr>
                   <td><b>客户资料是否真实：</b></td>
                   <td colspan="2">{{ form.trueCustomerInfo }}</td>
                   <td><b>谈话内容是否真实：</b></td>
                   <td colspan="2">{{ form.trueCustomerTalk }}</td>
               </tr>
               <tr>
                   <td><b>银行受理人员：</b></td>
                   <td colspan="2">{{ form.staffName }}</td>
                   <td width="10%"><b>面谈面签日期：</b></td>
                   <td colspan="2">{{ form.talkDate }}</td>
               </tr>
               <p style="font-size: 16px;font-weight:bold;margin-top: 16px;">网格信息</p>
               <Divider style="margin: 14px 0;"/>
               <tr>
                   <td><b>网格号：</b></td>
                   <td>{{ form.gridCode }}</td>
                   <td><b>网格名称：</b></td>
                   <td>{{ form.gridName }}</td>
                   <td><b>登记人：</b></td>
                   <td>{{ form.registrant }}</td>
               </tr>
               <tr>
                   <td><b>登记机构：</b></td>
                   <td>{{ form.registerOrg }}</td>
                   <td><b>登记日期：</b></td>
                   <td>{{ createdAt }}</td>
                   <td><b>更新日期：</b></td>
                   <td>{{ updatedAt }}</td>
               </tr>
           </table>
        </div>
    </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  data () {
    return {
      form: {},
      beginAt: '',
      endAt: '',
      createdAt: '',
      updatedAt: ''
    }
  },
  mounted () {
    this.getDetail(this.$route.query.id)
  },
  methods: {
    getDetail (id) {
      var vue = this
      // 根据客户id查询客户基本信息
      return this.$store.dispatch(actions.get.RESULT_PERSON, id).then(rep => {
        if (rep.code === 200) {
          vue.form = { ...rep.data }
          vue.memberCount = vue.form.memberCount
          vue.beginAt = vue.dateFormat2(vue.form.beginAt)
          vue.endAt = vue.dateFormat2(vue.form.endAt)
          vue.createdAt = vue.dateFormat(vue.form.createdAt)
          vue.updatedAt = vue.dateFormat(vue.form.updatedAt)
          vue.form.registrant = vue.form.accountName
          vue.form.registerOrg = vue.form.orgName
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
    // 时间转换
    dateFormat (num) {
      let date = new Date(num) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + '-'
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      let D = date.getDate() < 10 ? '0' + (date.getDate()) + ' ' : date.getDate() + ' '
      let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    dateFormat2 (date) {
      let date1 = new Date(date)
      let month1 = date1.getMonth() + 1
      let day1 = date1.getDate()
      return date1.getFullYear() + '-' + (month1 >= 10 ? month1 : '0' + month1) + '-' + (day1 >= 10 ? day1 : '0' + day1)
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
        height: 54px;
        line-height: 54px;
        background-color: #fff;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
        p{
            float: left;
            font-size: 24px;
        }
        div{
            float: right;
            margin-right: 24px;
            Button{
                margin-left: 10px;
            }
        }
    }
    .faceSignDetailPage{
        margin: 16px 24px;
        padding: 20px 20px 0px 20px;
        background-color: #fff;
        border-radius: 4px;
        .ivu-form .ivu-form-item-label {
            font-size: 14px;
        }
        .ivu-input{
            font-size: 14px;
        }
        .pageDiv{

            p{
                font-size: 16px;
                font-weight:bold;
            }
        }
    }

    .detail-table {
        width: 100%;
        font-size: 14px;
        line-height: 32px;

        b {
            float: right;
        }
    }
</style>
