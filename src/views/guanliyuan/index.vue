<template>
  <div v-loading="loading">
    <el-table
      :data="shenSuData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="banji" label="所属信息" width="180">
      </el-table-column>
      <el-table-column prop="yuanyin" label="原因"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleAgree(scope.row)"
            >同意</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >驳回</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div v-if="ishow">
        <span>申诉原因:{{this.pandingData.yuanyin}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quanxian: 0,
      loading: false,
      shenSuData: {
        name: "",
        id: "",
        banji: "",
        yuanyin: "",
        Xid: "",
        Yid: "",
        sstoken: ""
      },
      pandingData: {
          name: "",
          yuanyin: "",
          sstoken: ""
      },
      ishow: false
    };
  },
  methods: {
    handleAgree(row) {
        let sstoken =""
        for(var i = 0; i<this.shenSuData.length; i++) {
            if(row.id == this.shenSuData[i].id){
                sstoken = this.shenSuData[i].sstoken;
                break;
            }
        }
      this.$axios({
        url: "/yeji/agree",
        method: "post",
        data: {id: row.id, sstoken}
      }).then((result) => {
          this.$message(result)
          this.handleHuoqu();

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
        if (this.quanxian == 1) {
          this.loading = false;
        } else {
          this.$message("无权查看");
        }
      });
    },
    handleHuoqu() {
      this.$axios({
        url: "/yejishengfu/get",
        method: "get",
      }).then((result) => {
        this.shenSuData = result.data;
      });
    },
  },
  created() {
    this.getUserInfo();
    this.handleHuoqu();
  },
};
</script>

<style lang="less">
</style>>
