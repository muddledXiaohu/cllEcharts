<template>
  <div class="main">
    <a-layout>
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <!-- 侧边栏 -->
        <MyHeader :menu="false" :currentUser='arrs' />
      </a-layout-sider>
      <a-layout>
        <!-- Header -->
        <a-layout-header>
          <a-button
            type="primary"
            style="margin-bottom: 16px"
            @click="toggleCollapsed"
          >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
        </a-layout-header>
        <a-layout-content>
          <!-- 内容 -->
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MyHeader from "@/components/header/header.vue";
export default {
  data() {
    return {
      collapsed: false,
      arrs: [
        {title: 'a', id: 1},
        {title: 'b', id: 2},
        {title: 'c', id: 3}
      ]
    };
  },
  components: {
    MyHeader,
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.ant-layout-header {
  background-color: #fff;
}
/deep/.ant-layout-sider {
  background-color: #fff;
}
.main {
  height: 100%;
}
/deep/.ant-layout.ant-layout-has-sider {
    height: 100%;
}
</style>
