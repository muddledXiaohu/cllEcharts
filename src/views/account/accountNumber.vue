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
const columns = [
  {
    dataIndex: 'number',
    // slots: { title: 'customTitle' },
    title: '申请编号',
    scopedSlots: { customRender: 'number' },
  },
  {
    title: '客户名称',
    dataIndex: 'name',
  },
  {
    title: '创建人',
    dataIndex: 'Creator',
  },
  {
    title: '创建日期',
    dataIndex: 'CreationDate',
  },
  {
    title: '状态',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' },
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [
  {
    key: '1',
    Creator: '胡',
    CreationDate: '2021-10-14',
    name: 'John Brown',
    number: 1,
    state: ['开户中'],
  },
  {
    key: '2',
    Creator: '吴',
    CreationDate: '2021-10-24',
    name: 'Jim Green',
    number: 2,
    state: ['审批中'],
  },
  {
    key: '3',
    Creator: '董',
    CreationDate: '2021-10-51',
    name: 'Joe Black',
    number: 3,
    state: ['审批通过'],
  },
];

export default {
  name: 'accountNumber',
  data() {
    return {
      data,
      columns,
      condition: [
        {
          key: '账号',
          title: 'a'
        }
        // {
        //   key: '申请编号4',
        //   title: 'e'
        // }
      ],
      Inline: {
      },
      ButtonTB: {1: '查询', 2: '重置'},
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
      ]
    };
  },
  components: {
    MyTable,
  },
  created() {
    this.getInline()
    this.onceDt()
  },
  methods: {
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
      if (row.a == "") {
        this.data = this.oncedata
        return;
      }
      for (const key in this.data) {
        if (this.data[key].name.indexOf(row.a) != -1) {
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
}
</style>