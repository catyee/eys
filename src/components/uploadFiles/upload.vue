<template>
    <el-upload
    class="upload"
    :ref="uploadFileRef"
    :auto-upload="false"
    :on-progress="uploadProcess"
    :before-upload="beforeUpload"
    :show-file-list="false"
    :headers="uploadHeaders"
    :on-success="handleSuccess"
    :on-error="handleError"
    :action="uploadUrl"
    :on-change="handleChange"
  >
    <el-button type="primary" size="small" class="ml-16"
      >选择文件夹</el-button
    >
  </el-upload>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    // 控制弹框的出现
    uploadFileRef: String
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
  mounted () {
    this.$refs[this.uploadFileRef].$children[0].$refs.input.webkitdirectory = true
  },
  methods: {
    handleChange (file, fileLists) {
      // console.log(file)
      console.log(fileLists, '3333333')
      // 本地服务器路径
    //  console.log(URL.createObjectURL(file.raw))
      // 本地电脑路径
      // console.log(document.getElementsByClassName('el-upload__input')[0].value, 'aaaaaaaaa')
    },
    beforeUpload (file) {
      // 上传到服务器之前 禁止再次上传
      this.enableUpload = false
      //  console.log(file, 'fileeeee')
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
