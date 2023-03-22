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
                <deeSearch/>
                <span class="deep-search" slot="reference">二级检索</span>
              </el-popover>

              <span class="el-icon-search pl-10 f10"></span>
            </div>
          </el-input>
        </div>
        <div class="selector-item">
          <span>数据清洗</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './index.scss'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import deeSearch from '@/components/deepSearch'
export default {
  components: {
    BreadCrumbs,
    deeSearch
  },
  data () {
    return {
      queryParams: {
        // 页数
        pageNum: 1,
        // 每页的大小
        pageSize: 20,
        // 查询关键字
        searchValue: null
      }
    }
  }
}
</script>
