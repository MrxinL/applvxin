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
           
            <el-card class="img-card" v-for="item in list" :key="item.id">
                <img :src="item.url" alt="">
                <el-row class="operate" type="flex" align="middle" justify="space-arond">
                  <i @click="collectOrCancel(item)"   class="el-icon-star-on" :style="{color:item.is_collected ? 'red' :''}">收藏</i>
                  <i @click="delImg(item)"   class="el-icon-delete-solid">删除</i>
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
              <img :src="item.url" alt="">
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
          delImg(item){
              this.$confirm('确定要删除此素材吗？','提示').then(()=>{
                  //  确定要删除  请求 删除接口   (delete)  传参  /user/images/id
                  // 重新加载数据
                  this.$axios({
                    url:`/user/images/${item.id}`,
                    method:'delete'
                  }).then((()=>{
                      this.getMaterial()
                  }))
              })
          },
          collectOrCancel(item){
            const mess =item.is_collected ? '取消':''
            this.$confirm(`确定要${mess}收藏这个素材吗?`).then(()=>{
              //请求接口
              this.$axios({

                url:`/user/images/${item.id}`,
                method:'put',
                data:{
                  collect:!item.is_collected
                }
              }).then(()=>{
                this.getMaterial()
              })
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
                this.list=result.data.result
                console.log(result.data,"/*/*/*/")
                this.page.total=result.data.total_count
              })
          },
          changeTab(){
              //   全部和收藏 来回切换  调用
              //   activeName 变
              //page.page
              this.page.page=1
              this.getMaterial()
          },
          changePage(newPage){
            //点击分页
            this.page.page = newPage

            this.getMaterial()

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