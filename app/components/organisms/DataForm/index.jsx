import _ from "lodash";
import BaseEnter from "../../molecules/BaseEnter";
// import './style.scss'
const FormItem = {
  name: "FormItem",
  props: ["item", "value"],
  render() {
    return (
      <ElFormItem
        {...{
          props: this.item,
        }}
      >
        <BaseEnter
          {...{
            props: { model: this.value },
            attrs: this.item,
          }}
        />
      </ElFormItem>
    );
  },
};
export default {
  /**
   * 表单的加载事件
   */
  props: ["forms", "buttons", "data"],
  component: {
    BaseEnter,
  },
  data() {
    return {
      model: {},
    };
  },
  computed: {
    row() {
      return Math.round(this.forms.fields.length / this.forms.col);
    },
    span() {
      return Math.round(24 / this.forms.col);
    },
  },
  watch: {
    data: {
      handler(val) {
        console.log("监听到了");
        this.transform();
        this.initData(val);
      },
      // deep: true,
    },
  },
  created() {
    this.transform();
    if (this.data) {
      this.initData(this.data);
    }
  },
  methods: {
    initData(data) {
      this.model = Object.assign(this.model, data);
    },
    search() {
      this.$emit("search", this.model);
    },
    getFormRef(){
      return this.$refs.form
    },
    transform() {
      this.model = {};
      this.$set(
        this,
        "model",
        _.zipObject(
          this.forms.fields.map((n) => n.prop),
          this.forms.fields.map((n) => _.defaultTo(n.default, ""))
        )
      );
    },
    has(rIndex, cIndex) {
      return (
        cIndex + 1 > rIndex * this.forms.col &&
        cIndex + 1 <= (rIndex + 1) * this.forms.col
      );
    },
  },
  render(h) {
    return (
      <ElForm
        inline
        class="data-form"
        ref="form"
        {...{
          props: {
            model: this.model,
            ...this.$attrs,
          },
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
    );
  },
};
