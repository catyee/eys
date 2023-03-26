<template>
  <div class="upload-files">
    <el-dialog
      :visible.sync="showPanel"
      width="40%"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <div slot="title" class="title">文件上传</div>
      <div class="file-type">
        <span>数据格式：</span>
        <el-radio-group v-model="fileType">
          <el-radio label="Word">Word</el-radio>
          <el-radio label="Excel">Excel</el-radio>
        </el-radio-group>
      </div>
      <div class="mt-20">
        <div class="flex">
          <el-radio v-model="fileNum" label="1">单个上传</el-radio>
          <el-input
            :readonly="true"
            style="width: 350px"
            v-model="fileUrl"
            placeholder=""
          ></el-input>
          <el-button type="primary" size="small" class="ml-16"
            >选择单个文件</el-button
          >
        </div>
        <div class="flex">
          <el-radio v-model="fileNum" label="2">多个上传</el-radio>
          <el-input
            :readonly="true"
            v-model="fileUrl"
            style="width: 350px"
            placeholder=""
          ></el-input>
            <upload uploadFileRef="upload2"/>
        </div>
      </div>
      <!-- <el-upload
        class="upload"
        :on-progress="uploadProcess"
        :before-upload="beforeUpload"
        :show-file-list="false"
        :headers="uploadHeaders"
        :on-success="handleSuccess"
        :on-error="handleError"
        :action="uploadUrl"
      >
        <div class="upload-opers">
          <div><i class="el-icon-upload"></i>上传签名页照片</div>
        </div>
        <el-progress
          v-if="showProgress"
          :percentage="uploadPercent"
          style="margin-top: 7px"
        ></el-progress>
      </el-upload> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePanel">取 消</el-button>
        <el-button type="primary" @click.prevent="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import './index.scss'
import { getToken } from '@/utils/auth'
import upload from './upload.vue'
export default {
  components: {
    upload
  },
  props: {
    // 控制弹框的出现
    showPanel: Boolean
  },
  data () {
    return {
      fileType: 'Word',
      fileNum: '1',
      // 文件的本机路径
      fileUrl: '',
      uploadHeaders: { Authorization: 'Bearer ' + getToken() },
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/upload',
      // 签名页照片地址
      signUrl: '',
      // 是否显示进度条
      showProgress: false,
      // 是否允许上传
      enableUpload: true
    }
  },
  methods: {
    beforeUpload (file) {
      // 上传到服务器之前 禁止再次上传
      this.enableUpload = false
      console.log(file, 'fileeeee')
      //   const types = ['image/jpeg', 'image/jpg', 'image/png']

    //   if (types.indexOf(file.type) === -1) {
    //     this.msgError('请上传正确的格式')
    //     // 允许再次上传
    //     this.enableUpload = true
    //     return false
    //   }
    //   // 视频长度不大于20M
    //   if (file.size > 209715200) {
    //     this.msgError('文件过大')
    //     // 允许再次上传
    //     this.enableUpload = true
    //     return false
    //   }
    },
    // // 进度条
    uploadProcess (event, file, fileList) {
      // 显示进度条
      this.showProgress = true
      // 计算进度
      this.uploadPercent = file.percentage.toFixed(0) * 1
    },
    handleError (e) {
      // 允许再次上传
      this.enableUpload = true
      // 隐藏进度条
      this.showProgress = false
      // 重置上传进度百分比
      this.uploadPercent = 0
      this.msgError(e)
    },
    handleSuccess (res, file) {
      // 允许再次上传
      this.enableUpload = true
      // 隐藏进度条
      this.showProgress = false
      // 重置上传进度百分比
      this.uploadPercent = 0
      if (res.code === 200) {
        this.signUrl = res.url
        this.msgSuccess('上传成功')
      } else {
        this.msgError('上传失败')
      }
    },
    // 关闭弹框
    closePanel () {
      this.$emit('closeModal')
    },
    // 提交签名页照片
    submit () {
      // 发送图片地址到父组件
      this.$emit('getSignUrl', this.signUrl)
      this.closePanel()
    }
  }
}
</script>
