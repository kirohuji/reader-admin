<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm :forms="config.search" label-position="right" style="justify-content: space-between;">
        <template v-slot:right>
          <el-button>新建活动</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable v-bind="table" style="padding: 0">
        <template v-slot:operation>
          <div>
            <el-link type="primary" @click="$refs.baseDialog.open()">编辑</el-link>
            <el-link type="primary">禁用</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog ref="baseDialog" title="新增用户">
      <DataForm :forms="config.form" label-position="right" />
    </BaseDialog>
  </div>
</template>

<script>
import DataTable from '../../components/organisms/DataTable'
import DataSearchForm from '../../components/organisms/DataSearchForm'
import DataForm from '../../components/organisms/DataForm'
import BaseDialog from '../../components/molecules/BaseDialog.vue'
import Card from '../../components/atoms/Card'
import config from './config'
export default {
  components: {
    Card,
    DataTable,
    DataSearchForm,
    DataForm,
    BaseDialog
  },
  data() {
    return {
      config: config,
      table: {
        data: [
          {
            name: '王真',
            sex: '男',
            age: 43,
            card: '330324199708025997',
            type: '脱贫',
            country: '普格县',
            towns: '花山镇',
            address: '补觉村015号',
            source: '系统预警',
            content: '年度医疗自费支出4540',
            chance: '高',
            date: '2021.01.21 10:211',
            audit: '待审核',
            audit_date: '-'
          }
        ],
        column: [
          {
            prop: 'name',
            label: '姓名',
            width: '80'
          },
          {
            prop: 'sex',
            label: '性别',
            width: '60'
          },
          {
            prop: 'age',
            label: '年龄',
            width: '60'
          },
          {
            prop: 'card',
            label: '身份证号',
            width: '150'
          },
          {
            prop: 'type',
            label: '居民类型',
            width: '80'
          },
          {
            prop: 'country',
            label: '县/市',
            width: '80'
          },
          {
            prop: 'towns',
            label: '乡/镇',
            width: '80'
          },
          {
            prop: 'address',
            label: '家庭地址',
            width: '160'
          },
          {
            prop: 'source',
            label: '预警来源',
            width: '90'
          },
          {
            prop: 'content',
            label: '预警内容',
            width: '160'
          },
          {
            prop: 'chance',
            label: '返贫概率',
            width: '70'
          },
          {
            prop: 'date',
            label: '预警时间',
            width: '160'
          },
          {
            prop: 'audit',
            label: '预警审核',
            width: '100'
          },
          {
            prop: 'audit_date',
            label: '审核时间'
          },
          {
            prop: 'operation',
            label: '操作',
            width: '100',
            scopedSlots: true
          }
        ]
      }
    }
  },
  methods: {
    handleSearch(model) {
      console.log(model)
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .color-header {
    th {
        padding: 0 0;
        background-color: rgba(229, 229, 229, 1);

        .cell {
            color: #333;
        }
    }

    td {
        border: 1px solid rgba(198, 198, 198, 1);
    }
    // border: 1px solid rgba(229, 229, 229, 1);
}
</style>
