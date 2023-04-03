<template>
  <div class="data-list">
    <Bread-crumbs
      :items="[
        {
          name: '主页',
          path: '/index',
        },
        {
          name: '政策模块管理',
          path: '/policy/manage',
        },
        {
          name: '数据记录列表',
          path: '/policy/manage/dataList',
        },
      ]"
    />
    <div>
      <div class="selector-panel">
        <div>
          <el-input v-model="queryParams.searchValue" placeholder="请输入">
            <div slot="append">
              <el-popover
                placement="bottom-start"
                width="758"
                :offset="-203"
                trigger="click"
                :visible-arrow="false"
              >
                <deeSearch />
                <span class="deep-search" slot="reference">二级检索</span>
              </el-popover>

              <span class="el-icon-search pl-10 f10"></span>
            </div>
          </el-input>
        </div>
        <div class="selector-item">
          <span class="pr-10">数据清洗:</span>
          <el-radio-group v-model="queryParams.status" @change="initList">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="1">已清洗</el-radio>
            <el-radio :label="0">未清洗</el-radio>
          </el-radio-group>
        </div>
        <div class="selector-item">
          <span class="pr-10">行文结构:</span>
          <el-radio-group v-model="queryParams.writingStructure" @change="initList">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="1">已标注</el-radio>
            <el-radio :label="0">未标注</el-radio>
            <el-radio :label="2">不完全标注</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="list-container">
        <div class="table-oper">
          <span class="f16">数据记录</span>
          <div>
            <el-button type="primary" @click="uploadFiles">文件上传</el-button>
            <template v-if="multipleSelection?.length">
              <el-button type="primary" @click="handleDataClear(null)"
                >数据清洗</el-button
              >
              <el-button type="primary" @click.native="handleUpdateWords(null)"
                >更新高频词</el-button
              >
              <el-button type="primary" @click.native="compareText"
                >文本对比</el-button
              >
              <el-button type="primary" @click="handleStructMerge">行文结构合并</el-button>
              <el-button type="primary">整篇文章合并</el-button>
            </template>
          </div>
        </div>
        <div v-if="multipleSelection?.length" class="check-num">
          <div>
            已选择<span class="pr-5 pl-5">{{ multipleSelection?.length }}</span>
            项
          </div>
          <div class="defaultColor" @click="cancelTableSelect">取消选择</div>
        </div>
        <el-table
          v-loading="loading"
          ref="multipleTable"
          :data="list"
          cell-class-name="list-row"
          tooltip-effect="dark"
          style="width: 100%"
          :row-class-name="rowStyle"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="序号" width="120" type="index">
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column
            prop="originalPublishingDepartment"
            label="原发布部门"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="correctedPublishingDepartment"
            label="校正后发布部门"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="清洗确认状态"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div v-if="scope.row.status != 1" class="dot-item">
                <div class="dot-red"></div>
                未确认
              </div>
              <div v-if="scope.row.status === 1" class="dot-item">
                <div class="dot-green"></div>
                已确认
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="publicationNumber"
            label="发布字号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="publishDate"
            label="实施日期"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="effectivenessLevel"
            label="效力级别"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="writingStructure"
            label="行文结构"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.writingStructure === 1">已标注</el-tag>
              <el-tag type="danger" v-if="scope.row.writingStructure === 2">不完全标注</el-tag>
              <el-tag type="info" v-if="!scope.row.writingStructure">未标注</el-tag>

            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-dropdown>
                <el-button type="primary">
                  全部操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="viewDetail(scope.row)">
                    <span class="active-color"> 查看 </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="handleDelete(scope.row)">
                    <span class="active-color">删除</span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="updateData(scope.row)">
                    <span class="active-color">修改</span>
                  </el-dropdown-item>
                  <el-dropdown-item
                    v-if="!scope.row.status"
                    @click.native="handleDataClear(scope.row.policyFileId)"
                  >
                    <span class="active-color">数据清洗</span>
                  </el-dropdown-item>
                  <!-- <el-dropdown-item>
                    <span class="active-color">清洗确认</span></el-dropdown-item
                  > -->
                  <el-dropdown-item
                    @click.native="handleUpdateWords(scope.row.policyFileId)"
                  >
                    <span class="active-color"
                      >更新高频词</span
                    ></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
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
    <uploadFiles
      v-if="showUploadPanel"
      :showPanel="showUploadPanel"
      @initList="initList"
      @updateData="updateData"
      @closeModal="showUploadPanel = false"
    />
    <updatePolicy
      @initList="initList"
      :policyData="policyData"
      :showPanel="showUpdatePanel"
      @closeModal="showUpdatePanel = false"
    />
  </div>
</template>
<script>
import './index.scss'
import pagination from '@/components/pagination.vue'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import deeSearch from '@/components/deepSearch'
import uploadFiles from '@/components/uploadFiles'
import updatePolicy from '@/components/updatePolicy'
import { deepClone } from '@/utils/utils.js'
import {
  getPolicyDataList,
  getPolicyData,
  getPolicyDetailData,
  dataClear,
  deleteData,
  structMerge
} from '@/api/policy/data-list'
export default {
  components: {
    BreadCrumbs,
    deeSearch,
    uploadFiles,
    pagination,
    updatePolicy
  },
  data () {
    return {
      // 更新高频词中
      loading: false,
      policyData: [],
      // 修改弹框
      showUpdatePanel: false,
      // 上传弹框
      showUploadPanel: false,
      // 选中的列表
      selectedRows: [],
      queryParams: {
        status: -1,
        writingStructure: -1,
        // 页数
        pageNum: 1,
        // 每页的大小
        pageSize: 10,
        // 查询关键字
        searchValue: null
      },
      // 总条数
      total: 0,
      list: [],
      multipleSelection: []
    }
  },
  mounted () {
    this.initList()
  },
  methods: {
    // 文本对比
    compareText () {
      if (this.selectedRows.length !== 2) {
        this.msgError('请选择两条数据')
        return
      }
      const ids = this.selectedRows.join(',')
      this.$router.push({ path: '/policy/analyze/text-contrast', query: { ids: ids } })
    },
    // 更新高频词
    handleUpdateWords (ids) {
      if (!ids) {
        ids = this.selectedRows.join(',')
      }
      this.loading = true
      window.setTimeout(() => {
        this.loading = false
        this.msgSuccess('更新成功')
        this.initList()
      }, 2000)
    },
    // 查看
    viewDetail (data) {
      this.$router.push({
        path: '/policy/manage/policyDetail/' + data.policyFileId,
        query: { isView: 1 }
      })
    },
    // 数据清洗
    handleDataClear (ids) {
      console.log(ids, 'sssssss')
      if (!ids) {
        ids = this.selectedRows.join(',')
      }
      dataClear(ids).then((res) => {
        if (res.code === 200) {
          this.msgSuccess('清洗成功')
          this.initList()
        } else {
          this.msgError('清洗失败')
        }
      })
    },
    // 删除
    handleDelete (data) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.initList()
          deleteData(data.policyDataId).then((res) => {
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
    // 更新政策信息
    updateData (data) {
      getPolicyData(data.policyDataId).then((res) => {
        if (res.code === 200) {
          this.showUpdatePanel = true
          const data1 = res.data
          getPolicyDetailData(data.policyFileId).then((res) => {
            if (res.code === 200) {
              const data2 = res.data
              this.policyData = Object.assign(data1, data2)
            }
          })
        } else {
        }
      })
    },
    // 按关键字搜索
    handleQuery () {
      this.queryParams.pageNum = 1
      this.initList()
    },
    // 获取列表
    initList () {
      const data = deepClone(this.queryParams)
      if (data.status === -1) {
        delete data.status
      }
      if (data.writingStructure === -1) {
        delete data.writingStructure
      }
      getPolicyDataList(data).then((res) => {
        this.list = res.rows
        this.total = parseInt(res.total)
      })
    },
    // 文件上传
    uploadFiles () {
      this.showUploadPanel = true
    },
    // 选中一行表格
    handleSelectionChange (val) {
      this.selectedRows = val.map((item) => item.policyFileId)
      this.multipleSelection = val
    },
    // 设置选中表格行颜色
    rowStyle ({ row }) {
      var arr = this.selectedRows
      for (let i = 0; i < arr.length; i++) {
        if (row.policyFileId === arr[i]) {
          return 'rowStyle'
        }
      }
    },
    // 取消选择
    cancelTableSelect () {
      this.$refs.multipleTable.clearSelection()
    },
    // 行文结构合并下载
    handleStructMerge () {
      const ids = this.selectedRows.join(',')
      structMerge(ids).then(res => {
        console.log(res, 'sssssssss')
      })
    }
  }
}
</script>
