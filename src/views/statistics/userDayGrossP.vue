<template>
  <div>
        <MyTable
          class="MyTable"
          @tables="tables"
          @businessGroup="businessGroup"
          @ListOperation="ListOperation"
          :columns="columns"
          :data='data'
          :condition='condition'
          :Inline="Inline"
          :buttonGroup="buttonGroup"
          :selectedHeader="selected"
          :displayScroll="true"
        ></MyTable>
        <div class="remarks">
          <p>本页 {{surfaceTotal.page}} 条数据</p>
          <p>毛利总计{{surfaceTotal.total}}</p>
          <a-popover v-if="surfaceTotal.remark">
            <template slot="content">
              <p>没有价格的账号/通道：{{surfaceTotal.remark}}</p>
            </template>
            <a-icon type="info-circle" theme="twoTone" two-tone-color="#dd001b" />
          </a-popover>
        </div>
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
// 接口
import { dGrossProfit } from '@/api/statistics'
import { baseMixin } from '@/store/app-mixin'

const columns = [
  {
    title: '成功数',
    dataIndex: 'success'
  },
  {
    title: '成功率',
    dataIndex: 'successRate'
  },
  {
    title: '金融比',
    dataIndex: 'bankRate',
    // scopedSlots: { customRender: 'sourceType' }
  },
  {
    title: '平均售价（元）',
    dataIndex: 'price'
  },
  {
    title: '平均成本（元）',
    dataIndex: 'cost'
  },
  {
    title: '金融成本（元）',
    dataIndex: 'financialCost'
  },
  {
    title: '毛利',
    dataIndex: 'gdrossProfit'
  },
  {
    title: '毛利率',
    dataIndex: 'grossMargin'
  }
];
export default {
  mixins: [baseMixin],
  name: 'dayGrossProfit',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected: [],
      condition: [
        {
          key: '发送日期',
          title: 'date',
          select: true,
          times: true
        },
      ],
      Inline: {
      },
      buttonGroup: ['查询', '重置', '返回'],
      oncedata: [],
      // 渲染数据条件
      listArr: {},
      surfaceTotal: {
        total: 0,
        page: 0,
        remark: ''
      },
      iCustomerName: ''
    };
  },
  components: {
    MyTable
  },
  created() {
    this.customerNames()
    this.getInline()
    this.onceDt()
    this.lists()
  },
  methods: {
    customerNames () {
      this.iCustomerName = sessionStorage.getItem('dayGrossProfit') ? sessionStorage.getItem('dayGrossProfit') : ''
    },
    async lists () {
      // let belong = JSON.stringify(this.roleid) ? JSON.parse(JSON.stringify(this.roleid)) : {}
      this.listArr = {
        sendDateStartTime: '',
        sendDateEndTime: '',
        customerName: this.iCustomerName,
      }
      this.everytimes()
      await dGrossProfit(this.listArr)
        .then((res) => {
          const { data } = res
          this.dataProcessing(data.list)
          this.surfaceTotal.remark = data.remark
        })
        .catch(err => console.log(err))
    },
    everytimes () {
      let nowDate = new Date()
      let year = nowDate.getFullYear()
      let month = nowDate.getMonth() + 1
      let day = nowDate.getDate()
      let days = day -1
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      if (days < 10) days = '0' + days
      this.listArr.sendDateStartTime = year + '-' + month + '-' + days
      this.listArr.sendDateEndTime = year + '-' + month + '-' + day
    },
    onceDt() {
      this.oncedata = this.$XHCopy(this.data)
    },
    // 事件
    tables(row, e) {
      if (e == '查询') {
        if (row.date) {
          // 查询
          // let rows = this.$XHCopy(row)
          // console.log(rows);
          this.listArr.sendDateStartTime = row.date[0].format('YYYY-MM-DD')
          this.listArr.sendDateEndTime = row.date[1].format('YYYY-MM-DD')
          this.Inline.date = 1
        } else {
          this.everytimes()
          this.Inline.date = ""
        }
        this.query()
      } else if (e == '重置') {
        // 重置
        this.getInline()
      } else if (e == '返回') {
        this.$router.go(-1);
      }
    },
    // 业务组件
    businessGroup(row, e) {
      if (e == '新建开户申请') {
        this.$router.push({ name: 'newOpenAccoint'})
        console.log(1);
      } else {
        console.log(2);
      }
    },
    // scopedSlots: { customRender: '' }事件
    async ListOperation (row, e) {
      if (e == 'name') {
        console.log(row.customerName);
        // dayGrossProfit
        sessionStorage['dayGrossProfit'] = row.customerName;
        this.$router.push({ name: 'userDayGrossP'})
      }
    },
    // 查询
    async query() {
      await dGrossProfit(this.listArr).then(res => {
          const { data } = res
          this.dataProcessing(data.list)
          this.surfaceTotal.remark = data.remark
      }).catch(err => console.log(err))
    },
    // 重置
    getInline () {
      let arr = {}
      for (const key in this.condition) {
        arr[this.condition[key].title] = ''
      }
      this.Inline = arr
    },

    // 数据处理
    dataProcessing (arr) {
      this.data = []
      for (const key in arr) {
        let datas = {}
          // 客户
          datas.id = key
          datas.customerName = arr[key].customerName
          // 客户经理
          datas.belongUserName = arr[key].belongUserName
          // 成功数
          datas.success = arr[key].success
          // 成功率
          datas.successRate = arr[key].successRate +'%'
          // 金融比
          datas.bankRate = arr[key].bankRate + '%'
          // 平均售价
          datas.price = arr[key].success == 0 ? arr[key].sellPrice : (arr[key].sellPriceTotal/arr[key].success / 10000).toFixed(4)
          // 平均成本
          datas.cost = arr[key].success == 0 ? 0 : ((arr[key].costPriceTotal / arr[key].success) / 10000).toFixed(4)
          // 金融成本
          datas.financialCost = arr[key].success == 0 ? 0 : (((arr[key].costPriceTotal - arr[key].bankPriceTotal)/arr[key].success) / 10000).toFixed(4)
          // 毛利
          datas.gdrossProfit = ((arr[key].sellPriceTotal - arr[key].costPriceTotal + arr[key].bankPriceTotal) / 10000).toFixed(3)
          // 毛利率
          datas.grossMargin = arr[key].sellPriceTotal == 0 ? 0 : ((arr[key].sellPriceTotal - arr[key].costPriceTotal + arr[key].bankPriceTotal) / arr[key].sellPriceTotal * 100).toFixed(2) + " %"
          // 毛利总数
          this.surfaceTotal.total += ((arr[key].sellPriceTotal - arr[key].costPriceTotal + arr[key].bankPriceTotal) / 10000)
          this.data.push(datas)
      }          // 毛利总数
          this.surfaceTotal.page = arr.length
          this.surfaceTotal.total = this.surfaceTotal.total.toFixed(3)
          console.log(this.surfaceTotal);
    }
  }
};
</script>
<style lang="less" scoped>
// /deep/.ant-col {
//   padding-top: 30px;
// }
.remarks {
  width: 98%;
  position: -webkit-sticky; /* Safari */
  margin: 0 auto;
  height: 40px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  font-size: 16px;
  p {
    line-height: 40px;
    margin-right: 39px;
    margin-left: 9px;
  }
  /deep/.anticon-info-circle {
    font-size: 26px;
    line-height: 44px;
  }
}
</style>
<style lang="less">
.MyTable {
    width: 98%;
    margin: 20px auto;
    // background-color: #fff; */
    padding-bottom: 48px;
  .ant-collapse-header {
    color: rgb(49, 155, 226) !important;
  }
  // .ant-table-content{
  //   .ant-table-scroll{
  //     .ant-table-placeholder{
  //       padding: 0 !important;
  //       border-top: none !important;
  //     }
  //   }
  // }
  .ant-table-content > .ant-table-scroll > .ant-table-body {
    overflow-x: auto !important;
  }
}
</style>