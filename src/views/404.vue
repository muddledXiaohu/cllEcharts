<template>
  <div class="exception">
    <img class="exception" src="@/assets/exception404.png" alt="">
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  components: {
  },
  created() {
  },
  methods: {}
};
</script>
<style lang="less" scoped>
// /deep/.ant-col {
//   padding-top: 30px;
// }
.exception {
  background-color: #fff;
  width: 98%;
  border-radius: 10px;
  margin-left: 50%;
    margin-top: 20px;
  transform: translateX(-50%);

  img {
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 5%;
    width: 35%;
  }
}
</style>
<style lang="less">
.MyTable {
    width: 98%;
    margin: 20px auto;
    // background-color: #fff; */
    padding-bottom: 48px;
  .ant-collapse-header {
    color: rgb(49, 155, 226) !important;
  }
  // .ant-table-content{
  //   .ant-table-scroll{
  //     .ant-table-placeholder{
  //       padding: 0 !important;
  //       border-top: none !important;
  //     }
  //   }
  // }
  .ant-table-content > .ant-table-scroll > .ant-table-body {
    overflow-x: auto !important;
  }
}
</style>