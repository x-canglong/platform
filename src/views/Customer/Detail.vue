<template>
    <div class="customerDetailpage">
        <div class="customerDetailBreadcrumb">
            <div class="Breadcrumbdiv">
                <Breadcrumb style="float:left">
                    <BreadcrumbItem to="/customer">客户管理</BreadcrumbItem>
                    <BreadcrumbItem>详情</BreadcrumbItem>
                </Breadcrumb>
                <div>
                    <Button style="float:right" type="info" ghost @click="goBack">返回</Button>
                </div>
            </div>
        </div>
        <div class="customerDetail">
            <div class="tablediv">
                <Tabs v-model="detailTab">
                    <TabPane label="基本信息" name="name1">
                        <div class="TabPanediv">
                        <table class="detail-table">
                            <tr>
                                <td width="10%">客户编号：</td>
                                <td width="15%">{{ person.customerId }}</td>
                                <td width="10%">信贷客户号：</td>
                                <td width="30%">{{ person.creditId }}</td>
                            </tr>
                            <tr>
                                <td>姓名：</td>
                                <td>{{ person.customerName }}</td>
                                <td>证件类型：</td>
                                <td>{{ person.idType }}</td>
                                <td width="10%">证件号码：</td>
                                <td width="25%">{{ person.idNumber }}</td>
                            </tr>
                            <tr>
                                <td>性别：</td>
                                <td>{{ person.sex }}</td>
                                <td>出生日期：</td>
                                <td>{{ person.birthday }}</td>
                                <td>手机号码：</td>
                                <td>{{ person.phoneNumber }}</td>
                            </tr>
                            <tr>
                                <td>身体状况：</td>
                                <td>{{ person.physicalCondition }}</td>
                                <td>文化水平：</td>
                                <td>{{ person.educationLevel }}</td>
                                <td>国籍：</td>
                                <td>{{ person.nationality }}</td>
                            </tr>
                            <tr>
                                <td>民族：</td>
                                <td>{{ person.nation }}</td>
                                <td>政治面貌：</td>
                                <td>{{ person.politicsStatus }}</td>
                                <td>婚姻状况：</td>
                                <td>{{ person.maritalStatus }}</td>
                            </tr>
                        </table>
                        <table class="detail-table">
                            <tr>
                                <td width="10%">职业：</td>
                                <td width="15%">{{ person.career }}</td>
                                <td width="10%">单位名称：</td>
                                <td width="30%">{{ person.companyName }}</td>
                                <td width="10%"></td>
                                <td width="25%"></td>
                            </tr>
                            <tr>
                                <td>工作年限：</td>
                                <td>{{ person.workYear }}</td>
                                <td>工作地址：</td>
                                <td>{{ person.companyAddress }}</td>
                            </tr>
                        </table>
                        <table class="detail-table">
                            <tr>
                                <td width="10%">是否农户：</td>
                                <td width="15%">{{ person.isFarmer }}</td>
                                <td v-if="person.isFarmer=='是'" width="10%">有无县城购房：</td>
                                <td v-if="person.isFarmer=='是'" width="30%">{{ person.isBuyHouse }}</td>
                                <td width="10%"></td>
                                <td></td>
                            </tr>
                            <tr v-if="person.isFarmer=='是' && person.isBuyHouse=='是'">
                                <td>小区名称：</td>
                                <td>{{ person.cellName }}</td>
                                <td>小区地址：</td>
                                <td>{{ person.cellAddress }}</td>
                            </tr>
                        </table>
                        <table class="detail-table">
                            <tr>
                                <td width="10%">户号：</td>
                                <td width="15%">{{ person.householdId }}</td>
                                <td width="10%">户籍地址：</td>
                                <td width="30%">{{ person.nativeAddress }}</td>
                            </tr>
                            <tr>
                                <td>居住状况：</td>
                                <td>{{ person.livingSituation }}</td>
                                <td>居住地址：</td>
                                <td>{{ person.residenceAddress }}</td>
                            </tr>
                            <tr>
                                <td>居住地邮编：</td>
                                <td>{{ person.postcode }}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>是否企业主：</td>
                                <td>{{ person.isOwner }}</td>
                                <td>是否本行员工：</td>
                                <td>{{ person.isStaff }}</td>
                                <td width="10%">是否本行股东：</td>
                                <td width="25%">{{ person.isStockholder }}</td>
                            </tr>
                        </table>
                        <table class="detail-table">
                            <tr>
                                <td width="10%">网格号：</td>
                                <td width="15%">{{ person.gridCode }}</td>
                                <td width="10%">网格名称：</td>
                                <td width="30%">{{ person.gridName }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>调查人(A角)：</td>
                                <td>{{ person.investigator1 }}</td>
                                <td>调查人(B角)：</td>
                                <td>{{ person.investigator2 }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>登记人：</td>
                                <td>{{ person.registrant }}</td>
                                <td>登记机构：</td>
                                <td>{{ person.registerOrg }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>登记日期：</td>
                                <td>{{ person.createdAt }}</td>
                                <td>更新日期：</td>
                                <td>{{ person.updatedAt }}</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                        </div>
                    </TabPane>
                    <TabPane label="家庭信息" name="name2">
                        <div class="TabPanediv">
                            <table class="detail-table">
                                <tr>
                                    <td width="18%">户号：</td>
                                    <td width="15%">{{ familys.householdId }}</td>
                                    <td width="12%">家庭人口：</td>
                                    <td width="30%">{{ familys.population }}</td>
                                    <td width="10%">家庭是否和睦：</td>
                                    <td width="15%">{{ familys.isHarmony }}</td>
                                </tr>
                                <tr>
                                    <td>邮编：</td>
                                    <td>{{ familys.postcode }}</td>
                                    <td>家庭详细地址：</td>
                                    <td>{{ familys.address }}</td>
                                </tr>
                                <tr>
                                    <td>主营业务是否自办实体：</td>
                                    <td>{{ familys.isSelfEntity }}</td>
                                    <td>是否欠缴税费：</td>
                                    <td>{{ familys.isOweTax }}</td>
                                </tr>
                                <tr>
                                    <td>生产经营能力：</td>
                                    <td>{{ familys.produceCapacity }}</td>
                                    <td>生产经营场景：</td>
                                    <td>{{ familys.produceScene }}</td>
                                </tr>
                                <tr>
                                    <td>参与保险情况：</td>
                                    <td>{{ familys.insuranceType }}</td>
                                </tr>
                                <tr>
                                    <td>社会评价(村委会评价)：</td>
                                    <td>{{ familys.socialEvaluation }}</td>
                                </tr>
                            </table>
                            <table class="detail-table-list">
                                <tr style="background-color: #F8F8F9;">
                                    <td >与客户关系</td>
                                    <td >姓名</td>
                                    <td >手机号码</td>
                                    <td >证件号码</td>
                                </tr>
                                <tr v-for="(h, index) in family" :key="index">
                                    <td >{{ h.relationship }}</td>
                                    <td >{{ h.memberName }}</td>
                                    <td >{{ h.contact }}</td>
                                    <td >{{ h.idNumber }}</td>
                                </tr>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane label="资产信息" name="name3">
                        <div class="TabPanediv">
                            <table class="detail-table">
                                <tr>
                                    <td>客户职业：</td>
                                    <td>{{ property.career }}</td>
                                </tr>
                                <tr>
                                    <td width="18%">房屋数量(套)：</td>
                                    <td width="15%">{{ property.houseNumber }}</td>
                                    <td width="12%">车辆数量(辆)：</td>
                                    <td width="20%">{{ property.carNumber }}</td>
                                    <td width="10%">年收入(万元)：</td>
                                    <td width="15%">{{ property.yearSalary }}</td>
                                </tr>
                                <tr>
                                    <td>房屋总价值(万元)：</td>
                                    <td>{{ property.housePrice }}</td>
                                    <td>车辆总价值(万元)：</td>
                                    <td>{{ property.carPrice }}</td>
                                    <td>年结余(万元)：</td>
                                    <td>{{ property.yearSurplus }}</td>
                                </tr>
                            </table>
                            <table class="detail-table" v-show="isFarmIncomeTable">
                                <tr>
                                    <td width="18%">是否有农业收入：</td>
                                    <td width="15%">{{ property.isFarmIncome }}</td>
                                    <td width="12%"> </td>
                                    <td width="20%"> </td>
                                    <td width="10%"> </td>
                                    <td width="15%"> </td>
                                </tr>
                                <tr v-if="property.isFarmIncome=='是'">
                                    <td>土地面积(亩)：</td>
                                    <td>{{ property.landAcreage }}</td>
                                    <td>大棚数量(个)：</td>
                                    <td>{{ property.greenhouseNumber }}</td>
                                </tr>
                                <tr v-if="property.isFarmIncome=='是'">
                                    <td>种养殖品种：</td>
                                    <td>{{ property.breedType }}</td>
                                    <td>种养殖数量：</td>
                                    <td>{{ property.breedNumber }}</td>
                                    <td>单位收益：</td>
                                    <td>{{ property.companyEarnings }}</td>
                                </tr>
                            </table>
                            <table class="detail-table">
                                <tr>
                                    <td width="18%">是否有经营性收入：</td>
                                    <td width="15%">{{ property.isBusinessIncome }}</td>
                                    <td width="12%"> </td>
                                    <td width="20%"> </td>
                                    <td width="10%"> </td>
                                    <td width="15%"> </td>
                                </tr>
                                <tr v-if="property.isBusinessIncome=='是'">
                                    <td>商铺数量(间)：</td>
                                    <td>{{ property.shopNumber }}</td>
                                    <td>商铺价值(万元)：</td>
                                    <td>{{ property.shopPrice }}</td>
                                    <td> </td>
                                    <td> </td>
                                </tr>
                                <tr v-if="property.isBusinessIncome=='是'">
                                    <td>设备数量(台)：</td>
                                    <td>{{ property.equipmentNumber }}</td>
                                    <td>设备价值(万元)：</td>
                                    <td>{{ property.equipmentPrice }}</td>
                                </tr>
                                <tr v-if="property.isBusinessIncome=='是'">
                                    <td>工商营业执照：</td>
                                    <td style="word-wrap:break-word;word-break:break-all;">{{ property.businessLicense }}</td>
                                </tr>
                            </table>
                        </div>

                    </TabPane>
                    <TabPane label="业务信息" name="name4">
                        <div class="TabPanediv">
                            <table class="detail-table">
                                <tr>
                                    <td width="10%">存款总额：</td>
                                    <td width="10%">{{ business.depositTotal }}</td>
                                    <td width="10%">月日均：</td>
                                    <td width="10%">{{ business.depositMonth }}</td>
                                    <td width="10%">季日均：</td>
                                    <td width="10%">{{ business.depositSeason }}</td>
                                    <td width="10%">年日均：</td>
                                    <td width="10%">{{ business.depositYear }}</td>
                                    <td width="10%">时点余额：</td>
                                    <td width="10%">{{ business.depositTimePoit }}</td>
                                </tr>
                                <tr>
                                    <td>活期余额：</td>
                                    <td>{{ business.currentTotal }}</td>
                                    <td>月日均：</td>
                                    <td>{{ business.currentMonth }}</td>
                                    <td>季日均：</td>
                                    <td>{{ business.currentSeason }}</td>
                                    <td>年日均：</td>
                                    <td>{{ business.currentYear }}</td>
                                    <td>时点余额：</td>
                                    <td>{{ business.currentTimePoit }}</td>
                                </tr>
                                <tr>
                                    <td>定期余额：</td>
                                    <td>{{ business.fixedTotal }}</td>
                                    <td>月日均：</td>
                                    <td>{{ business.fixedMonth }}</td>
                                    <td>季日均：</td>
                                    <td>{{ business.fixedSeason }}</td>
                                    <td>年日均：</td>
                                    <td>{{ business.fixedYear }}</td>
                                    <td>时点余额：</td>
                                    <td>{{ business.fixedTimePoit }}</td>
                                </tr>
                                <tr v-for="(h,index) in businessProduct" :key="index" v-if="index%5==0">
                                    <td>{{ h.productName }}:</td>
                                    <td>{{ h.money }}</td>
                                    <td v-if="businessProduct.length>index+1">{{ businessProduct[index+1].productName }}:</td>
                                    <td v-if="businessProduct.length>index+1">{{ businessProduct[index+1].money }}</td>
                                    <td v-if="businessProduct.length==index+1"></td>
                                    <td v-if="businessProduct.length==index+1"></td>

                                    <td v-if="businessProduct.length>index+2">{{ businessProduct[index+2].productName }}:</td>
                                    <td v-if="businessProduct.length>index+2">{{ businessProduct[index+2].money }}</td>
                                    <td v-if="businessProduct.length==index+2"></td>
                                    <td v-if="businessProduct.length==index+2"></td>

                                    <td v-if="businessProduct.length>index+3">{{ businessProduct[index+3].productName }}:</td>
                                    <td v-if="businessProduct.length>index+3">{{ businessProduct[index+3].money }}</td>
                                    <td v-if="businessProduct.length==index+3"></td>
                                    <td v-if="businessProduct.length==index+3"></td>

                                    <td v-if="businessProduct.length>index+4">{{ businessProduct[index+4].productName }}:</td>
                                    <td v-if="businessProduct.length>index+4">{{ businessProduct[index+4].money }}</td>
                                    <td v-if="businessProduct.length==index+4"></td>
                                    <td v-if="businessProduct.length==index+4"></td>
                                </tr>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane label="信用信息" name="name5">
                        <div class="TabPanediv">
                            <table class="detail-table">
                                <tr>
                                    <td>客户身份证号：</td>
                                    <td>{{ credit.idNumber }}</td>
                                    <td>用信发生额：</td>
                                    <td>{{ credit.incidenceOfLetter }}</td>
                                </tr>
                                <tr>
                                    <td width="16%">房屋按揭(负债)：</td>
                                    <td width="16%">{{ credit.housingMortgageDebt }}</td>
                                    <td width="16%">经营贷款(负债)：</td>
                                    <td width="16%">{{ credit.businessLoanDebt }}</td>
                                    <td width="16%">消费贷款(负债)：</td>
                                    <td width="16%">{{ credit.consumerLoanDebt }}</td>
                                </tr>
                                <tr>
                                    <td>房屋按揭(经营贷款)：</td>
                                    <td>{{ credit.housingMortgageRemainder }}</td>
                                    <td>经营贷款(经营贷款)：</td>
                                    <td>{{ credit.businessLoanRemainder }}</td>
                                    <td>消费贷款(经营贷款)：</td>
                                    <td>{{ credit.consumerLoanRemainder }}</td>
                                </tr>
                                <tr>
                                    <td>逾期记录(多少条记录)：</td>
                                    <td>{{ credit.overdueRecord }}</td>
                                    <td>逾期金额：</td>
                                    <td>{{ credit.pastDue }}</td>
                                </tr>
                            </table>
                            <table class="detail-table">
                                <tr>
                                    <td width="16%">基本身份:</td>
                                    <td width="16%">{{ credit.basicIdentity }}</td>
                                    <td width="16%">配偶:</td>
                                    <td width="16%">{{ person.mate }}</td>
                                    <td width="16%">家庭及邻里关系:</td>
                                    <td width="16%">{{ credit.neighborhoodRelation }}</td>
                                </tr>
                                <tr>
                                    <td>地址1:</td>
                                    <td>{{ credit.address1 }}</td>
                                    <td>地址2:</td>
                                    <td>{{ credit.address2 }}</td>
                                    <td>地址3:</td>
                                    <td>{{ credit.address3 }}</td>
                                </tr>
                                    <td>是否是失信人:</td>
                                    <td>{{ credit.isDishonest==0?'否':(credit.isDishonest==1?'是':'') }}</td>
                                    <td>有无涉黄、赌、毒等不良嗜好:</td>
                                    <td>{{ person.haveBadHabits==0?'无':(person.haveBadHabits==1?'有':'') }}</td>
                                    <td>有无民间债务纠纷或者民间信用不良:</td>
                                    <td>{{ credit.haveBadCredit==0?'无':(credit.haveBadCredit==1?'有':'') }}</td>
                                </tr>
                            </table>
                        </div>
                    </TabPane>
                    <TabPane label="标签" name="name6">
                        <div class="TabPanediv">
                            <table class="detail-tables">
                                <tr v-for="(s,index) in tagList" :key="index" v-if="index%4==0">
                                    <td width="25%" v-on:click="pkClick(tagList[index].tagId)">{{ s.tagName }}</td>
                                    <td width="25%" v-if="tagList.length>index+1" v-on:click="pkClick(tagList[index+1].tagId)">{{ tagList[index+1].tagName }}</td>
                                    <td width="25%" v-if="tagList.length>index+2" v-on:click="pkClick(tagList[index+2].tagId)">{{ tagList[index+2].tagName }}</td>
                                    <td width="25%" v-if="tagList.length>index+3" v-on:click="pkClick(tagList[index+3].tagId)">{{ tagList[index+3].tagName }}</td>
                                    <td  v-if="tagList.length<=index+1"></td>
                                    <td v-if="tagList.length<=index+2"></td>
                                    <td v-if="tagList.length<=index+3"></td>
                                </tr>
                            </table>
                        </div>

                    </TabPane>
                    <TabPane label="影像资料" name="name7">
                        <div class="tablediv-div">
                            <Tabs type="card" v-model="imagesTab">
                                <TabPane :label="h.title" v-for="(h,index) in images" :key="index">
                                    <div class="TabPanediv">
                                        <div class="demo-upload-list1" v-for="(image,imgIndex) in h.list" :key="imgIndex">
                                            <img :src="image.baseCode" style="width:120px;height:120px;">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native="handleView(imgIndex,index)" size="50"></Icon>
                                            </div>
                                        </div>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                        <Modal title="预览" v-model="visible.show" footer-hide width="640px">
                            <div>
                                <div style="position:relative;z-index:9999;top:200px;">
                                    <Icon
                                            type="ios-arrow-back"
                                            size="50" style="float: left;cursor:pointer;"
                                            v-if="visible.imgIndex!=0"
                                            @click="handleView(visible.imgIndex-1,visible.index)"

                                    />
                                    <Icon
                                            type="ios-arrow-forward"
                                            size="50" style="float: right;cursor:pointer;"
                                            v-if="visible.imgIndex!=(visible.len-1)"
                                            @click="handleView(visible.imgIndex+1,visible.index)"

                                    />
                                </div>
                                <img :src="baseCode" style="width: 100%;position:relative;z-index:1000;top:-25px;">
                                <!--<Input style="position:relative;z-index:500;"
                                        @keyup.left="handleView(visible.imgIndex-1,visible.index)"
                                    @keyup.right="handleView(visible.imgIndex+1,visible.index)" />-->
                            </div>
                        </Modal>
                    </TabPane>
                </Tabs>
            </div>
            <Modal width="60%"  v-model="pkdetail.show" :footer-hide="true"  title="贫困详情">
                <table class="detail-table">
                    <tr>
                        <td width="15%">人员编号</td>
                        <td width="35%">{{ pkPerson.personCode }}</td>
                        <td width="18%">身份证号</td>
                        <td width="32%">{{ pkPerson.idNumber }}</td>
                    </tr>
                    <tr>
                        <td>人数</td>
                        <td>{{ pkPerson.personCount }}</td>
                        <td>在校生状况</td>
                        <td>{{ pkPerson.internalStudent }}</td>
                    </tr>
                    <tr>
                        <td>健康状况</td>
                        <td>{{ pkPerson.healthCondition }}</td>
                        <td>劳动技能</td>
                        <td>{{ pkPerson.laborSkills }}</td>
                    </tr>
                    <tr>
                        <td>务工状况</td>
                        <td>{{ pkPerson.workingConditions }}</td>
                        <td>务工时间（月</td>
                        <td>{{ pkPerson.workingTime }}</td>
                    </tr>
                    <tr>
                        <td>参加大病医疗</td>
                        <td>{{ pkPerson.criticalIllnessInsurance }}</td>
                        <td>脱贫属性</td>
                        <td>{{ pkPerson.overcomePoverty }}</td>
                    </tr>
                    <tr>
                        <td>脱贫年度</td>
                        <td>{{ pkPerson.overcomePovertyYear }}</td>
                        <td>贫困户属性</td>
                        <td>{{ pkPerson.attribute }}</td>
                    </tr>
                    <tr>
                        <td>主要致贫原因</td>
                        <td>{{ pkPerson.reason }}</td>
                        <td>危房户</td>
                        <td>{{ pkPerson.dangerousBuilding }}</td>
                    </tr>
                    <tr>
                        <td>饮水安全</td>
                        <td>{{ pkPerson.safetyWater }}</td>
                        <td>饮水困难</td>
                        <td>{{ pkPerson.dysdipsia }}</td>
                    </tr>
                    <tr>
                        <td>人均纯收入</td>
                        <td>{{ pkPerson.incomeAvg }}</td>
                        <td>联系电话</td>
                        <td>{{ pkPerson.phone }}</td>
                    </tr>
                    <tr>
                        <td>记录时间</td>
                        <td>{{ pkPerson.writeIme }}</td>
                    </tr>
                </table>
            </Modal>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import actions from '@/store/action-types'

export default {
  data () {
    return {
      isFarmIncomeTable: true,
      baseCode: '',
      visible: {
        show: false,
        imgIndex: 0,
        index: 0,
        len: 0
      },
      detailTab: 0,
      imagesTab: 0,
      person: {},
      business: {},
      businessProduct: [],
      pkdetail: {
        show: false
      },
      pkPerson: {},
      tagList: [],
      images: [
        {
          title: '基本信息',
          type: '1',
          list: null
        },
        {
          title: '资产信息',
          type: '2',
          list: null
        },
        {
          title: '经营信息',
          type: '3',
          list: null
        },
        {
          title: '贷款流程信息',
          type: '4',
          list: null
        },
        {
          title: '押品信息',
          type: '5',
          list: null
        },
        {
          title: '其他信息',
          type: '6',
          list: null
        }
      ],
      family: []
    }
  },
  computed: {
    ...mapState({
      property: state => state.customer.propertyperson,
      familys: state => state.customer.familysperson,
      credit: state => state.customer.creditperson
    })
  },
  watch: {
    'detailTab': function (newVal, oldVal) {
      if (this.detailTab === 'name7') {
        this.getImageList(0)
      }
    },
    'imagesTab': function (newVal, oldVal) {
      this.getImageList(this.imagesTab)
    }
  },
  mounted () {
    this.show()
  },
  methods: {
    dateFormat (num) {
      var date = new Date(num)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() < 10 ? '0' + (date.getDate()) + ' ' : date.getDate() + ' '
      var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return Y + M + D + h + m + s
    },
    show () {
      this.detailTab = 0
      this.imagesTab = 0
      var vue = this
      vue.$store.dispatch(actions.get.CUSTOMER_PERSON, this.$route.query.customerId).then(rep => {
        if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        } else {
          vue.person = rep.data
          vue.person.createdAt = vue.dateFormat(this.person.createdAt)
          vue.person.updatedAt = vue.dateFormat(this.person.updatedAt)
          let status = vue.person.status
          if (status !== 0) {
            this.$store.dispatch(actions.get.MEMBER_LIST, vue.person.customerId).then(rep => {
              if (rep.code === 200) {
                vue.family = rep.data
              } else if (rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })
            this.$store.dispatch(actions.get.PROPERTY_PERSON, vue.person.idNumber).then(rep => {
              if (rep.code !== 200 && rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })
            this.$store.dispatch(actions.get.FAMILYS_PERSON, vue.person.householdId).then(rep => {
              if (rep.code !== 200 && rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })
            if (vue.person.isFarmer !== '是') {
              this.isFarmIncomeTable = false
            }
            this.$store.dispatch(actions.get.CREDIT_PERSON, vue.person.idNumber).then(rep => {
              if (rep.code !== 200 && rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })

            this.$store.dispatch(actions.get.BUSINESS_PERSON, vue.person.idNumber).then(rep => {
              if (rep.code === 200) {
                if (rep.data.business != null) {
                  vue.business = { ...rep.data.business }
                }
                if (rep.data.businessProduct) {
                  vue.businessProduct = [...rep.data.businessProduct]
                }
              } else if (rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })

            this.$store.dispatch(actions.get.MYTAG_LIST, vue.person.idNumber).then(rep => {
              if (rep.code === 200) {
                vue.tagList = [...rep.data]
              } else if (rep.code !== 204) {
                vue.$Message.error(rep.message)
              }
            })
            for (var i in this.images) {
              vue.images[i].list = null
            }
          }
        }
      })
    },
    getImageList (index) {
      if (this.images[index].list == null) {
        var vue = this
        this.$store.dispatch(actions.get.IMAGE_LIST, {
          idNumber: this.person.idNumber,
          type: this.images[index].type
        }).then(rep => {
          if (rep.data.code !== 200 && rep.data.code !== 204) {
            vue.$Message.error(rep.data.message)
          } else {
            let data = { ...rep.data }
            vue.images[index].list = data.data
            /* this.showImg(data.data,index) */
          }
        })
      } else {
        /* this.showImg(this.images[index].list,index) */
      }
    },

    showImg (list, index) {
      let html = ''
      for (let i in list) {
        html = html + "<img style='width:48%;float:left;margin: 0 1%' src='" + list[i].baseCode + "'/>"
      }
      document.getElementById('img' + index).innerHTML = html
    },
    pkClick (id) {
      if (id === 4) {
        this.pkdetail.show = true
        var vue = this
        this.$store.dispatch(actions.get.CUSTOMER_POORINFO, this.pkRow.idNumber).then(rep => {
          if (rep.code === 200) {
            vue.pkPerson = { ...rep.data[0] }
          } else if (rep.code !== 204) {
            vue.$Message.error(rep.message)
          }
        })
      }
    },
    handleView (imgIndex, index) {
      this.baseCode = this.images[index].list[imgIndex].baseCode
      this.visible.show = true
      this.visible.index = index
      this.visible.imgIndex = imgIndex
      this.visible.len = this.images[index].list.length
    },
    goBack () {
      this.$router.go(-1)
    }

  }
}
</script>

<style lang="scss">
.customerDetailpage {
    background-color: rgba;
    .customerDetailBreadcrumb {
        background-color: #fff;
        height:54px;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
        .Breadcrumbdiv {

           Button {
               margin-top: 9px;
               margin-right: 24px;
           }
        }
    }
  .customerDetail {
      width: 100%;
      margin: 20px;
      background-color: rgba;
      .tablediv {
        padding-right: 16px;
        margin-right: 16px;
        background-color: rgba;
        .ivu-tabs-nav .ivu-tabs-tab {
            padding: 14px 16px;
        }
        .ivu-tabs-nav-scroll {
            background: #fff;
            height:50px
        }
        .TabPanediv {
            background-color: rgba;
            .ivu-tabs-tab {
                font-size: 16px
            }
            .detail-table td{
                line-height: 32px
            }
            .detail-table td:nth-child(odd) {
                text-align: right;
                //padding-right:10px;
            }
            .detail-table td:nth-child(even) {
                color: #AFAFAF;
            }
            .detail-table {
                width: 100%;
                padding-left: 20px;
                padding-right: 20px;
                margin-bottom: 16px;
                margin-right: 20px;
                padding: 20px;
                font-size: 14px;
                background-color:#fff;
            }
            .detail-tables {
                width: 100%;
                padding-left: 20px;
                padding-right: 20px;
                margin-bottom: 16px;
                margin-right: 20px;
                padding: 20px;
                font-size: 14px;
                background-color:#fff;
            }
        }
        .TabPanediv {
            background-color: rgba;
            .ivu-tabs-tab {
                font-size: 16px
            }
            .detail-table td{
                line-height: 32px
            }
            .detail-table-list {
                width: 100%;
                padding-left: 20px;
                padding-right: 20px;
                margin-bottom: 16px;
                margin-right: 20px;
                padding: 20px;
                font-size: 14px;
                background-color:#fff;
                tr{
                    height: 50px;
                }
                td {
                  text-align:center;
                  vertical-align:middle;
                  width:20%;
                }
            }
        }
        .tablediv-div {
            .ivu-tabs-nav .ivu-tabs-tab {
                padding: 8px 16px;
            }
            .ivu-tabs-nav-scroll {
                background: #fff;
                height:50px
            }
        }
      }
  }
}
.demo-upload-list1{
    display: inline-block;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 120px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list1:hover .demo-upload-list-cover{
    display: block;
  }
</style>
