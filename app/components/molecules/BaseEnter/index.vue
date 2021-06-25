<template>
  <div style="display: flex;">
    <!-- 输入框-->
    <template v-if="$attrs.component === 'input'">
      <el-input v-model="model[$attrs.prop]" v-bind="$attrs" />
    </template>
    <!-- 日期选择器-->
    <template v-else-if="$attrs.component === 'date-picker'">
      <el-date-picker v-model="model[$attrs.prop]" v-bind="$attrs" />
    </template>
    <!-- 地址选择器-->
    <!-- <template v-else-if="$attrs.component === 'address'">
      <el-cascader v-model="model[$attrs.prop]" v-bind="$attrs" :options="regionData" />
    </template> -->
    <!-- 一般选择器-->
    <template v-else-if="$attrs.component === 'select'">
      <el-select v-model="model[$attrs.prop]" v-bind="$attrs">
        <el-option v-for="item in $attrs.options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </template>
    <!-- 一般选择器-->
    <template v-else-if="$attrs.component === 'radio-border-group'">
      <el-radio-group v-model="model[$attrs.prop]" v-bind="$attrs" class="radio-border-group">
        <el-radio v-for="item in $attrs.options" :key="item.value" :label="item.value || item.label">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <div v-if="$attrs.import" style="margin-left: 8px">
      <el-button type="primary">导入</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseEnter',
  // eslint-disable-next-line vue/require-prop-types
  props: ['model']
}
</script>
<style lang="scss">
.radio-border-group {
    padding: 16px 0px 0 16px;
    border: 1px solid #b6c8d5;
    border-radius: 4px;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    .el-radio {
        width: 115px;
        margin-bottom: 15px;
    }
}
</style>
