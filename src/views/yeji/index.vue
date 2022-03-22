<template>
<div>
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
        <span style="margin-left: 10px">{{ scope.row.xueke }}</span>
      </template>
    </el-table-column>
        <el-table-column
      label="所属班级"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.banji }}</span>
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
       <el-input v-model="tableDataUpdata.banji" placeholder="所属班级" class="input"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
      handleEdit(index, row) {
        this.dialogVisible = true;
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
      handleHuoqu() {
        const token = window.localStorage.getItem('user-token')
        this.$axios({
          url: '/yejishow',
          method: 'get',
          params: {"token": token}
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