<template>
    <div>
        <div class="enterpriseCustomer">
            <Breadcrumb>
                <BreadcrumbItem>客户管理</BreadcrumbItem>
                <BreadcrumbItem>企业客户</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="qiyeDiv">
            <img src="../../static/images/enterpriseCustomer1.png" alt="">
                <p>正在建设中，我们将在新版本中推出，请耐心等待…</p>

        </div>
    </div>

</template>

<script>

export default {
  data () {
    return {}
  },
  mounted () {
  },
  methods: {
    changeGrid () {
      this.$router.push('/customer')
    }
  }
}
</script>

<style lang="scss">
    .qiyeDiv {
        text-align: center;
        width: 600px;
        margin: 50px auto;
        img {
            width: 450px;
        }
        h2{
            font-size:40px;
            font-family:PingFang-SC-Bold;
            font-weight:bold;
            color:rgba(67,78,89,1);
            line-height:28px;
        }
        p{
            font-size:16px;
            font-family:PingFang-SC-Regular;
            font-weight:400;
            color:#AAAAAB;
            line-height:28px;
            margin-top: 30px;
        }
    }

    .enterpriseCustomer {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
</style>
