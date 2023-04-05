<template>
  <div class="update-policy">
    <el-dialog
      :visible.sync="isShow"
      width="40%"
      @close="closePanel"
      :show-close="true"
      :close-on-click-modal="false"
    >
      <div class="title">政策基础信息：</div>
      <div class="mt-30 pb-30">
        <el-form
          label-width="150px"
          :model="ruleForm1"
          :rules="rules"
          ref="ruleForm1"
        >
          <el-form-item label="标题:" prop="title">
            <el-input placeholder="" v-model="ruleForm1.title"></el-input>
          </el-form-item>
          <el-form-item label="实效性:" prop="timeEfficient">
            <el-select
              style="width: 100%"
              v-model="ruleForm1.timeEfficient"
              placeholder="请选择"
            >
              <el-option label="现行有效" value="现行有效"></el-option>
              <el-option label="已被修改" value="已被修改"></el-option>
              <el-option label="部分失效" value="部分失效"></el-option>
              <el-option label="失效" value="失效"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="效力级别:" prop="effectivenessLevel">
            <el-select
              style="width: 100%"
              v-model="ruleForm1.effectivenessLevel"
              placeholder="请选择"
            >
              <el-option
                label="有关法律问题和重大决定的问题"
                value="有关法律问题和重大决定的问题"
              ></el-option>
              <el-option label="工作文件" value="工作文件"></el-option>
              <el-option
                label="国务院规范性文件"
                value="国务院规范性文件"
              ></el-option>
              <el-option label="党内法规制度" value="党内法规制度"></el-option>
              <el-option
                label="部门规范性文件"
                value="部门规范性文件"
              ></el-option>
              <el-option label="部门工作文件" value="部门工作文件"></el-option>
              <el-option label="行政许可批复" value="行政许可批复"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原发布部门:" prop="originalPublishingDepartment">
            <el-input
              placeholder=""
              v-model="ruleForm1.originalPublishingDepartment"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="校正后发布部门:"
            prop="correctedPublishingDepartment"
          >
            <div class="flex">
              <el-input
                placeholder=""
                v-model="ruleForm1.correctedPublishingDepartment"
              ></el-input>
              <el-button
                style="white-space: nowrap"
                class="ml-16"
                type="primary"
                @click="confirmOrg"
                >去确认</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="发布字号:" prop="publicationNumber">
            <el-input
              placeholder=""
              v-model="ruleForm1.publicationNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="发布日期:" prop="publishDate">
            <el-date-picker
              style="width: 100%"
              v-model="ruleForm1.publishDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="实施日期:" prop="implementationDate">
            <el-date-picker
              style="width: 100%"
              v-model="ruleForm1.implementationDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <div class="title pb-30 pt-10">政策结构：</div>
          <el-form-item label="背景:" prop="backgroundContent">
            <div class="flex" style="box-sizing: border-box">
              <el-input
              readonly
                placeholder=""
                v-model="ruleForm1.backgroundContent"
              ></el-input>
              <el-button
               @click="toMark"
                v-if="ruleForm1.backgroundContent"
                style="white-space: nowrap"
                class="ml-16"
                type="primary"

                >已标选</el-button
              >
              <el-button
              v-if="!ruleForm1.backgroundContent"
               @click="toMark"
                style="white-space: nowrap"
                class="ml-16"
                type="primary"
                >请标选</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="主题内容:" prop="subjectContentContent">
            <div class="flex">
              <el-input
              readonly
                placeholder=""
                v-model="ruleForm1.subjectContentContent"
              ></el-input>
              <el-button
               v-if="ruleForm1.subjectContentContent"
                style="white-space: nowrap"
                class="ml-16"
                type="primary"
                @click="toMark"
                >已标选</el-button
              >
              <el-button
              @click="toMark"
              v-if="!ruleForm1.subjectContentContent"
               style="white-space: nowrap"
               class="ml-16"
               type="primary"
               >请标选</el-button
             >
            </div>
          </el-form-item>
          <el-form-item label="保护措施:" prop="safeguardMeasureContent">
            <div class="flex">
              <el-input
              readonly
                placeholder=""
                v-model="ruleForm1.safeguardMeasureContent"
              ></el-input>
              <el-button
              v-if="ruleForm1.safeguardMeasureContent"
              style="white-space: nowrap"
              class="ml-16"
              type="primary"
              @click="toMark"
              >已标选</el-button
            >
            <el-button
            @click="toMark"
            v-if="!ruleForm1.safeguardMeasureContent"
            style="white-space: nowrap"
            class="ml-16"
            type="primary"
            >请标选</el-button
          >
            </div>
          </el-form-item>
          <el-form-item label="附件:" prop="attachmentFileName">
            <div class="flex">
              <el-input
                placeholder=""
                readonly
                v-model="ruleForm1.attachmentFileName"
              ></el-input>
              <!-- <el-button
                style="white-space: nowrap"
                class="ml-16"
                type="primary"
                >{{ruleForm1.attachmentFileName?'已标选': '请标选'}}</el-button
              > -->
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePanel">取 消</el-button>
        <el-button type="primary" @click.prevent="confirmSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import './index.scss'
import { updatePolicyData } from '@/api/policy/data-list'

export default {
  components: {},
  props: {
    // 控制弹框的出现
    showPanel: Boolean,
    policyData: {}
  },
  data () {
    return {
      // 校正部门确认
      showConfirmOrg: false,
      isShow: this.showPanel,
      ruleForm1: {},
      rules: {}
    }
  },
  watch: {
    // 监听 addOrUpdateVisible 改变
    showPanel (v) {
      this.isShow = v
    },
    policyData (v) {
      this.ruleForm1 = v
    }
  },
  methods: {
    confirmSubmit () {
      this.$refs.ruleForm1.validate((valid) => {
        // 验证通过
        if (valid) {
          this.$confirm('您确定提交吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              updatePolicyData(this.ruleForm1).then(res => {
                if (res.code === 200) {
                  this.msgSuccess('保存成功')
                  this.$emit('initList')
                } else {
                  this.msgError('保存失败' + res.code)
                }
              })
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭弹框
    closePanel () {
      this.$emit('closeModal')
    },
    toMark () {
      this.$router.push({
        path: '/policy/manage/policyDetail/' + this.policyData.policyFileId
      })
    },
    confirmOrg () {

    }
  }
}
</script>
