<template>
    <!-- 白名单 -->
    <div>
        <div class="whilteBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>统计查询</BreadcrumbItem>
                <BreadcrumbItem>白名单信息</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="pagetop">
            <div style="font-size:14px;font-family:PingFangSC-Regular;">
                <span>请选择网格：</span>
                <Button type="text" style="font-size:14px;padding:0 5px;height:30px;border-radius:4px"
                        :class="uploadObj.gridCode==null?'active':''" @click="changeGrid(null)">全部
                </Button>
                <Button type="text" style="font-size:14px;padding:0 5px;margin-left:10px;height:30px;border-radius:4px;"
                        v-for="(h, index) in gridNameList" :key="index" :class="uploadObj.gridCode==h.gridCode?'active':''"
                        @click="changeGrid(h.gridCode)">{{ h.gridName }}
                </Button>
            </div>
            <Divider style="margin: 14px 0;"/>
            <div class="import">
                批量导入:
                <Button class="import" @click="onImport" icon="ios-download-outline">导入白名单</Button>
            </div>
            <Modal v-model="showImportModal" title="导入白名单" width="300px" :footer-hide="true">
                <Upload ref="upload" multiple type="drag" :headers="headers" :data="uploadObj"
                        :action="uploadUrl+'/customer/whitelist/import'"  :on-success="onUpload" :on-error="offUpload">
                    <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p>
                    </div>
                </Upload>
                <p>注：上传文件请先下载<a :href="uploadUrl+'/template/白名单模板.xls'">模板</a>，按要求填写、上传进行导入。</p>
            </Modal>
        </div>
        <div class="page">
            <!-- 黑名单标签页 -->

            <div class="search">
                <Button class="createBtn" type="primary" @click="addCustomer">添加白名单</Button>
                <Button class="createBtn" type="default" style="margin-left:10px" @click="addToFaceSign">转入面签</Button>
                <Button class="searchBtn" type="primary" icon="ios-search" @click="showInput">查询</Button>
                <Input class="search-input" v-model="search2.keyword" clearable
                       @on-change="onChangeNull">
                    <Select v-model="search2.type" slot="prepend" style="width: 80px">
                        <Option value="customerName">姓名</Option>
                        <Option value="idNumber">身份证号</Option>

                    </Select>
                </Input>
            </div>
            <div class="table">
                <Table highlight-row :columns="columns2" @on-selection-change="selectChange" :data="list"></Table>
            </div>
            <!--表格底部分页导航-->
            <div class="pagination">
                <div class="text">共{{ total }}条记录 第 {{ pageNum }} / {{ Math.ceil(total / pageSize) }} 页</div>
                <Page show-sizer class="pager" @on-page-size-change="onPageSizeChange"
                      :page-size-opts="pageSizeOpts" :current="pageNum" :page-size="pageSize" :total="total"
                      @on-change="changePage" show-elevator/>
            </div>
            <!--确认删除弹窗-->
            <Modal v-model="model.show" width="320" footer-hide :styles="{top: '120px'}">
                <div style="padding: 0 0 10px 0;font-size: 16px;color:rgba(0,0,0,0.85);">
                    <Icon style="color:#1890FF;line-height:24px;" type="ios-paper"></Icon>
                    <span> 你确定要删除该用户么？</span>
                </div>
                <p style="margin:0 0 30px 10px;padding-left: 20px;font-size:14px;color:rgba(0,0,0,0.65);">{{
                    model.content }}</p>
                <div style="width: 100%;text-align: right">
                    <Button style="width:65px;height:32px;" size="large" @click="goBack">取消</Button>
                    <Button type="primary" style="margin-left:10px;width:65px;height:32px;background-color:#1890FF"
                            size="large" @click="deleteUser">确定
                    </Button>
                </div>
            </Modal>
            <!-- 单个添加名单客户 -->
            <Modal footer-hide
                    v-model="modal1"
                    title="添加客户">
                <div class="searchBtn">
                    <i-input v-model="search1.idNumber" placeholder="请输入身份证号进行查询..." clearable style="width: 270px"></i-input>
                    <i-button type="primary" icon="ios-search" style="float:none" @click="onSearch1">查询</i-button>
                </div>

                <div style="margin: 10px 0px">
                    <RadioGroup v-model="customerIndex">
                        <Radio  style="margin: 5px" :label="index" v-for="(h,index) in customerNameList" :key="index">{{ h.customerName }}</Radio>
                    </RadioGroup>
                </div>
                <div style="width: 100%;text-align: right">
                    <Button style="width:65px;height:36px;" size="large" @click="goBack">取消</Button>
                    <Button type="primary" style="margin-left:10px;width:65px;height:36px;"
                            size="large" @click="addCustomer1">确定
                    </Button>
                </div>
            </Modal>
            <Modal v-model="model1.show" footer-hide width="320" :styles="{top: '200px'}" :closable="false">
              <div style="padding: 0 0 10px 0;font-size: 16px;">
                <Icon type="ios-paper" style="color:#2d8cf0;line-height:24px;"></Icon>
                <span>确定要将这些客户转入待面签名单？</span>
              </div>
              <div style="font-size: 14px;padding-left: 20px;padding-bottom: 20px">
                <p>您共选择 {{Nums}} 名客户。</p>
              </div>
              <div style="text-align: right">
                <Button size="large"  @click="goBack" style="margin: 5px">取消</Button>
                <Button type="primary" size="large"  @click="perviewShow">确定</Button>
              </div>
            </Modal>
        </div>
    </div>
</template>

<script>
import axios from '@/store/axios'
import actions from '@/store/action-types'

import { UPLOAD_API_URL } from '@/config'

export default {
  data () {
    return {
      headers: {
        'Authorization': sessionStorage.getItem('token')
      },
      selections: [],
      Nums: 0, // 转入待面谈面签数量
      pageNum: 1,
      pageSize: 10,
      pageSizeOpts: [5, 10, 15, 20],
      showImportModal: false,
      uploadUrl: UPLOAD_API_URL,
      uploadObj: {
        gridCode: null
      },
      // 单个添加白名单客户，默认弹窗关闭
      modal1: false,
      modal2: false,
      modal3: false,
      customerNameList: [],
      form: {},
      customerIndex: '',
      search1: {
        idNumber: ''
      },
      model: {
        show: false,
        id: null,
        content: '',
        loading: false
      },
      model1: {
        show: false,
        id: null,
        content: '',
        loading: false
      },
      detail: {
        show: false
      },
      search: {
        type: 'customerName',
        keyword: ''
      },
      search2: {
        type: 'customerName',
        keyword: ''
      },
      columns2: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '客户姓名',
          align: 'center',
          key: 'customerName'
        },
        {
          title: '身份证号',
          align: 'center',
          key: 'idNumber'
        },
        {
          title: '联系方式',
          align: 'center',
          key: 'phoneNumber'
        },
        {
          title: '网格名称',
          align: 'center',
          key: 'gridName'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 200,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'text',
                size: 'small'
              },
              on: {
                click: () => {
                  this.delete(params.row)
                }
              }
            }, '删除')
          }
        }
      ],

      list: [],
      total: 0,
      gridNameList: []
    }
  },
  mounted () {
    // 获取列表
    var vue = this
    if ('pageNum' in this.$route.query) {
      this.pageNum = parseInt(this.$route.query.pageNum)
    }
    this.lettersList()

    this.$store.dispatch(actions.get.GRIDNAME_LIST, {}).then(rep => {
      if (rep.code === 200) {
        vue.gridNameList = [...rep.data]
      } else if (rep.code !== 200 && rep.code !== 204) {
        vue.$Message.error(rep.message)
      }
    })
  },
  methods: {
    // 请求表格数据
    lettersList (params = {}) {
      var vue = this
      this.$store.dispatch(actions.get.WHITE_LIST, {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        ...params
      }).then(rep => {
        if (rep.code === 200) {
          vue.total = rep.count
          vue.list = [...rep.data]
        } else {
          vue.$Message.error(rep.message)
        }
      })
    },
    selectChange (selection) {
      this.Nums = selection.length
      this.selections = selection
    },
    addToFaceSign () {
      if (this.Nums !== 0) {
        this.model1.show = true
      } else {
        this.$Message.error('请选择转入客户')
      }
    },
    perviewShow () {
      let list = []
      this.selections.map((item) => {
        list.push({
          customerName: item.customerName,
          idNumber: item.idNumber,
          gridCode: item.gridCode
        })
      })
      axios.post('/customer/creditdetail/addlist', list).then(res => {
        this.model1.show = false
        if (res.data.data.faile) {
          this.$Message.error(`客户${res.data.data.faileList}，${res.data.data.faile}条数据转入失败`)
        } else {
          this.$Message.success('所选客户已全部导入待面谈面签名单！')
        }
      })
    },
    // 选择网格
    changeGrid (gridCode) {
      if (this.uploadObj.gridCode === gridCode) {
        return
      }
      this.uploadObj.gridCode = gridCode
      var param = {}
      if (this.uploadObj.gridCode != null) {
        param = { gridCode: this.uploadObj.gridCode }
      }
      this.lettersList(param)
    },
    // 切换页码
    changePage (num) {
      this.pageNum = num
      this.$router.replace({ query: { pageSize: this.pageSize, pageNum: this.pageNum } })
      this.showInput()
    },
    onPageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.$router.replace({ query: { pageSize: this.pageSize, pageNum: this.pageNum } })
      this.showInput()
    },
    onChangeNull () {
      if (this.search2.keyword === '') {
        let payload = {}
        if (this.uploadObj.gridCode != null) {
          payload.gridCode = this.uploadObj.gridCode
        }
        this.$router.replace({ query: { pageSize: this.pageSize, pageNum: this.pageNum } })
        this.lettersList(payload)
      }
    },
    // 表格上方查询按钮
    showInput () {
      let payload = {}
      if (this.search2.keyword) {
        payload[this.search2.type] = this.search2.keyword
      }
      if (this.uploadObj.gridCode != null) {
        payload.gridCode = this.uploadObj.gridCode
      }
      this.$router.replace({ query: { pageSize: this.pageSize, pageNum: this.pageNum } })
      this.lettersList(payload)
    },
    // 表格里的删除按钮
    delete (row) {
      this.model.data = row
      this.model.content = row.customerName
      this.model.id = row.id
      this.model.show = true
    },
    // 删除功能弹窗里的确定按钮
    deleteUser () {
      var vue = this
      this.model.loading = true
      setTimeout(() => {
        this.model.loading = false
        this.model.show = false
        this.$store.dispatch(actions.delete.WHITE_PERSON, this.model.id).then(rep => {
          if (rep.data.code === 200) {
            vue.$Message.success('删除成功')
            vue.search2.keyword = ''
            vue.uploadObj.gridCode = null
            vue.lettersList()
          } else {
            vue.$Message.error(rep.data.message)
          }
        })
      }, 1000)
    },
    // 删除功能弹窗里的取消按钮
    goBack () {
      this.model.show = false
      this.model1.show = false
      this.modal1 = false
    },
    // 新建按钮
    addCustomer () {
      if (this.uploadObj.gridCode == null) {
        this.$Message.error('请先选择网格')
      } else {
        this.customerNameList = []
        this.search1.idNumber = '' // 新增窗口查询框清空
        this.customerIndex = '' // 选择的也为空
        this.modal1 = true
        this.offReason = ''
        this.comment = ''
      }
    },
    // 上传文件 批量导入按钮
    onImport () {
      if (this.uploadObj.gridCode == null) {
        this.$Message.error('请先选择网格')
      } else {
        this.$refs.upload.clearFiles()
        this.showImportModal = true
      }
    },
    // 导入名单成功的事件
    onUpload (data) {
      if (data.code === 200) {
        this.showImportModal = false
        this.search2.keyword = ''
        this.uploadObj.gridCode = null
        this.lettersList()
        this.$Message.success('有' + data.data.successCount + '条记录导入成功，有' + data.data.failCount + '条记录导入失败')
      } else {
        this.$Message.error(data.message)
      }
    },
    // 导入名单失败的事件
    offUpload () {
      this.$Message.error('上传失败')
    },
    // 添加窗口的确定事件
    addCustomer1 () {
      var vue = this
      if (vue.customerIndex === '') {
        vue.$Message.error('请选择您要添入白名单的客户')
      } else {
        let customer = this.customerNameList[this.customerIndex]
        let payload = {
          customerName: customer.customerName,
          idNumber: customer.idNumber,
          phoneNumber: customer.phoneNumber,
          gridCode: vue.uploadObj.gridCode,
          adress: customer.nativeAddress,
          reason: vue.offReason,
          comment: vue.comment
        }
        console.log(payload)
        this.$store.dispatch(actions.post.WHITE_PERSON, payload).then(rep => {
          // 判断返回的消息，若返回得code为200 则认为操作成功
          if (rep.data.code !== 200) {
            vue.$Message.error(rep.data.message)
          } else { // 否则返回一个警告窗 并把错误信息显示
            vue.$Message.success('添加成功！')
            vue.modal1 = false
            vue.search2.keyword = '' // 查询框条件清空
            vue.search1.idNumber = '' // 新增窗口查询框清空
            vue.uploadObj.gridCode = null// 网格查询条件变为全部
            vue.customerIndex = ''
            vue.offReason = ''
            vue.comment = ''
            vue.lettersList()// 再查询一次列表
          }
        })
      }
    },
    // 添加窗口里的查询按钮
    onSearch1 () {
      var vue = this
      vue.customerIndex = ''
      this.$store.dispatch(actions.get.CUSTOMER_LIST, {
        pageNum: 1,
        pageSize: 1000,
        gridCode: this.uploadObj.gridCode,
        idNumber: this.search1.idNumber
      }).then(rep => {
        if (rep.code === 200) {
          vue.customerNameList = rep.data
        } else {
          vue.$Message.error(rep.message)
        }
      })
    }
  }
}
</script>

<style lang="scss">
    .whilteBreadcrumb {
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        line-height: 54px;
        padding-left: 20px;
        border-radius: 4px;
        border: 1px solid #eee;
    }

    .pagetop {
        margin: 20px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #eee;
        .import {
            font-size: 14px;
        }
        button:hover, button.active {
            background: #1890FF;
            border-radius: 2px;
            color: #fff;
        }
    }

    .page {
        margin: 20px;
        padding: 20px;
        background-color: #fff;
        border: 1px solid #eee;
        border-radius: 4px;
        .search {
            height: 35px;
            margin-bottom: 10px;
            .createBtn {
                float: left;
            }
            .searchBtn {
                float: right;
            }
            .search-input {
                float: right;
                width: 400px;
            }
        }
        .table {
            margin-bottom: 20px;
            Table {
                font-size: 14px;
            }
            Button {
                color: #2d8cf0;
            }
        }
        .pagination {
            width: 100%;
            height: 60px;
            .text {
                float: left;
                line-height: 60px;
            }
            .pager {
                float: right;
            }
        }
    }
</style>
