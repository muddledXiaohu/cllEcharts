import address from "./region";
import MyTable from "@/components/table/table.jsx";
export default {
  components: {
    MyTable,
  },
  props: {
    contacts: {
      type: Object
    },
    noTitleKey: {
      type: String
    },
    // 通信录
    Correspondent: {
      type: Array
    },
    // 账号信息
    TableData: {
      type: Array
    },
    // 分页
    pagination: {
      type: Object
    }
  },
  data() {
    return {
      place: '',
      columns: [
        {
          title: '账号',
          dataIndex: 'spId',
          key: 1,
          width: 100
        },
        {
          title: '发送平台',
          dataIndex: 'platformName',
          key: 3,
          width: 100
        },
        {
          title: '账号属性',
          dataIndex: 'type',
          key: 4,
          width: 100
        },
        {
          title: '账号创建人',
          dataIndex: 'createUsername',
          key: 5,
          width: 100
        },
        {
          title: '账号创建时间',
          dataIndex: 'createTime',
          key: 6,
          width: 100
        },
        {
          title: '当前单价（分）',
          dataIndex: 'AccountCreator',
          key: 7,
          width: 100
        },
        {
          title: '当前单价生效日期',
          dataIndex: 'updateTime',
          key: 8,
          width: 100
        },
        {
          title: '最新调价日期',
          dataIndex: 'updateTime',
          key: 9,
          width: 100
        }
      ],
    };
  },
  render() {
    let customerDetails = null;
    if (this.noTitleKey == '1') {
      customerDetails = 
      <a-descriptions>
        <a-descriptions-item label="客户名称">
          {this.contacts.name}
        </a-descriptions-item>
        <a-descriptions-item label="关联产品">
          {this.contacts.industryDictCode}
        </a-descriptions-item>
        <a-descriptions-item label="客户属性">
          {this.contacts.sourceTypeDesc}
        </a-descriptions-item>
        <a-descriptions-item label="纳税人识别号">
          {this.contacts.tariffNumber}
        </a-descriptions-item>
        <a-descriptions-item label="行业分类">
          {this.contacts.industryDictDesc}
        </a-descriptions-item>
        <a-descriptions-item label="地区">
          {this.place}
        </a-descriptions-item>
        <a-descriptions-item label="详细地址">
          {this.contacts.location}
        </a-descriptions-item>
        <a-descriptions-item label="创建时间">
          {this.contacts.location}
        </a-descriptions-item>
        <a-descriptions-item label="创建人">
          {this.contacts.createTime}
        </a-descriptions-item>
      </a-descriptions>
    } else if (this.noTitleKey == '2') {
      customerDetails = this.Correspondent.map((item, key) => {
        return (<a-descriptions title={'联系人' + parseInt(key+1)}>
        <a-descriptions-item label="姓名">
          {item.name}
        </a-descriptions-item>
        <a-descriptions-item label="职务">
          {item.duty}
        </a-descriptions-item>
        <a-descriptions-item label="部门">
          {item.dept}
        </a-descriptions-item>
        <a-descriptions-item label="手机号">
          {item.phone}
        </a-descriptions-item>
        <a-descriptions-item label="座机">
          {item.telephone}
        </a-descriptions-item>
        <a-descriptions-item label="邮箱">
          {item.email}
        </a-descriptions-item>
        <a-descriptions-item label="球球">
          {item.qqNumber}
        </a-descriptions-item>
        <a-descriptions-item label="微信">
          {item.wechatNumber}
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          {item.remark}
        </a-descriptions-item>
      </a-descriptions>)
      })
    } else {
      customerDetails =
      <MyTable
        class="MyTable"
        columns={this.columns}
        data={this.TableData}
        pagination={this.pagination}
        displayScroll={false}
        Inline={{}}
      />
    }
    return (
      <div>
        {customerDetails}
      </div>
    );
  },
  created() {
    this.contactArr()
  },
  watch: {
  },
  methods: {
    contactArr() {
      // const {address} = this
      this.contacts.provinceNumber = '1'
      this.contacts.cityNumber = '0'
      this.contacts.zoneNumber = '6'
      this.place = address(this.contacts.provinceNumber, this.contacts.cityNumber, this.contacts.zoneNumber)
    },
  },
}