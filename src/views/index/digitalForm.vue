<template>
  <div class="digitalForm">
    <a-card
      style="width: 100%"
      class="digitalFormCard"
      :tab-list="tabList"
      :active-tab-key="noTitleKey"
      @tabChange="(key) => onTabChange(key)"
    >
      <div v-if="noTitleKey == 'tab1'">
        <div class="popUpHeader">
          <!-- <h2>{{$t('user.login.tab-login-credentials')}}</h2> -->
          <a-select
            style="width: 120px"
            placeholder="请选择船次号"
            v-model="tabActiveKey"
            show-search
            allowClear
            :filter-option="filterOption"
            @search="accountIdSearch"
            @select="switchTabs"
          >
            <a-select-option
              v-for="(it, id) in selectVoyageNb"
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
            :activeKey="shopId"
            tab-position="left"
            @change="customerIdSelect"
          >
            <a-tab-pane
              v-for="it in cllOptions"
              :key="it.value"
              :tab="it.label"
            >
              <div v-if="voyageNb[tabActiveKey]">
                <div class="explain">
                  <a-descriptions :column="2" class="adescriptions">
                    <a-descriptions-item label="船名">{{
                      voyageNb[tabActiveKey].IMO
                    }}</a-descriptions-item>
                    <a-descriptions-item label="出发港">{{
                      voyageNb[tabActiveKey].setPortName
                    }}</a-descriptions-item>
                    <a-descriptions-item label="航次号">{{
                      voyageNb[tabActiveKey].Voyage
                    }}</a-descriptions-item>
                    <a-descriptions-item label="出港时间">{{
                      voyageNb[tabActiveKey].beginTime
                    }}</a-descriptions-item>
                  </a-descriptions>
                  <div class="arrow">
                    <a-icon class="icon" type="arrow-right" />
                  </div>
                  <a-descriptions :column="1" class="descriptions">
                    <a-descriptions-item label="终到港">{{
                      voyageNb[tabActiveKey].endPortName
                    }}</a-descriptions-item>
                    <a-descriptions-item label="到港时间">{{
                      voyageNb[tabActiveKey].endTime
                    }}</a-descriptions-item>
                  </a-descriptions>
                </div>
                <div class="btns">
                  <a-button type="primary" @click="newlyNoonPaper"
                    >新增午报数据</a-button
                  >
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
                <MyTable
                  class="MyTable"
                  :columns="digitalFormcolumns"
                  :data="data"
                  :pagination="pagination"
                />
              </div>
              <div v-else>
                <a-empty>
                  <template #description>
                    <span> 暂无船次号 </span>
                  </template>
                  <a-button type="primary" @click="shipNodisplay = true"
                    >创建船次号</a-button
                  >
                </a-empty>
              </div>
            </a-tab-pane>
          </a-tabs>
          <!-- <a-empty v-else /> -->
        </div>
        <a-modal
          :visible="formVisible"
          title="午报数据"
          ok-text="提交"
          cancel-text="取消"
          :confirm-loading="false"
          :maskClosable="false"
          :width="'60%'"
          @ok="handleSubmit"
          @cancel="handleCancel"
        >
          <a-form
            :form="handleSubmitForm"
            @submit="handleSubmit"
            ref="ruleForm"
            labelAlign="right"
            layout="horizontal"
            v-bind="formItemLayout"
            :label-col="{ span: 10 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-row>
              <a-col :span="12">
                <a-form-item label="请选择船次号">
                  <a-select
                    placeholder="请选择"
                    @change="changeshipsId"
                    v-decorator="[
                      'shipsId',
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
                      {{ it.Voyage }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="请选择装载状态">
                  <a-select
                    placeholder="请选择"
                    v-decorator="[
                      'loadingStatus',
                      {
                        rules: [
                          {
                            type: 'number',
                            required: true,
                            message: '请选择装载状态！',
                            trigger: 'change',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option :value="1">满载</a-select-option>
                    <a-select-option :value="2">未满</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row v-for="(item, idx) in vModelData" :key="idx">
              <a-col :span="12">
                <a-form-item :label="`${item.name}当日油耗`">
                  <a-input-number
                    style="width: 100%"
                    placeholder="当日燃油消耗(ton)"
                    :maxLength="4"
                    :step="0.1"
                    v-decorator="[
                      `${item.label}`,
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
                <a-form-item :label="`${item.name}油耗(升)`">
                  <span class="parameter">
                    {{
                      surplusvModelData[item.label] -
                      (handleSubmitForm.getFieldValue(item.label)
                        ? Number(handleSubmitForm.getFieldValue(item.label))
                        : 0)
                    }}
                  </span>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="当前经度" prop="longitude">
                  <a-input-number
                    style="width: 100%"
                    :min="0"
                    :step="0.01"
                    v-decorator="[
                      'longitude',
                      {
                        rules: [
                          {
                            type: 'number',
                            required: true,
                            message: '请填写经度！',
                            trigger: 'change',
                          },
                        ],
                      },
                    ]"
                    placeholder="经度"
                  />
                </a-form-model-item>
              </a-col>
              <!-- 纬度 -->
              <a-col :span="12">
                <a-form-model-item label="当前纬度" prop="latitude">
                  <a-input-number
                    style="width: 100%"
                    :min="0"
                    :step="0.01"
                    v-decorator="[
                      'latitude',
                      {
                        rules: [
                          {
                            type: 'number',
                            required: true,
                            message: '请填写纬度！',
                            trigger: 'change',
                          },
                        ],
                      },
                    ]"
                    placeholder="纬度"
                  />
                </a-form-model-item>
              </a-col>
              
              <a-col :span="12">
                <a-form-item label="请选择航船状态">
                  <a-select
                    placeholder="请选择"
                    v-decorator="[
                      'Event',
                      {
                        rules: [
                          {
                            type: 'string',
                            required: true,
                            message: '请选择航船状态！',
                            trigger: 'change',
                          },
                        ],
                      },
                    ]"
                  >
                    <a-select-option value="DEPATURE">出发</a-select-option>
                    <a-select-option value="NOON">行驶中</a-select-option>
                    <a-select-option value="ARRIVAL">到达</a-select-option>
                    <a-select-option value="OTHER">其他</a-select-option>
                    <!-- OTHER -->
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="航行距离">
                  <a-input-number
                    style="width: 100%"
                    placeholder="航行距离"
                    :step="1"
                    v-decorator="[
                      `Distance`,
                      {
                        rules: [
                          {
                            type: 'number',
                            required: true,
                            message: '请输入航行距离',
                            trigger: 'blur',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="日期">
                  <a-date-picker
                    style="width: 100%"
                    placeholder="日期"
                    format="YYYY-MM-DD HH:mm"
                    valueFormat="YYYY-MM-DD HH:mm"
                    disabled
                    v-decorator="[
                      'sameTime',
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
              <a-col :span="12">
                <a-form-item label="航船停靠时间">
                  <a-input-number
                    style="width: 100%"
                    placeholder="航船停靠时间"
                    :max="Number(Time_Since_Previous_Report)"
                    :step="1"
                    v-decorator="[
                      `Time_Elapsed_Anchoring`,
                      {
                        rules: [
                          {
                            type: 'number',
                            required: true,
                            message: '请输入航船停靠时间',
                            trigger: 'blur',
                          },
                        ],
                      },
                    ]"
                  />
                </a-form-item>
              </a-col>

              <a-col :span="12">
                <a-form-item label="上次报告">
                  <span class="parameter"
                    >{{ Time_Since_Previous_Report }}小时</span
                  >
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-modal>
      </div>
      <div v-else-if="noTitleKey == 'tab2'">
        <Indicators />
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

import Indicators from "./indicators.vue";
import {
  fuelType,
  digitalFormcolumns,
  coordinatesConvertDegreeMinuteSecond,
} from "./components/data";

// 接口
import {
  createAim,
  aimYester,
  cllNewretownModify,
  pagingAim,
  createShipNo,
  pagingShipNo,
  createShipping,
  pagingShipping,
  analysisExcel,
  aimYesterday,
  shipNoYesterday,
} from "@/api/indicators";
import moment from "moment";
export default {
  name: "digitalForm",
  components: {
    MyTable,
    ShipSailing,
    ShipCreate,
    Indicators,
  },
  data() {
    return {
      digitalFormcolumns,
      fuelType,
      tabList: [
        {
          key: "tab1",
          tab: "Noon Report Data",
        },
        {
          key: "tab2",
          tab: "Cll 计算",
        },
        {
          key: "tab3",
          tab: "报告",
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
      voyageNb: {},
      selectVoyageNb: [],
      tabActiveKey: 0,
      noTitleKey: "tab1",
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
      // 燃油消耗量
      vModelData: [],
      // 选中船次号
      selectedNb: {},
      surplusvModelData: {},
      formVisible: false,
      // 上传
      fileList: [],
      Time_Since_Previous_Report: 0,
      // 上次航次号
      shipNoYesterdayVoyage: ''
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
      this.vModelData = [];
      this.cllOptions = arrs.map((item) => {
        let array = {};
        array.value = item?.id;
        array.label = item?.IMO;
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
          this.shipName = item.Voyage;
          this.selectedNb = item;
          this.surplusvModelData = item.surplusvModelData
        }
      });
    },
    // 航次查询
    async voyageNbs() {
      let arr = await pagingShipNo({ query: this.shopId });
      this.voyageNb = {};
      this.selectVoyageNb = [];
      for (const item of arr) {
        this.voyageNb[item.id] = item;
        let itemAr = {};
        if (this.shopId === item.shopId) {
          itemAr.value = item.id;
          itemAr.label = item.Voyage;
          this.selectVoyageNb.push(itemAr);
        }
      }
      this.joinProtocolSelect = JSON.parse(JSON.stringify(arr));
      this.joinProtocolSelect.push({
        id: 1061601,
        Voyage: "新航次",
      });
      this.tabActiveKey = arr[0]?.id || 0;
      this.initData();
    },
    // 查询航行数据
    async initData() {
      this.pageParam.query = this.tabActiveKey;
      let arr = await pagingAim(this.pageParam);
      this.data = arr.data;
      this.pagination.total = arr.totalpage;
      this.pagination.pageSize = arr.pagesize;
      this.pagination.current = arr.pagenum;
    },
    onTabChange(key) {
      this["noTitleKey"] = key;
    },

    // 新增午报数据
    async newlyNoonPaper() {
      this.formVisible = true;
      let res = await aimYesterday({});
      const d1 = new Date(`${res.data.Date_UTC} : ${res.data.Time_UTC}`);
      const d2 = new Date();
      this.Time_Since_Previous_Report = ((parseInt(d2 - d1) / 1000 / 60)||24).toFixed(
        1
      );
      let shipNos = await shipNoYesterday()
      this.shipNoYesterdayVoyage = shipNos.data.Voyage
    },
    async handleSubmit() {
      this.handleSubmitForm.validateFields(async (err, values) => {
        if (!err) {
          let array = { ...values };
          array.IMO = this.selectedNb.IMO;
          array.shopId = this.selectedNb.shopId;
          array.VoyageId = this.selectedNb.id;
          const date = new Date(array.sameTime);
          array.Date_UTC = `${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}`;
          array.Time_UTC = `${date.getHours()}:${date.getMinutes()}`;
          array.Voyage_From = this.shipNoYesterdayVoyage||'';
          array.Voyage_To = this.selectedNb.Voyage;
          let longitude = coordinatesConvertDegreeMinuteSecond(array.longitude);
          array.Latitude_Degree = longitude[0];
          array.Latitude_Minutes = longitude[1];
          array.Latitude_North_South = "South";
          let latitude = coordinatesConvertDegreeMinuteSecond(array.latitude);
          array.Longitude_Degree = latitude[0];
          array.latitude_Minutes = longitude[1];
          array.Longitude_East_West = "West";
          array.Time_Since_Previous_Report = this.Time_Since_Previous_Report;
          array.Cargo_Mt = array.loadingStatus ? 100 : 0;
          array.surplusvModelData = {}
          if (array.LFO) {
            array.ME_Consumption_HFO = Number(array.LFO)
            let HFO_ROB = this.vModelData.filter(item=>{ return item.label=='LFO'})
            array.HFO_ROB = Number(HFO_ROB[0].HFO_ROB) - Number(array.LFO)
            array.surplusvModelData.LFO = Number(this.surplusvModelData.LFO)-Number(array.LFO)
          }
          if (array.HFO) {
            array.ME_Consumption_MGO=Number(array.HFO)
            let MGO_ROB = this.vModelData.filter(item=>{ return item.label=='HFO'})
            array.MGO_ROB = Number(MGO_ROB[0].HFO_ROB)-Number(array.HFO)
            array.surplusvModelData.HFO = Number(this.surplusvModelData.HFO)-Number(array.HFO)
          }
          // shipsId
          this.secondaryData(array);
        }
      });
    },
    /**
     * 处理数据上传
     */
    async secondaryData(beforeArr) {
      let res = await aimYester({
        Date_UTC: beforeArr.Date_UTC,
        VoyageId: beforeArr.VoyageId,
      });
      let ok = true;
      const that = this;
      if (JSON.stringify(res.data) !== "{}") {
        ok = false;
        that.$confirm({
          title: "当日已上传数据！",
          content: "是否重新上传数据覆盖？",
          async onOk() {
            await cllNewretownModify(beforeArr).then(() => {
              that.$message.success("修改成功!");
              that.init();
              this.formVisible = false;
            });
          },
        });
      }
      if (ok) {
        await createAim(beforeArr).then(() => {
          that.$message.success("创建成功!");
          that.init();
          this.formVisible = false;
        });
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
      return year + "-" + month + "-" + day + ` ${nowDate.getHours()}:${nowDate.getMinutes()}`;
    },
    pickerChange(e) {
      console.log(e.format("YYYY-MM-DD HH:mm"));
    },
    async modifyCustomer(e) {
      console.log(e);
    },
    // 分页事件
    async switchpage(current, pageSize) {
      this.pageParam.pagenum = current
      this.pageParam.pagesize = pageSize
      this.initData();
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

    handleCancel() {
      this.handleSubmitForm.resetFields(); // 重置编辑表单
      this.formVisible = false;
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
      this.shipNodisplay = false;
      this.handleSubmitForm.resetFields([`shipsId`]);
    },
    /**
     *
     * @description: 创建航次号
     */
    async shipCancel(e) {
      let arr = e;
      arr.beginTime = moment(arr.beginTime).format("YYYY-MM-DD");
      arr.endTime = moment(arr.endTime).format("YYYY-MM-DD");
      arr.IMO = this.shipInformation.IMO;
      arr.shopId = this.shipInformation.id;
      arr.surplusvModelData = this.shipInformation.vModelData;
      let res = await createShipNo(arr);
      if (res.start !== 200) return this.$message.error("错误");
      this.$message.success("航次号创建成功!");
      this.handleSubmitForm.resetFields([`shipsId`]);
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
            IMO: e,
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
      let shipArr = this.cllOptions.filter((it) => {
        return it.value === e;
      });
      this.shipInformation.IMO = shipArr[0].label;
      this.shipInformation.id = shipArr[0].value;
      this.voyageNbs();
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
      await analysisExcel(formData).then(() => {
        this.$message.success("上传成功!");
        this.init();
      });
    },
    modify() {
      for (const key in this.shipInformation.vModelData) {
        let arr = {
          HFO_ROB: this.shipInformation.vModelData[key],
          label: key,
        };
        arr.name = this.fuelType.filter((item) => {
          return item.value == key;
        })[0].label;
        this.vModelData.push(arr);
      }
    },
    // 搜索功能
    filterOption(input, option) {
      return option.componentOptions.children[0].text.indexOf(input) > -1;
    },
  },

  watch: {
    shipInformation() {
      this.modify();
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
  .parameter {
    padding-left: 40px;
  }
  .btns {
    margin-bottom: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
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
    width: 50%;
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
