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
          :selectedHeader="selected"
          :displayScroll="false"
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
    title: '账号',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '客户',
    dataIndex: 'name'
  },
  {
    title: '关联产品',
    dataIndex: 'location'
  },
  {
    title: '平台',
    dataIndex: 'tariffNumber'
  },
  {
    title: '账号属性',
    dataIndex: 'attribute'
  },
  {
    title: '账号创建人',
    dataIndex: 'sourceType'
  },
  {
    title: '账号创建日期',
    dataIndex: 'date'
  },
  {
    title: '当前单价',
    dataIndex: 'currentPrice'
  },
  {
    title: '当前单价生效日期',
    dataIndex: 'currentPriceDate'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    width: 200
  },
  {
    dataIndex: 'Transfer',
    key: 'Transfer',
    slots: { title: 'Transfer' },
    width: 40,
  },
];
const selected = [];

export default {
  name: 'accountNumber',
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
          title: 'name',
          select: false
        },
        {
          key: '客户名称',
          title: 'product',
          select: false
        },
        {
          key: '平台',
          title: 'state',
          select: false
        },
        {
          key: '最新调价日期',
          title: 'owner',
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
              title: '4',
              value: 4
            }
          ]
        }
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