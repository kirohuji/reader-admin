<template>
  <el-dialog :visible.sync="visible" :before-close="close" v-bind="$attrs" custom-class="base-dialog">
    <slot />
    <template v-slot:title>
      <div style="position: relative;">
        <div
          style="
            position: absolute;
            left: 2px;
            top: 20px;
            color: #1684DD;
        "
        >
          <i class="el-icon-arrow-left" />
          <span>返回</span>
        </div>
        <div class="title">{{ $attrs.title }}</div>
      </div>
    </template>
    <template v-slot:footer>
      <slot name="footer">
        <div class="footer">
          <el-button @click="() => (visible = !visible)">取消</el-button>
          <el-button type="primary" @click="() => (visible = !visible)">保存</el-button>
        </div>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    open() {
      this.visible = true
    },
    close(done) {
      // this.$confirm('确认关闭？')
      //     .then((_) => {
      //         done()
      //     })
      //     .catch((_) => {})
      this.visible = false
      done && done()
    }
  }
}
</script>
<style lang="scss"></style>
<style lang="scss">
.base-dialog {
    .el-dialog__header {
        // height: 40px;
        padding: 8px 16px;
        text-align: left;
        // background-color: rgba(242, 242, 242, 1);
        .title {
            padding: 20px;
            text-align: center;
            font-size: 18px;
            color: #000000;
            border-bottom: 1px solid #ccd3d9;
        }
        .el-dialog__title {
            font-size: 14px;
            font-weight: 700;
            color: rgba(56, 56, 56, 1);
        }

        .el-dialog__headerbtn {
            top: 8px;
            right: 8px;
            font-size: 22px;
            .el-dialog__close {
                color: #ccd3d9;
            }
        }
    }

    .el-dialog__body {
        padding: 8px 30px;
        padding-bottom: 50px;
    }
    .el-dialog__footer {
        display: flex;
        justify-content: center;
        .el-button--medium {
            padding: 10px 32px;
        }
    }
}
</style>
