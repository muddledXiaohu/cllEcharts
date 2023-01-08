<template>
    <div class="CIICount">
        <div class="headBtn">
            <a-button @click="toReturn">返回</a-button>
        </div>
      <div v-if="format=='table'">
        <div class="parameter">
          <div class="CIleft">
              <div class="content" style="width:200px;">
              <p>船舶({{itemCIIName}})</p>
              </div>
              <span style="color:red;">
              * NA表示该年度营运数据（午报数据）缺失或不完整，无法计算
              </span>
          </div>
          <div>
              <img class="exception" src="@/assets/countCII.jpg" alt="">
          </div>
        </div>
        <MyTable
        class="sailingTable"
        :columns="countColumns"
        :data="cllOptions"
        :pagination="pagination"
        :indexId="true"
        />
      </div>
      <div v-else>

        <Chart
        :itemSailing="itemSailing"
        :datas="cllOptions"
        />
      </div>
    </div>
</template>

<script>
import {
    calculationPaging,
} from "@/api/passageway";
import {
    countColumns
} from "./data";
import Chart from '../index/chart.vue'
import MyTable from "@/components/table/table.jsx";
export default {
  mixins: [],
  name: "",
  components: {
    MyTable,
    Chart
  },
  data() {
    return {
      itemId: 0,
      format: '',
      itemSailing:{},
      countColumns,
      pageParam: {
        pagenum: 1,
        pagesize: 10,
      },
      cllOptions: [],
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
      itemCIIName:''
    };
  },
  props: {
  },
  watch: {},
  created() {
      if (this.$route.query) {
        this.itemId =this.$route.query.id
        this.itemCIIName = this.$route.query.name
        this.format = this.$route.query.format
        this.pageParam.query = this.itemId
        this.itemSailing = {
          IMO: this.$route.query.IMO,
          name: this.$route.query.name,
          shipbuilding: this.$route.query.shipbuilding,
        }
        this.init()
    }
  },
  methods: {
    async init() {
        const arr = await calculationPaging(this.pageParam)
        this.cllOptions = arr.data
        this.pagination.total = arr.totalpage;
        this.pagination.pageSize = arr.pagesize;
        this.pagination.current = arr.pagenum
    },
    // 分页事件
    async switchpage(current, pageSize) {
      this.pageParam.pagenum = current
      this.pageParam.pagesize = pageSize
      this.init();
    },
    toReturn() {
      this.$router.push({ path: "/index/digitalForm" });
    },
  },
};
</script>

<style lang="less">
.CIICount{
    background-color: #fff;
    padding: 10px;
    margin: 20px;
    border-radius: 5px;
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
    .parameter {
      font-size: 14px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-between;
      .CIleft {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
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
</style>