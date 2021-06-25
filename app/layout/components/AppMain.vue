<template>
  <section class="app-main">
    <slot />
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <card>
        <router-view :key="key" />
      </card>
    </transition>
  </section>
</template>

<script>
import Card from '../../components/atoms/Card'
export default {
  name: 'AppMain',
  components: {
    Card
  },
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/variables.scss";

.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: calc(100% - 210px);
  position: relative;
  overflow: hidden;
  margin-left: $sideBarWidth;
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
