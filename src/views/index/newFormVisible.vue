<template>
  <div class="newFormVisible">
    <div class="headBtn">
      <a-button @click="toReturn">返回</a-button>
      <a-button type="primary" @click="newlyNoonPaper">创建午报数据</a-button>
      <a-upload
        :file-list="fileList"
        :remove="handleRemove"
        :before-upload="beforeUpload"
        @change="uploadChange"
      >
        <a-button>
          <a-icon type="upload" />
          上传午报数据
        </a-button>
      </a-upload>
    </div>
    <div class="formTb">
      <div class="parameter">
        <div class="content">
          <p>船舶({{shipInformation.name}})</p>
        </div>
        <div class="content">
          <p>IMO：{{shipInformation.IMO}}</p>
        </div>
      </div>
      <!-- <div class="parameter">
        <div
          class="content"
          v-for="(item, index) in shipParameterArr"
          :key="index"
        >
          <h4>{{ item.label }}：</h4>
          <p>{{ item.value }}</p>
        </div>
      </div>
      <h3>午报table</h3> -->
      <MyTable
        class="sailingTable"
        :columns="digitalFormcolumns"
        :data="data"
        :pagination="pagination"
        @tbhandleTableIMO="tbhandleTableIMO"
      />
    </div>
    <a-modal
      :visible="formVisible"
      title="午报数据"
      ok-text="提交"
      cancel-text="取消"
      :confirm-loading="false"
      :maskClosable="false"
      :width="'60%'"
      @ok="handleSubmitFnc"
      @cancel="handleCancel"
    >
      <a-form-model
        :model="handleSubmitForm"
        @submit="handleSubmitFnc"
        ref="ruleForm"
        labelAlign="right"
        layout="horizontal"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 14 }"
      >
      <a-row>
        <a-col :span="8">
            <a-form-model-item label="IMO" prop="IMO">
              <span class="parameter"
                >{{ handleSubmitForm.IMO }}</span
              >
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="上次报告">
              <span class="parameter"
                >{{ handleSubmitForm.Time_Since_Previous_Report }}小时</span
              >
            </a-form-model-item>
          </a-col>
      </a-row>
        <a-row>
          <a-col :span="8">
            <a-form-model-item label="日期">
              <a-date-picker
                style="width: 100%"
                placeholder="日期"
                format="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                v-model="handleSubmitForm.Date_UTC"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Voyage_From" prop="Voyage_From">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.Voyage_From"
                placeholder="请输入Voyage_From"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Voyage_To" prop="Voyage_To">
              <a-input
                :maxLength="20"
                v-model="handleSubmitForm.Voyage_To"
                placeholder="请输入Voyage_To"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Latitude_North_South">
              <a-select
                placeholder="请选择Latitude_North_South"
                v-model="handleSubmitForm.Latitude_North_South"
              >
                <a-select-option value="South">South</a-select-option>
                <a-select-option value="North">North</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Latitude_Degree">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入Latitude_Degree"
                v-model="handleSubmitForm.Latitude_Degree"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Latitude_Minutes">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入Latitude_Minutes"
                v-model="handleSubmitForm.Latitude_Minutes"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Latitude_North_South">
              <a-select
                placeholder="请选择Longitude_East_West"
                v-model="handleSubmitForm.Longitude_East_West"
              >
                <a-select-option value="East">East</a-select-option>
                <a-select-option value="West">West</a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Longitude_Degree">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入Longitude_Degree"
                v-model="handleSubmitForm.Longitude_Degree"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="Longitude_Minutes">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入Longitude_Minutes"
                v-model="handleSubmitForm.Longitude_Minutes"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="请选择航船状态">
              <a-select
                placeholder="请选择"
                v-model="handleSubmitForm.Event"
              >
                <a-select-option value="DEPATURE">出发</a-select-option>
                <a-select-option value="NOON">行驶中</a-select-option>
                <a-select-option value="ARRIVAL">到达</a-select-option>
                <a-select-option value="OTHER">其他</a-select-option>
                <!-- OTHER -->
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="停靠时间">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入停靠时间"
                v-model="handleSubmitForm.Time_Elapsed_Anchoring"
              />
            </a-form-model-item>
          </a-col>
          <!-- Distance -->
          <a-col :span="8">
            <a-form-model-item label="行驶距离">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入行驶距离"
                v-model="handleSubmitForm.Distance"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="货物装载重量">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入货物装载重量"
                v-model="handleSubmitForm.Cargo_Mt"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="HFO消耗">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入HFO消耗"
                v-model="handleSubmitForm.ME_Consumption_HFO"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="MGO消耗">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入MGO消耗"
                v-model="handleSubmitForm.ME_Consumption_MGO"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="HFO剩余">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入HFO剩余"
                v-model="handleSubmitForm.HFO_ROB"
              />
            </a-form-model-item>
          </a-col>
          <a-col :span="8">
            <a-form-model-item label="MGO剩余">
              <a-input-number
                style="width: 100%"
                :min="0"
                placeholder="请输入MGO剩余"
                v-model="handleSubmitForm.MGO_ROB"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import MyTable from "@/components/table/table.jsx";
import {
    createAim,
    pagingShipping,
    analysisExcel,
    cllNewretownModify,
    // aimYester,
    aimQueryPaging,
} from "@/api/indicators";
import {  digitalFormcolumns } from "./components/data";
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      digitalFormcolumns,
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
      },
      vModelData: [],
      shipParameterArr: [],
      shipInformation: {},
      handleSubmitForm: {
        IMO:'',
        Time_Since_Previous_Report: 0,
      },
      data: [],
      // 分页
      pageParam: {
        pagenum: 1,
        pagesize: 10,
      },
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: (total) => `共 ${total} 条`,
        showQuickJumper: true,
        onShowSizeChange: (current, pageSize) => {
          this.switchpage(current, pageSize);
        }, // 改变每页数量时更新显示
        onChange: (page, pageSize) => {
          this.switchpage(page, pageSize);
        }, //点击页码事件
      },
      // 上传
      fileList: [],
      formVisible: false,
    };
  },
  created() {
    if (this.$route.query) {
      this.init(this.$route.query.id);
    }
  },
  methods: {
    async init(id) {
      let arr = await pagingShipping({ query: id });
      this.shipInformation = arr[0] || {};
      // this.shipParameterArr = shipParameter(this.shipInformation);
      this.handleSubmitForm.IMO = this.shipInformation.IMO
      this.pageParam.shippingId = this.shipInformation.id
      this.aimQueryPages()
    //   if (res.data.Date_UTC&&res.data.Time_UTC) {
    //     console.log(res.data);
    //   } else {
    //     this.handleSubmitForm.Time_Since_Previous_Report=24
    //   }

    },
    async aimQueryPages() {
      let res = await aimQueryPaging(this.pageParam);
      this.pagination.total = res.totalpage
          this.pagination.pageSize = res.pagesize
      this.pagination.current = res.pagenum
      this.data = res.data
    },
    toReturn() {
      this.$router.push({ path: "/index/digitalForm" });
    },

    // 分页事件
    async switchpage(current, pageSize) {
      this.pageParam.pagenum = current;
      this.pageParam.pagesize = pageSize;
      this.aimQueryPages()
    },

    // 新增午报数据
    async newlyNoonPaper() {
      this.formVisible = true;
    },

    async handleSubmitFnc() {
      const date = new Date()
      const hour = date.getHours() // 获取小时
      const minute = date.getMinutes() // 获取分钟
        this.handleSubmitForm.shippingId=this.shipInformation.id||''
        this.handleSubmitForm.Time_UTC =  `${hour}:${minute}`
        if (this.handleSubmitForm.id) {
          await cllNewretownModify(this.handleSubmitForm).then(() => {
            this.$message.success("修改成功!");
            this.aimQueryPages()
            this.formVisible = false;
          });
        } else {
          await createAim(this.handleSubmitForm).then(() => {
            this.$message.success("创建成功!");
            this.aimQueryPages()
            this.formVisible = false;
          });
        }
    },
    handleCancel() {
      this.handleSubmitForm= {
        IMO:'',
        Time_Since_Previous_Report: 0,
      }
      this.formVisible = false;
    },

    /**
     *
     * @description: 上传组件删除
     */
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    /**
     *
     * @description: 上传
     */
    beforeUpload(file) {
      if (this.fileList.length != 0) {
        this.$message.warning("一个版本只能上传一个文件");
        return;
      }
      this.fileList = [...this.fileList, file];
      return false;
    },
    async uploadChange() {
      const formData = new FormData();
      this.fileList.forEach((file) => {
        formData.append("file", file);
      });
        formData.append("type", this.pageParam.shippingId);
      await analysisExcel(formData).then(() => {
        this.$message.success("上传成功!");
        this.init(this.$route.query.id);
        this.fileList = [];
      });
    },
    tbhandleTableIMO(e) {
      this.handleSubmitForm=e
      this.formVisible = true;
    },
    // 获取当前开始时间
    currentStartTime() {
      if (this.sendDateStartTime) {
        return this.sendDateStartTime;
      }
      let curDate = new Date();
      let nowDate = new Date(curDate.getTime()); //前一天
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1;
      let day = nowDate.getDate();
      if (month < 10) month = "0" + month;
      if (day < 10) day = "0" + day;
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        ` ${nowDate.getHours()}:${nowDate.getMinutes()}`
      );
    },
  },
};
</script>

<style lang="less" scoped>
.newFormVisible {
  .headBtn {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-top: 20px;
    padding-right: 20px;
    border-radius: 10px;
    .ant-btn {
      margin-left: 10px;
    }
  }
  .formTb {
    margin: 20px;
    padding: 20px;
    padding-left: 40px;
    border-radius: 10px;
    background-color: #fff;
    h3 {
      margin: 10px;
    }
    .parameter {
      font-size: 14px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      .content {
        height: 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
        background: hsla(0, 0%, 100%, 0.39);
        -webkit-box-shadow: 0 0 14px #d2d5df;
        box-shadow: 0 0 14px #d2d5df;
        border-radius: 8px;
        margin: 10px;
        padding: 0 10px;
        h4 {
          line-height: 40px;
        }
        p {
          color: rgb(123, 123, 123);
          line-height: 40px;
        }
      }
    }
  }
}
</style>
