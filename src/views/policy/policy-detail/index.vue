<template>
  <div class="policy-detail">
    <Bread-crumbs
      :items="breadItems"
    />
    <div class="text-container">
      <div class="top-oper">
        <div class="title">标选行文结构</div>
        <el-button type="primary" @click="handleSave" v-if="!isViewMode"> 确认 </el-button>
      </div>
      <div class="content">
        <div class="left" id="textContent" >{{fileText}}</div>
        <div class="right">
          <div class="word item">
            <div class="title">文本高频词：</div>
            <div class="mt-16 mb-16 defaultColor">{{fileMarks.frequentWord}}</div>
            <div class="chart"></div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">背景：</div>
              <el-button
                v-if="!isViewMode"
                :type="type === 1 && editWord ? 'warning' : 'primary'"
                :disabled="type === 1 && editWord"
                @click="handleUpdate(1)"
              >
                {{ type === 1 && editWord ? "修改中" : "修改" }}
              </el-button>
            </div>
            <div class="text-content"  :class="{'active': type ===1}"
            @click="handleShowWord(1)">
                {{
                  fileMarks.background.text &&
                  fileMarks.background.text.length > 100
                    ? fileMarks.background.text.slice(0, 100) + "..."
                    : fileMarks.background.text
                }}
              </div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">主题内容：</div>
              <el-button
                v-if="!isViewMode"
                :type="type === 2 && editWord ? 'warning' : 'primary'"
                :disabled="type === 2 && editWord"
                @click="handleUpdate(2)"
              >
                {{ type === 2 && editWord? "修改中" : "修改" }}
              </el-button>
            </div>
            <div class="text-content"  :class="{'active': type ===2}"
            @click="handleShowWord(2)">
                {{
                  fileMarks.subjectContent.text &&
                  fileMarks.subjectContent.text.length > 100
                    ? fileMarks.subjectContent.text.slice(0, 100) + "..."
                    :  fileMarks.subjectContent.text
                }}
              </div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">保护措施</div>
              <el-button
                v-if="!isViewMode"
                :type="type === 3 && editWord ? 'warning' : 'primary'"
                :disabled="type === 3 && editWord "
                @click="handleUpdate(3)"
              >
                {{ type === 3 && editWord ? "修改中" : "修改" }}
              </el-button>
            </div>
            <div
                class="text-content"
                :class="{'active': type ===3}"
                @click="handleShowWord(3)"
              >
                {{
                  fileMarks.safeguardMeasure.text &&
                  fileMarks.safeguardMeasure.text.length > 100
                    ? fileMarks.safeguardMeasure.text.slice(0, 100 )+ "..."
                    : fileMarks.safeguardMeasure.text
                }}
              </div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">附件</div>
              <el-button
                @click="handleDownload"
              >
                下载
              </el-button>
            </div>
            <div class="text-content" style="color:#1677FF">附件名：{{fileMarks.attachmentFileName}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import './index.scss'
import BreadCrumbs from '@/components/breadCrumbs.vue'
import Highlighter from 'web-highlighter'
import { getPolicyDetailData, updateFileData } from '@/api/policy/data-list'
import { deepClone } from '@/utils/utils'

export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      breadItems: [],
      // 是否是查看模式
      isViewMode: true,
      // 是否修改高亮内容
      editWord: false,
      // 高亮实例
      highlighter: null,
      // 选中的文本
      selectObj: null,
      // 选择类型
      type: null,
      fileText: null,
      policyFileId: null,
      // 获取到的文件数据
      originFileData: {},
      // 需要编辑的数据
      fileMarks: {
        policyFileId: null,
        background: {},
        subjectContent: {},
        safeguardMeasure: {},
        attachmentFileName: {},
        attachmentUrl: '',
        frequentWord: ''
      }
    }
  },
  watch: {
    selectObj (v) {
      switch (this.type) {
        case 1:
          this.fileMarks.background = v
          break
        case 2:
          this.fileMarks.subjectContent = v
          break
        case 3:
          console.log(v, '7777777')
          this.fileMarks.safeguardMeasure = v
          break
      }
    },
    // 判断是否开启高亮配置
    editWord (v) {
      if (!v) {
        this.highlighter.stop()
      } else {
        this.highlighter.run()
      }
    }
  },
  created () {
    this.policyFileId = this.$route.params.id
    this.isViewMode = !!this.$route.query.isView
    if (this.isViewMode) {
      this.breadItems = [
        {
          name: '主页',
          path: '/index'
        },
        {
          name: '政策模块管理',
          path: '/policy/manage'
        },
        {
          name: '查看',
          path: '/policy/manage/policyDetail/' + this.policyFileId + '?isView=1'
        }
      ]
    } else {
      this.breadItems = [
        {
          name: '主页',
          path: '/index'
        },
        {
          name: '政策模块管理',
          path: '/policy/manage'
        },
        {
          name: '标选行文结构',
          path: '/policy/manage/policyDetail/' + this.policyFileId
        }
      ]
    }
  },

  mounted () {
    this.getFileData()
    this.highlighter = new Highlighter({
      $root: document.getElementById('textContent')
    })
    const _this = this
    this.highlighter.on(
      Highlighter.event.CREATE,
      function ({ sources }, inst, e) {
        if (_this.selectObj && _this.selectObj.id) {
          if (_this.editWord) {
            _this.highlighter.remove(_this.selectObj.id)
          }
        }
        _this.selectObj = sources[0]
      }
    )
  },
  beforeDestroy () {
    this.highlighter.dispose()
  },
  methods: {
    // 点击保存
    handleSave () {
      this.editWord = false
      console.log(this.fileMarks, 'kkkkkkkk')
      this.$confirm('您确定要保存吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.fileMarks.backgroundContent = this.fileMarks.background ? this.fileMarks.background.text : null
          this.fileMarks.subjectContentContent = this.fileMarks.subjectContent ? this.fileMarks.subjectContent.text : null
          this.fileMarks.safeguardMeasureContent = this.fileMarks.safeguardMeasure ? this.fileMarks.safeguardMeasure.text : null
          var param = deepClone(this.fileMarks)
          param.background = param.background ? JSON.stringify(param.background) : param.background
          param.subjectContent = param.subjectContent ? JSON.stringify(param.subjectContent) : param.subjectContent
          param.safeguardMeasure = param.safeguardMeasure ? JSON.stringify(param.safeguardMeasure) : param.safeguardMeasure
          console.log(param, 'mmmmmm')
          updateFileData(param).then((res) => {
            if (res.code === 200) {
              this.msgSuccess('保存成功')
            } else {
              this.msgError('保存失败')
            }
          })
        })
        .catch(() => {
          this.msgInfo('已取消保存')
        })
    },
    // 下载附件
    handleDownload () {
      if (this.fileMarks.attachmentUrl) {
        window.open(this.fileMarks.attachmentUrl)
      } else {
        this.msgError('附件地址错误')
      }
    },
    // 点击在文本中高亮文字
    handleShowWord (type) {
      // 清除页面中现有的高亮
      this.highlighter.removeAll()
      this.type = type
      this.editWord = false
      switch (type) {
        case 1: {
          const background = this.fileMarks.background
          this.highlighter.fromStore(background.startMeta, background.endMeta, background.text, background.id)
          break
        }

        case 2: {
          const subjectContent = this.fileMarks.subjectContent
          this.highlighter.fromStore(subjectContent.startMeta, subjectContent.endMeta, subjectContent.text, subjectContent.id)
          break
        }

        case 3: {
          const safeguardMeasure = this.fileMarks.safeguardMeasure
          this.highlighter.fromStore(safeguardMeasure.startMeta, safeguardMeasure.endMeta, safeguardMeasure.text, safeguardMeasure.id)
          break
        }
      }
    },
    getFileData () {
      getPolicyDetailData(this.policyFileId).then((res) => {
        if (res.code === 200) {
          const data = res.data
          this.originFileData = data
          this.fileText = data.cleanedContent
          this.fileMarks = {
            policyFileId: data.policyFileId,
            background: data.background ? JSON.parse(data.background) : {},
            subjectContent: data.subjectContent ? JSON.parse(data.subjectContent) : {},
            safeguardMeasure: data.safeguardMeasure ? JSON.parse(data.safeguardMeasure) : {},
            attachmentUrl: data.attachmentUrl,
            attachmentFileName: data.attachmentFileName,
            frequentWord: data.frequentWord
          }
          console.log(this.fileMarks, 'lllllll')
        }
      })
    },
    handleUpdate (tag) {
      // 清除页面中现有的高亮
      this.highlighter.removeAll()
      this.editWord = true
      this.type = tag
    }
  }
}
</script>
