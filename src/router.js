import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'loginpage',
      component: () => import('./views/LoginPage/Index.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home/Index.vue')
    },
    {
      path: '/home/activityProgress',
      name: 'activityProgress',
      component: () => import('./views/Home/components/ActivityProgress.vue')
    },
    {
      path: '/home/activityProgress/activityRanking',
      name: 'activityRanking',
      component: () => import('./views/Home/components/ActivityRanking.vue')
    },
    {
      path: '/home/activityRank',
      name: 'activityRank',
      component: () => import('./views/Home/components/ActivityRank.vue')
    },

    // 户籍管理模块
    {
      path: '/resident',
      name: 'resident',
      component: () => import('./views/Resident/Index.vue')
    },
    {
      path: '/resident/detail',
      name: 'residentDetail',
      component: () => import('./views/Resident/Detail.vue')
    },
    // 失信人
    {
      path: '/dishonest',
      name: 'dishonest',
      component: () => import('./views/Dishonest/Dishonest.vue')
    },
    // 企业客户
    // 客户管理模块
    {
      path: '/customer2',
      name: 'customer2',
      component: () => import('./views/Customer/Index2.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('./views/Customer/Index.vue')
    },
    {
      path: '/customer/InDetail',
      name: 'InDetail',
      component: () => import('./views/Customer/InDetail.vue')
    },
    {
      path: '/customer/Detail',
      name: 'CustomerDetail',
      component: () => import('./views/Customer/Detail.vue')
    },
    {
      path: '/customer/addDetail',
      name: 'CustomeraddDetail',
      component: () => import('./views/Customer/addDetail.vue')
    },

    // 网格管理模块
    {
      path: '/grid',
      name: 'grid',
      component: () => import('./views/Grid/Index.vue')
    },
    {
      path: '/grid/InDetail',
      naem: 'gridDetail',
      component: () => import('./views/Grid/InDetail.vue')
    },
    {
      path: '/grid/InMap',
      name: 'inMap',
      component: () => import('./views/Grid/InMap.vue')
    },
    {
      path: '/grid/mesher',
      name: 'mesher',
      component: () => import('./views/Grid/Mesher/Index.vue')
    },

    // 配置管理模块
    {
      path: '/configuration/label',
      name: 'label',
      component: () => import('./views/Configuration/Label.vue')
    }, {
      path: '/configuration/lable/detail',
      name: 'labeldetail',
      component: () => import('./views/Configuration/LabelDetail')
    },
    {
      path: '/configuration/product',
      name: 'product',
      component: () => import('./views/Configuration/Product.vue')
    },
    {
      path: '/configuration/region',
      name: 'region',
      component: () => import('./views/Configuration/Region.vue')
    },
    {
      path: '/configuration/mechanism',
      name: 'mechanism',
      component: () => import('./views/Configuration/Mechanism.vue')
    },
    {
      path: '/configuration/dictionaries',
      name: 'dictionaries',
      component: () => import('./views/Configuration/Dictionaries/Index.vue')
    },
    {
      path: '/configuration/dictionaries/detail',
      name: 'dictionariesdetail',
      component: () => import('./views/Configuration/Dictionaries/Detail.vue')
    },

    // 集中授信模块
    {
      path: '/credit/whitepage',
      name: 'white',
      component: () => import('./views/Centralized/WhitePage.vue')
    },
    {
      path: '/credit/blackpage',
      name: 'blackpage',
      component: () => import('./views/Centralized/BlackPage.vue')
    },
    {
      path: '/credit/greypage',
      name: 'greypage',
      component: () => import('./views/Centralized/GreyPage.vue')
    },
    {
      path: '/credit/result',
      name: 'result',
      component: () => import('./views/Centralized/Interview/FaceSign.vue')
    },
    {
      path: '/credit/review',
      name: 'review',
      component: () => import('./views/Centralized/Interview/FaceSignReview.vue')
    },
    {
      path: '/credit/result/showDetail',
      name: 'resultShowDetail',
      component: () => import('./views/Centralized/Interview/FaceSignShowDetail.vue')
    },
    {
      path: '/credit/result/detail',
      name: 'resultDetail',
      component: () => import('./views/Centralized/Interview/FaceSignDetail.vue')
    },
    {
      path: '/credit/result/upload',
      name: 'resultUpload',
      component: () => import('./views/Centralized/Interview/FaceSignUploadFile.vue')
    },
    {
      path: '/credit/result/checkUp',
      name: 'resultCheckUp',
      component: () => import('./views/Centralized/Interview/FaceSignCheckUp.vue')
    },
    {
      path: '/credit/faceSigned',
      name: 'resultFaceSigned',
      component: () => import('./views/Centralized/Interview/FaceSigned.vue')
    },
    {
      path: '/credit/loanApproval/tatement',
      name: 'loanApprovalTatement',
      component: resolve => import('./views/Centralized/LoanApproval/CreditStatement.vue')
    },

    // 用户管理模块
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User/index.vue')
    },
    {
      path: '/user/detail',
      name: 'userDetail',
      component: () => import('./views/User/Detail.vue')
    },
    {
      path: '/user/role',
      name: 'role',
      component: () => import('./views/Role/Role.vue')
    },
    {
      path: '/user/role/detail',
      name: 'roledetail',
      component: () => import('./views/Role/RoleDetail.vue')
    },
    {
      path: '/user/authority',
      name: 'authority',
      component: () => import('./views/Authority/Authority.vue')
    },
    // 工作台
    {
      path: '/workbench',
      name: 'workbench',
      component: () => import('./views/Workbench/index.vue')
    },
    // 征信账户管理
    {
      path: '/creditUser',
      name: 'creditUser',
      component: () => import('./views/CreditUser/index.vue')
    },
    {
      path: '/creditUser/detail',
      name: 'creditUserDetail',
      component: () => import('./views/CreditUser/Detail.vue')
    }
  ]
})
