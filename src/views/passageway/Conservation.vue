<template>
  <div>
        <!-- columns table标题栏选择项 -->
        <!-- selectedHeader标题栏已选项 -->
        <!-- displayScroll是否显示左右滚动条 -->
        <!-- condition 查询项 -->
        <!-- Inline 查询绑定数据 -->
        <!-- buttonGroup 查询重置按钮 -->
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
          :buttonGroup="buttonGroup"
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
    key: 1,
    width: 100
  },
  {
    title: '通道号',
    dataIndex: 'name',
    key: 2,
    width: 100
  },
  {
    title: '通道名称',
    dataIndex: 'location',
    key: 3,
    width: 100
  },
  {
    title: '发送范围',
    dataIndex: 'tariffNumber',
    key: 4,
    width: 100
  },
  {
    title: '落地省份',
    dataIndex: 'telephone',
    key: 5,
    width: 100
  },
  {
    title: '全网量控(万)',
    dataIndex: 'sourceType',
    key: 6,
    scopedSlots: { customRender: 'sourceType' },
    width: 100
  },
  {
    title: '省网量控(万)',
    dataIndex: 'sourceTypeDesc',
    key: 7,
    width: 100
  },
  {
    title: '省内占比达标',
    dataIndex: 'industryDictCode',
    key: 8,
    width: 100
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' },
    key: 9,
    width: 200
  }
];
const selected = [
  ];

export default {
  name: 'Conservation',
  data() {
    return {
      data: [],
      // 可选项
      columns,
      // 已选项
      selected,
      condition: [
        {
          key: '通道号',
          title: 'name',
          select: false
        },
        {
          key: '通道商名称',
          title: 'product',
          select: false
        },
      ],
      Inline: {
      },
      buttonGroup: {1: '查询', 2: '重置'},
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