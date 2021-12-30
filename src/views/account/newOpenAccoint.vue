<template>
    <a-modal
      :visible="openAccoint"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      :maskClosable="false"
      :centered="true"
      :closable="false"
      :width="size ? '100%' : '80%'"
      :height="size ? '100%' : '80%'"
    >
      <div class="popUpHeader">
        <h2>新建开户申请（新）</h2>
        <a-button type="link" @click="switchSize">
          <a-icon class="fullscreen" :type="size ? 'fullscreen-exit' : 'fullscreen'" />
          </a-button>
      </div>
      <div class="contents">
        <p>1123123123</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1</p>
        <p>1123123</p>
      </div>
    </a-modal>
</template>

<script>
export default {
  data() {
    return {
      confirmLoading: false,
      size: false
    };
  },
  props: {
    openAccoint: {
      type: Boolean
    }
  },
    methods: {
    handleOk() {
      this.confirmLoading = true;
      setTimeout(() => {
      this.openAccoint = false;
        this.confirmLoading = false;
      }, 2000);
    },
    handleCancel() {
      this.$emit('newlyBuildCancel', false) // 传函数给父组件
    },
    // 放大缩小
    switchSize () {
      this.size = !this.size
    }
  },

}
</script>

<style lang="less" scoped>
.popUpHeader {
  margin-top: -13px;
  display: flex;
  justify-content: space-between;
  .fullscreen {
    font-size: 26px;
  }
}
/deep/.ant-modal-close-x {
  font-size: 26px;
}
/deep/.ant-modal {
  padding-bottom: 0;
}
/deep/ .ant-modal-content {
  height: 100%;
}
/deep/.ant-modal-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
}
/deep/.ant-modal-body {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.contents {
    overflow: auto;
    height: 87%;
}
    ::-webkit-scrollbar-track {
      /*滚动条里面轨道背景*/
      // border-radius: 5px;
      background: #fff;
    }
</style>