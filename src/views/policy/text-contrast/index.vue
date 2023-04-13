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
              <span class="item-title">文本名称：</span>
              <span>{{title1}}</span>
            </div>
            <div class="item flex">
              <span class="item-title">高频词：</span>
              <span>{{frequentWord1}}</span>
            </div>
        </div>
        <div class="contrast-r">
          <div class="item flex">
            <span class="item-title">文本名称：</span>
            <span>{{title2}}</span>
          </div>
          <div class="item flex">
            <span class="item-title">高频词：</span>
            <span>{{frequentWord2}}</span>
          </div>
          <div class="item flex">
            <span class="item-title">增加的突发词：</span>
            <span>{{add?add: '无'}}</span>
          </div>
          <div class="item flex">
            <span class="item-title">减少的高频词：</span>
            <span>{{reduce?reduce: '无'}}</span>
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
      ids: null,
      title1: null,
      title2: null,
      frequentWord1: null,
      frequentWord2: null,
      add: null,
      reduce: null
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
          this.title1 = res.title1
          this.title2 = res.title2
          try {
            this.frequentWord1 = JSON.parse(res.frequentWord1)
            this.frequentWord1 = Object.keys(this.frequentWord1).join(',')
          } catch (e) {

          }
          try {
            this.frequentWord2 = JSON.parse(res.frequentWord2)
            this.frequentWord2 = Object.keys(this.frequentWord2).join(',')
          } catch (e) {

          }
          try {
            this.add = JSON.parse(res.add)
            this.add = Object.keys(this.add).join(',')
          } catch (e) {

          }
          try {
            this.reduce = JSON.parse(res.reduce)
            this.reduce = Object.keys(this.reduce).join(',')
          } catch (e) {

          }
        } else {

        }
      })
    }
  }
}
</script>
