<template>
  <div>
        <MyTable 
          class="MyTable"
          @tables="tables"
          @businessGroup="businessGroup"
          @ListOperation="ListOperation"
          :columns="columns"
          :data='data'
          :pagination='pagination'
          :condition='condition'
          :Inline="Inline"
          :buttonGroup="buttonGroup"
          :operationGroup="operationGroup"
          :selectedHeader="selected"
          :displayScroll="true"
        />
        <ChangeOpenAccoint
          :openAccoint="openAccoint"
          @newlyBuildCancel="newlyBuildCancel"
         />
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
import ChangeOpenAccoint from "./changeOpenAccoint.vue";
import { masterAccount, subAccountDetails} from '@/api/accout'
// import { ACCESS_CONTACTS } from '@/store/mutation-types'
import { baseMixin } from '@/store/app-mixin'
const columns = [
  {
    dataIndex: 'platformName',
    // slots: { title: 'customTitle' },
    title: '发送平台',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '账号名',
    dataIndex: 'username'
  },
  {
    title: '昵称',
    dataIndex: 'trueName'
  },
  {
    title: '客户名',
    dataIndex: 'customerName'
  },
  {
    title: '等级',
    dataIndex: 'userGrade'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'sourceType' }
  },
  {
    title: '所属团队',
    dataIndex: 'belongsToTeam'
  },
  {
    title: '所有人',
    dataIndex: 'belongUsername'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 200
  }
];
const selected = [];

export default {
  mixins: [baseMixin],
  name: 'mainAccountNumber',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected,
      condition: [
        {
          key: '账号',
          title: 'username',
          select: false
        },
        {
          key: '客户名称',
          title: 'customerName',
          select: false
        },
        {
          key: '平台',
          title: 'platformId',
          select: true,
          option: [
            {
              title: '1',
              value: 1
            },
            {
              title: '2',
              value: 2
            },
            {
              title: '3',
              value: 3
            },
            {
              title: '未申请',
              value: 4
            }
          ]
        },
        {
          key: '调价时间',
          title: 'updateTime',
          select: true,
          option: [
            {
              title: '1',
              value: 1
            },
            {
              title: '2',
              value: 2
            }
          ]
        },
      ],
      Inline: {
      },
      buttonGroup: ['查询', '重置'],
      oncedata: [],
      operationGroup: [
        {
          name: '批量调价',
          disabled: true
        },
        {
          name: '批量导出',
          disabled: true
        }
      ],
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
      // 渲染数据条件
      listArr: {},
      // 查看用户
      openAccoint: false
    };
  },
  components: {
    MyTable,
    ChangeOpenAccoint
  },
  created() {
    this.getInline()
    this.onceDt()
    this.lists()
  },
  methods: {
    async lists () {
      this.listArr = {
      /*  customerId:0,
        platformId:0,
        username: '',
        belongUid:0,
        accountJoinId:0,
        belongToTeam: '',
        status:0,
        userGrade:0,
        all: true, */
        "size":10,
        "current":1,
      }
      await masterAccount(this.listArr)
        .then((res) => {
          console.log(res)
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
        })
        .catch(err => console.log(err))
    },
    onceDt() {
      this.oncedata = this.$XHCopy(this.data)
    },
    // 事件
    tables(row, e) {
      // 查询
      if (e == '查询') {
        this.query(row)
      } else {
        // 重置
        this.getInline()
      }
    },
    // ListOperation
    async ListOperation (row, e) {
      if (e == 'name') {
        console.log(row);
        await subAccountDetails(row.id)
          .then((res) => {
            console.log(res)
            this.openAccoint = true
          })
          .catch(err => console.log(err))
      }
    },
    // 查询
    async query(row) {
      await masterAccount(row).then(res => {
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
    // 分页事件
    async switchpage (current, pageSize) {
      this.listArr.current = current
      this.listArr.size = pageSize
      await masterAccount(this.listArr).then(res => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => console.log(err))
    },
    // 业务组件
    businessGroup(row, e) {
      //业务逻辑代码...
      console.log(row, e);
    },
    // 关闭
    async newlyBuildCancel (row) {
      this.openAccoint = row
    }
  }
};
</script>
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