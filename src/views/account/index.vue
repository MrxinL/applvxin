<template>
 <el-card v-loading='loading'>
   <bread-crumb>
     账户信息
   </bread-crumb>

    <el-upload :http-request="uploadHeadImg" :show-file-list="false">
      <!-- <img :src="userInfo.photo || defaultImg"  class="head-image" alt=""> -->
    </el-upload>
    <el-form ref="userForm" :model="userInfo" :rules="userRules" label="100px">
      <el-form-item label="用户名" prop="name" style="width:300px">
        <el-input v-model="userInfo.name" >
        </el-input>
      </el-form-item>
      <el-form-item label="简介" prop="intro" style="width:300px">
        <el-input v-model="userInfo.intro" >
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" style="width:300px">
        <el-input v-model="userInfo.email" >
        </el-input>
      </el-form-item>
        <el-form-item label="手机号" style="width:300px">
          <el-input v-model="userInfo.mobile" >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveUserInfo" type="primary">保存</el-button>
        </el-form-item>
    </el-form>
 </el-card>
</template>

<script>
export default {
    data(){
      return{
        loading:false,
        userInfo:{
          name:'',
          intro:'',
          email:'',
          photo:'',
          mobile:''
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
        this.loading = true
        const data = new FormData()
        data.append('photo',params.file)
        this.$axios({
          
        })
      },
      getUserInfo(){
        this.$axios({
          url:'/user/profile'
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

</style>