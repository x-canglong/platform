<template>
  <div>
    <div class="breadcrumb">
      <Breadcrumb>
        <BreadcrumbItem>营销管理</BreadcrumbItem>
        <BreadcrumbItem to="">活动进展</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="cards">
       <Card class="card">
            <router-link to="/home/activityProgress/activityRanking">
                <img src="@/static/images/home/xckmh.png" class="imgcard">
                <h3>新春开门红</h3>
                <p class="dec">一句话描述一句话描述</p>
            </router-link>
        </Card>
        <Card class="card">
            <router-link to="/home/activityProgress/activityRanking">
                <img src="@/static/images/home/xckmh.png" class="imgcard">
                <h3>新春开门红</h3>
                <p class="dec">一句话描述一句话描述</p>
            </router-link>
        </Card>
        <Card class="card">
            <router-link to="/home/activityProgress/activityRanking">
                <img src="@/static/images/home/xckmh.png" class="imgcard">
                <h3>新春开门红</h3>
                <p class="dec">一句话描述一句话描述</p>
            </router-link>
        </Card>
    </div>

  </div>
</template>

<script>
// import actions from '@/store/action-types'

export default {
  name: 'ActivityProgress',
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
/*页面面包屑样式*/
.breadcrumb {
  height: 54px;
  background-color: #fff;
  line-height: 54px;
  padding-left: 24px;
  border-radius: 4px;
  border: 1px solid #eee;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  //   justify-content: space-around
}
.card {
  width: 363px;
  height: 250px;
  margin-top: 24px;
  &:nth-child(1) {
    margin-left: 23px;
  }
  margin-right: 23px;
}
.imgcard {
  width: 361px;
  height: 160px;
  margin-left: -17px;
  margin-top: -17px;
  margin-bottom: 10px;
}
.dec {
  //   width:308px;
  //     height:22px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
}
</style>
