<script>
export default {
  name: 'my-row',
  components: {},
  props: {
    tag: String,
    span: Number,
    gutter: Number,
    justify: {
      type: String,
      default: 'start'
    },
    type: String
  },
  computed: {
    style() {
      const ret = []
      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    }
  },
  render(h) {
    return h(this.tag, {
      class: ['el-row',
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        { 'el-row--flex': this.type === 'flex' }],
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
.my-col-0 {
  display: none;
}

@for $i from 0 through 24 {
  .my-col-#{$i} {
    width: (1 / 24 * $i * 100) * 1%;
  }
}
</style>
