<template>
  <div>
        <MyTable 
          class="MyTable"
          @tables="tables"
          @businessGroup="businessGroup"
          :columns="columns"
          :data='data'
          :pagination='pagination'
          :condition='condition'
          :Inline="Inline"
          :ButtonTB="ButtonTB"
          :operationGroup="operationGroup"
          :selectedHeader="selected"
          :displayScroll="true"
        />
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
import { list } from '@/api/customer'
const columns = [
  {
    dataIndex: 'id',
    // slots: { title: 'customTitle' },
    title: '编号',
    scopedSlots: { customRender: 'id' },
    fixed: 'left',
    key: 1,
    width: 100
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    key: 2,
    width: 100
  },
  {
    title: '详细地址',
    dataIndex: 'location',
    key: 3,
    width: 100
  },
  {
    title: '纳税人识别号',
    dataIndex: 'tariffNumber',
    key: 4,
    width: 100
  },
  {
    title: '座机号码',
    dataIndex: 'telephone',
    key: 5,
    width: 100
  },
  {
    title: '客户属性',
    dataIndex: 'sourceType',
    key: 6,
    scopedSlots: { customRender: 'sourceType' },
    width: 100
  },
  {
    title: '客户属性描述',
    dataIndex: 'sourceTypeDesc',
    key: 7,
    width: 100
  },
  {
    title: '行业类型编码',
    dataIndex: 'industryDictCode',
    key: 8,
    width: 100
  },
  {
    title: '行业类型',
    dataIndex: 'industryDictDesc',
    key: 9,
    width: 100
  },
  {
    title: '所有人',
    dataIndex: 'belongUser',
    key: 10,
    width: 100
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    key: 11,
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
    key: 12,
    width: 200
  },
  {
    dataIndex: 'Transfer',
    key: 13,
    slots: { title: 'Transfer' },
    width: 40,
    fixed: 'right'
  }
];
const selected = [
  {
    dataIndex: 'id',
    // slots: { title: 'customTitle' },
    title: '编号',
    scopedSlots: { customRender: 'id' },
    fixed: 'left',
    key: 1,
    width: 100
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    key: 2,
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
    key: 12,
    width: 200
  },
  {
    dataIndex: 'Transfer',
    key: 13,
    slots: { title: 'Transfer' },
    width: 40,
    fixed: 'right'
  }
  ];

export default {
  name: 'international',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected,
      condition: [
        {
          key: '客户名称',
          title: 'name',
          select: false
        },
        {
          key: '关联产品',
          title: 'product',
          select: true,
          option: [
            {
              title: '短信',
              value: 1
            }
          ]
        },
        {
          key: '分配状态',
          title: 'distributionStatus',
          select: true,
          option: [
            {
              title: '未分配',
              value: 1
            },
            {
              title: '已分配',
              value: 2
            }
          ]
        },
        {
          key: '客户所有人',
          title: 'belongUid'
        },
      ],
      Inline: {
      },
      ButtonTB: {1: '查询', 2: '重置'},
      oncedata: [],
      operationGroup: [
        {
          name: '新建',
          disabled: false
        },
        {
          name: '批量导入',
          disabled: false
        },
        {
          name: '批量分配',
          disabled: true
        },
        {
          name: '批量领取',
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
        onShowSizeChange: (current, pageSize) => {console.log(current, pageSize);}, // 改变每页数量时更新显示
        onChange:(page,pageSize)=>{console.log(page, pageSize);},//点击页码事件
      },
    };
  },
  components: {
    MyTable,
  },
  created() {
    this.getInline()
    this.onceDt()
    this.lists()
  },
  methods: {
    async lists () {
      const a = {
            "page":1,
            "count":10,
            "name":"",
            "belongUid":1,
            "distributionStatus":0,
            "all":false,
            "self":false
            }
      await list(a)
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
        console.log(1);
      } else {
        console.log(row);
      }
    },
    // 查询
    async query(row) {
      await list(row).then(res => {
        console.log(res);
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
<style lang="less">
.MyTable {
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