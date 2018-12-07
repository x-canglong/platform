<template>
  <div class="information">
    <div class="btn">
      <ul class='qul'>
        <li :class="type==1?'classq active':'classq'" @click="onType(1)">存款</li>
        <li :class="type==2?'classq active':'classq'" @click="onType(2)">贷款</li>
      </ul>
    </div>
    <div class="content" v-for="(item, index) in list" :key="index">
      <p class="redPoit"></p><p>{{ item.message }}<span class="time">{{ item.time }}</span></p>
    </div>
  </div>
</template>

<script>
import actions from '@/store/action-types'
export default {
  name: 'Information',
  data () {
    return {
      title: '全行存款重点客户异动提示',
      type: 1,
      list: [
        {
          message: '存款异动提醒存款异动提醒存款',
          time: '2018-11-29'
        },
        {
          message: '存款异动提醒存款异动提醒存款',
          time: '2018-11-29'
        },
        {
          message: '存款异动提醒存款异动提醒存款',
          time: '2018-11-29'
        },
        {
          message: '存款异动提醒存款异动提醒存款',
          time: '2018-11-29'
        },
        {
          message: '存款异动提醒存款异动提醒存款',
          time: '2018-11-29'
        }
      ]
    }
  },
  mounted () {
    this.onType(1)
  },
  methods: {
    onType (type) {
      this.type = type
      var vue = this
      this.$store.dispatch(actions.get.HOME_INFORMATION, {
        amountType: type
      }).then(rep => {
        if (rep.code === 200) {
          vue.list = [ ...rep.data ]
        } else if (rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.information {
  margin: 0px 20px;
  padding-bottom:10px;
  .btn{
    .qul {
      outline: 0;
      list-style: none;
      height: 40px;
      line-height: 40px;
      background: #fff;
      color: #515a6e;
      border-radius: 3px;
    }
    .classq {
      display: block;
      outline: 0;
      list-style: none;
      font-size: 14px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: all .2s ease-in-out;
      float: left;
      padding: 0 20px;
      height: inherit;
      line-height: inherit;
    }
    .active {
      color: #2d8cf0;
      border-bottom: 2px solid #2d8cf0;
    }
  }
  .content {
    font-size: 14px;
    line-height: 32px;
    height:32px;

    .redPoit {
      margin-top: 12px;
      width:8px;
      height:8px;
      background:rgba(253,77,85,1);
      float: left;
      border-radius: 50%;
    }
    p {
      width: calc(100% - 18px);
      margin-left: 5px;
      float: left;
      .time {
        float: right;
      }
    }
  }
}
</style>
