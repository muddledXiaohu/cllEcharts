// 弹框新建主账号
<template>
  <div>
    <a-spin tip="下载中..." :spinning="uSpinning">
      <a-modal
        :visible="masterAccountVisible"
        :title="'批量导入' + uname"
        ok-text="开始导入"
        cancel-text="取消"
        :confirm-loading="confirmLoading"
        :maskClosable="false"
        :width="'60%'"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <a-steps :current="currents" class="aSteps">
          <a-step title="上传文档" />
          <a-step title="导入数据" />
          <a-step title="完成" />
        </a-steps>
        <div>
          <h4>请按照数据模板的格式准备要导入的数据</h4>
          <a-button
            class="download"
            type="link"
            icon="download"
            @click="downloadTrial"
          >
            下载数据模板
          </a-button>
        </div>
        <div>
          <h4>请选择需要导入的xlsx，xls文件</h4>
            <a-upload
              :file-list="fileList"
              :remove="handleRemove"
              :before-upload="beforeUpload"
            >
              <a-button> <a-icon type="upload" /> 上传文件 </a-button>
            </a-upload>
        </div>
      </a-modal>
    </a-spin>
  </div>
</template>
<script>
import { downloadXls, importFile } from "@/api/file";
export default {
  data() {
    return {
      confirmLoading: false,
      currents: 1,
      uSpinning: false,
      fileList: [],
    };
  },
  props: {
    masterAccountVisible: {
      type: Boolean,
    },
    uname: {
      type: String,
    },
    downloadXlsType: {
      type: String,
    },
  },
  created() {},
  methods: {
    // 下载示例
    async downloadTrial() {
      this.uSpinning = true;
      await downloadXls(this.downloadXlsType)
        .then((res) => {
          if (!res) {
            return;
          }
          let blob = new Blob([res], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
          });
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          // 文件名
          a.download = res.type;
          a.click();
          // 释放url
          window.URL.revokeObjectURL(url);
          this.uSpinning = false;
        })
        .catch((err) => {
          console.log(err);
          this.uSpinning = false;
        });
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    beforeUpload(file) {
      if (this.fileList.length != 0) {
        this.$message.warning("一个版本只能上传一个文件")
        return;
      }
      console.log(file);
      this.fileList = [...this.fileList, file];
      return false;
    },
    
    handleCancel() {
      this.$emit("fileCancel", false, false);
      console.log(1);
    },
    async handleOk() {
      const { fileList } = this;
      if (fileList.length == 0) {
        this.$message.warning("请上传文件！");
        return
      }
      const formData = new FormData();
      fileList.forEach((file) => {
        formData.append("file", file);
      });
      formData.append("type", this.downloadXlsType);
      await importFile(formData).then(res => {
        console.log(res);
        this.fileList = [];
        this.currents = 1
        if (res.data == '上传失败') {
          this.$message.error(res.data);
          this.$emit("fileCancel", false, true);
          return
        }
        this.$message.success(res.data)
        this.$emit("fileCancel", false, true);
      }).catch(() => {
          this.$message.error("upload failed.");
        })
    },
  },
};
</script>
<style lang="less" scoped>
.aSteps {
  width: 50%;
  padding-bottom: 20px;
}
</style>