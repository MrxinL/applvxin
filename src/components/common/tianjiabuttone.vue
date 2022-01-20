<template>
<div class="">
    <el-button type="primary" @click="tab">添加</el-button>
    <div v-show="show">
        时间<input type="text">
        班级名字<input type="text">
        科目<input type="text">
    </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      time: '',
      name: '',
      kecheng: '',
      show: false
    }
  },
  methods: {
    tab() {
      this.show = true
    }

  }
};
</script>

<style lang="less">

</style>


