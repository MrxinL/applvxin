<template>
  <div>
    <div class="buju">
      <el-input
        v-model="postdata.inputtime"
        placeholder="时间"
        class="input"
      ></el-input>
      <el-input
        v-model="postdata.inputbanji"
        placeholder="班级"
        class="input"
      ></el-input>
      <el-input
        v-model="postdata.inputxueke"
        placeholder="学科"
        class="input"
      ></el-input>
      <el-button type="primary" @click="hanleadd">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学科" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleMessage(scope.$index, scope.row)"
            >课程信息</el-button
          > -->
          <el-button
            size="mini"
            @click="handleStudents(scope.$index, scope.row)"
            >添加学生</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="messageVisible" width="30%">
      <span>课程信息</span>
      <span>{{ tableDataUpdata.message }}</span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="messageVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="studentVisible" width="30%">
      <span>学生信息</span>
      <div>
        <el-input
          v-model="studentData.name"
          placeholder="姓名"
          class="input"
        ></el-input>
        <el-input
          v-model="studentData.phone"
          placeholder="电话"
          class="input"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleStudentsAdd()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <el-input
        v-model="tableDataUpdata.time"
        placeholder="时间"
        class="input"
      ></el-input>
      <el-input
        v-model="tableDataUpdata.name"
        placeholder="班级"
        class="input"
      ></el-input>
      <el-input
        v-model="tableDataUpdata.address"
        placeholder="学科"
        class="input"
      ></el-input>
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
      tableData: "",
      studentData: {
        name: "",
        phone: "",
      },
      tableDataUpdata: "",
      dialogVisible: false,
      messageVisible: false,
      studentVisible: false,
      postdata: {
        inputtime: "",
        inputbanji: "",
        inputxueke: "",
      },
    };
  },
  methods: {
    handleStudents(row) {
      const token = window.localStorage.getItem("user-token");
      this.studentVisible = true;
      let Xid = this.tableData[row].id;
      let xueke = this.tableData[row].address;
      let banji = this.tableData[row].name;
      console.log(banji)
      this.studentData = {...this.studentData, Xid, xueke, banji, token}

    },
    handleStudentsAdd() {
      if (
        this.studentData.name &&
        this.studentData.phone 
      ) {
        this.$axios({
          url: "/yejishow/add",
          method: "post",
          data: this.studentData
        }).then((result) => {
          this.$message(result);
        });
      } else {
        this.$message("数据不能为空");
      }
      this.studentVisible = false
    },

    // handleMessage(index, row) {
    //   this.messageVisible = true;
    //   this.$axios({
    //     url: "/banjia/update/get",
    //     method: "post",
    //     data: { id: row.id },
    //   }).then((result) => {
    //     this.tableDataUpdata = result.data[0];
    //   });
    // },
    handleEdit(index, row) {
      this.dialogVisible = true;

      this.$axios({
        url: "/banjia/update/get",
        method: "post",
        data: { id: row.id },
      }).then((result) => {
        this.tableDataUpdata = result.data[0];
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$axios({
        url: "/banjia/update",
        method: "post",
        data: this.tableDataUpdata,
      }).then((result) => {
        this.$message(result);
        this.handleHuoqu();
      });
    },
    handleDelete(row) {
      this.$axios({
        url: "/banjia/delete",
        method: "post",
        data: { id: row.id },
      }).then((result) => {
        this.$message(result);
        this.handleHuoqu();
      });
    },
    hanleadd() {
      const token = window.localStorage.getItem("user-token");
      if (
        this.postdata.inputtime &&
        this.postdata.inputbanji &&
        this.postdata.inputxueke
      ) {
        this.$axios({
          url: "/banjia/add",
          method: "post",
          data: { ...this.postdata, token },
        }).then((result) => {
          this.$message(result);
          this.handleHuoqu();
        });
      } else {
        this.$message("数据不能为空");
      }
    },
    handleHuoqu() {
      const token = window.localStorage.getItem("user-token");
      this.$axios({
        url: "/banjichaxun",
        method: "get",
        params: { token: token },
      }).then((result) => {
        this.tableData = result.data;

      });
    },
  },
  mounted: function () {
    this.handleHuoqu();
  },
};
</script>

<style lang='less'>
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