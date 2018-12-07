<template>
  <div id="app">
      <Layout>
          <Header class="layout-header-bar" v-show="islogin">
              <div class="header_left">
                  <img src="@/static/images/logo.png" width="60" height="17"/>
                  <div>网格化管理系统</div>
              </div>
              <Icon  v-show="role.length > 0" @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
              <div class="menu_top" v-show="roleId!=7 && roleId!=2">
                  <ul>
                      <li :class="menuTop=='首页'?'active':''" @click="menuTopClick('首页','/home')">
                          首页
                      </li>
                      <!-- <li :class="menuTop=='工作台'?'active':''"  @click="menuTopClick('工作台','/workbench')">
                          工作台
                      </li> -->
                  </ul>
              </div>
              <User/>
          </Header>
          <Layout>
              <Sider  v-show="islogin && role.length > 0" ref="side1" width="200" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                  <Menu ref="menu" theme="dark" width="auto" :class="menuitemClasses"
                        :active-name="activeName" :open-names="openNames"
                        @on-select="onSelectChange" @on-open-change="onOpenChange">
                      <div v-for="(h, index) in role" :key="index">
                          <div  v-if="h.child.length==0">
                            <MenuItem :name="h.code">
                                <div class="img" :style="'background-position-y:'+ h.pos +'px;'"></div>
                                <span>{{ h.name }}</span>
                            </MenuItem>
                          </div>
                          <div v-else>
                            <Submenu :name="h.code">
                                <template slot="title">
                                    <div class="img" :style="'background-position-y:'+ h.pos +'px;'"></div>
                                    <span>{{ h.name }}</span>
                                </template>
                                <MenuItem :name="hh.code" v-for="(hh, index) in h.child" :key="index" :to="hh.url" class="tab">{{ hh.name }}</MenuItem>
                            </Submenu>
                          </div>
                      </div>
                  </Menu>
              </Sider>
              <Content>
                  <router-view/>
              </Content>
          </Layout>
      </Layout>
  </div>
</template>

<script>
import User from '@/components/User'
import { LOGO_NAME } from '@/config'
export default {
  data () {
    return {
      isCollapsed: false,
      islogin: false,
      logo: LOGO_NAME,
      logo1: LOGO_NAME,
      activeName: '',
      openNames: [],
      activeName1: '',
      openNames1: [],
      menuTop: '',
      roleId: 0,
      role: [
      ],
      role1: [
        {
          name: '营销管理',
          pos: -236,
          code: '1',
          child: [
            {
              name: '活动进展',
              code: '1-1',
              url: '/home/activityProgress'
            },
            {
              name: '活动排名',
              code: '1-2',
              url: '/home/activityRank'
            }
          ]
        },
        {
          name: '网格管理',
          pos: 0,
          code: '2',
          url: '/grid',
          child: []
        },
        {
          name: '客户管理',
          pos: -23,
          code: '3',
          url: '/customer',
          child: []
        },
        {
          name: '授信管理',
          pos: -46,
          code: '4',
          child: [
            {
              name: '待面谈面签',
              code: '4-1',
              url: '/credit/result'
            },
            {
              name: '面谈面签审核',
              code: '4-2',
              url: '/credit/review'
            },
            {
              name: '已面谈面签',
              code: '4-3',
              url: '/credit/faceSigned'
            }
          ]
        },
        {
          name: '信息管理',
          pos: -69,
          code: '5',
          child: [
            {
              name: '户籍管理',
              code: '5-1',
              url: '/resident'
            },
            {
              name: '黑名单信息',
              code: '5-2',
              url: '/credit/blackpage'
            },
            {
              name: '白名单信息',
              code: '5-3',
              url: '/credit/whitepage'
            },
            {
              name: '灰名单信息',
              code: '5-4',
              url: '/credit/greypage'
            }
          ]
        }
      ],
      role2: [
        {
          name: '授信管理',
          pos: -46,
          code: '1',
          child: [
            {
              name: '面谈面签审核',
              code: '1-1',
              url: '/credit/review'
            },
            {
              name: '已面谈面签',
              code: '1-2',
              url: '/credit/faceSigned'
            }
          ]
        }
      ],
      role3: [
        {
          name: '营销管理',
          pos: -236,
          code: '1',
          child: [
            {
              name: '活动进展',
              code: '1-1',
              url: '/home/activityProgress'
            },
            {
              name: '活动排名',
              code: '1-2',
              url: '/home/activityRank'
            }
          ]
        },
        {
          name: '网格管理',
          pos: 0,
          code: '2',
          url: '/grid',
          child: []
        },
        {
          name: '客户管理',
          pos: -23,
          code: '3',
          url: '/customer',
          child: []
        },
        {
          name: '授信管理',
          pos: -46,
          code: '4',
          child: [
            {
              name: '已面谈面签',
              code: '4-1',
              url: '/credit/faceSigned'
            }
          ]
        },
        {
          name: '信息管理',
          pos: -69,
          code: '5',
          child: [
            {
              name: '户籍管理',
              code: '5-1',
              url: '/resident'
            }
          ]
        }
      ],
      role7: [
        {
          name: '用户管理',
          pos: -23,
          code: '1',
          url: '/user',
          child: []
        },
        {
          name: '网格管理',
          pos: 0,
          code: '2',
          url: '/grid',
          child: []
        },
        {
          name: '机构管理',
          pos: -93,
          code: '3',
          url: '/configuration/mechanism',
          child: []
        },
        {
          name: '标签管理',
          pos: -116,
          code: '4',
          url: '/configuration/label',
          child: []
        },
        {
          name: '产品管理',
          pos: -139,
          code: '5',
          url: '/configuration/product',
          child: []
        },
        {
          name: '区域管理',
          pos: -165,
          code: '6',
          url: '/configuration/region',
          child: []
        },

        {
          name: '字典管理',
          pos: -189,
          code: '7',
          url: '/configuration/dictionaries',
          child: []
        },
        {
          name: '征信账号管理',
          pos: -210,
          code: '8',
          url: '/creditUser',
          child: []
        }
      ]
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ]
    },
    menuitemClasses () {
      if (this.isCollapsed) {
        let sub = document.getElementsByClassName('ivu-menu-submenu')
        for (let i = 0; i < sub.length; i++) {
          sub[i].getElementsByClassName('ivu-menu-submenu-title-icon')[0].style = 'display:none'
          sub[i].style.height = '50px'
          sub[i].onmouseover = function () {
            sub[i].getElementsByTagName('ul')[0].style = 'margin-top:-50px;z-index:1000;position: relative;width:200px;margin-left:78px;background: #001529;'
          }
          sub[i].onmouseout = function () {
            sub[i].getElementsByTagName('ul')[0].style = 'display:none'
          }
        }
      } else {
        let sub = document.getElementsByClassName('ivu-menu-submenu')
        for (let i = 0; i < sub.length; i++) {
          sub[i].getElementsByClassName('ivu-menu-submenu-title-icon')[0].style = ''
          sub[i].style.height = 'auto'
          sub[i].onmouseover = function () {

          }
          sub[i].onmouseout = function () {

          }
        }
      }
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  mounted () {
    let islogin = sessionStorage.getItem('islogin')
    if (!islogin) {
      this.islogin = false
      this.$router.push('/')
    } else {
      this.islogin = true

      let usr = JSON.parse(sessionStorage.getItem('userObj'))
      let roleId = usr.roles[0].roleId
      this.roleId = roleId
      let url = window.location.href

      if (!sessionStorage.getItem('islogincount')) {
        this.$Message.success('登录成功')
        sessionStorage.setItem('islogincount', 1)

        if (roleId === 7) {
          this.$router.push('/user')
          url = '/#/user'
        } else if (roleId === 2) {
          this.$router.push('/credit/review')
          url = '/#/credit/review'
        } else {
          this.menuTopClick('首页', '/home')
          url = '/#/home'
        }
      }

      if (roleId === 1) {
        this.role = this.role1
      } else if (roleId === 2) {
        this.role = this.role2
      } else if (roleId === 3) {
        this.role = this.role3
      } else if (roleId === 7) {
        this.role = this.role7
      }

      if (url.indexOf('/#/home') >= 0) {
        this.menuTop = '首页'
        this.activeName = ''
        this.openNames = []
      } else if (url.indexOf('/#/workbench') >= 0) {
        this.menuTop = '工作台'
        this.activeName = ''
        this.openNames = []
      } else {
        this.menuTop = ''
        url = url.substring(url.lastIndexOf('/#/') + 2)
        for (let i in this.role) {
          if (this.role[i].child.length === 0) {
            if (this.role[i].url.indexOf(url) === 0) {
              this.activeName = this.role[i].code
            }
          } else {
            for (let j in this.role[i].child) {
              if (this.role[i].child[j].url.indexOf(url) === 0) {
                this.activeName = this.role[i].child[j].code
                this.openNames = [this.role[i].code]
                break
              }
            }
          }
          if (this.activeName !== '') {
            break
          }
        }
      }

      setTimeout(() => {
        this.$nextTick(() => {
          this.$refs.menu.updateOpened()
          this.$refs.menu.updateActiveName()
        })

        let sub = document.getElementsByClassName('ivu-menu-submenu-title')
        for (let i = 0; i < sub.length; i++) {
          sub[i].style.backgroundColor = '#002140'
          sub[i].onmouseover = function () {
            sub[i].style.backgroundColor = '#1890FF'
            sub[i].getElementsByClassName('img')[0].style.backgroundPositionX = '-26px'
          }
          sub[i].onmouseout = function () {
            sub[i].style.backgroundColor = '#002140'
            sub[i].getElementsByClassName('img')[0].style.backgroundPositionX = '0px'
          }
        }
      }, 100)
    }
  },
  methods: {
    collapsedSider () {
      if (this.logo1 === '') {
        this.logo1 = this.logo
        if (this.activeName === '') {
          this.activeName = this.activeName1
        }
        if (this.openNames.length === 0) {
          this.openNames = this.openNames1
        }
      } else {
        this.logo1 = ''
        this.activeName1 = this.activeName
        this.openNames1 = this.openNames
        this.activeName = ''
        this.openNames = []
      }
      this.$refs.side1.toggleCollapse()
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
        this.$refs.menu.updateActiveName()
      })
    },
    onSelectChange (name) {
      this.activeName = name
      this.menuTop = ''
      if (name.indexOf('-') === -1) {
        for (let i in this.role) {
          if (this.role[i].code === name) {
            this.$router.push(this.role[i].url)
          }
        }
      }
    },
    onOpenChange (name) {
      this.openNames = name
    },
    menuTopClick (name, url) {
      this.activeName = ''
      this.openNames = []
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
        this.$refs.menu.updateActiveName()
      })
      this.menuTop = name
      this.$router.push(url)
    }
  },
  components: {
    User
  }
}
</script>

<style lang="scss">
    #app {
        width: 100%;
        min-width:1200px;
        min-height: 100%;
        .layout-header-bar{
            background: #fff;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
            padding-left: 0px;
            .header_left{
                width:100%;
                color:#002140;
                background: #FFFFFF;
                line-height: 60px;
                img {
                    margin-top: 22px;
                    margin-left: 10px;
                    float: left;
                    width: 60px;
                    height: 17px;
                }
                div {
                    margin-left: 8px;
                    float: left;
                    font-size: 20px;
                    line-height: 60px;
                    font-weight: bold;
                }
            }
            .menu-icon{
                transition: all .3s;
                float: left;
                line-height: 64px;
            }
            .rotate-icon{
                transform: rotate(-90deg);
                float: left;
                line-height: 64px;
            }
            .menu_top {
                width:500px;
                height: 64px;
                line-height: 64px;
                float: left;
                margin-left: 20px;
                ul {
                    margin-top: 0px;
                    height: 64px;
                    border-bottom: none;
                    li {
                        list-style: none;
                        float: left;
                        width:100px;
                        line-height: 64px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
                .active {
                    border-top: solid 2px #1890FF;
                    background:rgba(240,242,245,1);
                }
            }
        }
        .ivu-layout-sider{
            color: #FFFFFF;
            background: #002140;
            ul {
                box-shadow:2px 0px 6px 0px rgba(0,21,41,0.35);
            }
            .ivu-menu-item:hover {
                background: #1890FF;
                .img {
                    background-position-x:-26px;
                }
            }
            a.ivu-menu-item:hover {
                background: #1890FF !important;
            }
            .ivu-menu-item-active{
                background: #1890FF;
                color: #fff;
                .img {
                    background-position-x:-26px !important;
                }
            }
            .ivu-menu-opened {
                background: #001529;
                .img {
                    background-position-x:-26px !important;
                }
            }
            .menu-item {
                background: #002140;
                min-height: calc( 100vh - 60px );
                .img {
                    width:18px;
                    height:18px;
                    float:left;
                    margin-top: 2px;
                    margin-right: 5px;
                    background-image: url('/tubiao1.svg');
                    background-repeat: no-repeat;
                    background-size:245% 1400% ;
                    background-position-x:0px;
                }
                span{
                    display: inline-block;
                    overflow: hidden;
                    width: 90px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    vertical-align: bottom;
                    transition: width .2s ease .2s;
                    color: #ffffff;
                }
            }
            .collapsed-menu{
                background: #002140;
                min-height: calc( 100vh - 60px );
                .img {
                    width:18px;
                    height:18px;
                    float:left;
                    margin-right: 5px;
                    background-image: url('/tubiao.svg');
                    background-repeat: no-repeat;
                    background-size:245% 1400% ;
                    background-position-x:0px;
                }
                span{
                    width: 0px;
                    transition: width .2s ease;
                }
            }
        }
        .ivu-layout-content {
            background-color: #F0F2F5;
        }
    }
</style>
