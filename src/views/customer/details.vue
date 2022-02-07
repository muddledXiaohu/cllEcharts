// 客户详情
<template>
  <div>
    <a-card :bordered="false" style="width: 97%; margin: 10px auto; border-radius: 6px;">
      <h2 class="cardH">{{contacts.name}}</h2>
      <div class="userAttribute">
        <span style="padding-right: 50px;">
          客户所有人:  <p>{{contacts.belongUser}}</p> 
        </span>
        <span>
          上次跟进时间:  <p>{{contacts.updateTime}}</p>
        </span>
      </div>
      <div class="individualEvent">
        <a-button type="primary" ghost>编辑客户</a-button>
        <a-popconfirm
          title="是否要删除此客户？"
          ok-text="是"
          cancel-text="否"
          @confirm="deleteConfirm(contacts.id)"
        >
          <a-button type="danger" ghost>删除客户</a-button>
        </a-popconfirm>
          <a-button style="color: #41b883; border-color: #41b883;" ghost>分配客户</a-button>
        <a-popconfirm
          title="是否要领取此客户？"
          ok-text="是"
          cancel-text="否"
          @confirm="receiveConfirm(contacts.id)"
        >
          <a-button style="color: #f5bd00; border-color: #f5bd00;" ghost>领取客户</a-button>
        </a-popconfirm>
      </div>
      <a-button class="antReturn" @click="customerReturn">返回</a-button>
    </a-card>
    <a-card
      style="width: 97%;
    margin: 0 auto;
    border-radius: 6px;"
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
import { contactsList, accountJoin, masterAccount, assignCustomer } from '@/api/customer'// masterAccountDetails, accountJoin 
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
      // 子账号数据
      accountJoinObj: {},
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
      this.accountJoinEvent()
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
    // 查询账号列表（发送账号）
    async accountJoinEvent () {
      let arr = {
        "all": true,
        "current":1,
        "size":10
      }
      await accountJoin(arr)
      .then((res) => {
        console.log(res);
          const { data } = res
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
      await masterAccount(this.listArr)
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
      await assignCustomer(arr)
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
.individualEvent {
  display: flex;
  justify-content: flex-start;
  .ant-btn {
    margin-right: 5%;
  }
}
.cardH {
  font-weight: 700;
}
/deep/.ant-card-body {
  padding: 16px;
}
.antReturn {
  position: absolute;
  top: 10px;
  right: 10px;
}
.userAttribute {
  margin-bottom: 13px;
  p{
    color: #000;
    display: inherit;
  }
}
/deep/.ant-collapse-borderless {
  background-color: #fff;
}
</style>