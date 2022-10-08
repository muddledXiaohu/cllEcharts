<template>
  <div class="digitalForm">
    <a-card
      style="width: 100%"
      class="digitalFormCard"
      :tab-list="tabList"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key)"
    >
      <div>
        <div class="popUpHeader">
          <!-- <h2>{{$t('user.login.tab-login-credentials')}}</h2> -->
          <a-select
            style="width: 120px"
            placeholder="请选择船舶"
            v-model="shopId"
            show-search
            allowClear
            :filter-option="filterOption"
            @search="accountIdSearch"
            @select="customerIdSelect"
          >
            <a-select-option
              v-for="(it, id) in cllOptions"
              :key="id"
              :value="it.value"
            >
              {{ it.label }}
            </a-select-option>
          </a-select>
          <a-button type="primary" @click="createShip">创建船舶</a-button>
        </div>
        <div class="contents">
          <a-tabs
            :activeKey="tabActiveKey"
            tab-position="left"
            @change="switchTabs"
            v-if="voyageNb.length != 0 && tabActiveKey != 0"
          >
            <a-tab-pane v-for="it in voyageNb" :key="it.id" :tab="it.imo">
              <div class="explain">
                <a-descriptions :column="3" class="adescriptions">
                  <a-descriptions-item label="船名">{{
                    it.shopName
                  }}</a-descriptions-item>
                  <a-descriptions-item label="总里程">{{
                    it.mileageTotal
                  }}</a-descriptions-item>
                  <a-descriptions-item label="出发港">{{
                    it.setPort
                  }}</a-descriptions-item>
                  <a-descriptions-item label="航次号">{{
                    it.imo
                  }}</a-descriptions-item>
                  <a-descriptions-item label="剩余里程">{{
                    it.mileageRemaining
                  }}</a-descriptions-item>
                  <a-descriptions-item label="出港时间">{{
                    it.beginTime
                  }}</a-descriptions-item>
                </a-descriptions>
                <div class="arrow">
                  <a-icon class="icon" type="arrow-right" />
                </div>
                <a-descriptions :column="1" class="descriptions">
                  <a-descriptions-item label="终到港">{{
                    it.endPort
                  }}</a-descriptions-item>
                  <a-descriptions-item label="到港时间">{{
                    it.endTime
                  }}</a-descriptions-item>
                </a-descriptions>
              </div>
              <div style="
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: flex-end;">
                <a-button type="primary" @click="createShip">新增午报数据</a-button>  
              </div>
              <MyTable
                class="MyTable"
                :columns="columns"
                :data="data"
                :pagination="pagination"
              />
            </a-tab-pane>
          </a-tabs>
          <a-empty v-else />
          <a-form
            :form="handleSubmitForm"
            @submit="handleSubmit"
            ref="ruleForm"
            labelAlign="right"
            layout="horizontal"
            v-bind="formItemLayout"
            :label-col="{ span: 4 }" :wrapper-col="{ span: 12 }"
          >
          <a-row>
            <a-col :span="12">
              <a-form-item  label="请选择船次号">
                <a-select
                  placeholder="请选择"
                  @change="changeshipsId"
                  v-decorator="[
                    'details[' + idx + '].shipsId',
                    {
                      rules: [
                        {
                          type: 'number',
                          required: true,
                          message: '请选择航次号！',
                          trigger: 'change',
                        },
                      ],
                    },
                  ]"
                >
                  <a-select-option
                    v-for="(it, id) in joinProtocolSelect"
                    :key="id"
                    :value="it.id"
                  >
                    {{ it.imo }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
            </a-col>
            <a-col :span="12">
              <a-form-item  label="当日里程">
                <a-input-number
                  style="width: 100%;"
                  placeholder="当日里程(mile)"
                  :maxLength="4"
                  :step="0.1"
                  v-decorator="[
                    'details[' + idx + '].mileageDay',
                    {
                      rules: [
                        {
                          type: 'number',
                          required: true,
                          message: '请输入当日里程(mile)！',
                          trigger: 'blur',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item  label="当日油耗">
                <a-input-number
                  style="width: 100%;"
                  placeholder="当日燃油消耗(ton)"
                  :maxLength="4"
                  :step="0.1"
                  v-decorator="[
                    'details[' + idx + '].oilConsumption',
                    {
                      rules: [
                        {
                          type: 'number',
                          required: true,
                          message: '请输入当日燃油消耗(ton)！',
                          trigger: 'blur',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item  label="日期">
                <a-date-picker
                  style="width: 100%;"
                  placeholder="开始日期"
                  format="YYYY-MM-DD"
                  valueFormat="YYYY-MM-DD"
                  disabled
                  v-decorator="[
                    'details[' + idx + '].sameTime',
                    {
                      initialValue: currentStartTime(),
                      rules: [
                        {
                          required: true,
                          message: '请选择日期！',
                          trigger: 'change',
                        },
                      ],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          </a-form>
        </div>
        <div class="operation">
          <a-button size="large" type="primary" @click="handleSubmit"
            >提交</a-button
          >
        </div>
      </div>
    </a-card>
    <!-- 创建航次号 -->
    <ShipSailing
      :shipNodisplay="shipNodisplay"
      @closeFrame="closeFrame"
      @shipCancel="shipCancel"
      :shipInformation="shipInformation"
    />
    <!-- 创建船舶 -->
    <ShipCreate
      :shipdisplay="shipdisplay"
      @closeFrame="closeShipCreate"
      @shipCancel="shipCreates"
    />
  </div>
</template>

<script>
import MyTable from "@/components/table/table.jsx";
import ShipSailing from "./components/shipSailing.vue";
import ShipCreate from "./components/shipCreate.vue";

// 接口
import {
  // createCllNewretown,
  cllNewretown,
  cllNewretownYesterday,
  cllNewretownModify,
  cllNewretownUploaded,
  createShipNo,
  pagingShipNo,
  createShipping,
  pagingShipping,
  cllNewretownLast,
} from "@/api/indicators";
import moment from "moment";
const columns = [
  {
    title: "日期",
    dataIndex: "sameTime",
  },
  {
    title: "航次号",
    dataIndex: "shipName",
  },
  {
    title: "经度",
    dataIndex: "jd",
  },
  {
    title: "时区",
    dataIndex: "sq",
  },
  {
    title: "装载状态",
    dataIndex: "zzzt",
  },
  {
    title: "平均航速",
    dataIndex: "pjhs",
  },
  {
    title: "当日航程",
    dataIndex: "mileageDay",
  },
  {
    title: "当日油耗",
    dataIndex: "oilConsumption",
  },
  {
    title: "航次总航程",
    dataIndex: "odometer",
  },
  {
    title: "航次总油耗",
    dataIndex: "tFC",
  },
];
export default {
  name: "digitalForm",
  components: {
    MyTable,
    ShipSailing,
    ShipCreate,
  },
  data() {
    return {
      columns,
      tabList: [
        {
          key: "tab1",
          tab: "Noon Report Data",
        },
        {
          key: "tab2",
          tab: "Schedule",
        },
        {
          key: "tab3",
          tab: "Events",
        },
        {
          key: "tab4",
          tab: "Officers",
        },
        {
          key: "tab5",
          tab: "Reports",
        },
      ],
      data: [],
      // 分页
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
      voyageNb: [],
      tabActiveKey: 0,
      noTitleKey: "tab1",
      customStyle:
        "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden",

      confirmLoading: false,
      handleSubmitForm: this.$form.createForm(this, { name: "newOpenAccoint" }),
      ValidateRules: {},
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
      },
      accountDetailed: [1],
      joinProtocolSelect: [
        {
          value: 0,
          name: "1",
        },
      ],
      modifyId: 0,
      pageParam: {
        pagenum: 1,
        pagesize: 10,
      },
      // 航次号组建显示隐藏
      shipNodisplay: false,
      shipName: "",
      // 船舶arr
      cllOptions: [],
      // 搜索节流阀
      canSearch: null,
      // 船舶组建显示隐藏
      shipdisplay: false,
      shopId: 0,
      // 选中船舶信息
      shipInformation: {},
      // 选中船次号
      selectedNb: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    moment,
    async init() {
      // joinProtocolSelect
      let arrs = await pagingShipping({ query: "" });
      this.cllOptions = [];
      arrs = arrs || [];
      this.shopId = arrs[0]?.id;
      this.shipInformation = arrs[0];
      this.cllOptions = arrs.map((item) => {
        let array = {};
        array.value = item.id;
        array.label = item.username;
        return array;
      });
      this.voyageNbs();
    },
    changeshipsId(e) {
      if (e === 1061601) {
        this.createShipNos();
        return;
      }
      this.joinProtocolSelect.forEach((item) => {
        if (item.id == e) {
          this.shipName = item.imo;
          this.selectedNb = item;
        }
      });
    },
    // 航次查询
    async voyageNbs() {
      let arr = await pagingShipNo({ query: this.shopId });
      this.voyageNb = arr || [];
      this.joinProtocolSelect = JSON.parse(JSON.stringify(arr));
      this.joinProtocolSelect.push({
        id: 1061601,
        imo: "新航次",
      });
      this.tabActiveKey = arr[0]?.id || 0;
      this.initData();
    },
    // 查询航行数据
    async initData() {
      this.pageParam.query = this.tabActiveKey;
      let arr = await cllNewretownUploaded(this.pageParam);
      this.data = arr.data;
      this.pagination.total = arr.totalpage;
      this.pagination.pageSize = arr.pagesize;
      this.pagination.current = arr.pagenum;
    },
    onTabChange(key) {
      this["noTitleKey"] = key;
      console.log(key);
    },
    async handleSubmit() {
      let beforeArr = {};
      this.handleSubmitForm.validateFields((err, values) => {
        if (!err) {
          let array = { ...values };
          let arr = {};
          arr = array.details[0];
          beforeArr.shipName = this.shipName;
          beforeArr.mileageDay = arr.mileageDay;
          beforeArr.oilConsumption = arr.oilConsumption;
          beforeArr.sameTime = arr.sameTime;
          beforeArr.shipsId = arr.shipsId;
          // shipsId
          this.secondaryData(beforeArr);
        }
      });
    },
    /**
     * 处理数据上传
     */
    async secondaryData(beforeArr) {
      let res = await cllNewretown({
        sameTime: beforeArr.sameTime,
        shipsId: beforeArr.shipsId,
      });
      let ok = true;
      const that = this;
      if (JSON.stringify(res.data) !== "{}") {
        ok = false;
        this.$confirm({
          title: "当日已上传数据！",
          content: "是否重新上传数据覆盖？",
          async onOk() {
            let resYesterday = await cllNewretownYesterday();
            const odometer = resYesterday.data.odometer || 0;
            const tFC = resYesterday.data.tFC || 0;
            beforeArr.odometer = beforeArr.mileageDay + odometer;
            beforeArr.tFC = beforeArr.oilConsumption + tFC;
            await cllNewretownModify(beforeArr, beforeArr.sameTime).then(
              (res) => {
                console.log(res);
                that.$message.success("修改成功!");
                this.init();
              }
            );
          },
        });
      }
      if (ok) {
        let ress = await cllNewretownLast({ shipsId: beforeArr.shipsId });
        const odometer = ress.data.odometer || 0;
        const tFC = ress.data.tFC || 0;
        beforeArr.odometer = beforeArr.mileageDay + odometer;
        beforeArr.tFC = beforeArr.oilConsumption + tFC;
        console.log(beforeArr);
        // await createCllNewretown(beforeArr)
        //   .then((resI) => {
        //     console.log(resI);
        //     that.$message.success('创建成功!')
        //         this.init()
        // })
      }
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
      return year + "-" + month + "-" + day;
    },
    pickerChange(e) {
      console.log(e.format("YYYY-MM-DD"));
    },
    async modifyCustomer(e) {
      console.log(e);
    },
    // 分页事件
    async switchpage(current, pageSize) {
      console.log(current, pageSize);
      // this.listArr.current = current;
      // this.listArr.size = pageSize;
    },
    /**
     * 切换tab
     */
    switchTabs(e) {
      this.tabActiveKey = e;
      this.initData();
    },
    /**
     *
     * @description: 打开创建航次号
     */
    createShipNos() {
      this.shipNodisplay = true;
    },
    // 关闭弹框
    closeFrame() {
      console.log(this.handleSubmitForm);
      this.shipNodisplay = false;
      this.handleSubmitForm.resetFields([`details[0].shipsId`]);
    },
    /**
     *
     * @description: 创建航次号
     */
    async shipCancel(e) {
      let arr = e;
      console.log(this.selectedNb);
      arr.beginTime = moment(arr.beginTime).format("YYYY-MM-DD");
      arr.endTime = moment(arr.endTime).format("YYYY-MM-DD");
      arr.shopName = this.shipInformation.username;
      arr.shopId = this.shipInformation.id;
      arr.mileageTotal = 44553;
      arr.mileageRemaining = 44553;
      let res = await createShipNo(arr);
      console.log(res);
      if (res.start !== 200) return this.$message.error("错误");
      this.$message.success("航次号创建成功!");
      this.handleSubmitForm.resetFields([`details[0].shipsId`]);
      this.init();
    },
    /**
     *
     * @description: 打开创建船舶
     */
    createShip() {
      this.shipdisplay = true;
    },
    // 关闭船舶新建
    closeShipCreate() {
      this.shipdisplay = false;
    },
    /**
     *
     * @description: 创建船舶
     */
    async shipCreates(item) {
      let res = await createShipping(item);
      if (res.start !== 200) return this.$message.error("船舶创建错误!");
      this.$message.success("船舶创建成功!");
      this.init();
    },
    /**
     *
     * @description: 船舶搜索功能
     */
    async accountIdSearch(e) {
      if (this.canSearch) {
        clearTimeout(this.canSearch);
      }
      if (e) {
        this.canSearch = setTimeout(async () => {
          // masterAccount
          let arr = {
            username: e,
          };
          console.log(arr);
        }, 800);
      }
    },
    /**
     *
     * @description: 船舶选择事件
     */
    customerIdSelect(e) {
      this.shopId = e;
      this.voyageNbs();
    },
    // 搜索功能
    filterOption(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) > -1;
    },
  },
};
</script>
<style lang="less" scoped>
.MyTable {
  width: 100%;
  margin: 0 auto;
  margin-top: -20px;
  // background-color: #fff;
  .ant-collapse-header {
    color: rgb(49, 155, 226) !important;
  }
  .ant-table-content > .ant-table-scroll > .ant-table-body {
    overflow-x: auto !important;
  }
}
.digitalForm {
  width: 98%;
  margin: 20px auto;
}
.custom-tree {
  display: flex;
}
.digitalFormCard {
  border: 0;
  border-radius: 10px;
}
.popUpHeader {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-left: 120px;
  /deep/.ant-btn {
    margin-left: 8px;
  }
  .fullscreen {
    font-size: 26px;
    margin-right: 20px;
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
  padding-bottom: 55px;
  background-color: #f0f2f5;
}
.contents {
  overflow-x: hidden;
  overflow-y: visible;
  height: 89%;
}
.accountDetailed {
  // background-color: #f7f7f7;
  padding: 10px;
  border-radius: 6px;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道背景*/
  // border-radius: 5px;
  background: #fff;
}
/deep/.ant-form-item {
  margin: 3px;
}
.upload {
  margin-top: -8px;
}
.xhTable {
  width: 100%;
  border: 1px solid rgb(228, 228, 228);
  background-color: #fafafa;
  margin-bottom: 30px;
  tr {
    text-align: center;
  }
  // thead {
  .xhHeader {
    th span {
      color: rgb(243, 18, 18);
    }
  }
  // }
  tbody {
    background-color: #fff;
  }
  .xhBody th {
    padding-top: 20px;
  }
}
/deep/.xhBody .ant-form-item-control-wrapper {
  width: 100%;
}
.operation {
  margin: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  button {
    margin-left: 30px;
    padding: 0 30px;
  }
}
.explain {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 50px;
  .adescriptions {
    width: 70%;
  }
  .arrow {
    width: 200px;
    height: 20px;
    // margin-right: 70px;
    margin-top: -40px;
    .icon {
      font-size: 50px;
      color: rgb(10, 33, 164);
    }
  }
  /deep/.ant-descriptions-item-label {
    font-size: 20px;
  }
  /deep/.ant-descriptions-item-content {
    font-size: 17px;
  }
  .descriptions {
    flex: 1;
  }
}
</style>
