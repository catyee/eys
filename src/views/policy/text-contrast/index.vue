<template>
  <div class="text-contrast">
    <Bread-crumbs
      :items="[
        {
          name: '主页',
          path: '/index',
        },
        {
          name: '数据政策分析',
          path: '/policy/analyze/text-contrast',
        },
        {
          name: '文本对比',
          path: '/policy/analyze/text-contrast',
        },
      ]"
    />
    <div class="contrast-panel">
      <div class="flex mb-24">
        <span class="f16 pr-24">文本对比</span>
        <el-progress
          color="#52C41A"
          :format="formatContrast"
          :percentage="50"
        ></el-progress>
      </div>
      <div class="contrast-content">
        <div class="contrast-l ">
            <div class="item flex">
              <span>文本名称：</span>
              <span>111</span>
            </div>
        </div>
        <div class="contrast-r">
          <div class="item flex">
            <span>文本名称：</span>
            <span>111</span>
          </div>
          <div class="item flex">
            <span>高频词：</span>
            <span>111</span>
          </div>
          <div class="item flex">
            <span>增加的突发词：</span>
            <span>111</span>
          </div>
          <div class="item flex">
            <span>减少的高频词：</span>
            <span>111</span>
          </div>
        </div>
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
    formatContrast (percentage) {
      return `相似度${percentage}%`
    }
  }
}
</script>
