<template>
  <div v-loading="loading">
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      :model="formLabelAlign"
      class="fromSh"
    >
      <el-form-item label="名称">
        <el-input v-model="formLabelAlign.name" class="putIn"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="formLabelAlign.mobile" class="putIn"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input placeholder="教师" class="putIn" disabled="true"></el-input>
      </el-form-item>
      <el-button type="primary" class="onbuttone" @click="handleAdduser()"
        >提交</el-button
      >
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        mobile: "",
        quanxian: 0,
      },
      quanxian: 0,
      loading: false,
      id: void 0,
      tableData: {
        name: "",
        mobile: "",
      },
    };
  },
  methods: {
    handleDelete(row) {
      this.$axios({
        url: "/user/deletejiaoshi",
        method: "post",
        data: { id: row.id },
      }).then((result) => {
        this.$message(result);
        this.handleGetJuese();
      });
    },
    getUserInfo() {
      this.loading = true;
      const token = window.localStorage.getItem("user-token");
      this.$axios({
        url: "/user/profile",
        method: "get",
        params: { token: token },
      }).then((result) => {
        this.quanxian = result.data.quanxian;
        this.id = result.data.id;
        if (this.quanxian == 1) {
          this.loading = false;
        } else {
          this.$message("无权查看");
        }
      });
    },
    handleAdduser() {
      const date = +new Date();
      const token = "ey9.mLitrKsn4E4KdtC8jU" + date;
      this.$axios({
        url: "/registers",
        method: "post",
        data: { ...this.formLabelAlign, token: token },
      }).then((result) => {
        this.$message(result);
      });
    this.handleGetJuese();
    },
    handleGetJuese() {
      this.$axios({
        url: "/user/ALL",
        method: "get",
      }).then((result) => {
        this.tableData = result.data;
      });
    },
  },

  created() {
    this.getUserInfo();
    this.handleGetJuese();
  },
};
</script>

<style lang="less">
.putIn {
  width: 200px;
}
.fromSh {
  display: flex;
}
.onbuttone {
  margin-left: 40px;
  height: 40px;
}
</style>>
