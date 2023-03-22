<template>
  <div class="deep-search">
    <div class="defaultColor">二次检索</div>
    <el-form
      class="pt-20"
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="0px"
      :rules="deepSearchRule"
    >
      <div v-for="(item,index) in dynamicValidateForm?.deepSearchForm" :key="item.key" class="flex">
        <el-form-item label="" style="width: 140px">
          <el-select v-model="item.type">
            <el-option label="AND" value="AND"></el-option>
            <el-option label="OR" value="OR"></el-option>
            <el-option label="NOT" value="NOT"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" class="pr-8 pl-8" style="width: 140">
          <el-select v-model="item.name">
            <el-option label="所有字段" value="-1"></el-option>
            <el-option label="标题" value="标题"></el-option>
            <el-option label="发布部门" value="发布部门"></el-option>
            <el-option label="发文字号" value="发文字号"></el-option>
            <el-option label="政策类型" value="政策类型"></el-option>
            <el-option label="发布日期" value="发布日期"></el-option>
            <el-option label="实施日期" value="实施日期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" class="pr-8" style="width: 350px">
          <el-input v-model="item.value"></el-input>
        </el-form-item>
        <el-form-item label="" class="pr-8" v-if="index===0">
          <el-button @click="addDomain" class="btn"><i class="el-icon-plus" ></i></el-button>
        </el-form-item>
        <el-form-item label="" class="pr-8" v-if="index!=0">
            <el-button class="btn" @click="removeDomain(item)"><i class="el-icon-minus" ></i></el-button>
          </el-form-item>
      </div>
      <div class="split"></div>
      <div class="submit">
        <el-button  type="primary" @click="submitForm('dynamicValidateForm')">检索</el-button>
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
      },
      deepSearchRule: [
        { required: true, message: '年龄不能为空' },
        { type: 'number', message: '年龄必须为数字值' }
      ]

    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.deepSearchForm.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.deepSearchForm.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.deepSearchForm.push({
        type: 'AND',
        name: '-1',
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>
