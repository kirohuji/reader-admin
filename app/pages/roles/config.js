export default {
  search: {
    col: 3,
    fields: [
      {
        label: '预警时间',
        prop: 'date',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small',
        required: true,
        rules: [
          { required: true, message: '年龄不能为空' },
          { type: 'number', message: '年龄必须为数字值' }
        ]
      },
      {
        label: '审核时间',
        prop: 'aduit',
        component: 'date-picker',
        type: 'datetime',
        placeholder: '选择日期',
        'value-format': 'yyyy-MM-dd HH:mm',
        format: 'yyyy-MM-dd HH:mm',
        size: 'small'
      }
    ]
  },
  form: {
    col: 1,
    fields: [
      {
        label: '所属单位',
        prop: 'date',
        component: 'input',
        type: 'input',
        placeholder: '卫健局',
        size: 'small',
        required: true
      }
    ]
  }
}
