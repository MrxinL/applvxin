<template>
 <el-container>
   <!-- 侧边栏 -->
   <el-aside>
     <layout-aside></layout-aside>
   </el-aside>

   <el-container>
   <!-- 头部 -->
     <el-header>
       <layout-header></layout-header>
     </el-header>
    <!-- 内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
   </el-container>
   

 </el-container>
</template>

<script>
export default {
  //拿到后台的信息
data(){
return {
  userInfo:{

  }
}
},
  methods:{
      getUserInfo(){
        this.$axios({
          url:'/user/profile'
        }).then(result =>{
          this.userInfo=result.data
        })
      }
  },
  created(){
    this.getUserInfo()
  }
}
</script>
<style lang="less" scoped>

</style>