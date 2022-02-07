<template>
  <div class="main">
    <a-layout>
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible :style="{ overflow: 'auto', height: '100vh' }">
        <!-- 侧边栏 -->
        <h1>？跟谁学</h1>
        <MyHeader :menu="false" :currentUser='arrs' />
      </a-layout-sider>
      <a-layout>
        <!-- Header -->
        <a-layout-header class="layoutHeader">
          <div class="expandMenu">
            <a-button
              type="primary"
              class="toggleCollapsed"
              @click="toggleCollapsed"
            >
              <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <Breadcrumb class="Breadcrumb" />
          </div>
          <TagsView />
        </a-layout-header>
        <a-layout-content>
          <!-- <div class="rootlk">
            <TagsView />
          </div> -->
          <!-- 内容 -->
          <div class="keepalv">
            <keep-alive :max="10" :include="cachedViews">
              <router-view :key="key" />
            </keep-alive>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MyHeader from "@/components/menu/menu.jsx";
import Breadcrumb from "@/components/table/breadcrumb.jsx";
import TagsView from "@/components/TagsView";
export default {
  computed: {
    cachedViews() {
      let arr = []
      for (const key in this.$store.state.user.visitedViews) {
        arr.push(this.$store.state.user.visitedViews[key].name)
      }
      return arr
    },
    key() {
      return this.$route.path
    }
  },
  data() {
    return {
      collapsed: false,
      arrs: [
        {title: '客户管理', name: 'customer', id: 1, key: '/customer', children:[
          {title:'客户公海', name: 'international', key: '/customer/international'},
          {title:'我的客户', name: 'mine', key: '/customer/mine'} 
        ]},
        {title: '开户管理', name: 'user', id: 2, key: '/user', children:[
          {title: '开户申请', name: 'openAccount', key: '/user/openAccount'},
          {title: '主账号', name: 'mainAccountNumber', key: '/user/mainAccountNumber'},
          {title: '发送账号', name: 'sonAccountNumber', key: '/user/sonAccountNumber'}
        ]},
        {
          title: '统计管理', name: 'statistics', id: 3, key: 'statistics', children: [
          {title: '日毛利', name: 'dayGrossProfit', key: '/statistics/dayGrossProfit'},
          {title: '日利润', name: 'dayProfit', key: '/statistics/dayProfit'},
          ]
        },
        {title: '账单管理', name: 'bill', id: 4, key: '/bill', children:[
          {title: '客户月账单', name: 'MonthlyBill', key: '/bill/MonthlyBill'},
          {title: '客户月核销账单', name: 'WriteOffMBill', key: '/bill/WriteOffMBill'},
          {title: '客户回款', name: 'Collection', key: '/bill/Collection'},
          {title: '开票管理', name: 'Invoicing', key: '/bill/Invoicing'},
          {title: '通道月账单', name: 'passagewayMBill', key: '/bill/passagewayMBill'},
          {title: '通道月核销账单', name: 'passagewayWriteOffMB', key: '/bill/passagewayWriteOffMB'}
        ]},
        {title: '通道管理', name: 'passageway', id: 5, key: '/passageway', children:[
          {title: '通道商', name: 'merchant', key: '/passageway/merchant'},
          {title: '通道保量', name: 'Conservation', key: '/passageway/Conservation'},
          {title: '通道保量达标-可视化', name: 'ConservationEchats', key: '/passageway/ConservationEchats'}
        ]},
        {title: '客诉记录', name: 'ComplaintRecord', id: 6, key: '/operate/ComplaintRecord'},
        {title: 'role', name: 'role', id: 7, key: '/user/role'},
        // {title: 'c', id: 3, key: 'user/roo'}
      ]
    };
  },
  components: {
    MyHeader,
    Breadcrumb,
    TagsView
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
};
</script>

<style lang="less" scoped>
  /deep/.ant-layout-sider {
    background-color: #fff;
  }
  .main {
    height: 100%;
  }
  /deep/.ant-layout.ant-layout-has-sider {
      height: 100%;
  }
  /deep/.ant-layout-header {
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }
  /deep/ .ant-layout {
      position: relative;
  }
  .toggleCollapsed{
    margin-right: 10px;
  }
  .Breadcrumb {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding-left: 40px;
  }
  // .keepalv {
  //   margin-top: 150px;
  // }
  .layoutHeader {
    width: 98%;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 10px;
  }
  .expandMenu {
    display: flex;
    align-items: center;
    height: 60px;
  }
</style>
<style lang="less">
  .FormActionItem {
    margin-bottom: 10px;
  }
  .formModelMenuHeader {
      background-color: #fff;
      padding: 10px;
      margin: 0 auto;
      margin-bottom: 10px;
      border-radius: 8px;
  }
  .HoperationGroup {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
  }
  .hwGTable {
    border-radius: 10px;
    background-color: #fff;
  }
</style>
