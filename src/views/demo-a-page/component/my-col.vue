<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-11 22:27:08
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-07-10 17:23:04
 -->
<script>
export default {
  name: 'my-col',
  components: {},
  props: {
    tag: String,
    span: Number,
    offset: Number
  },
  computed: {
    gutter() {
      // console.log(this.$parent)
      let parent = this.$parent
      while (parent && parent.$options.componentName !== 'MyRow') {
        parent = parent.$parent
      }
      // return parent ? parent.gutter : 0
      return this.$parent.gutter
    }
  },
  render(h) {
    const classList = []
    classList.push(`el-col-${this.span}`)
    classList.push(`el-col-offset-${this.offset}`) // 偏移
    const style = {}
    if (this.gutter) {
      style.paddingLeft = `${this.gutter / 2}px`
      style.paddingRight = style.paddingLeft
    }
    return h(this.tag, {
      class: ['el-col', classList],
      style: this.style
    }, this.$slots.default)
  },
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.el-col-0 {
  display: none;
}

@for $i from 0 through 24 {
  .el-col-#{$i} {
    width: (1 / 24 * $i * 100) * 1%;
  }
}

@for $i from 0 through 24 {
  .el-col-offset-#{$i} {
    margin-left: (1 / 24 * $i * 100) * 1%;
  }
}
</style>
