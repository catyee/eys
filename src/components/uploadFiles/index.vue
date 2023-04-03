<template>
  <div class="upload-files">
    <el-dialog
      :visible.sync="showPanel"
      width="40%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="flex">
        <div slot="title" class="title mr-10">文件上传</div>
        <div class="file-type">
          <span>数据格式：</span>
          <span >Word</span>
          <!-- <el-radio-group v-model="fileType">
          <el-radio label="Word">Word</el-radio>
          <el-radio label="Excel">Excel</el-radio>
        </el-radio-group> -->
        </div>
      </div>
      <div class="mt-20">
        <div style="display: flex; align-items: baseline">
          <el-radio v-model="fileNum" :label="1" >单个上传</el-radio>
          <!-- <el-input
            :readonly="true"
            style="width: 350px"
            v-model="fileUrl"
            placeholder=""
          ></el-input> -->
          <upload @closePanel="closePanel" @updateData="updateData" @getList="getList"  ref="uploadFile" v-if="fileNum === 1" uploadFileRef="upload1" uploadNum="file" />
        </div>
        <div style="display: flex; align-items: baseline" class="mt-20">
          <el-radio v-model="fileNum" :label="2">多个上传</el-radio>
          <!-- <el-input
            :readonly="true"
            v-model="fileUrl"
            style="width: 350px"
            placeholder=""
          ></el-input> -->
          <upload @closePanel="closePanel"  @updateData="updateData" @getList="getList"  ref="uploadFolder" uploadFileRef="upload2" uploadNum="folder"   v-if="fileNum === 2" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePanel">关闭</el-button>
        <el-button type="primary" @click.prevent="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import './index.scss'
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
      fileNum: 1,
      // 文件的本机路径
      fileUrl: '',
      // 签名页照片地址
      signUrl: '',
      // 是否显示进度条
      showProgress: false,
      // 是否允许上传
      enableUpload: true
    }
  },
  methods: {
    // 关闭弹框
    closePanel () {
      this.$emit('closeModal')
    },
    getList () {
      this.$emit('initList')
    },
    updateData (data) {
      this.$emit('updateData', data)
    },
    // 提交签名页照片
    submit () {
      // 发送图片地址到父组件
      // this.$emit('getSignUrl', this.signUrl)
      // this.closePanel()
      if (this.fileNum === 1) {
        this.$refs.uploadFile.handleUpload()
      }
      if (this.fileNum === 2) {
        this.$refs.uploadFolder.handleUpload()
      }
    }
  }
}
</script>
