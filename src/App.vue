<template>
  <div id="app">
        <router-view />
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="less" >

    ::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 10px;
      height: 10px;
    }
   
    ::-webkit-scrollbar-thumb {
      /*滚动条里面的滑块*/
      border-radius: 5px;
      background: #eeeeee;
    }
   
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道背景*/
      // border-radius: 5px;
      background: #cdcdcd;
    }
</style>
