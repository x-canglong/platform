<template>
  <div class="ranking">
    <div class="title"><p>{{ title }}</p></div>
    <div class="personal" v-if="roleId === 1">
      <div class="inner">
        <table>
          <thead>
            <tr>
              <td>业务名称</td>
              <td>当前排名</td>
              <td>数据信息</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>存款金额</td>
              <td>第一名</td>
              <td>423,456</td>
            </tr>
            <tr>
              <td>贷款金额</td>
              <td>第三名</td>
              <td>340,456</td>
            </tr>
            <tr>
              <td>建档率</td>
              <td>第四名</td>
              <td>56%</td>
            </tr>
            <tr>
              <td>用信率</td>
              <td>第十名</td>
              <td>34%</td>
            </tr>
            <tr>
              <td>授信率</td>
              <td>第十一名</td>
              <td>30%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="team" v-else>
      <Tabs type="card">
        <TabPane label="存款排名">
          <table>
            <thead>
              <tr>
                <td>排名</td>
                <td>客户经理</td>
                <td>存款</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No.1</td>
                <td>李荣浩</td>
                <td>423,456</td>
              </tr>
              <tr>
                <td>No.2</td>
                <td>孔亦宣</td>
                <td>340,456</td>
              </tr>
              <tr>
                <td>No.3</td>
                <td>吴伟</td>
                <td>230,221</td>
              </tr>
              <tr>
                <td>No.4</td>
                <td>李世翔</td>
                <td>221,422</td>
              </tr>
              <tr>
                <td>No.5</td>
                <td>蒋方航</td>
                <td>112,212</td>
              </tr>
            </tbody>
          </table>
        </TabPane>
        <TabPane label="贷款排名">暂无数据</TabPane>
        <TabPane label="建档率排名">暂无数据</TabPane>
        <TabPane label="用信率排名">暂无数据</TabPane>
        <TabPane label="授信率排名">暂无数据</TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  data () {
    return {
      roleId: user.roles[0].roleId
    }
  },
  computed: {
    title () {
      return this.roleId === 1 ? '排名概况' : '客户经理业务排名'
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.ranking {
  margin-top: 21px;
  .title {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }
  .inner {
    padding: 16px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: center;
    thead {
      background-color: #F5F9FC;
    }
    tr:nth-child(even) {
      background-color: #FAFBFC;
    }
    td {
      font-size: 14px;
      color: #5C6165;
      height: 42px;
      line-height: 42px;
    }
  }
  .team {
    padding: 15px;
    padding-top: 10px;
    table {
      td {
        height: 36px;
        line-height: 36px;
      }
    }
    & > .ivu-tabs.ivu-tabs-card {
      .ivu-tabs-bar {
        border-bottom: none;
        .ivu-tabs-tab {
          height: 32px;
          margin-right: 10px;
          font-size: 14px;
          color: #878D91;
          border: none;
          border-radius: 16px;
          background-color: #EAEEF1;
        }
        .ivu-tabs-tab-active {
          color: #fff;
          background-image: linear-gradient(-90deg, #009AFE 3%, #007EF3 100%);
        }
      }
    }
  }
}
</style>
