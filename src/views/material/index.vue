<template>
      <el-card class="material">
        <bread-crumb slot="header">
        <template slot="title">素材管理</template>
        </bread-crumb>
        <!-- 上传组件 使用ui提供的方法-->
        <el-upload :show-file-list="false" class="upload-btn" :http-request="uploadImg" action="">
          <el-button size="small" type="primary">上传图片</el-button>
        </el-upload>
      <!-- tab -->
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部素材" name="all">
          <div class="card-list">
            <img src="" alt="">
            <el-card class="img-card" v-for="item in list" :key="item.id">
                <el-row class="operate" type="flex" align="middle" justify="space-arond">
                  <i class="el-icon-star-on">收藏</i>
                  <i class="el-icon-delete-solid">删除</i>
                </el-row>
            </el-card>
          </div>




        <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev,pager,next"></el-pagination>
      </el-row>
        </el-tab-pane>

        <el-tab-pane label="收藏素材" name="collent">
          <div class="card-list">
            <el-card class="img-card" v-for="item in list" :key="item.id">
              <img src="item.url" alt="">
            </el-card>
          </div>
      <el-row type="flex" justify="center">
        <el-pagination @current-change="changePage" :current-page="page.page" :page-size="page.pageSize" :total="page.total" background layout="prev,pager,next"></el-pagination>
      </el-row>
        </el-tab-pane>

      </el-tabs>
      </el-card>
</template>

<script>
export default {
        data(){
          return{
              activeName:'all',
              list:[],
              page:{
                page:1,
                pageSize:4,
                total:0
              }
          }
        },
        methods:{
          //选择完照片执行
          uploadImg(params){
            const obj= new FormData()
            obj.append('image',params.file)
            this.$axios({
              url:'/user/images',
              method:'post',
              data:obj
            }).then(()=>{
              //重新请求数据
              this.getMaterial()
            })

          },
          getMaterial(){
              this.$axios({
                url:'/user/images',
                params:{
                  page:this.page.page,
                  per_page:this.page.pageSize,
                  collect:this.activeName === 'collect'
                }
              }).then((result)=>{
console.log(result)
              })
          },
          changeTab(){

          },
          changePage(){

          }

        },
        created(){
          this.getMaterial()
        }
}
</script>

<style lang="less" scoped>
      .mater{
        .card-list{
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .img-card{
          width: 100px;
          height: 100px;
          margin: 30px;
          position: relative;
        }
        .img{
          width: 100%;
          height: 100%;
        }
        .operate{
          position: absolute;
          width: 100%;
          bottom: 0;
          left: 0;
          height: 30px;
          font-size: 18px;
          background-color: #f4f5f6;

        }
      }

</style>