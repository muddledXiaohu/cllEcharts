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
          :permissionButton="permissionButton"
          :displayScroll="true"
          :sourceTypeArr="sourceTypeArr"
          @writeOff="writeOff"
        />
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
// 接口
import { queryMonthly } from '@/api/bill'
import { baseMixin } from '@/store/app-mixin'

const columns = [
  {
    // slots: { title: 'customTitle' },
    title: '账单编号',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '账号',
    dataIndex: 'account'
  },
  {
    title: '客户名称',
    dataIndex: 'customerName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '结算月份',
    dataIndex: 'updateTime',
    // scopedSlots: { customRender: 'sourceType' }
  },
  {
    title: '结算开始日期',
    dataIndex: 'beginDate'
  },
  {
    title: '结算结束日期',
    dataIndex: 'endDate'
  },
  {
    title: '总金额（未核销）',
    dataIndex: 'totalPrice'
  },
  {
    title: '核销总金额',
    dataIndex: 'verifiedTotalPrice'
  },
  // {
  //   title: '提交条数',
  //   dataIndex: 'profit'
  // },
  // {
  //   title: '成功条数',
  //   dataIndex: 'profit'
  // },
  // {
  //   title: '计费条数',
  //   dataIndex: 'profit'
  // },
  {
    title: '单价（分）',
    children: [
      {
        title: '移动核销单价',
        dataIndex: 'ydVerifiedPrice'
      },
      {
        title: '联通核销单价',
        dataIndex: 'ltVerifiedPrice'
      },
      {
        title: '电信核销单价',
        dataIndex: 'dxVerifiedPrice'
      },
      {
        title: '三网其他核销单价',
        dataIndex: 'otherVerifiedPrice'
      },
    ]
  },
  {
    title: '核销备注',
    dataIndex: 'verifiedRemark'
  },
  {
    title: '是否已核销',
    dataIndex: 'verifiedStatus',
    scopedSlots: { customRender: 'sourceType' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
    key: 12,
    width: 200
  },
];
export default {
  mixins: [baseMixin],
  name: 'WriteOffMBill',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected: [],
      condition: [
        {
          key: '账单编号',
          title: 'id',
          select: false
        },
        {
          key: '账号',
          title: 'account',
          select: false
        },
        {
          key: '客户名称',
          title: 'customerId',
          select: false
        },
        {
          key: '回款状态',
          title: 'payStatus',
          select: true,
          option: [
            {
              title: '未回款',
              value: 0
            },
            {
              title: '部分回款',
              value: 1
            },
            {
              title: '已回款',
              value: 2
            }
          ]
        },
        {
          key: '结算月份',
          title: 'sendDate',
          select: true,
          times: true,
          month: true
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
      // sourceType核销状态（0-未核销 1-已核销，9-正在核销
      sourceTypeArr: {
        "0": {color: 'blue', tit: '未核销'},
        "1": {color: 'blue', tit: '已核销'},
        "9": {color: 'blue', tit: '正在核销'},
      },
      // 权限按钮
      permissionButton: [
        {
          name: '核销',
          title: 'check',
          clck: 'writeOff',
          jurisdiction: 'verifiedStatus'
        },
      ]
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
        "size":10,
        "current":1,
      }
      this.everytimes()
      await queryMonthly(this.listArr)
        .then((res) => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
        })
        .catch(err => console.log(err))
    },
    everytimes () {
      this.listArr.sendDate = ''
    },
    onceDt() {
      this.oncedata = this.$XHCopy(this.data)
    },
    // 事件
    tables(row, e) {
      if (e == '查询') {
        if (row.date) {
          this.listArr.sendDate = row.date._d.getFullYear() + '-' + this.pgetMonth((row.date._d.getMonth() + 1))
          this.Inline.date = 1
        } else {
          this.everytimes()
          this.Inline.date = ""
        }
        this.listArr.channelBusinessName = row.channelBusinessName
        this.listArr.channel = row.channel
        this.listArr.belongUid = row.belongUid
        this.query()
      } else {
        // 重置
        this.getInline()
      }
    },
    pgetMonth(s) {
      return s < 10 ? '0' + s : s
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
      await queryMonthly(this.listArr).then(res => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => console.log(err))
    },
    async switchpage (current, pageSize) {
      this.listArr.current = current
      this.listArr.size = pageSize
      await queryMonthly(this.listArr).then(res => {
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
    // 核销
    writeOff (e) {
      if (e.verifiedStatus == 0) {
        console.log(e);
      }
      // this.$router.push({ name: 'NewCustomer', params: e })
    }
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