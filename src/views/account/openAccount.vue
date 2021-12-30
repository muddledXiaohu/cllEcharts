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
        <NewOpenAccoint
          :openAccoint="openAccoint"
          @newlyBuildCancel="newlyBuildCancel"
         />
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
import NewOpenAccoint from "./newOpenAccoint.vue";
import { applicationList } from '@/api/user'
import { ACCESS_CONTACTS } from '@/store/mutation-types'
import { baseMixin } from '@/store/app-mixin'
const columns = [
  {
    dataIndex: 'id',
    // slots: { title: 'customTitle' },
    title: '申请编号',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '客户名称',
    dataIndex: 'customerName'
  },
  {
    title: '创建人',
    dataIndex: 'createUsername'
  },
  {
    title: '创建日期',
    dataIndex: 'createTime'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'sourceType' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 200
  }
];
const selected = [
  ];

export default {
  mixins: [baseMixin],
  name: 'openAccount',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected,
      condition: [
        {
          key: '申请编号',
          title: 'name',
          select: false
        },
        {
          key: '客户名称',
          title: 'product',
          select: false
        },
        {
          key: '创建人',
          title: 'state',
          select: false
        },
        {
          key: '状态',
          title: 'owner',
          select: true,
          option: [
            {
              title: '审批中',
              value: 1
            },
            {
              title: '开户中',
              value: 2
            },
            {
              title: '审批通过',
              value: 3
            },
            {
              title: '未申请',
              value: 4
            }
          ]
        },
        {
          key: '创建日期',
          title: 'date',
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
          name: '新建开户申请',
          disabled: false
        },
        {
          name: '批量提交',
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
      // 新建开户
      openAccoint: false
    };
  },
  components: {
    MyTable,
    NewOpenAccoint
  },
  created() {
    this.getInline()
    this.onceDt()
    this.lists()
  },
  methods: {
    async lists () {
      let belong = JSON.parse(JSON.stringify(this.roles))
      this.listArr = {
            "page":1,
            "count":10,
            "name":"",
            "belongUid":belong.id,
            "distributionStatus":0,
            "all":false,
            "self":false
            }
      await applicationList(this.listArr)
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
    tables(row, e, callback) {
      let result = false;
      //业务逻辑代码...
      callback(result);
      // 查询
      if (e == '查询') {
        this.query(row)
      } else {
        // 重置
        this.getInline()
      }
    },
    // 业务组件
    businessGroup(row, e, callback) {
      let result = false;
      //业务逻辑代码...
      callback(result);
      if (e == '新建开户申请') {
        // this.$router.push({ name: 'newOpenAccoint' })
        this.openAccoint = true
        console.log(1);
      } else {
        console.log(2);
      }
    },
    // ListOperation
    ListOperation (row, e, callback) {
      let result = false;
      //业务逻辑代码...
      callback(result);
      if (e == 'name') {
        // console.log(row);
        this.$store.commit(ACCESS_CONTACTS, row)
        this.$router.push({ name: 'details' })
      }

    },
    // 查询
    async query(row) {
      await applicationList(row).then(res => {
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
      this.listArr.page = current
      this.listArr.count = pageSize
      await applicationList(this.listArr).then(res => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => console.log(err))
    },
    // 取消新建
    newlyBuildCancel (row) {
      this.openAccoint = row
    }
  }
};
</script>
<style lang="less">
.MyTable {
    width: 95%;
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