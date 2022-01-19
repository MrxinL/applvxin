<template>
<div class="">
    <el-button type="primary" @click="tab">添加</el-button>
    <div v-show="show">2222222</div>

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


