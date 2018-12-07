<template>
  <div class="overview">
    <ul>
      <li>
        <img src="../../../static/images/home/group1.png" />
        <div>
          <p>户籍户数</p>
          <p class="num">{{ data.familyNum }}</p>
        </div>
      </li>
      <li>
        <img src="../../../static/images/home/group2.png" />
        <div>
          <p>建档户数</p>
          <p class="num">{{ data.peopleNum }}</p>
        </div>
      </li>
      <li>
        <img src="../../../static/images/home/group3.png" />
        <div>
          <p>预授信覆盖率</p>
          <p class="num">{{ data.creditRatio }}%</p>
        </div>
      </Col>
      <li>
      <img src="../../../static/images/home/group4.png" />
        <div>
          <p>用信覆盖率</p>
          <p class="num">{{ data.useRatio }}%</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  name: 'OverView',
  data () {
    return {
      data: {
        familyNum: '234,678',
        peopleNum: '324,318',
        creditRatio: 68,
        useRatio: 48
      }
    }
  },
  mounted () {
    let role = 0
    var vue = this
    this.$store.dispatch(actions.get.OVER_VIEW, { role: role }).then(rep => {
      if (rep.code === 200) {
        if (rep.data) {
          vue.data = { ...rep.data }
        }
      } else if (rep.code !== 204) {
        vue.$Message.error(rep.message)
      }
    })
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.overview {
  margin-top: 10px;
  ul {
    display: flex;
    width: 100%;
    text-align: center;
    background-color: #F0F2F5;
  }
  li {
    flex: 1;
    margin-left: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 14px;
    background-color: #fff;
    list-style: none;
    transition: all .2s ease-in-out;
    border-radius: 4px;
    &:first-child {
      margin-left: 0;
    }
    &:hover {
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
      border-color: #eee;
    }
    img {
      float:left;
      margin-left: 11%;
      width:70px;
      height:70px;
    }
    div {
      float:right;
      margin-right: 10%;
      width:calc(55%- 60px);
      text-align: right;

      p {
        font-size: 16px;
      }
      .num {
        font-size: 30px;
        font-weight: 500;
      }
    }
  }
}
</style>
