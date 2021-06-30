<template>
  <div>
    <Card style="padding: 14px;">
      <DataSearchForm
        :forms="config.search"
        label-position="right"
        style="justify-content: space-between"
      >
        <template v-slot:right>
          <el-button @click="()=> { 
            baseDialogTitle=''
            $refs.baseDialog.open() 
          }">新建用户</el-button>
        </template>
      </DataSearchForm>
    </Card>
    <Card style="padding: 14px;padding-top: 0">
      <DataTable
        :column="table.column"
        style="padding: 0"
        :data="users"
      >
        <template v-slot:operation="{row}">
          <div>
            <ElLink
              type="primary"
              @click="()=> {     
                baseDialogTitle='编辑用户'
                table.selected=row;
                $refs.baseDialog.open()
              }"
            >编辑</ElLink>
            <ElLink
              type="primary"
              @click="handleDelete(row)"
            >删除</ElLink>
            <ElLink
              type="primary"
              @click="()=> { 
                table.selected=row;
                $refs.bookDialog.open();

              }"
            >管理书籍</ElLink>
            <!-- <ElLink type="primary">禁用</ElLink> -->
          </div>
        </template>
      </DataTable>
    </Card>
    <BaseDialog
      ref="baseDialog"
      :title="baseDialogTitle"
    >
      <DataForm
        :data="toForm(table.selected)"
        :forms="config.form"
        label-position="right"
        ref="dataForm"
      />
      <template v-slot:footer>
        <div class="footer">
          <el-button @click="() => { 
              $refs.baseDialog.close()
            }">取消</el-button>
          <el-button
            type="primary"
            @click="handleDialogFormSubmit"
          >保存</el-button>
        </div>
      </template>
    </BaseDialog>
    <BaseDialog
      ref="bookDialog"
      title="编辑书籍"
    >
      <BookTransfer :userId="table.selected._id" />
      <template v-slot:footer>
        <el-button @click="$refs.bookDialog.close()">关闭</el-button>
      </template>
    </BaseDialog>
  </div>
</template>

<script>
import DataTable from '../../components/organisms/DataTable'
import DataSearchForm from '../../components/organisms/DataSearchForm'
import DataForm from '../../components/organisms/DataForm'
import BookTransfer from '../../components/organisms/BookTransfer'
import BaseDialog from '../../components/molecules/BaseDialog.vue'
import Card from '../../components/atoms/Card'
import config from './config'
import _ from 'lodash'
export default {
  components: {
    Card,
    DataTable,
    DataSearchForm,
    DataForm,
    BookTransfer,
    BaseDialog
  },
  meteor: {
    $subscribe: {
      users: [],
    },
    users () {
      return Meteor.users.find().map((doc) => ({
        value: false,
        username: doc.username,
        displayName: doc.profile && doc.profile.displayName,
        remark: doc.profile && doc.profile.remark,
        email: doc.emails.map(o => o.address).join(','),
        phone: doc.profile && doc.profile.phone.join(','),
        online: doc.status && doc.status.online,
        roles: doc.roles && doc.roles.__global_roles__,
        createdAt: doc.createdAt,
        _id: doc._id,
      }));
    },
  },
  data () {
    return {
      baseDialogTitle: '新增用户',
      config: config,
      table: {
        selected: {},
        column: [
          {
            prop: 'username',
            label: '账户名',
          },
          {
            prop: 'displayName',
            label: '用户名',
          },
          {
            prop: 'email',
            label: '电子邮件',
          },
          {
            prop: 'phone',
            label: '手机号',
          },
          {
            prop: 'remark',
            label: '备注',

          },
          {
            prop: 'operation',
            label: '操作',
            width: '150',
            scopedSlots: true
          }
        ]
      }
    }
  },
  methods: {
    handleDelete (item) {
      let conf = confirm('你确定要删除吗?') || false;
      if (conf == true) {
        Meteor.call('users.remove', item, (err, res) => {
          if (err) {
            console.log(err);
            return;
          } else {
            this.$message('删除成功')
          }
        })
      }
    },
    handleDialogFormSubmit () {
      this.$refs.dataForm.getFormRef().validate(valid => {
        if (valid) {
          let model = this.$refs.dataForm.model
          Meteor.call('users.save', {
            _id: model._id,
            username: model.username,
            emails: model.email,
            profile: {
              displayName: model.displayName,
              remark: model.remark,
              phone: model.phone
            }
          }, (err, res) => {
            if (err) {
              this.$message.error(err)
            } else {
              this.$message('操作成功')
              this.$refs.baseDialog.close()
            }
          })

        }
      })
    },
    toForm (data) {
      // debugger;
      if (!_.isEmpty(data)) {
        console.log('data', data)
        return {
          ...data,
          email: data.email?.split(','),
          phone: data.phone?.split(',')
        }
      }
    },
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
