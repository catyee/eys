<template>
  <div class="container">
    <Header />
    <div class="height-48"></div>
    <div class="content">
      <Menu />

      <div class="main-content" id="main-scroll">
         <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Header from './header.vue'
import Menu from './menu.vue'
export default {
  components: {
    Header,
    Menu
  }
}
</script>
<style lang="scss" scoped>

.container {
  box-sizing: border-box;
  height: 100%;
  padding-bottom: 60px;
  //overflow: hidden;
}
.content {
  display: flex;
  height: 100%;
  box-sizing: border-box;
  // padding-top: 60px;
}
.main-content {
  flex: 1;
  //height: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: $body-deep-color;
  //overflow-y: hidden;
  overflow: auto;
  padding-left: 24px;
}
</style>
