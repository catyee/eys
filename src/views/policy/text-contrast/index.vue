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
          :percentage="similar"
        ></el-progress>
      </div>
      <div class="contrast-content">
        <div class="contrast-l ">
            <div class="item flex">
              <span>文本名称：</span>
              <span></span>
            </div>
        </div>
        <div class="contrast-r">
          <div class="item flex">
            <span>文本名称：</span>
            <span></span>
          </div>
          <div class="item flex">
            <span>高频词：</span>
            <span></span>
          </div>
          <div class="item flex">
            <span>增加的突发词：</span>
            <span></span>
          </div>
          <div class="item flex">
            <span>减少的高频词：</span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './index.scss'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import { compareText } from '@/api/policy/data-list'

export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      // 相似度
      similar: 0,
      ids: null
    }
  },
  created () {
    this.ids = this.$route.query.ids
    console.log(this.ids, 'ssssssss')
  },
  mounted () {
    this.getCompareData()
  },
  methods: {
    formatContrast (percentage) {
      return `相似度${percentage}%`
    },
    // 获取对比数据
    getCompareData () {
      compareText(this.ids).then(res => {
        if (res.code === 200) {
          this.similar = res.similar ? Number((parseInt(res.similar * 100 * 100) / 100).toFixed(2)) : 0
        } else {

        }
      })
    }
  }
}
</script>
