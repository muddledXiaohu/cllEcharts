<template>
  <div>
    <MyTable
      class="MyTable"
      @ListOperation="ListOperation"
      @CIICalculations="CIICalculations"
      :columns="CIIColumns"
      :data="data"
      :displayScroll="true"
      :scrollWidth="{ x: 2000}"
      :timeEmpty="true"
    />
    <!-- <div v-else>
      <div style="display: flex;
        flex-direction: row;
        justify-content: flex-end;
      ">
        <a-button type="primary" @click="clearTable">
          切换为表格
        </a-button>
        <a-select
          v-model="operationGroup[1].vModels"
          style="width: 120px; margin:0 10px;" 
          @change="businessGroup(operationGroup[1].vModels,'IMO')">
          <a-select-option
             v-for="(it, idx) in operationGroup[1].option"
            :key="idx"
            :value="it.value"
            :title="it.title"
          >
            {{it.title}}
          </a-select-option>
        </a-select>
        <a-select
          v-model="operationGroup[2].vModels"
          style="width: 120px" 
          @change="businessGroup(operationGroup[2].vModels,'displayMode')">
          <a-select-option
             v-for="(it, idx) in operationGroup[2].option"
            :key="idx"
            :value="it.value"
            :title="it.title"
          >
            {{it.title}}
          </a-select-option>
        </a-select>
      </div>
      <Chart
      :itemSailing="itemSailing"
      :datas="data"
      />
    </div> -->
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
// 接口
import {
  pagingShipping,
} from "@/api/indicators";
import { baseMixin } from "@/store/app-mixin";

// import Chart from './chart.vue'
import {
  CIIColumns
} from "./components/data";
// 
export default {
  mixins: [baseMixin],
  name: "channelBusiness",
  data() {
    return {
      data: [],
      CIIColumns,
    };
  },
  components: {
    MyTable,
  },
  watch: {},
  created() {
    this.lists()
  },
  methods: {
    async lists() {
      let arrs = await pagingShipping({ query: "" });
      this.data = arrs
    },
    CIICalculations(i, item) {
      if (i == '详细情况') {
        const dt = {
          id: item.id, name: item.name, format: 'table',
          IMO: item.IMO,
          shipbuilding: item.shipbuilding,
        }
        this.$router.push({ path: '/index/CIICalculation',query:dt});
      } else {
        const dt = {
          id: item.id, name: item.name, format: 'echarts',
          IMO: item.IMO,
          shipbuilding: item.shipbuilding,
        }
        this.$router.push({ path: '/index/CIICalculation',query:dt});
      }
    },
    // ListOperation
    async ListOperation(row, e) {
      if (e == "name") {
        console.log(row.name);
      }
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