<template>
  <div class="policy-detail">
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
          name: '查看',
          path: '/policy/manage/policyDetail/' + policyFileId,
        },
      ]"
    />
    <div class="text-container">
      <div class="top-oper">
        <div class="title">标选行文结构</div>
        <el-button type="primary"> 确认 </el-button>
      </div>
      <div class="content">
        <div class="left" @mouseup="getSelection" v-html="fileText"></div>
        <div class="right">
          <div class="word item">
            <div class="title">文本高频词：</div>
            <div class="mt-16 mb-16 defaultColor">商业309次</div>
            <div class="chart"></div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">背景：</div>
              <el-button
                :type="type === 1 ? 'success' : 'primary'"
                @click="handleUpdate(1)"
              >
                {{ type === 1 ? "保存" : "修改" }}
              </el-button>
            </div>
            <div class="text-content">{{ background }}</div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">主题内容：</div>
              <el-button
                :type="type === 2 ? 'success' : 'primary'"
                @click="handleUpdate(2)"
              >
                {{ type === 2 ? "保存" : "修改" }}
              </el-button>
            </div>
            <div class="text-content">测试测试测试</div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">保护措施</div>
              <el-button
                :type="type === 3 ? 'success' : 'primary'"
                @click="handleUpdate(3)"
              >
                {{ type === 3 ? "保存" : "修改" }}
              </el-button>
            </div>
            <div class="text-content">测试测试测试</div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">附件</div>
              <el-button
                :type="type === 4 ? 'success' : 'primary'"
                @click="handleUpdate(4)"
              >
                {{ type === 4 ? "保存" : "修改" }}
              </el-button>
            </div>
            <div class="text-content">测试测试测试</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 你好，这是必应。我可以帮你用vue来实现，对页面上的文本内容进行标注，用鼠标选中某一句话后，进行高亮显示，并得到选中的话以及所在位置。😊
// 根据搜索结果1，你可以使用以下步骤来实现这个功能：
// 在你的页面中添加一个包含文本内容的元素，例如一个<p>标签。
// 为这个元素添加一个@mouseup事件监听器，当用户松开鼠标时触发一个方法。
// 在这个方法中，使用window.getSelection()方法来获取用户选中的文本对象。
// 使用text对象的toString()方法来获取选中的文本内容，并使用anchorOffset和focusOffset属性来获取选中的起始和结束位置。
// 使用String类的slice()和replace()方法来将原始文本分割为三部分：选中前的部分、选中的部分、选中后的部分，并将选中的部分用<span>标签包裹起来，并添加一个高亮样式。
// 将三部分重新拼接成一个新的字符串，并使用v-html指令将其渲染到页面上。
import './index.scss'
import BreadCrumbs from '@/components/breadCrumbs.vue'

export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      selectText: '',
      // 选择类型
      type: null,
      // 背景
      background: '',
      fileText:
        '测试文档测试文档测试文档',
      policyFileId: null
    }
  },
  created () {
    this.policyFileId = this.$route.params.id
    console.log(this.policyFileId, 333333)
  },
  methods: {
    getSelection () {
      let newFileText = ''
      this.fileText = this.fileText.toString()
      this.fileText = this.fileText.replace(
        '<span style="background: red">',
        ''
      )
      this.fileText = this.fileText.replace('</span>', '')
      console.log(this.fileText, ' this.fileText this.fileText this.fileText')

      const selObj = window.getSelection()
      const selection = selObj.getRangeAt(0)
      // 选中的文字
      this.selectText = selection.toString()
      let anchorOffset = window.getSelection().anchorOffset
      let focusOffset = window.getSelection().focusOffset
      let temp
      if (anchorOffset > focusOffset) {
        temp = anchorOffset
        anchorOffset = focusOffset
        focusOffset = temp
      }
      const beforeStr = this.fileText.slice(0, anchorOffset)
      const str = `<span style="background: red">${this.selectText}</span>`
      const afterStr = this.fileText.slice(focusOffset)
      newFileText = beforeStr + str + afterStr
      this.fileText = newFileText
      console.log(anchorOffset, focusOffset, selection, window.getSelection(), 9999999999)
      // selection.removeAllRanges()
    },
    handleUpdate (tag) {
      this.type = tag
    }
  }
}
</script>
