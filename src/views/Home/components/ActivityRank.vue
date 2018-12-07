<template>
  <div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>营销管理</BreadcrumbItem>
        <BreadcrumbItem to="/home/activityProgress">活动进展</BreadcrumbItem>
        <BreadcrumbItem>新春开门红</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="customerpagetop" v-if="roleId!==1">
      <div style="font-size:14px;font-family:PingFangSC-Regular;">
        <span>业务类型：</span>
        <Button type="text" v-for="(h, index) in businessTypeList" :key="index" style="font-size:14px;padding:0 5px;height:30px;margin-right:10px;border-radius:4px" :class="uploadObj.code==h.code?'active':''" @click="changeType(h.code)">{{h.name}}
        </Button>
      </div>
    </div>
    <div class="customerPage">
      <div class="customerTable">
        <Table :columns="col" :data="list"></Table>
      </div>
      <div class="pagination">
        <div class="text">共{{ total?total:'0' }}条记录 第 {{ pageNum?pageNum:'0' }} / {{ Math.ceil(total / pageSize)?Math.ceil(total / pageSize):'0' }} 页</div>
        <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange" :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total" @on-change="changePage" show-elevator/>
      </div>
    </div>
  </div>
</template>

<script>
// import actions from '@/store/action-types'
const user = JSON.parse(sessionStorage.getItem('userObj'))
export default {
  name: 'ActivityRank',
  data () {
    return {
      roleId: user.roles[0].roleId,
      businessTypeList: [
        {
          name: '存款',
          code: '1'
        },
        {
          name: '贷款',
          code: '2'
        }
      ],
      uploadObj: {
        code: '1'
      },
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      total: 0,
      col5: [
        {
          title: '排名',
          key: 'ranking',
          minWidth: 50,
          align: 'center',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '各网点',
          key: 'eachOutlet',
          minWidth: 300,
          align: 'center'
        },
        {
          title: '存款金额(元)',
          key: 'depositAmount',
          minWidth: 185,
          align: 'center'
        }
      ],
      col6: [
        {
          title: '排名',
          key: 'ranking',
          minWidth: 50,
          align: 'center',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '各网点',
          key: 'eachOutlet',
          minWidth: 300,
          align: 'center'
        },
        {
          title: '贷款金额(元)',
          key: 'depositAmount',
          minWidth: 185,
          align: 'center'
        }
      ],
      col3: [
        {
          title: '排名',
          key: 'ranking',
          minWidth: 50,
          align: 'center',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '客户经理',
          key: 'accountManager',
          minWidth: 300,
          align: 'center'
        },
        {
          title: '存款金额(元)',
          key: 'depositAmount',
          minWidth: 185,
          align: 'center'
        }
      ],
      col4: [
        {
          title: '排名',
          key: 'ranking',
          minWidth: 50,
          align: 'center',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '客户经理',
          key: 'accountManager',
          minWidth: 300,
          align: 'center'
        },
        {
          title: '贷款金额(元)',
          key: 'loanAmount',
          minWidth: 185,
          align: 'center'
        }
      ],
      col: [
        {
          title: '业务类型',
          key: 'businessType',
          minWidth: 300,
          align: 'center'
        },
        {
          title: '当前排名',
          key: 'ranking',
          minWidth: 50,
          align: 'center',
          sortable: true,
          sortType: 'desc'
        },
        {
          title: '完成业绩(元)',
          key: 'actualCompletion',
          minWidth: 185,
          align: 'center'
        }
      ],
      // list: []
      list: [
        {
          eachOutlet: '长丰支行',
          allTarget: '500,000',
          actualCompletion: '450,000',
          percent: 90,
          targetDifference: '50,000',
          businessType: '存款金额',
          ranking: 'NO.2',
          depositAmount: '450,000',
          accountManager: '张小燕'
        },
        {
          eachOutlet: '瑞泉阳光支行',
          allTarget: '500,000',
          actualCompletion: '0',
          percent: 0,
          targetDifference: '500,000',
          businessType: '贷款金额',
          ranking: 'NO.7',
          depositAmount: '0',
          accountManager: '何浩杰'
        },
        {
          eachOutlet: '永流支行',
          allTarget: '500,000',
          actualCompletion: '100,000',
          percent: 20,
          targetDifference: '400,000',
          businessType: '贷款金额',
          ranking: 'NO.6',
          depositAmount: '100,000',
          accountManager: '王朝'
        },
        {
          eachOutlet: '桐林支行',
          allTarget: '500,000',
          actualCompletion: '500,000',
          percent: 100,
          targetDifference: '0',
          businessType: '存款金额',
          ranking: 'NO.1',
          depositAmount: '500,000',
          accountManager: '刘能'
        },
        {
          eachOutlet: '路山支行',
          allTarget: '500,000',
          actualCompletion: '200,000',
          percent: 40,
          targetDifference: '300,000',
          businessType: '贷款金额',
          ranking: 'NO.5',
          depositAmount: '200,000',
          accountManager: '李四'
        },
        {
          eachOutlet: '高阳支行',
          allTarget: '500,000',
          actualCompletion: '300,000',
          percent: 60,
          targetDifference: '200,000',
          businessType: '存款金额',
          ranking: 'NO.4',
          depositAmount: '300,000',
          accountManager: '小明'
        },
        {
          eachOutlet: '桑家支行',
          allTarget: '500,000',
          actualCompletion: '400,000',
          percent: 80,
          targetDifference: '100,000',
          businessType: '贷款金额',
          ranking: 'NO.3',
          depositAmount: '400,000',
          accountManager: '张小红'
        }
      ],
      list1: [
        {
          businessType: '贷款金额',
          ranking: 'NO.1',
          actualCompletion: '500,000'
        },
        {
          businessType: '存款金额',
          ranking: 'NO.2',
          actualCompletion: '470,000'
        }
      ],
      list2: [// 支行长贷款数据
        {
          eachOutlet: '长丰支行',
          allTarget: '500,000',
          actualCompletion: '450,000',
          percent: 90,
          targetDifference: '50,000',
          businessType: '存款金额',
          ranking: 'NO.1',
          depositAmount: '450,000',
          loanAmount: '500,000',
          accountManager: '张小燕'
        },
        {
          eachOutlet: '瑞泉阳光支行',
          allTarget: '500,000',
          actualCompletion: '0',
          percent: 0,
          targetDifference: '500,000',
          businessType: '贷款金额',
          ranking: 'NO.2',
          depositAmount: '0',
          loanAmount: '450,000',
          accountManager: '何浩杰'
        },
        {
          eachOutlet: '永流支行',
          allTarget: '500,000',
          actualCompletion: '100,000',
          percent: 20,
          targetDifference: '400,000',
          businessType: '贷款金额',
          ranking: 'NO.3',
          depositAmount: '100,000',
          loanAmount: '400,000',
          accountManager: '王朝'
        },
        {
          eachOutlet: '桐林支行',
          allTarget: '500,000',
          actualCompletion: '500,000',
          percent: 100,
          targetDifference: '0',
          businessType: '存款金额',
          ranking: 'NO.4',
          depositAmount: '500,000',
          loanAmount: '350,000',
          accountManager: '刘能'
        },
        {
          eachOutlet: '路山支行',
          allTarget: '500,000',
          actualCompletion: '200,000',
          percent: 40,
          targetDifference: '300,000',
          businessType: '贷款金额',
          ranking: 'NO.5',
          depositAmount: '200,000',
          loanAmount: '300,000',
          accountManager: '李四'
        },
        {
          eachOutlet: '高阳支行',
          allTarget: '500,000',
          actualCompletion: '300,000',
          percent: 60,
          targetDifference: '200,000',
          businessType: '存款金额',
          ranking: 'NO.6',
          depositAmount: '280,000',
          loanAmount: '500,000',
          accountManager: '小明'
        },
        {
          eachOutlet: '桑家支行',
          allTarget: '500,000',
          actualCompletion: '400,000',
          percent: 80,
          targetDifference: '100,000',
          businessType: '贷款金额',
          ranking: 'NO.7',
          depositAmount: '400,000',
          loanAmount: '275,000',
          accountManager: '张小红'
        }
      ],
      list3: [// 支行长存款数据
        {
          eachOutlet: '长丰支行',
          allTarget: '500,000',
          actualCompletion: '450,000',
          percent: 90,
          targetDifference: '50,000',
          businessType: '存款金额',
          ranking: 'NO.2',
          depositAmount: '450,000',
          accountManager: '张小燕'
        },
        {
          eachOutlet: '瑞泉阳光支行',
          allTarget: '500,000',
          actualCompletion: '0',
          percent: 0,
          targetDifference: '500,000',
          businessType: '贷款金额',
          ranking: 'NO.7',
          depositAmount: '0',
          accountManager: '何浩杰'
        },
        {
          eachOutlet: '永流支行',
          allTarget: '500,000',
          actualCompletion: '100,000',
          percent: 20,
          targetDifference: '400,000',
          businessType: '贷款金额',
          ranking: 'NO.6',
          depositAmount: '100,000',
          accountManager: '王朝'
        },
        {
          eachOutlet: '桐林支行',
          allTarget: '500,000',
          actualCompletion: '500,000',
          percent: 100,
          targetDifference: '0',
          businessType: '存款金额',
          ranking: 'NO.1',
          depositAmount: '500,000',
          accountManager: '刘能'
        },
        {
          eachOutlet: '路山支行',
          allTarget: '500,000',
          actualCompletion: '200,000',
          percent: 40,
          targetDifference: '300,000',
          businessType: '贷款金额',
          ranking: 'NO.5',
          depositAmount: '200,000',
          accountManager: '李四'
        },
        {
          eachOutlet: '高阳支行',
          allTarget: '500,000',
          actualCompletion: '300,000',
          percent: 60,
          targetDifference: '200,000',
          businessType: '存款金额',
          ranking: 'NO.4',
          depositAmount: '300,000',
          accountManager: '小明'
        },
        {
          eachOutlet: '桑家支行',
          allTarget: '500,000',
          actualCompletion: '400,000',
          percent: 80,
          targetDifference: '100,000',
          businessType: '贷款金额',
          ranking: 'NO.3',
          depositAmount: '400,000',
          accountManager: '张小红'
        }
      ]
    }
  },
  computed: {
    // function addCommas(nStr){
    //   nStr += '';
    //   x = nStr.split('.');
    //   x1 = x[0];
    //   x2 = x.length > 1 ? '.' + x[1] : '';
    //   var rgx = /(\d+)(\d{3})/;
    //   while (rgx.test(x1)) {
    //   x1 = x1.replace(rgx, '$1' + ',' + '$2');
    //   }
    //   return x1 + x2;
    // }
  },
  mounted () {
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    if (this.roleId === 1) {
      // 客户经理
      this.col = this.col
      this.list = this.list1
      this.total = 2
    } else if (this.roleId === 3) {
      // 支行长
      this.col = this.col3
      this.total = 7
    } else if (this.roleId === 5) {
      // 总行领导
      this.col = this.col5
      this.total = 7
    }
  },
  methods: {
    // function addCommas(nStr){
    //   nStr += '';
    //   x = nStr.split('.');
    //   x1 = x[0];
    //   x2 = x.length > 1 ? '.' + x[1] : '';
    //   var rgx = /(\d+)(\d{3})/;
    //   while (rgx.test(x1)) {
    //   x1 = x1.replace(rgx, '$1' + ',' + '$2');
    //   }
    //   return x1 + x2;
    // }
    changeType (code) {
      this.uploadObj.code = code
      this.onSearch()
      if (code === '1' && this.roleId === 3) {
        this.col = this.col3
        this.list = this.list3
      } else if (code === '2' & this.roleId === 3) {
        this.col = this.col4
        this.list = this.list2
      }
      if (code === '1' && this.roleId === 5) {
        this.col = this.col5
        this.list = this.list3
      } else if (code === '2' & this.roleId === 5) {
        this.col = this.col6
        this.list = this.list2
      }
    },
    onSearch () {

    },
    onPageSizeChange (pageSize1) {
      this.pageSize = pageSize1
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    },
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageNum: this.pageNum } })
      this.onSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
/*页面面包屑样式*/
.breadcrumb {
  height: 54px;
  background-color: #fff;
  line-height: 54px;
  padding-left: 24px;
  border-radius: 4px;
  border: 1px solid #eee;
}
.customerpagetop {
  margin: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  .import {
    font-size: 14px;
  }
  button:hover,
  button.active {
    background: #1890ff;
    border-radius: 2px;
    color: #fff;
  }
}
.customerPage {
  margin: 16px 24px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  .customerTable {
    margin-bottom: 20px;
    button {
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
