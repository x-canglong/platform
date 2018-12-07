<template>
  <div class="layout">
    <Row>
      <Col span="24">
        <Card class="card" :bordered="false" :padding="0" dis-hover>
          <OverView />
        </Card>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <Card class="card" :bordered="false" :padding="0">
          <Map />
        </Card>
      </Col>
      <Col span="12">
          <Card class="card" :bordered="false" :padding="0">
            <Navigation />
          </Card>
          <Card class="card" :bordered="false" :padding="0">
            <Ranking2 v-if="roleId === 5" />
            <Ranking v-else />
          </Card>
      </Col>
    </Row>
    <Row>
      <Col span="12">
        <Card class="card" :bordered="false" :padding="0">
          <LineChart />
        </Card>
      </Col>
      <Col span="12">
        <Card class="card" :bordered="false" :padding="0">
          <LineChart2 />
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import OverView from './components/OverView'
import Map from './components/Map'
import Navigation from './components/Navigation'
import Ranking from './components/Ranking'
import Ranking2 from './components/Ranking2'
import LineChart from './components/LineChart'
import LineChart2 from './components/LineChart2'

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  name: 'Home',
  data () {
    return {
      roleId: user.roles[0].roleId
    }
  },
  components: {
    OverView,
    Map,
    Navigation,
    Ranking,
    Ranking2,
    LineChart,
    LineChart2
  }
}
</script>

<style lang="scss" scoped>
.layout {
  margin: 16px;
  .card {
    margin: 8px;
  }
}
</style>
