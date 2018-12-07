import login from './login' // 登录页面
import home from './home/home' // 首页
import resident from './resident/resident'// 户籍信息
import customer from './customer/customer'// 客户信息
import grid from './grid/grid'

import dishonest from './dishonest/dishonest'// 失信人查询

import tag from './configuration/tag'
import product from './configuration/product'
import mechanism from './configuration/mechanism'
import dictionaries from './configuration/dictionaries'
import region from './configuration/region'

import advisory from './centralized/advisory'
import black from './centralized/black'
import grey from './centralized/grey'
import white from './centralized/whitelist'
import result from './centralized/result'

import user from './user/user'
import authority from './user/authority'
import role from './user/role'

import workbench from './workbench/workbench'// 工作台

import credituser from './creditUser/creditUser'// 征信查询账号

// Workbench from

export default {
  home,
  login,
  resident,
  customer,
  grid,

  dishonest,

  product,
  region,
  tag,
  mechanism,
  dictionaries,

  advisory,
  black,
  grey,
  white,
  result,

  user,
  role,
  authority,

  workbench,
  credituser
}
