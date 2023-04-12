<template>
  <div class="org-list">
    <Bread-crumbs
      :items="[
        {
          name: '主页',
          path: '/index',
        },
        {
          name: '数据清理',
          path: '/policy/clean/org-list',
        },
        {
          name: '发文机构名称标准化表',
          path: '/policy/clean/org-list',
        },
      ]"
    />
    <div>
      <div class="selector-panel">
        <div class="flex">
          <el-input
            v-model="queryParams.searchValue"
            placeholder="请输入"
            class="width"
          >
          </el-input>
          <el-button class="ml-16" type="primary" @click="initList">查询</el-button>
        </div>
      </div>
      <div class="list-container">
        <div class="table-oper">
          <span class="f16">发文机构名称称标准化表</span>
          <el-button type="primary"  @click="add">增加</el-button>
        </div>
        <el-table
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column label="原发文机构">
            <template slot-scope="scope">{{ scope.row.originalPublishingDepartment }}</template>
          </el-table-column>
          <el-table-column prop="correctedPublishingDepartment" label="新发文机构"> </el-table-column>
          <el-table-column
            prop="changeMode"
            label="变更方式"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="defaultColor" @click="edit(scope.row)">
                修改
              </span>
              <span
                class="defaultColor"
                @click="handleDelete(scope.row.nameStandardizationId)"
                >删除</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
         <pagination
      :total="total"
      :queryParams="queryParams"
      @initList="initList"
    ></pagination>
       <!-- 新增机构 -->
       <div class="add-panel">
        <el-dialog
          :visible.sync="showAdd"
          width="50%"
          :close-on-click-modal="false"
        >
          <div slot="title" class="title">{{ title }}</div>
          <div class="desc color-danger">必填项 *</div>
          <div class="mt-30 pb-30">
            <el-form
              label-width="150px"
              :model="ruleForm"
              ref="ruleForm"
              :rules="rules"
            >
              <el-form-item  label="原发文机构：" prop="originalPublishingDepartment">
                <el-input
                  placeholder="请输入原发文机构"
                  v-model="ruleForm.originalPublishingDepartment"
                ></el-input>
              </el-form-item>
              <el-form-item  label="新发文机构：" prop="correctedPublishingDepartment">
                <el-input
                  placeholder="请输入新发文机构"
                  v-model="ruleForm.correctedPublishingDepartment"
                ></el-input>
              </el-form-item>
              <el-form-item label="备注：" prop="remarks">
                <el-input
                  placeholder="请输入备注"
                  v-model="ruleForm.remarks"
                ></el-input>
              </el-form-item>
              <el-form-item label="变更方式：" prop="changeMode">
                <el-select v-model="ruleForm.changeMode" placeholder="请选择变更方式">
                  <el-option label="直接更名" value="直接更名"></el-option>
                  <el-option label="撤销" value="撤销"></el-option>
                  <el-option label="拆分更名" value="拆分更名"></el-option>
                  <el-option label="合并更名" value="合并更名"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="showAdd = false">取 消</el-button>
            <el-button type="primary" @click.prevent="confirmSubmit"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import './index.scss'
import pagination from '@/components/pagination.vue'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import { getOrgList, updateOrg, addOrg, deleteOrg } from '@/api/policy/org'

export default {
  components: {
    BreadCrumbs,
    pagination
  },
  data () {
    return {
      title: '', // dialog标题
      // 是否显示新增弹框
      showAdd: false,
      // 管理员数据
      ruleForm: {},
      selectedRows: [],
      queryParams: {
        // 页数
        pageNum: 1,
        // 每页的大小
        pageSize: 20,
        // 查询关键字
        searchValue: null
      },
      // 总条数
      total: 0,
      list: [],
      rules: {
        originalPublishingDepartment: [
          { required: true, message: '请输入原发文机构', trigger: 'blur' }
        ],
        correctedPublishingDepartment: [
          { required: true, message: '请输入新发文机构', trigger: 'blur' }
        ],
        changeMode: [
          { required: true, message: '请选择变更方式', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initList()
  },

  methods: {
    // 删除用户
    handleDelete (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteOrg(id).then((res) => {
            if (res.code === 200) {
              this.msgSuccess('删除成功')
              this.handleQuery()
            }
          })
        })
        .catch(() => {
          this.msgInfo('已取消删除')
        })
    },
    confirmSubmit () {
      const text = this.ruleForm.nameStandardizationId ? '修改' : '创建'
      this.$refs.ruleForm.validate((valid) => {
        // 验证通过
        if (valid) {
          this.$confirm(`您确定要${text}该信息吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.submitUser()
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
    // 提交用户信息
    submitUser () {
      if (this.ruleForm.nameStandardizationId) {
      // 编辑用户
        updateOrg(this.ruleForm).then((res) => {
          if (res.code === 200) {
            this.msgSuccess('修改成功')
            this.showAdd = false
            this.initList()
          } else {
            this.msgError(res.msg)
          }
        })
      } else {
      // 新建用户
        addOrg(this.ruleForm).then((res) => {
          if (res.code === 200) {
            this.msgSuccess('添加成功')
            this.showAdd = false
            this.initList()
          } else {
            this.msgError(res.msg)
          }
        })
      }
    },
    // 新增org
    add (user) {
      this.title = '新增发文机构'
      this.showAdd = true
    },
    // 修改用户信息
    edit (user) {
      this.title = '修改发文机构'
      this.ruleForm = user
      this.showAdd = true
    },
    // 按关键字搜索
    handleQuery () {
      this.queryParams.pageNum = 1
      this.initList()
    },
    // 获取列表
    initList () {
      getOrgList(this.queryParams).then(res => {
        this.list = res.rows
        this.total = parseInt(res.total)
      })
    }
  }
}
</script>
