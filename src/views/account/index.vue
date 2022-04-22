<template>
 <el-card v-loading='loading'>

   <bread-crumb slot="header">
   <template slot="title">
     账户信息
     </template>
   </bread-crumb>

     <el-upload :http-request="uploadHeadImg" :show-file-list="false">
    <img :src="userInfo.photo || defaultImg" class="head-image" alt="">
      </el-upload>


    <el-form ref="userForm" :model="userInfo" :rules="userRules" label-width="100px">
      <el-form-item label="用户名" prop="name" style="width:300px">
        <el-input v-model="userInfo.name" >
        </el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro" style="width:300px" >
        <el-input v-model="userInfo.intro" >
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email"  style="width:300px">
        <el-input v-model="userInfo.email" >
        </el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password"  style="width:300px">
        <el-input v-model="userInfo.password" >
        </el-input>
      </el-form-item>
        <el-form-item label="手机号" style="width:300px">
          <el-input v-model="userInfo.mobile"  disabled >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveUserInfo" type="primary">保存</el-button>
        </el-form-item>
    </el-form>
 </el-card>
</template>

<script>
import eventsBus from '../../utils/events'
export default {

    data(){
      return{
        loading:false,
        defaultImg:require('../../assets/default-cover.jpg'),
        userInfo:{
          id: '',
          name:'',
          intro:'',
          email:'',
          photo:'',
          mobile:'',
          password: ''
        },
        userRules:{
          name:[{
            required:true,
            message:'用户名不能为空'
          },{
            email:[{
              pattern:/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
              message:'邮箱格式不正确'
            }]
          }
          ]
        }
        
      }
     
    },
    methods:{
      uploadHeadImg(params){
        this.loading = true // 进度条
        const data = new FormData()
        data.append('photo',params.file)
        this.$axios({
          url:'/user/photo',
          method:'patch',
          params: { 'id': this.userInfo.id},
          data
        }).then(()=>{
          this.loading=false
          eventsBus.$emit('updateuserinfo')
          this.getUserInfo()
        })
      },
      saveUserInfo(){
            this.$refs.userForm.validate((isok)=>{
              if(isok){
                this.$axios({
                  url:'/user/profile',
                  method:'patch',
                  data:this.userInfo
                }).then(()=>{
                  this.$message('保存成功');
                  eventsBus.$emit('updateuserinfo')
                  this.getUserInfo()

                })
              }
            })
      },
      getUserInfo(){
        const token = window.localStorage.getItem('user-token')
        this.$axios({
          url:'/user/profile',
          method: 'get',
          params: {'token': token}
        }).then(result=>{
          this.userInfo = result.data
        })
      }

    },
    created(){
        this.getUserInfo()
    }
}
</script>

<style lang="less" scoped>
  .head-image {
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-left: 25px;

  }
</style>