<template>
  <div class="layout-aside">
    <div class="title">
      <!-- <img src="../../assets/logo_admin.png" alt=""> -->
    </div>
    <!--  element-ui   el-menu-->
    <el-menu
      background-color="#323745"
      text-color="#adafb5"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!--    折叠菜单-->
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>我的业绩</span>
        </template>
        <el-menu-item index="/home/achievementFind">精准查询</el-menu-item>
        <el-menu-item index="/home/achievementShow">业绩展示</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>班级</span>
        </template>
        <el-menu-item index="/home/mybanji">我的班级</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>管理员审批</span>
        </template>
        <el-menu-item index="/home/guanliyuan">业绩评定</el-menu-item>
         <el-menu-item index="/home/guanlipingding">老师管理</el-menu-item>
      </el-submenu>
      <!-- <el-menu-item index="/home/guanliyuan">
        <i class="el-icon-s-custom"></i>
        <span slot="title">管理员审批</span>
      </el-menu-item> -->
      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
.layout-aside {
  width: 200px;
  height: 100vh;
  background-color: #323745;
  .title {
    text-align: center;
    padding: 10px 0;
    img {
      height: 30px;
    }
  }
}
</style>