<template>
  <div class="main">
    <a-layout>
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible :style="{ overflow: 'auto', height: '100vh' }">
        <!-- 侧边栏 -->
        <h1 class="logo">
          <img src="@/assets/CRM.svg" alt="">
        </h1>
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
            <!-- <a-dropdown class="hdPortrait" placement="bottomRight">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{names}}<a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="logOuts">退出登录</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown> -->
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
// import {Usercenter} from '@/api/login'
import { mapActions } from 'vuex'
// import { ACCESS_ROLEID } from '@/store/mutation-types'
// import storage from 'store'
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
      arrs: [],
      names: ''
    };
  },
  components: {
    MyHeader,
    Breadcrumb,
    TagsView
  },
  created() {
    this.usercenters()
  },
  methods: {
    ...mapActions(['Logout']),
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    async usercenters() {
      let arr = this.$XHCopy(this.$store.getters.routeListArr).map((item) => {
        if (item.children && item.children.length != 0) {
          // arr.splice(idx,1)
          return item
        }
      })
      arr.forEach(element => {
        if (element) {
          this.arrs.push(element)
        }
      });
      // routeListArr
      // this.names = JSON.parse(decodeURIComponent(window.atob(storage.get(ACCESS_ROLEID)))).name
    },
    // 退出登录
    logOuts(){
      const { Logout } = this
      Logout()
      this.$router.go(0);
    }
  },
};
</script>

<style lang="less" scoped>
  /deep/.ant-layout-sider {
    background-color: #fff !important;
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
    margin-left: 15px;
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
  .logo {
    width: 100%;
    height: 40px;
    text-align: center;
    padding-top: 6px;
    img {
      width: 45%;
    }
  }
  .hdPortrait {
    position: absolute;
    right: 70px;
    height: 40px;
    line-height: 40px;
  }
  /deep/.ant-menu-inline {
    border-right: 1px solid #fff;
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
