<template>
  <div>
        <!-- columns table标题栏选择项 -->
        <!-- selectedHeader标题栏已选项 -->
        <!-- displayScroll是否显示左右滚动条 -->
        <!-- condition 查询项 -->
        <!-- Inline 查询绑定数据 -->
        <!-- ButtonTB 查询重置按钮 -->
        <!-- tables 查询重置事件 -->
        <!-- operationGroup 表单业务按钮 -->
        <!-- businessGroup 表单业务事件 -->
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
    key: 1,
    width: 100
  },
  {
    title: '投诉反馈时间',
    dataIndex: 'name',
    key: 2,
    width: 100
  },
  {
    title: '实际下发时间',
    dataIndex: 'location',
    key: 3,
    width: 100
  },
  {
    title: '举报时间',
    dataIndex: 'tariffNumber',
    key: 4,
    width: 100
  },
  {
    title: '号码',
    dataIndex: 'telephone',
    key: 5,
    width: 100
  },
  {
    title: '端口',
    dataIndex: 'sourceType',
    key: 6,
    scopedSlots: { customRender: 'sourceType' },
    width: 100
  },
  {
    title: '投诉途径',
    dataIndex: 'sourceTypeDesc',
    key: 7,
    width: 100
  },
  {
    title: '投诉内容',
    dataIndex: 'industryDictCode',
    key: 8,
    width: 100
  },
  {
    title: '核实内容',
    dataIndex: 'industryDictDesc',
    key: 9,
    width: 100
  },
  {
    title: '账号',
    dataIndex: 'belongUser',
    key: 10,
    width: 100
  },
  {
    title: '归属地运营商',
    dataIndex: 'createUser',
    key: 11,
    width: 100
  },
  {
    title: '签名投诉比',
    dataIndex: 'a',
    key: 12,
    width: 100
  },
  {
    title: '备注',
    dataIndex: 'b',
    key: 13,
    width: 100
  },
  {
    title: '签名',
    dataIndex: 'c',
    key: 14,
    width: 100
  },
  {
    title: '签名发送量',
    dataIndex: 'd',
    key: 15,
    width: 100
  },
  {
    title: '该签名本月投诉次数',
    dataIndex: 'e',
    key: 16,
    width: 100
  },
  {
    title: '该账号本月投诉次数',
    dataIndex: 'f',
    key: 17,
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    key: 18,
    width: 200
  },
];
const selected = [
  ];

export default {
  name: 'ComplaintRecord',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected,
      condition: [
        {
          key: '签名',
          title: 'name',
          select: false
        },
        {
          key: '时间',
          title: 'product',
          select: false
        },
      ],
      Inline: {
      },
      ButtonTB: {1: '查询', 2: '重置'},
      oncedata: [],
      operationGroup: [
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