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
        <a-modal
          v-model="visible"
          title="分配客户"
          okText="确认"
          cancelText="取消"
          @ok="handleOk"
          :maskClosable="false"
          :closable="false"
        >
        <div v-for="(key, idx) in CustomerNumber" :key="idx">
          <h4>客户编号：{{key.id}}</h4>
          <p>客户名称：{{key.name}}</p>
          <a-divider v-show="idx+1 < CustomerNumber.length" />
        </div>
        <div style=" margin-top: 30px;" v-if="othersThemselves == 1">
          <span style="margin-right: 10px;">分配给：</span>
          <a-select style="width: 200px;" placeholder="请输入并选择负责人" @change="handleChange">
            <a-select-option value="1">
              hu
            </a-select-option>
            <a-select-option value="2">
              wu
            </a-select-option>
            <a-select-option value="3" disabled>
              liu
            </a-select-option>
            <a-select-option value="4">
              dong
            </a-select-option>
          </a-select>
        </div>
        </a-modal>
  </div>
</template>
<script>
import MyTable from "@/components/table/table.jsx";
import { list, AssignCustomer } from '@/api/customer'
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
  name: 'international',
  mixins: [baseMixin],
  data() {
    return {
      data: [
      {
        "permitEdit": false,
        "permitDistribute": false,
        "permitDelete": true,
        "permitReceive": true,
        "tags": "dolor non",
        "zoneNumber": 46,
        "name": "当群根别方",
        "belongUid": "29",
        "location": "fugiat officia ut culpa",
        "createUser": "non ut",
        "sourceTypeDesc": "quis irure sint dolore",
        "industryDictCode": "33",
        "belongUser": "deserunt ullamco ad veniam",
        "updateTime": "1990-01-17 18:45:50",
        "id": 15,
        "industryDictDesc": "anim culpa Duis",
        "telephone": "18641715342",
        "createTime": "1993-04-23 07:59:01",
        "tariffNumber": "99",
        "cityNumber": 99,
        "provinceNumber": 46,
        "sourceType": 99,
        "createUid": "33"
      },
      {
        "permitEdit": false,
        "permitDistribute": false,
        "permitDelete": false,
        "permitReceive": true,
        "tags": "incididunt elit",
        "zoneNumber": 45,
        "sourceType": 24,
        "updateTime": "2019-08-13 15:01:14",
        "telephone": "18118284881",
        "createTime": "2006-03-27 06:17:15",
        "sourceTypeDesc": "nostrud officia",
        "industryDictCode": "72",
        "cityNumber": 68,
        "industryDictDesc": "ullamco nulla mollit adipisicing aliqua",
        "tariffNumber": "87",
        "id": 50,
        "provinceNumber": 86,
        "createUser": "veniam",
        "location": "exercitation ex Excepteur occaecat in",
        "name": "求法维快",
        "belongUser": "proident occaecat aliqua Lorem dolor",
        "createUid": "75",
        "belongUid": "78"
      },
      {
        "permitEdit": true,
        "permitDistribute": true,
        "permitDelete": true,
        "permitReceive": false,
        "tags": "Ut",
        "updateTime": "1976-04-17 16:40:21",
        "name": "和将小因过派",
        "sourceType": 96,
        "createUser": "laborum magna",
        "belongUser": "sit veniam",
        "zoneNumber": 50,
        "id": 56,
        "cityNumber": 50,
        "location": "ex in",
        "createTime": "2001-09-28 22:55:46",
        "provinceNumber": 57,
        "createUid": "86",
        "tariffNumber": "95",
        "telephone": "18683719119",
        "industryDictDesc": "ex ad in",
        "sourceTypeDesc": "ullamco ex",
        "industryDictCode": "71",
        "belongUid": "43"
      }
    ],
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
        onShowSizeChange: (current, pageSize) => {this.switchpage(current, pageSize)}, // 改变每页数量时更新显示
        onChange:(page,pageSize)=>{this.switchpage(page, pageSize)},//点击页码事件
      },
      // 渲染数据条件
      listArr: {},
      // visible
      visible: false,
      // 客户编号
      CustomerNumber: [],
      // 分配还是领取?
      othersThemselves: 1,
      // 分配人id
      assignorId:null
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
      this.listArr = {
            "page":1,
            "count":10,
            "name":"",
            "belongUid":1,
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
      //业务逻辑代码...
      callback(result);
      if (e == '新建') {
        this.$router.push({ name: 'NewCustomer' })
        console.log(1);
      } else if(e == '批量分配') {
        this.othersThemselves = 1
        this.CustomerNumber = row
        this.visible = true;
      } else if (e == '批量领取') {
        let belong = JSON.parse(JSON.stringify(this.roles))
        this.othersThemselves = 2
        this.CustomerNumber = row
        this.visible = true;
        this.assignorId = belong.id
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
    
    async handleOk() {
      this.visible = false;
      for (const key in this.CustomerNumber) {
        console.log(1);
        await AssignCustomer({id: this.CustomerNumber[key].id, uid: this.assignorId}).then(res => {
          console.log(res);
        }).catch(err => {
          console.log(err)
          this.$message.error('分配失败！');
        })
      }
      this.othersThemselves == 1 ? this.$message.success('已分配完成！') : this.$message.success('已领取完成！')
    },
    
    handleChange(value) {
      this.assignorId = value
    },
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