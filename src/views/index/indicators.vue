<template>
  <div>
    <MyTable
      v-if="operationGroup[0].name == '切换为曲线'"
      class="MyTable"
      @tables="tables"
      @businessGroup="businessGroup"
      @ListOperation="ListOperation"
      :columns="columns"
      :data="data"
      :pagination="pagination"
      :condition="condition"
      :Inline="Inline"
      :buttonGroup="buttonGroup"
      :operationGroup="operationGroup"
      :selectedHeader="selected"
      :displayScroll="true"
      :permissionButton="permissionButton"
      @sendingAccount="sendingAccount"
      @permissionDelete="permissionDelete"
      :timeEmpty="true"
    />
    <div v-else>
      <div style="display: flex;
        flex-direction: row;
        justify-content: flex-end;
      ">
        <a-button type="primary" @click="operationGroup[0].name = '切换为曲线'">
          切换为表格
        </a-button>
      </div>
      <Chart />
    </div>
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
// 接口
import {
  calculationPaging,
} from "@/api/passageway";
import {
  pagingShipping,
  pagingShipNo,
} from "@/api/indicators";
import { baseMixin } from "@/store/app-mixin";

import Chart from './chart.vue'

const columns = [
  // {
  //   dataIndex: "id",
  //   // slots: { title: 'customTitle' },
  //   title: "编号",
  // },
  {
    title: "IMO",
    dataIndex: "IMO",
    scopedSlots: { customRender: "id" },
  },
  {
    title: "航次号",
    dataIndex: "Voyage_To",
  },
  {
    title: "当日里程（mile）",
    dataIndex: "Distance",
  },
  {
    title: "累计里程",
    dataIndex: "CumulativeDistance",
  },
  {
    title: "当日燃油消耗(ton)",
    dataIndex: "ME_Consumption",
  },
  {
    title: "累计油耗",
    dataIndex: "CumulativeME_Consumption",
  },
  {
    title: "M",
    dataIndex: "M",
  },
  {
    title: "W",
    dataIndex: "W",
  },
  {
    title: "Attained CII",
    dataIndex: "AttainedCII",
  },
  // {
  //   title: "cll Trend(3 adys-avg)",
  //   dataIndex: "trend",
  //   scopedSlots: { customRender: "cllTrend" },
  // },
  // {
  //   title: 'Cll(gCO2/(nm * mt))',
  //   children: [
  //     {
  //       title: 'Attained',
  //       dataIndex: 'attained'
  //     },
  //     {
  //       title: 'Required',
  //       dataIndex: 'required'
  //     },
  //   ]
  // },
  // {
  //   title: "Deviation in %",
  //   dataIndex: "deviation",
  // },
  // {
  //   title: "Arrained Rating YTD",
  //   dataIndex: "arrained",
  //   scopedSlots: { customRender: "tagging" },
  // },
  // {
  //   title: "Projected Rating next year",
  //   dataIndex: "nextYear",
  //   scopedSlots: { customRender: "tagging" },
  // },
  // {
  //   title: "Projected year of deterioration",
  //   dataIndex: "deterioration",
  //   scopedSlots: { customRender: "tagging" },
  // },
];
export default {
  mixins: [baseMixin],
  name: "channelBusiness",
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected: [],
      condition: [],
      Inline: {},
      buttonGroup: [],
      operationGroup: [
        {
          name: '切换为曲线',
          title: 'channelBusiness',
          disabled: false,
        },
        {
          name: "IMO",
          title: 'IMO',
          vModels: '',
          disabled: false,
          select: true,
          option: []
        },
        {
          name: "显示方式",
          title: 'displayMode',
          disabled: false,
          select: true,
          vModels: 0,
          option: [
            { value: 0, title: "航次" },
            { value: 1, title: "月" },
            { value: 2, title: "周" },
            { value: 3, title: "日" },
          ]
        },
        {
            name: "ship",
            title: 'ship',
            vModels: '',
            disabled: false,
            select: true,
            option: []
        }
      ],
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
        },
        onChange: (page, pageSize) => {
          this.switchpage(page, pageSize);
        },
      },
      // 渲染数据条件
      listArr: {},
      // 权限按钮
      permissionButton: [
        {
          name: "编辑",
          title: "save",
          clck: "sendingAccount",
          popconfirms: false,
        },
        {
          name: "操作2",
          title: "freeze",
          clck: "permissionDelete",
          popconfirms: true,
          recoveryOrFreeze: true,
        },
      ],
      // 新建页显隐
      masterAccountVisible: false,
      OperationName: ''
    };
  },
  components: {
    MyTable,
    Chart
  },
  watch: {},
  created() {
    this.lists()
  },
  methods: {
    async lists() {
      let arrs = await pagingShipping({ query: "" });
      this.operationGroup[1].option = (arrs || []).map(item => {
        return {value: item.id, title: item.IMO}
      })
      this.operationGroup[1].vModels = arrs ? arrs[0].id : ''
      // let belong = JSON.stringify(this.roleid) ? JSON.parse(JSON.stringify(this.roleid)) : {}
      this.listArr = {
        pagesize: 10,
        pagenum: 1,
        IMO: this.operationGroup[1].vModels,
        displayMode: this.operationGroup[2].vModels
      };
      this.everytimes();
      this.calculation();
    },
    async calculation() {
      let arr = await pagingShipNo({ query: this.operationGroup[1].vModels });
      this.operationGroup[3].option = (arr || []).map(item => {
        return {value: item.id, title: item.Voyage}
      })
      this.operationGroup[3].vModels = arr ? arr[0]?.id : ''
      this.listArr.VoyageId =this.operationGroup[3].vModels
      await calculationPaging(this.listArr)
        .then((res) => {
          this.data = res.data
          this.pagination.total = res.totalpage;
          this.pagination.pageSize = res.pagesize;
          this.pagination.current = res.pagenum

        })
        .catch((err) => console.log(err));
    },
    // 事件
    tables(row, e) {
      // 查询
      if (e == "查询") {
        if (row.date && row.date.length != 0) {
          // 查询
          // let rows = this.$XHCopy(row)
          this.listArr.createTimeStartTime = row.date[0].format("YYYY-MM-DD");
          this.listArr.createTimeEndTime = row.date[1].format("YYYY-MM-DD");
          this.Inline.resetdate = 1;
        } else {
          this.everytimes();
          this.Inline.resetdate = "";
        }
        for (const key in row) {
          if (key == "name" || key == 'status') {
            this.listArr[key] = row[key];
          }
        }
        this.listArr.current = 1
        this.query(this.listArr);
      } else {
        // 重置
        this.getInline();
      }
    },
    // 业务组件
    businessGroup(row, e) {
      if (e == '切换为曲线') {
        this.operationGroup[0].name = '切换为表格'
      }
      if (e == 'IMO') {
        this.listArr.IMO = row
        this.calculation();
      }
      if (e == 'displayMode') {
        this.listArr.displayMode = row
        this.calculation();
        console.log(row, e);
      }
    },
    // ListOperation
    async ListOperation(row, e) {
      if (e == "name") {
        console.log(row.name);
        // this.$router.push({ name: "chart" , params: {name: row.name}});
      }
    },
    // 查询
      async query(row) {
        console.log(row);
    },
    // 重置
    getInline() {
      let arr = {};
      for (const key in this.condition) {
        arr[this.condition[key].title] = "";
      }
      this.Inline = arr;
    },
    // 分页事件
    async switchpage(current, pageSize) {
      this.listArr.current = current;
      this.listArr.size = pageSize;
      await calculationPaging(this.listArr)
        .then((res) => {
          const { data } = res;
          this.data = data.records
          this.pagination.total = data.total;
          this.pagination.pageSize = data.pageSize;
          this.pagination.current = data.pageNum
        })
        .catch((err) => console.log(err));
    },
    // 编辑
    async sendingAccount(row) {
        console.log(row);
    },
    // 操作2
    async permissionDelete(e) {
      // 冻结
      console.log(e);
      if (e.status === 1) {
        console.log(e);
      } else if (e.status === 0) {
        console.log(e);
      }
    },
    everytimes() {
      this.listArr.createTimeStartTime = "";
      this.listArr.createTimeEndTime = "";
    },
    listRefresh () {
      this.query(this.listArr)
    },
  },
};
</script>
<style lang="less" scoped>
</style>
<style lang="less">
.MyTable {
  width: 98%;
  margin: 20px auto;
  // background-color: #fff;
  .ant-collapse-header {
    color: rgb(49, 155, 226) !important;
  }
  .ant-table-content > .ant-table-scroll > .ant-table-body {
    overflow-x: auto !important;
  }
.taggings {
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    padding: 0 15px;
    height: 28px;
    line-height: 28px;
}
}
</style>