<template>
  <div class="find">
    <div>
      <el-input
        class="findinput"
        v-model="input"
        placeholder="请输入查询人姓名"
      ></el-input>
      <el-button type="primary" @click="hanlefind">查询</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买课程" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.value }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <el-button size="mini" @click="handleisopne">发起申诉</el-button>
        <el-button size="mini" type="danger" @click="openjilu = true"
          >申诉记录</el-button
        >
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="open"
      width="50%"
      :before-close="handleClose"
    >
      <span>申诉原因</span>
      <el-input
        class="text"
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="100"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="open = false">取 消</el-button>
        <el-button type="primary" @click="handleopen">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="openjilu"
      width="50%"
      :before-close="handleClose"
    >
      <span>申诉记录</span>
      <span>{{ textareajilu }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openjilu = false">取 消</el-button>
        <el-button type="primary" @click="openjilu = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      textarea: "",
      tableData: "",
      open: false,
      openjilu: false,
      textareajilu: "",
      user: {
        Yid: void 0
      }
    };
  },
  methods: {
    hanlefind() {
      this.$axios({
        url: "/yijifind/find",
        method: "post",
        data: { name: this.input },
      }).then((result) => {
        if (result.data.length > 0) {
          this.tableData = result.data;
        } else {
          this.$message("用户不存在");
        }
      });
    },
    handleisopne() {
      if (this.tableData[0].shensu == 0) {
        this.open = true;
      } else {
        this.$message("请勿重复申诉");
      }
    },
    handleopen() {
      this.open = false;
      this.tableData[0].yuanyin = this.textarea;
      const sstoken = window.localStorage.getItem("user-token");
      this.$axios({
        url: "/yijifind/shensu",
        method: "post",
        data: {
          ...this.tableData,
          sstoken
        },
      }).then((result) => {
        this.hanlefind();
        this.$message(result.message);
      });
    },
    getUserInfo() {
      const token = window.localStorage.getItem("user-token");
      this.$axios({
        url: "/user/profile",
        method: "get",
        params: { token },
      }).then((result) => {
        this.user = result.data;
      });
    },
  },
  created() {
    // this.getUserInfo()
  }
};
</script>

<style lang="less">
.find {
  text-align: left;
}
.findinput {
  width: 200px;
  margin-right: 24px;
}
.text {
  height: 100px;
}
</style>>
