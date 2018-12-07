<template>
    <div>
        <div class="inMapBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem to="/grid">网格管理</BreadcrumbItem>
                <BreadcrumbItem>地图</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <!--   <div class="inmap">
               <iframe id="iframe" :src="'/mymap.html?url='+url+'&gridCode='+gridCode+'&gridName='+gridName"
                       frameborder="0" width="80%" height="600px"></iframe>
           </div>-->
        <div class="inmap">
            <img v-if="this.gridCode == 'wl123'" src="@/static/images/grid/wl01.png" alt="">
            <img v-else-if="this.gridCode == 'Y006'" src="@/static/images/grid/fg01.png" alt="">
            <img v-else src="@/static/images/grid/cf01.png" alt="">
        </div>
    </div>
</template>
<script>
import { API_BASE_URL } from '@/config'

export default {
  data () {
    return {
      url: API_BASE_URL,
      gridCode: '',
      gridName: ''
    }
  },
  mounted () {
    this.gridCode = this.$route.query.gridCode
    this.gridName = this.$route.query.gridName
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
    .inMapBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
    }

    .inmap {
        margin: 20px 50px;
        iframe {
            width: 100%;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
