<template>
  <div class="deep-search">
    <div class="defaultColor">二次检索</div>
    <el-form
      class="pt-20"
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="0px"
    >
      <div
        v-for="(item, index) in dynamicValidateForm?.deepSearchForm"
        :key="item.key"
        class="flex"
      >
        <el-form-item label="" style="width: 140px">
          <el-select v-model="item.type">
            <el-option label="AND" value="AND"></el-option>
            <el-option label="OR" value="OR"></el-option>
            <el-option label="NOT" value="NOT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" class="pr-8 pl-8" style="width: 140">
          <el-select v-model="item.name" @change="changeType(index)">
            <el-option label="所有字段" value="-1"></el-option>
            <el-option label="标题" value="title"></el-option>
            <el-option
              label="原发布部门"
              value="original_publishing_department"
            ></el-option>
            <el-option
              label="校正后发布部门"
              value="corrected_publishing_department"
            ></el-option>
            <el-option label="发布字号" value="publication_number"></el-option>
            <el-option label="实效性" value="time_efficient"></el-option>
            <el-option label="效力级别" value="effectiveness_level"></el-option>
            <el-option label="发布日期" value="publish_date"></el-option>
            <el-option label="实施日期" value="implementation_date"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label=""
          class="pr-8"
          style="width: 350px"
          :prop="'deepSearchForm.' + index + '.value'"
          :rules="{
            required: true,
            message: '请输入内容',
            trigger: 'blur',
          }"
        >
          <!-- 实效性 -->
          <el-select
            style="width: 100%"
            v-if="item.name === 'time_efficient'"
            v-model="item.value"
            placeholder="请选择"
          >
            <el-option label="现行有效" value="现行有效"></el-option>
            <el-option label="已被修改" value="已被修改"></el-option>
            <el-option label="部分失效" value="部分失效"></el-option>
            <el-option label="失效" value="失效"></el-option>
          </el-select>
          <!-- 效力级别 -->
          <el-select
            style="width: 100%"
            v-if="item.name === 'effectiveness_level'"
            v-model="item.value"
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
          <!-- 发布日期 -->
          <el-date-picker
          style="width: 100%"
          v-if="item.name === 'publish_date'"
          v-model="item.value"
          type="date"
          :append-to-body="false"
          placeholder="选择日期"
        >
        </el-date-picker>
         <!-- 实施日期 -->
         <el-date-picker
         style="width: 100%"
         v-if="item.name === 'implementation_date'"
         v-model="item.value"
         type="date"
         :append-to-body="false"
         placeholder="选择日期"
       >
       </el-date-picker>
          <el-input
            v-if="
              item.name !== 'time_efficient' &&
              item.name !== 'effectiveness_level'&&
              item.name !== 'publish_date'&&
              item.name !== 'implementation_date'
            "
            v-model="item.value"
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="pr-8" v-if="index === 0">
          <el-button @click="addItem" class="btn"
            ><i class="el-icon-plus"></i
          ></el-button>
        </el-form-item>
        <el-form-item label="" class="pr-8" v-if="index != 0">
          <el-button class="btn" @click="removeItem(item)"
            ><i class="el-icon-minus"></i
          ></el-button>
        </el-form-item>
      </div>
      <div class="split"></div>
      <div class="submit">
        <el-button type="primary" @click="submitForm('dynamicValidateForm')"
          >检索</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import './index.scss'
export default {
  data () {
    return {
      dynamicValidateForm: {
        deepSearchForm: [
          {
            type: 'AND',
            name: '-1',
            value: '',
            key: Date.now()
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm, 'vvvvvv')
          const data = this.dynamicValidateForm.deepSearchForm.map(item => {
            delete item.key
            return item
          })
          this.$emit('deepSearchList', data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.dynamicValidateForm = {
        deepSearchForm: [
          {
            type: 'AND',
            name: '-1',
            value: '',
            key: Date.now()
          }
        ]
      }
    },
    removeItem (item) {
      var index = this.dynamicValidateForm.deepSearchForm.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.deepSearchForm.splice(index, 1)
      }
    },
    addItem () {
      this.dynamicValidateForm.deepSearchForm.push({
        type: 'AND',
        name: '-1',
        value: '',
        key: Date.now()
      })
    },
    // 切换type 清空value
    changeType (index) {
      this.dynamicValidateForm.deepSearchForm[index].value = ''
    }
  }
}
</script>
