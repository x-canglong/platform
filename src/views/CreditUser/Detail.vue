<template>
  <!--
  新建征信查询账户版块
  -->
  <div>
    <div class="userDetailBreadcrumb">
      <Breadcrumb>
        <!--<BreadcrumbItem>系统管理</BreadcrumbItem>-->
        <BreadcrumbItem to="/creditUser">征信账号管理</BreadcrumbItem>
        <BreadcrumbItem v-if="!this.flag">新建</BreadcrumbItem>
        <BreadcrumbItem v-if="this.flag">编辑</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="form">
      <Form ref="form" :model="form" :rules="ruleValidate">
        <Row>
          <Col span="6">
          <FormItem label="用户名：" prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="密码：" prop="password">
            <Input :type="!flag ? 'password' : 'text'" v-model="form.password" placeholder="请设置用户密码"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="机构名称：" prop="value2">
            <Cascader v-model="form.value2" :data="data1" :render-format="format" @on-change="dianjiOk"
                      change-on-select filterable></Cascader>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
          <FormItem label="备注：" prop="comment">
            <Input v-model="form.comment" placeholder="请输入备注"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="提醒：" prop="remind">
            <Input v-model="form.remind" placeholder="请输入提醒"></Input>
          </FormItem>
          </Col>
          <Col offset="2" span="6">
          <FormItem label="类型：" prop="type">
            <RadioGroup v-model="form.type" style="width:100%">
              <Radio label="0">查询账号</Radio>
              <Radio label="1">审批账号</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
          <FormItem label="状态：" prop="status">
            <RadioGroup v-model="form.status" style="width:100%">
              <Radio label="0">启用</Radio>
              <Radio label="1">冻结</Radio>
            </RadioGroup>
          </FormItem>
          </Col>
        </Row>
        <FormItem>
          <Button type="primary" @click="handleSubmit('form')">提交</Button>
          <Button @click="goBack" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import actions from '@/store/action-types'

export default {
  name: 'userDetail',
  data () {
    const validatePass = (rule, value, callback) => {
      let patrn = /^(\w){6,20}$/
      if (!patrn.test(value)) {
        callback(new Error('密码由6-20个字母、数字、下划线构成'))
      } else {
        callback()
      }
    }
    const validateType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择账号类型！'))
      } else {
        callback()
      }
    }
    return {
      flag: false,
      data1: [],

      // userList:[],
      roleNameList: [], // 所有的角色数组
      // 这个用户的所有信息
      form: {
        // userName: '',
        password: '',
        status: '0',
        value2: []
        // orgCode: '',
        // orgName: '',
        // comment:'',
        // remind:''
      },
      // 表单验证
      ruleValidate: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'string', min: 2, max: 20, message: '用户名最大长度为20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择账号类型', trigger: 'blur' },
          { validator: validateType, trigger: 'blur' }
        ],
        value2: [
          { required: true, type: 'array', min: 1, message: '机构名称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    var vue = this
    // 如果有accountId 认为是编辑操作  获取此用户相关消息
    if ('id' in this.$route.query) { // 根据传过来得accountId先获取信息
      let id = this.$route.query.id
      this.flag = true
      this.getDetail(id)
    } else {
      // 获取所有的机构名称
      this.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep => {
        if (rep.code === 200) {
          vue.data1 = this.recursion(rep.data)
        } else {
          vue.$Message.error(rep.message)
        }
      })
    }
  },
  methods: {
    // 递归把 机构名称 做出级联选择
    recursion (obj) {
      let result = []
      for (var i in obj) {
        let o = {
          value: obj[i].orgCode,
          label: obj[i].orgName
        }
        if (obj[i].childList.length > 0) {
          o.children = this.recursion(obj[i].childList)
        }
        result.push(o)
      }

      return result
    },
    recursion1 (obj, orgcode) {
      let result = []
      for (var i in obj) {
        if (obj[i].childList.length > 0) {
          let code = this.recursion1(obj[i].childList, orgcode)
          if (code.length > 0) {
            code.push(obj[i].orgCode)
            result = code
          }
        } else {
          if (orgcode === obj[i].orgCode) {
            result.push(obj[i].orgCode)
          }
        }
      }
      return result
    },
    // 级联选择的方法 控制级联选择input框里显示的信息
    format (labels, selectedData) {
      const index = labels.length - 1
      const data = selectedData[index] || false
      if (data && data.code) {
        return labels[index] + ' - ' + data.code
      }
      return labels[index]
    },
    // 机构名称选择之后的事件
    dianjiOk (labels, selectedData) {
      if (selectedData.length > 0) {
        this.form.orgName = selectedData[selectedData.length - 1].label// 选中的机构name
        this.form.orgCode = selectedData[selectedData.length - 1].value.toString()// 选中的机构id
      } else {
        this.form.orgName = ''
        this.form.orgCode = ''
      }
    },
    // 通过id获取此用户相关消息
    getDetail (id) {
      let vue = this
      return this.$store.dispatch(actions.get.CREDIT_USER_DETAILS, id).then(rep => {
        if ({ ...rep.data }.code === 200) {
          vue.form = { ...rep.data.data }
          vue.form.status = { ...rep.data.data }.status.toString()
          console.log(vue.form)
          let orgCode = vue.form.orgCode
          // 获取机构名称
          vue.$store.dispatch(actions.get.MECHANISM_PERSON, 1).then(rep1 => {
            if (rep1.code === 200) {
              vue.data1 = this.recursion(rep1.data)
              let arrList = this.recursion1(rep1.data, orgCode)
              for (let i = arrList.length - 1; i >= 0; i--) {
                vue.form.value2.push(arrList[i])
              }
            } else {
              vue.$Message.error(rep1.message)
            }
          })
        } else {
          vue.$Message.error(rep.message)
        }
      })
    },
    // 提交按钮的事件
    handleSubmit (name) {
      let vue = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          let payload = vue.form
          payload.status = payload.status ? parseInt(payload.status) : ''
          //  如果有id字段 说明是编辑操作  调用下面axios  若没有 则认为是添加操作
          if ('id' in this.$route.query) {
            delete payload.createdAt// 因为编辑用户得接口得参数里面没有roles字段
            delete payload.updatedAt// 因为编辑用户得接口得参数里面没有roles字段
            console.log(payload)
            vue.$store.dispatch(actions.put.CREDIT_USER, payload).then(rep => {
              // 判断返回的消息，若返回得code为200 则认为操作成功
              if (rep.data.code !== 200) {
                this.$Message.error(rep.data.message)
              } else { // 否则返回一个警告窗 并把错误信息显示
                this.$Message.success('用户资料修改成功！')
                this.$router.go(-1)
              }
            })
          } else { // 若没有 则认为是添加操作
            console.log(payload)
            vue.$store.dispatch(actions.post.CREDIT_USER, payload).then(rep => {
              // 判断返回的消息，若返回得code为200 则认为操作成功 否则返回一个警告窗 并把错误信息显示
              if (rep.data.code !== 200) {
                this.$Message.error(rep.data.message)
              } else { // 否则返回一个警告窗 并把错误信息显示
                this.$Message.success('新建用户成功！')
                this.$router.go(-1)
              }
            })
          }
        } else {
          this.$Message.error('请按要求完善信息!')
        }
      })
    },
    // 取消按钮
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .userDetailBreadcrumb {
    height: 54px;
    background-color: #fff;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    line-height: 54px;
    padding-left: 20px;
    border-radius: 4px;
    border: 1px solid #eee;
  }

  .form {
    margin: 24px;
    padding: 20px;
    background-color: #fff;
    .ivu-form-item-label {
      font-size: 14px;

    }
    .ivu-radio-group-item {
      font-size: 14px;
    }
  }
</style>
