<template>
  <div id="tags-view-container" class="tags-view-container">
    <div ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.key"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.key }"
        tag="span"
        class="tags-view-item"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{tag.title}}
        <a-icon type="close" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
        
      </router-link>
    </div>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li>刷新</li>
      <li>关闭其他</li>
      <li>关闭所有</li>
    </ul>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
//   components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  mounted () {
    this.initTags()
  },
    computed: {
    visitedViews() {
      return this.$store.state.user.visitedViews
    }
  },
  watch: {
    '$route' () {
      this.initTags()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    ...mapActions(['menuClose']),
    isActive(route) {
      return route.key === this.$route.path
    },
    initTags() {
      // const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      // for (const tag of affixTags) {
      //   // Must have tag name
      //   if (tag.name) {
      //     this.$store.dispatch('tagsView/addVisitedView', tag)
      //   }
      // }
      this.resetSetItem('sideOpenKey', this.$route.path.split("/")[1]);
    },
    // routers() {
    //   console.log(1);
    // },
    closeSelectedTag(view) {
      // menuClose
      const { menuClose } = this
      menuClose(view)
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
  },
}
</script>

<style lang="less" scoped>
.tags-view-container {
  height: 34px;
  width: 98%;
  display: flex;
  // margin: 0 auto;
  align-items: center;
  background: #fff;
  margin-top: 4px;
  // box-shadow:  0 0 0 0 rgba(0, 0, 0, .12),  0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 23px;
      color: #495060;
      font-size: 16px;
      margin-left: 5px;
      margin-top: 4px;
    padding: 0 8px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
      color: #1890ff;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 63%;
          position: absolute;
          height: 8px;
          border-bottom: 3px solid #1890ff;
          bottom: -4px;
          left: 10%;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 15px 16px;
      line-height: 10px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="less">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      font-size: 12px;
      color: #999;
      &:before {
        transform: scale(.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
      color: #333;
      }
    }
  }
}
</style>
