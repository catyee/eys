<template>
  <div class="sight-words">
    <Bread-crumbs
      :items="[
        {
          name: '主页',
          path: '/index',
        },
        {
          name: '政策数据分析',
          path: '/policy/analyze/sight-words',
        },
        {
          name: '高频词列表',
          path: '/policy/analyze/sight-words',
        },
      ]"
    />
    <div>
      <div class="selector-panel">
        <div class="flex">
          <el-input
            v-model="queryParams.word"
            placeholder="输入关键字"
            class="width"
          >
          </el-input>
          <el-button class="ml-16" type="primary" @click="initList">确定</el-button>
        </div>
      </div>
      <div class="list-container">
        <div class="table-oper">
          <span class="f16">高音词列表</span>
          <el-button type="primary" @click="add">增加</el-button>
        </div>
        <el-table :data="list" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="word" label="高频词"> </el-table-column>
          <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span class="defaultColor" @click="edit(scope.row)">
                修改
              </span>
              <span
                class="defaultColor"
                @click="handleDelete(scope.row.highFrequencyWordId)"
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
    </div>
    <!-- 新增机构 -->
    <div class="add-panel">
      <el-dialog
        :visible.sync="showAdd"
        width="30%"
        :close-on-click-modal="false"
      >
        <div slot="title" class="title">高频词{{title}}</div>
        <div class="mt-10 pb-10">
          <el-form
            label-width="150px"
            :model="ruleForm"
            ref="ruleForm"
            :rules="rules"
          >
            <el-form-item
              label=""
              prop="newWords"
              v-if="!isEdit"
            >
              <el-input
                type="textarea"
                placeholder="请输入高频词，批量添加用“，”分隔"
                v-model="ruleForm.newWords"
              ></el-input>
            </el-form-item>
            <el-form-item  v-if="isEdit" label="高频词：" prop="word">
              <el-input
                placeholder="请输入高频词"
                v-model="ruleForm.word"
              ></el-input>
            </el-form-item>
            <el-form-item  v-if="isEdit" label="备注：" prop="remarks">
              <el-input
                placeholder="请输入备注"
                v-model="ruleForm.remarks"
              ></el-input>
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
</template>
<script>
import './index.scss'
import pagination from '@/components/pagination.vue'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import { getSightWords, deleteWord, addWords, updateWord } from '@/api/policy/sight-words'

export default {
  components: {
    BreadCrumbs,
    pagination
  },
  data () {
    return {
      title: '',
      showAdd: false,
      isEdit: false,
      ruleForm: {},
      queryParams: {
        // 页数
        pageNum: 1,
        // 每页的大小
        pageSize: 20,
        // 查询关键字
        word: null
      },
      // 总条数
      total: 0,
      list: [],
      rules: {
        newWords: [
          { required: true, message: '请输入高频词', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 按关键字搜索
    handleQuery () {
      this.queryParams.pageNum = 1
      this.initList()
    },
    add () {
      this.title = '新增'
      this.isEdit = false
      this.showAdd = true
      this.ruleForm = {}
    },
    // 修改用户信息
    edit (user) {
      this.title = '修改'
      this.isEdit = true
      this.ruleForm = user
      this.showAdd = true
    },
    confirmSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        // 验证通过
        if (valid) {
          this.$confirm(`您确定要${this.title}吗?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.submit()
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
    submit () {
      if (this.ruleForm.highFrequencyWordId) {
        // 编辑用户
        updateWord(this.ruleForm).then((res) => {
          if (res.code === 200) {
            this.msgSuccess('修改成功')
            this.showAdd = false
            this.initList()
          } else {
            this.msgError(res.msg)
          }
        })
      } else {
        const words = this.ruleForm.newWords.replace('，', ',').split(',')
        const data = []
        words.forEach(word => {
          data.push({
            delFlag: 0,
            remarks: '',
            word
          })
        })
        // 新建
        addWords(data).then((res) => {
          console.log(this.ruleForm, 'aaaaa')
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
    // 获取列表
    initList () {
      getSightWords(this.queryParams).then((res) => {
        this.list = res.rows
        this.total = parseInt(res.total)
      })
    },

    // 删除用户
    handleDelete (id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteWord(id).then((res) => {
            if (res.code === 200) {
              this.msgSuccess('删除成功')
              this.handleQuery()
            }
          })
        })
        .catch(() => {
          this.msgInfo('已取消删除')
        })
    }
  }
}
</script>
