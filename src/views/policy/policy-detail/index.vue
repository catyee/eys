<template>
  <div class="policy-detail">
    <Bread-crumbs :items="breadItems" />
    <div class="text-container">
      <div class="top-oper">
        <div class="title">标选行文结构</div>
        <el-button type="primary" @click="handleSave" v-if="!isViewMode">
          确认
        </el-button>
      </div>
      <div class="content">
        <!-- <textarea type="text" class="left" id="textContent"  :value="fileText"></textarea> -->
        <div class="left" id="textContent">
          {{ fileText }}
        </div>
        <div class="right">
          <div class="word item">
            <div class="title">文本高频词：</div>
            <div style="display: flex; algin-items: center; cursor: pointer">
              <div
                class="mt-16 mb-16 mr-16"
                :class="{ defaultColor: currentFrequentWord === key }"
                @click="handleFrequentWordChange(key)"
                v-for="(val, key, index) in fileMarks.frequentWord"
                :key="index"
              >
                {{ key }}:{{ val }}次
              </div>
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
            <div
              class="text-content"
              :class="{ active: type === 1 }"
              @click="handleShowWord(1)"
            >
              {{
                fileMarks.backgroundContent &&
                fileMarks.backgroundContent.length > 100
                  ? fileMarks.backgroundContent.slice(0, 100) + "..."
                  : fileMarks.backgroundContent
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
                {{ type === 2 && editWord ? "修改中" : "修改" }}
              </el-button>
            </div>
            <div
              class="text-content"
              :class="{ active: type === 2 }"
              @click="handleShowWord(2)"
            >
              {{
                fileMarks.subjectContentContent &&
                fileMarks.subjectContentContent.length > 100
                  ? fileMarks.subjectContentContent.slice(0, 100) + "..."
                  : fileMarks.subjectContentContent
              }}
            </div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">保护措施</div>
              <el-button
                v-if="!isViewMode"
                :type="type === 3 && editWord ? 'warning' : 'primary'"
                :disabled="type === 3 && editWord"
                @click="handleUpdate(3)"
              >
                {{ type === 3 && editWord ? "修改中" : "修改" }}
              </el-button>
            </div>
            <div
              class="text-content"
              :class="{ active: type === 3 }"
              @click="handleShowWord(3)"
            >
              {{
                fileMarks.safeguardMeasureContent &&
                fileMarks.safeguardMeasureContent.length > 100
                  ? fileMarks.safeguardMeasureContent.slice(0, 100) + "..."
                  : fileMarks.safeguardMeasureContent
              }}
            </div>
          </div>
          <div class="item">
            <div class="top-oper">
              <div class="title">附件</div>
              <div>
                <el-button
                v-if="!isViewMode"
                :type="type === 4 && editWord ? 'warning' : 'primary'"
                :disabled="type === 4 && editWord"
                @click="handleUpdate(4)"
              >
                {{ type === 4 && editWord ? "修改中" : "修改" }}
              </el-button>
              <el-button @click="handleDownload"> 下载 </el-button>
              </div>

            </div>
            <div
              class="text-content"
              :class="{ active: type === 4 }"
              @click="handleShowWord(4)"
            >
              {{
                fileMarks.attachmentContent &&
                fileMarks.attachmentContent.length > 100
                  ? fileMarks.attachmentContent.slice(0, 100) + "..."
                  : fileMarks.attachmentContent
              }}
            </div>
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
import { getPolicyDetailData, updateFileData, updatePolicyData } from '@/api/policy/data-list'
import { deepClone, getStrNum, copyArr } from '@/utils/utils'
import * as echarts from 'echarts'

export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      policyDataId: null,
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
      selectObj: [],
      // 选择类型
      type: null,
      fileText: null,
      policyFileId: null,
      // 获取到的文件数据
      originFileData: {},
      // 需要编辑的数据
      fileMarks: {
        policyFileId: null,
        background: [],
        backgroundContent: null,
        subjectContent: [],
        subjectContentContent: null,
        safeguardMeasure: [],
        safeguardMeasureContent: null,
        attachmentFileName: {},
        attachment: [],
        attachmentContent: null,
        attachmentUrl: '',
        frequentWord: ''
      }
    }
  },
  watch: {
    selectObj: {
      handler (v) {

      },
      deep: true
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
          path:
            '/policy/manage/policyDetail/' + this.policyFileId + '?isView=1'
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
    var chartDom = document.getElementById('chart')
    this.echarts = echarts.init(chartDom)
    this.getFileData()
    this.highlighter = new Highlighter({
      $root: document.getElementById('textContent')
    })
    const _this = this
    this.highlighter.on(
      Highlighter.event.CREATE,
      function ({ sources }, inst, e) {
        if (_this.selectObj && _this.selectObj.id) {
          // if (_this.editWord) {
          //   _this.highlighter.remove(_this.selectObj.id)
          // }
        }
        _this.selectObj.push(sources[0])
        _this.handleSelectObj(_this.selectObj)
      }
    )
  },
  beforeDestroy () {
    this.highlighter.dispose()
  },
  methods: {
    handleSelectObj (v) {
      const arr = this.merge(v)
      function getText (arr) {
        let str = ''
        arr.forEach((item) => {
          str += item.text
        })
        return str
      }
      const text = getText(arr)
      switch (this.type) {
        case 1: {
          this.fileMarks.background = v
          this.fileMarks.backgroundContent = text
          break
        }

        case 2: {
          this.fileMarks.subjectContent = v
          this.fileMarks.subjectContentContent = text
          break
        }

        case 3: {
          this.fileMarks.safeguardMeasure = v
          this.fileMarks.safeguardMeasureContent = text
          break
        }
        case 4: {
          this.fileMarks.attachment = v
          this.fileMarks.attachmentContent = text
          break
        }
      }
    },
    merge (v) {
      const intervals = copyArr(v)
      if (!v) return v
      if (intervals.length <= 1) {
        return intervals
      }

      // 先将数组按照区间最左边的大小顺序排序
      const arr = intervals.sort(
        (a, b) => a.startMeta.textOffset - b.startMeta.textOffset
      )
      function unite (arr, i) {
        if (i === arr.length - 1) {
          return arr
        }

        // 如果下一个区间的左区间在本区间之间，则合并一次
        if (
          arr[i].startMeta.textOffset <= arr[i + 1].startMeta.textOffset &&
          arr[i + 1].startMeta.textOffset <= arr[i].endMeta.textOffset
        ) {
          if (arr[i + 1].endMeta.textOffset > arr[i].endMeta.textOffset) {
            arr[i].text =
              arr[i].text +
              arr[i + 1].text.slice(
                arr[i].endMeta.textOffset - arr[i + 1].startMeta.textOffset
              )
          }
          arr[i].startMeta.textOffset = Math.min(
            arr[i].startMeta.textOffset,
            Math.max(arr[i + 1].startMeta.textOffset)
          )
          arr[i].endMeta.textOffset = Math.max(
            arr[i].endMeta.textOffset,
            Math.max(arr[i + 1].endMeta.textOffset)
          )
          // 合并之后删除冗余区间
          arr.splice(i + 1, 1)
        } else {
          // 如果没有合并，则找到下一个待合并区间
          i++
        }
        return unite(arr, i)
      }

      return unite(arr, 0)
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
          var param = deepClone(this.fileMarks)
          param.background = param.background
            ? JSON.stringify(param.background)
            : param.background
          param.subjectContent = param.subjectContent
            ? JSON.stringify(param.subjectContent)
            : param.subjectContent
          param.safeguardMeasure = param.safeguardMeasure
            ? JSON.stringify(param.safeguardMeasure)
            : param.safeguardMeasure
          param.attachment = param.attachment
            ? JSON.stringify(param.attachment)
            : param.attachment
          param.frequentWord = param.frequentWord ? JSON.stringify(param.frequentWord) : param.frequentWord
          let writingStructure = null
          if (param.backgroundContent && param.subjectContentContent && param.safeguardMeasureContent && param.attachmentContent) {
            writingStructure = 1
          } else if (!param.backgroundContent && !param.subjectContentContent && !param.safeguardMeasureContent && !param.attachmentContent) {
            writingStructure = 0
          } else {
            writingStructure = 2
          }

          updateFileData(param).then((res) => {
            if (res.code === 200) {
              this.msgSuccess('保存成功')
              updatePolicyData({
                policyDataId: this.policyDataId,
                writingStructure: writingStructure
              }).then((res) => {
                if (res.code === 200) {
                  this.msgSuccess('保存成功')
                } else {
                  this.msgError('保存失败' + res.code)
                }
              })
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
      this.selectObj = []
      switch (type) {
        case 1: {
          const backgrounds = this.fileMarks.background
          backgrounds.forEach((background) => {
            this.highlighter.fromStore(
              background.startMeta,
              background.endMeta,
              background.text,
              background.id
            )
          })
          break
        }

        case 2: {
          const subjectContents = this.fileMarks.subjectContent
          subjectContents.forEach((subjectContent) => {
            this.highlighter.fromStore(
              subjectContent.startMeta,
              subjectContent.endMeta,
              subjectContent.text,
              subjectContent.id
            )
          })
          break
        }

        case 3: {
          const safeguardMeasures = this.fileMarks.safeguardMeasure
          safeguardMeasures.forEach((safeguardMeasure) => {
            this.highlighter.fromStore(
              safeguardMeasure.startMeta,
              safeguardMeasure.endMeta,
              safeguardMeasure.text,
              safeguardMeasure.id
            )
          })
          break
        }
        case 4: {
          const attachments = this.fileMarks.attachment
          attachments.forEach((attachment) => {
            this.highlighter.fromStore(
              attachment.startMeta,
              attachment.endMeta,
              attachment.text,
              attachment.id
            )
          })
          break
        }
      }
    },
    getFileData () {
      getPolicyDetailData(this.policyFileId).then((res) => {
        if (res.code === 200) {
          const data = res.data
          this.policyDataId = data.policyDataId
          this.originFileData = data
          this.fileText = data.cleanedContent
          let background = []
          let subjectContent = []
          let safeguardMeasure = []
          let attachment = []
          if (data.background) {
            try {
              background = JSON.parse(data.background)
            } catch (e) {
              background = []
            }
          }
          if (data.subjectContent) {
            try {
              subjectContent = JSON.parse(data.subjectContent)
            } catch (e) {
              subjectContent = []
            }
          }
          if (data.safeguardMeasure) {
            try {
              safeguardMeasure = JSON.parse(data.safeguardMeasure)
            } catch (e) {
              safeguardMeasure = []
            }
          }
          if (data.attachment) {
            try {
              attachment = JSON.parse(data.attachment)
            } catch (e) {
              attachment = []
            }
          }
          this.fileMarks = {
            policyFileId: data.policyFileId,
            background: background,
            backgroundContent: data.backgroundContent,
            subjectContent: subjectContent,
            subjectContentContent: data.subjectContentContent,
            safeguardMeasure: safeguardMeasure,
            safeguardMeasureContent: data.safeguardMeasureContent,
            attachmentUrl: data.attachmentUrl,
            attachmentFileName: data.attachmentFileName,
            attachment: attachment,
            attachmentContent: data.attachmentContent,
            frequentWord: data.frequentWord
              ? JSON.parse(data.frequentWord)
              : {}
          }
          if (data.frequentWord) {
            this.currentFrequentWord = Object.keys(
              JSON.parse(data.frequentWord)
            )[0]
            this.handleChart()
          }
        }
      })
    },
    handleUpdate (tag) {
      // 清除页面中现有的高亮
      this.highlighter.removeAll()
      this.selectObj = []
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
      this.handleChart(
        [wordBackground || 0, wordSubject || 0, wordSafe || 0, wordFile || 0],
        this.currentFrequentWord
      )
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
