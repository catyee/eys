<template>
  <div class="header height-48">
    <div class="header-title">
      <router-link to="/index" >
        <div class="f16 pl-9" >主页</div>
      </router-link>
    </div>
    <div class="header-right pr-32">
      <div @click="logout">退出</div>
       <!-- <el-menu mode="horizontal">
        <el-submenu index="1">
          <span class=" username">{{userName}} 退出</span>
         <el-menu-item index="1-1" @click="updatePwd">修改密码</el-menu-item> -->
          <!-- <el-menu-item index="1-2" @click="logout">退出登录</el-menu-item> -->
          <!-- <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item> -->
        <!-- </el-submenu> -->
      <!-- </el-menu> -->
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    userName () {
      return this.$store.getters.name
    }

  },
  methods: {
    // 退出登录
    logout () {
      this.$confirm('您确定要退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store
          .dispatch('LogOut')
          .then(res => {
            this.msgSuccess('退出成功')
            this.$router.push({ path: '/login' })
          })
        // eslint-disable-next-line handle-callback-err
          .catch(error => {
          })
      }).catch(() => {
      })
    }
  }
}
</script>
<style  lang="scss" scoped>
// /deep/.el-submenu__icon-arrow.el-icon-arrow-down{
//     display: none;
// }
/deep/.el-submenu__title{
 display: flex;
 align-items: center;
}
.header {
  position: fixed;
  width: 100%;
  z-index: 99;
  display: flex;
  align-items: center;
  background: #001529;
}
.header-title {
  color: #fff;
  margin-left: 50px;
  cursor: pointer;
}
.header-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  height: 100%;
  color: #fff;
  cursor: pointer;
}
</style>
