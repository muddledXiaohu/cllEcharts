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
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
import { list, giveupHighSeas } from '@/api/customer'
import { ACCESS_CONTACTS } from '@/store/mutation-types'
import { baseMixin } from '@/store/app-mixin'
const columns = [
  {
    dataIndex: 'id',
    // slots: { title: 'customTitle' },
    title: '编号',
    fixed: 'left',
    key: 1,
    width: 100
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'id'},
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
  mixins: [baseMixin],
  name: 'mine',
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
          key: '最新跟进时间',
          title: 'distributionStatus',
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
        }
      ],
      Inline: {
      },
      buttonGroup: ['查询', '重置'],
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
          name: '批量退回公海',
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
      listArr: {}
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
      await list(this.listArr)
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
      const that =this
      //业务逻辑代码...
      callback(result);
      if (e == '新建') {
        this.$router.push({ name: 'NewCustomer' })
        console.log(1);
      } else {
        // 批量退回公海
        this.$confirm({
          title: '是否批量退回公海',
          //自定义按钮内容
          okText: "确认",
          cancelText: "取消",
          onOk() {
            that.retreatHighSeas(row)
          },
          onCancel() {},
        });
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
      await list(row).then(res => {
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
      await list(this.listArr).then(res => {
          const { data } = res
          this.data = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => console.log(err))
    },
    // 批量退回公海
    async retreatHighSeas (e) {
      for (const key in e) {
        console.log(e[key]);
        await giveupHighSeas({ids: e[key]}).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err)
          this.$message.error('失败！');
          return;
        })
      }
        this.$message.success('已全部退回！');
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