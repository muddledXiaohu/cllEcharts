// 客户详情
<template>
  <div>
    <div class="OperationReturn">
      <a-button class="antReturn" @click="customerReturn">返回</a-button>
    </div>
    <a-card :bordered="false" style="width: 97%; margin: 10px auto;">
      <h3>{{contacts.name}}</h3>
      <p><span style="padding-right: 50px;">客户所有人:  {{contacts.belongUser}} </span><span>上次跟进时间:  {{contacts.updateTime}}</span></p>
      <div class="individualEvent">
        <a-button>编辑客户</a-button>
          <a-popconfirm
            title="是否要删除此客户？"
            ok-text="是"
            cancel-text="否"
            @confirm="deleteConfirm(contacts.id)"
          >
            <a-button>删除客户</a-button>
          </a-popconfirm>
        <a-button>分配客户</a-button>
          <a-popconfirm
            title="是否要领取此客户？"
            ok-text="是"
            cancel-text="否"
            @confirm="receiveConfirm(contacts.id)"
          >
            <a-button>领取客户</a-button>
          </a-popconfirm>
      </div>
    </a-card>
    <a-card
      style="width:100%"
      :tab-list="tabList"
      :active-tab-key="noTitleKey"
      @tabChange="key => onTabChange(key)"
    >
      <a-collapse :bordered="false">
          <detailsDescript
            :noTitleKey="noTitleKey"
            :contacts="contacts"
            :Correspondent="Correspondent"
            :TableData="TableData"
            :pagination="pagination" />
      </a-collapse>
    </a-card>
  </div>
</template>
<script>
import { baseMixin } from '@/store/app-mixin'
import detailsDescript from "@/views/customer/detailsDescript.jsx";
import { contactsList, SubAccountDetails, MasterAccount, AssignCustomer } from '@/api/customer'// MasterAccountDetails, accountJoin 
export default {
  mixins: [baseMixin],
  // name: 'details',
  data() {
    return {
      contacts: {},
      noTitleKey: '1',
      tabList: [
        {
          key: '1',
          tab: '基本信息',
        },
        {
          key: '2',
          tab: '联系人信息',
        },
        {
          key: '3',
          tab: '账号信息',
        },
      ],
      Correspondent: [],
      // 主账号数据
      MasterAccountDetailsObj: {},
      // 子账号数据
      SubAccountDetailsObj: {},
      // TableData
      TableData: [],
      listArr: {},
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
    }
  },
  components: {
    detailsDescript,
  },
  // watch: {
  //   contactsOBJ() {
  //     this.contactsF()
  //   }
  // },
  created() {
      this.contactsFEvent()
      // this.MasterAccountDetailsEvent()
      this.SubAccountDetailsEvent()
  },
  methods: {
    // 查询客户列表
    async contactsFEvent () {
      this.contacts = JSON.parse(JSON.stringify(this.contactsOBJ))
      // console.log(this.contacts);
      await contactsList(this.contacts.id)
      .then((res) => {
        const { data } = res
        this.Correspondent = data.records
      }).catch(err => {
        console.log(err)
      })
    },
    // 查看主账号明细
    // async MasterAccountDetailsEvent () {
    //   await MasterAccountDetails(this.contacts.id)
    //   .then((res) => {
    //     console.log(res);
    //     this.MasterAccountDetailsObj = res
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 查看子账号明细
    async SubAccountDetailsEvent () {
      await SubAccountDetails(this.contacts.id)
      .then((res) => {
        this.SubAccountDetailsObj = res
        this.detailsMasterAccount()
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询主账号列表
    async detailsMasterAccount () {
      this.listArr = {
        spid: this.SubAccountDetailsObj.id,
        customerId: this.contacts.id,
        accountId: this.SubAccountDetailsObj.accountId,
        platformId: 1,
        belongUid: this.contacts.belongUid,
        createTimeStartTime: this.SubAccountDetailsObj.startHour + this.SubAccountDetailsObj.endHour,
        createTimeEndTime: this.SubAccountDetailsObj.startHour + this.SubAccountDetailsObj.endHour,
        joinProtocol: this.SubAccountDetailsObj.joinProtocol,
        all: true,
        current: 1,
        size: 10
      }
      await MasterAccount(this.listArr)
      .then((res) => {
        const { data } = res
        console.log(data);
        this.TableData = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => {
        console.log(err)
      })
    },
    // switchpage
    async switchpage (current, pageSize) {
      this.listArr.current = current
      this.listArr.size = pageSize
      await MasterAccount(this.listArr)
      .then((res) => {
        const { data } = res
        console.log(data);
        this.TableData = data.records
          this.pagination.total = data.total
          this.pagination.pageSize = data.pageSize
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除客户
    deleteConfirm(e) {
      console.log(e);
      this.customerReturn()
    },
    // 领取客户
    async receiveConfirm(e) {
      console.log(e);
      const arr ={
        ids: e,
        uid: this.contacts.belongUid
      }
      await AssignCustomer(arr)
      .then((res) => {
        console.log(res);
        if (res.code == 200) {
        this.$message.success('领取成功！');
          this.customerReturn()
          return;
        }
        this.$message.error(res.msg);
      }).catch(err => {
        console.log(err)
      })
    },
    customerReturn () {
      this.$router.go(-1);
    },
    onTabChange(key) {
      this['noTitleKey'] = key;
    }
  }
};
</script>
<style lang="less" scoped>
.OperationReturn {
    text-align: right;
    padding: 10px 0;
    .antReturn {
        margin-right: 20px;
    }
}
.individualEvent {
  display: flex;
  justify-content: flex-start;
  .ant-btn {
    margin-right: 5%;
  }
}
</style>