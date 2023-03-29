<template>
  <div class="flex">
    <el-upload
      class="upload-files"
      :multiple="uploadNum == 'folder'"
      :ref="uploadFileRef"
      :auto-upload="false"
      :before-upload="beforeUpload"
      :show-file-list="isShowFiles"
      :file-list="fileList"
      :headers="uploadHeaders"
      :on-success="handleSuccess"
      :on-error="handleError"
      :action="uploadUrl"
      :on-change="handleChange"
      accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    >
      <el-button
        @click="handleClick"
        :disabled="!enableUpload"
        slot="trigger"
        type="primary"
        size="small"
        class="ml-16"
        >{{ uploadNum == "folder" ? "选择文件夹" : "选择单个文件" }}</el-button
      >
      <div class="folder" @click="handleFileList" v-if="uploadNum == 'folder'">
        <i
          :class="{
            'el-icon-folder-opened': isShowFiles,
            'el-icon-folder': !isShowFiles,
          }"
        ></i>
        <span>{{ folderName }}/</span>
      </div>
    </el-upload>
    <!-- <el-progress
    v-if="showProgress"
    :percentage="uploadPercent"
    style="margin-top: 7px"
  ></el-progress> -->
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
export default {
  props: {
    // 标记上传的方式 单个文件或文件夹 file/folder
    uploadNum: String,
    // 标记每个upload组件
    uploadFileRef: String
  },

  data () {
    return {
      // 是否显示进度条
      showProgress: false,
      // 进度条的进度，
      uploadPercent: '',
      // 文件夹名
      folderName: '',
      //  选中上传的文件
      fileList: [],
      // 是否显示上传的文件
      isShowFiles: true,
      fileType: 'Word',
      // 文件的本机路径
      fileUrl: '',
      uploadHeaders: { Authorization: 'Bearer ' + getToken() },
      uploadUrl: process.env.VUE_APP_BASE_API + '/eys/text/batch/upload',
      // 是否允许上传
      enableUpload: true
    }
  },
  mounted () {
    if (this.uploadNum === 'folder') {
      this.$refs[
        this.uploadFileRef
      ].$children[0].$refs.input.webkitdirectory = true
    }
  },
  methods: {
    // 触发上传操作
    handleUpload () {
      this.$refs[this.uploadFileRef].submit()
    },
    // 点击显示文件夹下的文件
    handleFileList () {
      this.isShowFiles = !this.isShowFiles
    },
    // 点击上传按钮
    handleClick () {
      if (this.enableUpload) {
        return
      }
      this.folderName = ''
      this.$refs[this.uploadFileRef].clearFiles()
    },
    handleChange (e) {
      if (this.uploadNum === 'folder') {
        const relativePath = e.raw.webkitRelativePath
        const folderName = relativePath.split('/')[0]
        this.folderName = folderName
      }
    },
    beforeUpload (file) {
      console.log(file, '222222222')
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
        // this.signUrl = res.url
        this.msgSuccess('上传成功')
        this.$emit('getList')
      } else {
        this.msgError('上传失败')
        const uid = file.uid
        const idx = this.$refs[this.uploadFileRef].uploadFiles.findIndex(
          (item) => item.uid === uid
        ) // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）

        this.$refs[this.uploadFileRef].uploadFiles.splice(idx, 1) // 关键作用代码，去除文件列表失败文件
      }
    },
    // 关闭弹框
    closePanel () {
      this.$emit('closeModal')
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-files {
  display: flex;
  align-items: baseline;
  .folder {
    margin-left: 60px;
    font-weight: bold;
    font-size: 22px;
  }
  .upload-opers {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .el-upload__tip {
    color: #2b3940;
    font-size: 12px;
    font-weight: 600;
  }
  .el-upload-list__item .el-progress{
    display: none;
  }

}
</style>
