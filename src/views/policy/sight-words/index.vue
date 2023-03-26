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
            v-model="queryParams.searchValue"
            placeholder="输入关键字"
            class="width"
          >
          </el-input>
          <el-button class="ml-16" type="primary">确定</el-button>
        </div>
      </div>
      <div class="list-container">
        <div class="table-oper">
          <span class="f16">高音词列表</span>
          <el-button type="primary">增加</el-button>
        </div>
        <el-table
          :data="list"
          tooltip-effect="dark"
          style="width: 100%"
          :row-class-name="rowStyle"
        >
          <el-table-column label="序号">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="name" label="高频词"> </el-table-column>
          <el-table-column
            prop="address"
            label="改变方式"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="address1" label="备注" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="address1" label="操作">
            <template slot-scope="scope">
              <span class="defaultColor" @click="edit(scope.row.registerId)">
                修改
              </span>
              <span
                class="defaultColor"
                @click="removeRegister(scope.row.registerId)"
                >删除</span
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import './index.scss'
import BreadCrumbs from '@/components/breadCrumbs.vue'
export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      selectedRows: [],
      queryParams: {
        // 页数
        pageNum: 1,
        // 每页的大小
        pageSize: 20,
        // 查询关键字
        searchValue: null
      },
      list: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
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
