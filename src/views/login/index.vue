<template>
  <div class="login">
    <el-card class="login-card">
      <div class="logo">
        <!-- <img src="../../assets/logo_index.png" alt="图片加载失败" /> -->
      </div>
      <!-- 表单 -->

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        style="margin-top: 20px"
      >
        <el-form-item prop="mobile">
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item prop="check">
          <el-checkbox v-model="loginForm.check">我已阅读并同意</el-checkbox>
        </el-form-item>

        <el-form-item >
          <el-button @click="login" type="primary" style="width:100%" >登录</el-button>
        </el-form-item>

          


      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
      const validator=(rule,value,callback) =>{
        if(value){
          callback()
        }else{
          callback(new Error('你必须同意'))
        }
      }




    return {
      loginForm: {
        mobile: "",
        code: "",
        check: false,
      },
      loginRules:{
        mobile:[{
           required: true,
           message:'手机号不能为空'
        },
        {
          pattern:/^1[3456789]\d{9}$/,
          message:'格式错误'
        }
         
        ],
        code:[
        {
          required:true,
          message:'验证码错误'

        },
        {
          pattern:/^\d{6}$/,
          message:'格式错误,请输入6位数验证码'
        }
        ],
        check:[
          {
            validator
          }
        ]
      },
    
    };
  },
  methods:{

    //设置user-token 整合了 在axios-config。js中统一体现
    
    login(){
      this.$refs.loginForm.validate(isok=>{

        if(isok){
           //请求axios 
           this.$axios({
             url:'/authorizations',
             method: 'post',
             data : this.loginForm
           }).then(result=>{
             //请求成功后，提示登录成功 跳转 token
             window.localStorage.setItem('user-token',result.data.token)
           //编程式导航
           this.$router.push('/')
           })
        }
        else {
          //提示
        }
      })
    }
  }


};
</script>

<style lang="less" scoped>
.login {
  background-image: url("../../assets/login_bg.jpg");
  height:100vh;
  display: flex;
  background-size: cover;
  justify-content: center;
  align-items: center;

  .login-card{
    width: 440px;
    height: 360px;
  }
  .logo{
    text-align: center;
    img{
      height: 50px;
    }
  }
}
</style>
