import _ from 'lodash'
import BaseEnter from '../../molecules/BaseEnter'
// import './style.scss'
const FormItem = {
  name: 'FormItem',
  props: ['item', 'value'],
  render() {
    return (
      <ElFormItem
        {...{
          props: this.item
        }}
      >
        <BaseEnter
          {...{
            props: { model: this.value },
            attrs: this.item
          }}
        />
      </ElFormItem>
    )
  }
}
export default {
  /**
     * 表单的加载事件
     */
  props: ['forms', 'buttons'],
  component: {
    BaseEnter
  },
  data() {
    return {
      model: {}
    }
  },
  computed: {
    row() {
      return Math.round(this.forms.fields.length / this.forms.col)
    },
    span() {
      return Math.round(24 / this.forms.col)
    }
  },
  created() {
    this.transform()
  },
  methods: {
    search() {
      this.$emit('search', this.model)
    },
    transform() {
      this.$set(
        this,
        'model',
        _.zipObject(
          this.forms.fields.map((n) => n.prop),
          this.forms.fields.map((n) => _.defaultTo(n.default, ''))
        )
      )
    },
    has(rIndex, cIndex) {
      return cIndex + 1 > rIndex * this.forms.col && cIndex + 1 <= (rIndex + 1) * this.forms.col
    }
  },
  render(h) {
    return (
      <ElForm
        inline
        class='data-form'
        {...{
          props: {
            model: this.model,
            ...this.$attrs
          }
        }}
      >
        <div>
          {Array.apply(null, { length: this.row }).map((r, rIndex) => (
            <ElRow>
              {this.forms.fields.map(
                (item, index) =>
                  this.has(rIndex, index) && (
                    <ElCol span={this.span}>
                      <FormItem item={item} value={this.model} />
                    </ElCol>
                  )
              )}
            </ElRow>
          ))}
        </div>
      </ElForm>
    )
  }
}
