<template>
    <div>
        <div class="faceSignUploadFileBreadcrumb">
            <Breadcrumb>
                <BreadcrumbItem>授信管理</BreadcrumbItem>
                <BreadcrumbItem to="/credit/result">待面谈面签</BreadcrumbItem>
                <BreadcrumbItem>资料上传</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="uploadFilePage">
            <Tabs v-model="tabName" :value="tabName">
                <Tab-pane :label="h.title" :name="h.type" v-for="(h,index) in tabsPanes" :key="index">

                    <div class="demo-upload-list" v-for="(image,imgIndex) in imgs" :key="imgIndex">
                        <img :src="image.baseCode">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" size="50"></Icon>
                            <Icon type="ios-trash-outline" size="50"></Icon>
                        </div>
                    </div>
                    <div v-show="showFlag">
                    <Upload
                            ref="upload" :data="imageType.upload"
                            :show-upload-list="false"
                            :default-file-list="defaultList"
                            :headers="headers"
                            :max-size="4096"
                            :on-success="handleSuccess"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError"
                            :on-exceeded-size="handleMaxSize"
                            :before-upload="handleBeforeUpload"
                            multiple
                            type="drag"
                            :action="uploadUrl+'/customer/image'"
                            style="display: inline-block;width:118px;">
                        <div style="width: 118px;height:118px;line-height: 118px;" @click="uploadClick(index)">
                            <Icon type="ios-camera" size="50"></Icon>
                        </div>
                    </Upload>
                    </div>
                </Tab-pane>
            </Tabs>
        </div>
    </div>
</template>

<script>
import actions from '@/store/action-types'
import { UPLOAD_API_URL } from '@/config'

const user = JSON.parse(sessionStorage.getItem('userObj'))

export default {
  data () {
    return {
      uploadUrl: UPLOAD_API_URL,
      headers: {
        'Authorization': sessionStorage.getItem('token')
      },
      tabName: '4.2',
      showFlag: false,
      tabsPanes: [
        {
          title: '申请表',
          type: '4.2'
        },
        {
          title: '合同书',
          type: '4.1'
        }
      ],
      imageType: {
        show: false,
        index: 0,
        types: [],
        upload: {
          type: '',
          customerName: '',
          idNumber: '',
          gridCode: '',
          uploadAccountId: 0,
          creditDetailId: ''
        },
        typeName: ''
      },
      defaultList: [],
      imgs: []
    }
  },
  watch: {
    'tabName': function (newVal, oldVal) {
      this.getImgsList()
    }
  },
  mounted () {
    if ('id' in this.$route.query) {
      if (this.$route.query.approvalStatus === '0' || this.$route.query.approvalStatus === '4') {
        this.showFlag = true
      }
      var vue = this
      return this.$store.dispatch(actions.get.RESULT_PERSON, this.$route.query.id).then(rep => {
        if (rep.code === 200) {
          vue.imageType.upload.gridCode = rep.data.gridCode
          vue.imageType.upload.idNumber = rep.data.idNumber
          vue.imageType.upload.customerName = rep.data.customerName
          vue.getImgsList()
        } else if (rep.code !== 200 && rep.code !== 204) {
          vue.$Message.error(rep.message)
        }
      })
    }
  },
  methods: {

    getImgsList () {
      this.$store.dispatch(actions.get.IMAGE_LIST, {
        idNumber: this.imageType.upload.idNumber,
        type: this.tabName,
        creditDetailId: this.$route.query.id
      }).then(imgs => {
        if (imgs.data.code === 200) {
          this.imgs = [...imgs.data.data]
        } else if (imgs.data.code !== 200 && imgs.data.code !== 204) {
          this.$Message.error(imgs.data.message)
        }
      })
    },
    // 点击上传时对参数赋值
    uploadClick (index) {
      this.imageType.upload.type = this.tabsPanes[index].type
      this.imageType.upload.creditDetailId = this.$route.query.id
      this.imageType.upload.uploadAccountId = user.accountId
    },
    handleSuccess (data) {
      if (data.code === 200) {
        this.addImageModal = false
        this.getImgsList()
        this.$Message.success('上传成功')
      } else {
        this.$Message.error(data.message)
      }
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of is incorrect, please select jpg or png.'
      })
    },
    handleBeforeUpload () {

    },
    handleMaxSize () {
      this.$Notice.warning({
        title: '超过文件大小限制,请不要超过2M'
      })
    }
  }
}
</script>

<style lang="scss">
    .faceSignUploadFileBreadcrumb{
        height: 54px;
        background-color: #fff;
        font-size: 14px;
        line-height: 54px;
        padding-left: 24px;
        border-radius: 4px;
        border: 1px solid #eee;
    }
    .uploadFilePage{
        margin: 16px 24px;
        padding: 20px 20px 0px 20px;
        background-color: #fff;
        border-radius: 4px;
    }

    .demo-upload-list{
        float: left;
        margin-bottom: 24px;
        display: inline-block;
        width: 200px;
        height: 200px;
        text-align: center;
        line-height: 200px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 35px;
        cursor: pointer;
        margin: 35px 2px;
    }
</style>
