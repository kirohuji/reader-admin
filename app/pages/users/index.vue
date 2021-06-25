<template>
  <div>
    <Card style="padding: 14px;padding-bottom: 0">
      <DataSearchForm
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between;"
      >
        <template v-slot:right>
          <el-button>新建活动</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable
        :column="table.column"
        style="padding: 0"
        :data="users"
      >
        <template v-slot:operation>
          <div>
            <el-link
              type="primary"
              @click="$refs.baseDialog.open()"
            >编辑</el-link>
            <el-link type="primary">禁用</el-link>
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog
      ref="baseDialog"
      title="新增用户"
    >
      <DataForm
        :forms="config.form"
        label-position="right"
      />
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
  meteor: {
    $subscribe: {
      users: [],
    },
    users () {
      console.log('Meteor.users.find()',Meteor.users.find().map(o=>o))
      return Meteor.users.find().map((doc) => ({
        value: false,
        username: doc.username,
        online: doc.status && doc.status.online,
        roles: doc.roles && doc.roles.__global_roles__,
        lastSeen: doc.status && doc.status.lastLogin.date,
        createdAt: doc.createdAt,
        _id: doc._id,
      }));
    },
  },
  data () {
    return {
      config: config,
      table: {
        column: [
          {
            prop: 'username',
            label: '姓名',
          },
          {
            prop: 'onlilne',
            label: '是否在线',
          },
          {
            prop: 'roles',
            label: '角色',
          },
          {
            prop: 'lastSeen',
            label: '上一次上线时间',
          },
          {
            prop: 'createAt',
            label: '创建时间',

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
    handleSearch (model) {
      console.log(model)
    },
    onSubmit () {
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
