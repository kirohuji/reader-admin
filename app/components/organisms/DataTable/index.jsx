// import './style.scss'
export default {
  props: ['column', 'data'],
  data: () => ({
    table: {},
    page: {
      layout: `total, sizes, prev, pager, next, jumper`,
      total: 0,
      'page-sizes': [100, 200, 300, 400],
      'page-size': 100,
      background: false
    }
  }),
  watch: {
    data: {
      handler() {
        this.page.total = this.data.length
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSizeChange(data) {
      console.log(data)
    },
    handleCurrentChange(data) {
      console.log(data)
    }
  },
  render() {
    return (
      <div class='data-table'>
        <ElTable
          data={this.data}
          {...{
            props: {
              ...this.$attrs,
              ...this.table
            }
          }}
        >
          {this.column.map((item) => (
            <ElTableColumn
              {...{
                props: item,
                scopedSlots: {
                  default: this.$scopedSlots[item.prop]
                }
              }}
            />
          ))}
        </ElTable>
        {!this.$attrs.noPage && (
          <ElPagination
            class='pagination'
            ref='pagination'
            {...{
              props: this.page,
              on: {
                'size-change': this.handleSizeChange,
                'current-change': this.handleCurrentChange
              }
            }}
          ></ElPagination>
        )}
      </div>
    )
  }
}
