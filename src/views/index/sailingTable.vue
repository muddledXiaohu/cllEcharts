<template>
  <div class="sailingTb">
    <div class="tables">
      <div class="leftCard">
        <div :class="[idx== selectedIdx ? 'checkedCard' : '']" v-for="(item,idx) in sailingShip" :key="idx">
            <span class="items">{{item.IMO}}</span>
            <a-divider />
        </div>
      </div>
      <div class="paperTb">
        <div class="forms">
          <a-form-model
            layout="inline"
            :model="formInline"
            @submit="handleSubmit"
            @submit.native.prevent
          >
            <a-form-model-item label="航次号">
                <a-select
                style="width:300px;"
                v-model="formInline.region"
                placeholder="航次号">
                    <a-select-option value="1">
                        1
                    </a-select-option>
                    <a-select-option value="2">
                        2
                    </a-select-option>
                </a-select>
            </a-form-model-item>
            <a-form-model-item label="日期">
                <a-range-picker v-model="formInline.date1">
                    <template slot="dateRender" slot-scope="current">
                        <div class="ant-calendar-date">
                        {{ current.date() }}
                        </div>
                    </template>
                </a-range-picker>
            </a-form-model-item>
            <a-form-model-item>
              <a-button
                type="primary"
                html-type="submit"
              >
                查询
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <MyTable
          class="sailingTable"
          :columns="digitalFormcolumns"
          :data="data"
          :pagination="pagination"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { fuelType, digitalFormcolumns } from "./components/data";
import MyTable from "@/components/table/table.jsx";
// 接口
import {
  pagingAim,
  shippingPagePaging,
} from "@/api/indicators";
export default {
  components: {
    MyTable,
  },
  data() {
    return {
      fuelType,
      digitalFormcolumns,
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
      formInline: {
        region: "",
        date1: [],
      },
      pageParam: {
        pagenum: 1,
        pagesize: 10,
      },
      // 航船分页
      sailingShip: [],
      // 当前选中航船
      selectedIdx: 0
    };
  },
  watch: {},
  mounted() {
      this.initData();
  },
  methods: {
    handleSubmit(e) {
      console.log(e, this.formInline);
    },
    // 查询航行数据
    async initData() {
      let arrs = await shippingPagePaging({
        pagenum: 1,
        pagesize: 10,
      });
      this.sailingShip=arrs.data
      console.log(arrs);
      this.pageParam.query = 1;
      let arr = await pagingAim(this.pageParam);
      this.data = arr.data;
      this.pagination.total = arr.totalpage;
      this.pagination.pageSize = arr.pagesize;
      this.pagination.current = arr.pagenum;
    },
  },
};
</script>
<style lang="less">
.sailingTb {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  .forms {
    background-color: #fff;
    padding: 10px;
    margin: 20px;
    border-radius: 5px;
  }
  .tables {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-right: 20px;
    margin: 20px;
    .leftCard {
      width: 20%;
      margin-right: 20px;
      border-radius: 5px;
      background-color: #fff;
      .checkedCard{
        background-color: #3b9bf5;
      }
      .items {
        // background-color: #1890ff;
        margin: 0 5px;
        padding: 0 5px;
        padding-top: 5px;
        line-height: 40px;
        font-size: 19px;
      }
        .ant-divider-horizontal {
            margin: 0;
            bottom: 0;
        }
    }
    .sailingTable {
      width: 100%;
      background-color: #fff;
      .ant-table-title {
        display: none;
      }
    }
  }
  .paperTb {
    background-color: #fff;
  }
}
</style>
