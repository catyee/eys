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
          <el-radio-group v-model="queryParams.searchValue">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">已清洗</el-radio>
            <el-radio :label="9">未清洗</el-radio>
          </el-radio-group>
        </div>
        <div class="selector-item">
          <span class="pr-10">行文结构:</span>
          <el-radio-group v-model="queryParams.searchValue">
            <el-radio :label="3">全部</el-radio>
            <el-radio :label="6">已标注</el-radio>
            <el-radio :label="9">未标注</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="list-container">
        <div class="table-oper">
          <span class="f16">数据记录</span>
          <div>
            <el-button type="primary" @click="uploadFiles">文件上传</el-button>
            <template v-if="multipleSelection?.length">
              <el-button type="primary">数据清洗</el-button>
              <el-button type="primary">更新高频词</el-button>
              <el-button type="primary">文本对比</el-button>
              <el-button type="primary">行文结构合并</el-button>
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
            prop="timeEfficient"
            label="效力级别"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="writingStructure"
            label="行文结构"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">

              <el-dropdown>
                <el-button type="primary">
                  全部操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <span class="active-color"> 查看 </span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="active-color">删除</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span
                      class="active-color"
                      @click="removeRegister(scope.row.id)"
                      >修改</span
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="active-color">数据清洗</span>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <span class="active-color">清洗确认</span></el-dropdown-item
                  >
                  <el-dropdown-item>
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
      :showPanel="showUploadPanel"
      @closeModal="showUploadPanel = false"
    />
  </div>
</template>
<script>
import './index.scss'
import pagination from '@/components/pagination.vue'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import deeSearch from '@/components/deepSearch'
import uploadFiles from '@/components/uploadFiles'
import { getPolicyDataList } from '@/api/policy/data-list'
export default {
  components: {
    BreadCrumbs,
    deeSearch,
    uploadFiles,
    pagination
  },
  data () {
    return {
      showUploadPanel: false,
      // 选中的列表
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
      multipleSelection: []
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
    // 获取列表
    initList () {
      getPolicyDataList(this.queryParams).then((res) => {
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
      this.selectedRows = val.map((item) => item.date)
      this.multipleSelection = val
    },
    // 设置选中表格行颜色
    rowStyle ({ row }) {
      var arr = this.selectedRows
      for (let i = 0; i < arr.length; i++) {
        if (row.date === arr[i]) {
          return 'rowStyle'
        }
      }
    },
    // 取消选择
    cancelTableSelect () {
      this.$refs.multipleTable.clearSelection()
    }
  }
}
</script>
