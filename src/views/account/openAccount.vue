<template>
  <div>
        <MyTable 
          class="MyTable"
          @tables="tables"
          @businessGroup="businessGroup"
          :columns="columns"
          :data='data'
          :condition='condition'
          :Inline="Inline"
          :ButtonTB="ButtonTB"
          :operationGroup="operationGroup"
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
    width: 100
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    width: 100
  },
  {
    title: '详细地址',
    dataIndex: 'location',
    width: 100
  },
  {
    title: '纳税人识别号',
    dataIndex: 'tariffNumber',
    width: 100
  },
  {
    title: '座机号码',
    dataIndex: 'telephone',
    width: 100
  },
  {
    title: '客户属性',
    dataIndex: 'sourceType',
    scopedSlots: { customRender: 'sourceType' },
    width: 100
  },
  {
    title: '客户属性描述',
    dataIndex: 'sourceTypeDesc',
    width: 100
  },
  {
    title: '行业类型编码',
    dataIndex: 'industryDictCode',
    width: 100
  },
  {
    title: '行业类型',
    dataIndex: 'industryDictDesc',
    width: 100
  },
  {
    title: '所有人',
    dataIndex: 'belongUser',
    width: 100
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    fixed: 'right',
    width: 200
  },
  {
    dataIndex: 'Transfer',
    key: 'Transfer',
    slots: { title: 'Transfer' },
    width: 40,
    fixed: 'right'
  },
];
const selected = [];

export default {
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
          select: true
        },
        {
          key: '创建日期',
          title: 'date',
          select: true
        },
      ],
      Inline: {
      },
      ButtonTB: {1: '查询', 2: '重置'},
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
      ]
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
        })
        .catch(err => console.log(err))
    },
    getInline () {
      let arr = {}
      for (const key in this.condition) {
        arr[this.condition[key].title] = ''
      }
      this.Inline = arr
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
    query(row) {
      console.log(row);
      let arr = []
      if (row.name == "") {
        this.data = this.oncedata
        return;
      }
      for (const key in this.data) {
        if (this.data[key].name.indexOf(row.name) != -1) {
          arr.push(this.data[key])
        } 
      }
      this.data = arr
    }
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