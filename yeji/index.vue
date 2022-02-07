<template>
<div>
    <div class="buju">
       <el-input v-model="postdata.inputname" placeholder="姓名" class="input"></el-input>
       <el-input v-model="postdata.inputphone" placeholder="电话号" class="input"></el-input>
          <el-select v-model="postdata.inputvalue" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
       <el-button type="primary" @click="hanleadd">添加</el-button>
    </div>
    <div class="max">
        <span class="itemmax">销售数量: {{length}}</span>
        <span class="itemmax">客单价: {{price}}</span>
        <span class="itemmax">总计:{{length * price}}</span>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="电话号"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.phone }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="购买课程"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.value }}</span>
      </template>
    </el-table-column>
    
  
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>

      </template>
    </el-table-column>
  </el-table>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%">
    <span>信息</span>
       <el-input v-model="tableDataUpdata.name" placeholder="姓名" class="input"></el-input>
       <el-input v-model="tableDataUpdata.phone" placeholder="班级" class="input"></el-input>
          <el-select v-model="tableDataUpdata.value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
// import Tanjia from '../../components/common/tianjiabuttone.vue'
// import dayjs from 'dayjs'
  export default {
    // components: {
    //   Tanjia
    // },
    data() {
      return {
        options: [{
          value: 1,
          label: '数学'
        }, {
          value: 2,
          label: '外语'
        }, {
          value: 3,
          label: '语文'
        }, {
          value: 4,
          label: '物理'
        }, {
          value: 5,
          label: '化学'
        }],
        value: '',
        tableData: '',
        tableDataUpdata: '',
        dialogVisible: false,
        messageVisible: false,
        price: 5000,
        length: '',
        postdata: {
          inputname:'',
          inputphone: '',
          inputvalue: ''
        }
      }
    },
    methods: {
    //   handleMessage(index, row) {
    //     this.messageVisible = true
    //     this.$axios({
    //       url:'/yejishow/update/get',
    //       method: 'post',
    //       data: {id: row.id}
    //     }).then( result => {
    //       this.tableDataUpdata = result.data[0]
    //     })
    //   },
      handleEdit(index, row) {
        this.dialogVisible = true
        this.$axios({
          url:'/yejishow/update/get',
          method: 'post',
          data: {id: row.id}
        }).then( result => {
          this.tableDataUpdata = result.data[0]
        })
      },
      handleClose() {
        this.dialogVisible = false
        this.$axios({
          url:'/yejishow/update',
          method: 'post',
          data: this.tableDataUpdata
        }).then( result => {
          this.$message(result)
          this.handleHuoqu()
        })
      },
      handleDelete(row) {
          this.$axios({
          url:'/yejishow/delete',
          method: 'post',
          data: {id: row.id}
        }).then( result => {
          this.$message(result)
          this.handleHuoqu()
        })
      },
      hanleadd() {
          if(this.postdata.inputname && this.postdata.inputphone && this.postdata.inputvalue) {
        this.$axios({
          url:'/yejishow/add',
          method: 'post',
          data: this.postdata
        }).then( result => {
          this.$message(result)
          this.handleHuoqu()
        })
          } else {
              this.$message('数据不能为空')
          }
      },
      handleHuoqu() {
        this.$axios({
          url: '/yejishow',
          method: 'get',
        }).then((result) => {
          this.tableData = result.data
          this.length = result.data.length
        })

      }
    },
    mounted: function() {
      this.handleHuoqu()
    }
  }
</script>

<style lang='less'>
.max {
    height: 40px;
    background-color: rgb(241, 238, 238);
    margin-top: 8px;
    .itemmax {
        display: inline-block;
        margin-right: 20%;
        margin-top: 8px;
    }
}
.put {
  width: 200px;
}
.button {
  margin-left: 40px;
}
.tianjia {
  position: relative;
  top: 0px;
  left: -383px;
}
.buju {
  display: inline-block;
.input {
  width: 200px;
  margin-right: 20px;
}
}

</style>