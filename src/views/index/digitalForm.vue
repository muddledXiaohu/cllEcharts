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
          <a-button type="primary" @click="createShip">新增船舶</a-button>
          <!-- <a-button @click="modifyShip">修改船舶</a-button> -->

          <!-- <a-button type="primary" @click="newlyNoonPaper">创建午报数据</a-button> -->
        </div>
        <div class="contents">
          <!-- <a-tabs
            :activeKey="shopId"
            tab-position="left"
            @change="customerIdSelect"
          >
            <a-tab-pane
              v-for="it in cllOptions"
              :key="it.value"
              :tab="it.label"
            >
              <div>
                <div class="explain">
                  <div class="parameter">
                    <div class="content"
                      v-for="(item, index) in shipParameterArr"
                      :key="index"
                    >
                      <h4>{{item.label}}： </h4>
                      <p>{{item.value}}</p>
                    </div>
                  </div>
                </div>
                <div class="btns">
                </div>
              </div>
            </a-tab-pane>
          </a-tabs> -->
          <MyTable
            class="sailingTable"
            :columns="homeColumns"
            :data="cllOptions"
            @operations="operations"
            @switchPosition="switchPosition"
            :indexId="true"
          />
        </div>
      </div>
      <div v-else-if="noTitleKey == 'tab2'">
        <Indicators />
      </div>
    </a-card>
  </div>
</template>

<script>

import Indicators from "./indicators.vue";
import MyTable from "@/components/table/table.jsx";
import {
  fuelType,
  digitalFormcolumns,
  coordinatesConvertDegreeMinuteSecond,
  shipParameter,
  homeColumns,
} from "./components/data";

// 接口
import {
  createAim,
  aimYester,
  cllNewretownModify,
  pagingAim,
  createShipNo,
  pagingShipNo,
  pagingShipping,
  forModifyShipping,
} from "@/api/indicators";
import moment from "moment";
export default {
  name: "digitalForm",
  components: {
    Indicators,
    MyTable,
  },
  data() {
    return {
      digitalFormcolumns,
      fuelType,
      homeColumns,
      tabList: [
        {
          key: "tab1",
          tab: "船型数据管理",
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
      voyageNb: {},
      noTitleKey: "tab1",
      handleSubmitForm: this.$form.createForm(this, { name: "newOpenAccoint" }),
      formItemLayout: {
        labelCol: { span: 2 },
        wrapperCol: { span: 10 },
      },
      pagination: {
        total: 0,
        pageSize: 1000000000,
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
      pageParam: {
        pagenum: 1,
        pagesize: 10000000000,
      },
      // 船舶arr
      cllOptions: [],
      shopId: 0,
      // 选中船舶信息
      shipInformation: {},
      // 燃油消耗量
      vModelData: [],
      // 选中船次号
      selectedNb: {},
      surplusvModelData: {},
      Time_Since_Previous_Report: 0,
      // 上次航次号
      shipNoYesterdayVoyage: '',
      shipParameterArr:[]
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
      arrs = arrs || [];
      this.cllOptions = arrs;
      this.shopId = arrs[0]?.id;
      this.shipInformation = arrs[0]||{};
      this.vModelData = [];
      this.shipParameterArr = shipParameter(this.shipInformation)
      this.voyageNbs();
    },
    // 航次查询
    async voyageNbs() {
      let arr = await pagingShipNo({ query: this.shopId });
      this.voyageNb = {};
      for (const item of arr) {
        this.voyageNb[item.id] = item;
      }
      this.initData();
    },
    // 查询航行数据
    async initData() {
      let arr = await pagingAim(this.pageParam);
      this.data = arr.data;
          this.pagination.total = arr.totalpage;
          this.pagination.pageSize = arr.pagesize;
          this.pagination.current = arr.pagenum
    },
    onTabChange(key) {
      this["noTitleKey"] = key;
    },

    // 新增午报数据
    async newlyNoonPaper(e) {
      this.$router.push({ path: '/index/newFormVisible',query:{id: e.id}});
    },
    operations(e, EachItems) {
      if (e == '修改') {
        this.modifyShip(EachItems)
      }else if (e == '运营数据管理') {
        this.newlyNoonPaper(EachItems)
      }
    },
    async switchPosition(e) {
      await forModifyShipping({arrs:e})
      this.init();
    },

    // 分页事件
    async switchpage(current, pageSize) {
      this.pageParam.pagenum = current
      this.pageParam.pagesize = pageSize
      this.initData();
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
            });
          },
        });
      }
      if (ok) {
        await createAim(beforeArr).then(() => {
          that.$message.success("创建成功!");
          that.init();
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

    /**
     *
     * @description: 创建航次号
     */
    async shipCancel(e) {
      let arr = e;
      arr.beginTime = moment(arr.beginTime).format("YYYY-MM-DD");
      arr.endTime = moment(arr.endTime).format("YYYY-MM-DD");
      arr.IMO = this.shipInformation?.IMO;
      arr.shopId = this.shipInformation?.id;
      arr.surplusvModelData = this.shipInformation?.vModelData;
      let res = await createShipNo(arr);
      if (res.start !== 200) return this.$message.error("错误");
      this.$message.success("航次号创建成功!");
      this.init();
    },
    /**
     *
     * @description: 创建船舶
     */
    createShip() {
        this.$router.push({ path: '/index/shipCreate' });
    },
    modifyShip(e) {
        this.$router.push({ name: 'shipCreate', params:{shipInformation:e}});
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
      this.shipInformation.IMO = shipArr[0]?.label;
      this.shipInformation.id = shipArr[0]?.value;
      this.voyageNbs();
    },

    modify() {
      if (this.shipInformation?.vModelData) {
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
      }
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
  justify-content: flex-end;
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
  border-radius: 10px;
  padding: 10px;
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
        background: hsla(0,0%,100%,.39);
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

<style lang="less">
.table-striped {
  background-color: rgb(248, 248, 248);
}
</style>