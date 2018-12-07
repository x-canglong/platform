<template>
  <div class="ranking">
    <div class="title">
      <div class="tabs">
        <span class="active">支行</span>
        <span>客户经理</span>
      </div>
      <p>全行业务排名</p>
    </div>
    <div class="inner subtabs">
        <Tabs type="card">
        <TabPane label="存款排名">
          <table>
            <thead>
              <tr>
                <td>排名</td>
                <td>支行名称</td>
                <td>存款</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No.1</td>
                <td>淄江花园支行</td>
                <td>423,456</td>
              </tr>
              <tr>
                <td>No.2</td>
                <td>瑞泉阳光支行</td>
                <td>340,456</td>
              </tr>
              <tr>
                <td>No.3</td>
                <td>永流支行</td>
                <td>230,221</td>
              </tr>
              <tr>
                <td>No.4</td>
                <td>桐林支行</td>
                <td>221,422</td>
              </tr>
              <tr>
                <td>No.5</td>
                <td>路山支行</td>
                <td>112,212</td>
              </tr>
              <tr>
                <td>No.6</td>
                <td>凌峰支行</td>
                <td>102,212</td>
              </tr>
              <tr>
                <td>No.7</td>
                <td>万宇支行</td>
                <td>92,222</td>
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
export default {
  data () {
    return {}
  }
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
  .tabs {
    float: right;
    font-weight: normal;
    span {
      cursor: pointer;
      margin-left: 20px;
    }
    .active {
      color: #1890FF;
    }
  }
  .subtabs {
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
