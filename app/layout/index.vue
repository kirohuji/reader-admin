<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div>
      <navbar />
    </div>

    <!-- main -->
    <div class="main-container">
      <sidebar class="sidebar-container" />
      <app-main style="padding-left:8px">
        <card
          style="border-bottom: 1px solid #DCDFE6;display: flex;align-items: center;  justify-content: space-between;padding: 0px 16px"
        >
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;"
          >
            <span>当前位置:</span><breadcrumb
              id="breadcrumb-container"
              class="breadcrumb-container"
            /></div>
          <el-tabs v-model="activeName" class="app-main-tabs" @tab-click="handleClick">
            <el-tab-pane label="政府" name="first" />
            <el-tab-pane label="医疗" name="second" />
            <el-tab-pane label="居民" name="third" />
            <el-tab-pane label="系统" name="fourth" />
          </el-tabs>
        </card>
      </app-main>
    </div>
  </div>
</template>

<script>
import Card from '../components/atoms/Card'
import Breadcrumb from '../components/molecules/Breadcrumb'
import { AppMain, Navbar, Sidebar } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Card,
    Breadcrumb,
    AppMain,
    Navbar,
    Sidebar,
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  data() {
    return {
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~../../../styles/mixin.scss';
@import '~../../../styles/variables.scss';
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
::v-deep .app-main-tabs {
  .el-tabs__header {
    // padding: 4px;
    margin: 0;
  }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.mobile .fixed-header {
    width: 100%;
}
</style>
