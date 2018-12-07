<template>
  <div class="navigation">
    <div class="title"><p>营销活动管理</p></div>
    <ul>
      <router-link to="/home/activityProgress" tag="li">
        <div class="icon">
            <img src="../../../static/images/home/icon2.png">
        </div>
        <p>活动进展</p>
      </router-link>
      <router-link to="/home/activityRank" tag="li">
        <div class="icon">
            <img src="../../../static/images/home/icon3.png">
        </div>
        <p>活动排名</p>
      </router-link>
      <li>
        <div class="icon">
          <img src="../../../static/images/home/icon1.png">
        </div>
        <p>拓展功能</p>
      </li>
      <li>
        <div class="icon">
            <img src="../../../static/images/home/icon4.png">
        </div>
        <p>拓展功能</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
.navigation {
  .title {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #ddd;
  }
  ul {
    display: table;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 20px;
    padding-bottom: 20px;
    li {
      display: table-cell;
      text-align: center;
      &:hover {
        cursor: pointer;
        .icon {
          background-color: #eee;
        }
      }
      p {
        margin-top: 10px;
      }
      .icon {
        margin: auto;
        width:72px;
        height:72px;
        background:rgba(247,249,253,1);
        border-radius: 50%;
        img {
          margin: 20px auto;
          width:33px;
          height:34px;
        }
      }
    }
  }
}
</style>
