<template>
  <el-row type="flex" class="layout-header" justify="space-between">
    <el-col class="left" :span="6">
      <i class="el-icon-s-unfold icon"></i>
      <span>哈尔滨布卡科技有限公司</span>
    </el-col>
    <el-col class="right" :span="3">
      <!-- 用户头像 -->
      <img class="head-img" :src="userInfo.photo?userInfo.photo : defaultImg" />
      <!-- 功能键 个人中心 退出登录 -->
      <el-dropdown trigger="click" @command="handleMenuItem">

        <span class="el-dropdown-link">
          {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='account'>个人信息</el-dropdown-item>
          <el-dropdown-item command='git'>git地址</el-dropdown-item>
          <el-dropdown-item command='logout'>退出</el-dropdown-item>
        
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import eventsBus from '../../utils/events'
export default {
  
  data(){
return {
  userInfo:{

  },
  defaultImg : require('../../assets/avatar.jpg')

}
},
  methods:{
      handleMenuItem(command){
        if(command ==='account'){
            //个人中心
        }else if(command ==='git'){
          //跳转git
          window.location.href='https://github.com/MrxinL/toutiao'
        }else{
          //退出  清除 token信息   编程式导航到登录页


          window.localStorage.clear()
          this.$router.push('/login')
        }
      },




      getUserInfo(){
        this.$axios({
          url:'/user/profile'
        }).then(result =>{

          // console.log(result.data.data)
          this.userInfo=result.data
        })
      }
  },
  created(){
    eventsBus.$on('updateuserinfo',()=>{
       this.getUserInfo()
    })

    
    this.getUserInfo()
  }
};


</script>

<style lang="less" scoped>
.layout-header {
  padding: 8px 0;
  .left {
    .icon {
      font-size: 22px;
      margin-right: 5px;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }
  .head-img {
    border-radius: 50%;
    margin-right: 5px;
    width: 40px;
    height: 40px;
  }
}
</style>