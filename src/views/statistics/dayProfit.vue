<template>
  <div>
        <MyTable
          class="MyTable"
          @tables="tables"
          @businessGroup="businessGroup"
          @ListOperation="ListOperation"
          :columns="columns"
          :pagination='pagination'
          :data='data'
          :condition='condition'
          :Inline="Inline"
          :buttonGroup="buttonGroup"
          :selectedHeader="selected"
          :displayScroll="true"
        />
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
// 接口
import { dDailyProfit } from '@/api/statistics'
import { baseMixin } from '@/store/app-mixin'

const columns = [
  {
    // slots: { title: 'customTitle' },
    title: '用户',
    dataIndex: 'account',
    // scopedSlots: { customRender: 'id' }
  },
  {
    title: '通道号',
    dataIndex: 'channel'
  },
  {
    title: '平台',
    dataIndex: 'platform'
  },
  {
    title: '日期',
    dataIndex: 'sendDate'
  },
  {
    title: '供应商名称',
    dataIndex: 'channelBusinessName',
    // scopedSlots: { customRender: 'sourceType' }
  },
  {
    title: '客户经理',
    dataIndex: 'belongUserName'
  },
  {
    title: '全部发送量',
    dataIndex: 'success'
  },
  {
    title: '利润（元）',
    dataIndex: 'profit'
  }
];
export default {
  mixins: [baseMixin],
  name: 'dayProfit',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected: [],
      condition: [
        {
          key: '用户名',
          title: 'account',
          select: false
        },
        {
          key: '通道号',
          title: 'channelBusinessId',
          select: false
        },
        {
          key: '平台',
          title: 'platformId',
          select: true,
          option: [
            {
              title: '金笛广告mas',
              value: 32
            },
            {
              title: '43',
              value: 1
            },
            {
              title: 'v4',
              value: 31
            },
          ]
        },
        {
          key: '客户经理',
          title: 'belongUid',
          select: false
        },
        // {
        //   key: '供应商',
        //   title: 'channel',
        //   select: false
        // },
        {
          key: '创建日期',
          title: 'date',
          select: true,
          times: true
        },
      ],
      Inline: {
      },
      buttonGroup: ['查询', '重置'],
      oncedata: [],
      // 渲染数据条件
      listArr: {},
      // 分页
      pagination: {
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "50"],
        showTotal: total => `共 ${total} 条`,
        showQuickJumper: true,
        onShowSizeChange: (current, pageSize) => {this.switchpage(current, pageSize)}, // 改变每页数量时更新显示
        onChange:(page,pageSize)=>{this.switchpage(page, pageSize)},//点击页码事件
      },
    };
  },
  components: {
    MyTable
  },
  created() {
    this.getInline()
    this.onceDt()
    this.lists()
  },
  methods: {
    async lists () {
      this.listArr = {
        account: '',
        channel: '',
        "size":10,
        "current":1,
        platformId: '',
        belongUid: '',
        sendDateStartTime: '',
        sendDateEndTime: '',
        channelBusinessName: '',
      }
      this.everytimes()
      await dDailyProfit(this.listArr)
        .then((res) => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
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
        this.listArr.channelBusinessName = row.channelBusinessName
        this.listArr.channel = row.channel
        this.listArr.belongUid = row.belongUid
        console.log(this.listArr);
        this.query()
      } else {
        // 重置
        this.getInline()
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
    // ListOperation
    async ListOperation (row, e) {
      if (e == 'name') {
        console.log(row);
      }
    },
    // 查询
    async query() {
      await dDailyProfit(this.listArr).then(res => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => console.log(err))
    },
    async switchpage (current, pageSize) {
      this.listArr.current = current
      this.listArr.size = pageSize
      await dDailyProfit(this.listArr).then(res => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
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
  }
};
</script>
<style lang="less" scoped>
// /deep/.ant-col {
//   padding-top: 30px;
// }
</style>
<style lang="less">
.MyTable {
    width: 98%;
    margin: 20px auto;
    // background-color: #fff;
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