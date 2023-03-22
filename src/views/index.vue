<template>
  <div class="app-container home">
    <div class="module-wrap">
      <div class="module"
      v-for="(item,index) in dataSource" :key="item.name"
      :class="{active: index===0}" @click="handleClick(item.link)">
        <img :src=item.img>
        <div class="module-title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import entry1 from '@/assets/images/index/01.png'
import entry2 from '@/assets/images/index/02.png'
import entry3 from '@/assets/images/index/03.png'
import entry4 from '@/assets/images/index/04.png'
import entry5 from '@/assets/images/index/05.png'
import entry6 from '@/assets/images/index/06.png'
import entry7 from '@/assets/images/index/07.png'
import entry8 from '@/assets/images/index/08.png'
const dataSource = [
  {
    name: '政策模块',
    img: entry1,
    link: 'policy'
  },
  {
    name: '科技项目模块',
    img: entry2
  },
  {
    name: '科技论文模块',
    img: entry3
  },
  {
    name: '专利模块',
    img: entry4
  },
  {
    name: '临床实验模块',
    img: entry5
  },
  {
    name: '产品模块',
    img: entry6
  },
  {
    name: '标准模块',
    img: entry7
  },
  {
    name: '临床指南模块',
    img: entry8
  }
]
export default {
  name: 'Index',
  data () {
    return {
      dataSource: dataSource
    }
  },
  methods: {
    handleClick (link) {
      if (link) {
        this.$router.push('/policy')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #F8F8F8;

  flex-wrap: wrap;

  .module-wrap{
    max-width: 1320px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 200px;
    opacity: 0.3;
    background: #FFFFFF;
    border-radius: 30px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-bottom: 24px;
    margin-right: 24px;
    cursor: not-allowed;
    &.active{
      cursor: pointer;
      &:hover{
        opacity: 1;
      }
      &:active{
        opacity: 1;
      }
    }

    &.noActive{
      cursor: not-allowed;
    }

    img {
      display: block;
      width: 110px;
      height: 110px;
    }

    .module-title {
      font-size: 24px;
      font-weight: 600;
      color: #1D1D1E;
      line-height: 33px;
    }
  }

}
</style>
