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
        <!-- <textarea type="text" class="left" id="textContent"  :value="fileText"></textarea> -->
       <div id="test" class="test" style="position:relative;"> <div class="left" id="textContent"  @mousemove="handleMove">{{fileText}}</div>    <el-button type="warning" class="popover" id="popover" @click="addMarker">标记开始</el-button>
      </div>
        <div class="right">
          <div class="word item">
            <div class="title">文本高频词：</div>
            <div style="display:flex;algin-items:center;cursor:pointer;">
              <div class="mt-16 mb-16  mr-16"
              :class="{'defaultColor':currentFrequentWord === key}"
              @click="handleFrequentWordChange(key)"
               v-for="(val,key,index) in fileMarks.frequentWord" :key="index">{{key}}:{{val}}次</div>
            </div>
            <div class="chart" id="chart"></div>
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
import { deepClone, getStrNum, getElementTop, getElementLeft } from '@/utils/utils'
import * as echarts from 'echarts'

export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      popover: null,
      popoverStatus: 'start', // end,null
      markers: {
        start: null,
        end: null
      },
      echarts: null,
      // 当前选中的高频词
      currentFrequentWord: null,
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
    },
    fileMarks: {
      handler (v) {
        this.getChartData(v)
      },
      deep: true
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
    this.popover = document.getElementById('popover')
    var chartDom = document.getElementById('chart')
    this.echarts = echarts.init(chartDom)
    this.getFileData()
    this.highlighter = new Highlighter({
      $root: document.getElementById('test')
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
        console.log(sources[0], 'sources[0]sources[0]sources[0]')
        _this.selectObj = sources[0]
      }
    )
  },
  beforeDestroy () {
    this.highlighter.dispose()
  },
  methods: {
    addMarker () {
      this.markers.start = true
      if (this.popoverStatus === 'start') {
        this.popoverStatus = 'end'
      }
      if (this.popoverStatus === 'end') {
        this.popoverStatus = 'start'
      }
    },
    // 鼠标移动 获取鼠标附近的字符
    handleMove (e) {
      const x = e.clientX
      const y = e.clientY

      let offsetNode
      let offset

      const sel = window.getSelection()
      sel.removeAllRanges()

      if (document.caretPositionFromPoint) {
        const pos = document.caretPositionFromPoint(x, y)
        if (!pos) { return }
        offsetNode = pos.offsetNode
        offset = pos.offset
      } else if (document.caretRangeFromPoint) {
        const pos = document.caretRangeFromPoint(x, y)
        if (!pos) { return }
        offsetNode = pos.startContainer
        offset = pos.startOffset
      } else {
        return
      }

      if (offsetNode.nodeType === Node.TEXT_NODE) {
        const textNode = offsetNode
        const content = textNode.data
        const head = (content.slice(0, offset) || [''])[0]
        // const head = (content.slice(0, offset).match(/[-_a-z]+$/i) || [''])[0]
        const tail = (content.slice(offset + 1) || [''])[0]
        // const tail = (content.slice(offset).match(/^([-_a-z]+|[\u4e00-\u9fa5])/i) || [''])[0]
        if (head.length <= 0 && tail.length <= 0) {
          return
        }

        const range = document.createRange()
        range.setStart(textNode, offset - head.length)
        range.setEnd(textNode, offset + tail.length)
        const rangeRect = range.getBoundingClientRect()

        if (rangeRect.left <= x &&
        rangeRect.right >= x &&
        rangeRect.top <= y &&
        rangeRect.bottom >= y

        ) {
          this.popover.style.display = 'block'
          const boundRange = range.getClientRects()[0] || range.getBoundingClientRect()

          if (!this.markers.start) {
            const wrap = document.getElementById('textContent')
            this.popover.style.top = (boundRange.top - this.popover.clientHeight - getElementTop(wrap) + wrap.scrollTop - 5) + 'px'
            // 居中对齐
            this.popover.style.left = (boundRange.left + boundRange.width / 2 - getElementLeft(wrap) - this.popover.clientWidth / 2) + 'px'
            sel.addRange(range)
            this.highlighter.removeAll()
            this.highlighter.fromRange(range)
            // this.markers.start = sel.getRangeAt(0)
            console.log(range, sel.getRangeAt(0), 'sel.getRangeAt(0)sel.getRangeAt(0)sel.getRangeAt(0)')
          }

          // this.popover.style.top = rangeRect.top + 'px'
          // this.popover.style.left = rangeRect.left + 'px'
        } else {
          // this.popover.style.display = 'none'
        }

        range.detach()
      }
    },
    // 点击保存
    handleSave () {
      this.editWord = false
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

      const div = document.getElementById('textContent')
      // var selection = window.getSelection()
      // selection.removeAllRanges()
      var range = document.createRange()
      range.selectNodeContents(div)
      // selection.addRange(range)
      // console.log(selection.getRangeAt(0), '00000000ooooooooo')
      console.log(range, 'eeeeeee')
      this.highlighter.fromRange(range)
      // rangeObj.deleteContents()

      // this.type = type
      // this.editWord = false
      // switch (type) {
      //   case 1: {
      //     const background = this.fileMarks.background
      //     this.highlighter.fromStore(background.startMeta, background.endMeta, background.text, background.id)
      //     break
      //   }

      //   case 2: {
      //     const subjectContent = this.fileMarks.subjectContent
      //     this.highlighter.fromStore(subjectContent.startMeta, subjectContent.endMeta, subjectContent.text, subjectContent.id)
      //     break
      //   }

      //   case 3: {
      //     const safeguardMeasure = this.fileMarks.safeguardMeasure
      //     this.highlighter.fromStore(safeguardMeasure.startMeta, safeguardMeasure.endMeta, safeguardMeasure.text, safeguardMeasure.id)
      //     break
      //   }
      // }
    },
    getFileData () {
      getPolicyDetailData(this.policyFileId).then((res) => {
        if (res.code === 200) {
          const data = res.data
          this.originFileData = data
          this.fileText = data.cleanedContent
          let background = {}; let subjectContent = {}; let safeguardMeasure = {}
          if (data.background) {
            try {
              background = JSON.parse(data.background)
            } catch (e) {
              background = {}
            }
          }
          if (data.subjectContent) {
            try {
              subjectContent = JSON.parse(data.subjectContent)
            } catch (e) {
              subjectContent = {}
            }
          }
          if (data.safeguardMeasure) {
            try {
              safeguardMeasure = JSON.parse(data.safeguardMeasure)
            } catch (e) {
              safeguardMeasure = {}
            }
          }
          this.fileMarks = {
            policyFileId: data.policyFileId,
            background: background,
            subjectContent: subjectContent,
            safeguardMeasure: safeguardMeasure,
            attachmentUrl: data.attachmentUrl,
            attachmentFileName: data.attachmentFileName,
            frequentWord: data.frequentWord ? JSON.parse(data.frequentWord) : {}
          }
          if (data.frequentWord) {
            this.currentFrequentWord = Object.keys(JSON.parse(data.frequentWord))[0]
            this.handleChart()
          }
        }
      })
    },
    handleUpdate (tag) {
      // 清除页面中现有的高亮
      this.highlighter.removeAll()
      this.editWord = true
      this.type = tag
    },
    // 点击高频词显示对应的图表
    handleFrequentWordChange (key) {
      this.currentFrequentWord = key
      this.getChartData(this.fileMarks)
    },
    // 获取图表数据 背景，主题被人，保护措施，附件高频词数量
    getChartData (fileMarks) {
      const word = this.currentFrequentWord
      const wordFile = fileMarks.frequentWord[word]
      const wordBackground = getStrNum(fileMarks.background.text, word)
      const wordSubject = getStrNum(fileMarks.subjectContent.text, word)
      const wordSafe = getStrNum(fileMarks.safeguardMeasure.text, word)
      this.handleChart([wordBackground || 0, wordSubject || 0, wordSafe || 0, wordFile || 0], this.currentFrequentWord)
    },
    // 生成图表
    handleChart (data, title) {
      var option

      option = {
        title: {
          subtext: title + '（高频词数量）'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['背景', '主题内容', '保护措施', '附件'],
            axisTick: {
              interval: 0
            },
            axisLabel: {
              interval: 0
            }
          }
        ],
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            data: data,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      }

      option && this.echarts.setOption(option)
    }
  }
}
</script>
