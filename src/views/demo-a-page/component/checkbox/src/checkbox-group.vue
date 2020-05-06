<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-28 17:32:49
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-04-29 16:44:03
 -->
<script>
import Emitter from "@/utils/emitter"

export default {
  name: "ElCheckboxGroup",

  componentName: "ElCheckboxGroup",

  mixins: [Emitter],

  inject: {
    elFormItem: {
      default: ""
    }
  },

  props: {
    value: {},
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    /* eslint-disable */
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    value(value) {
      this.dispatch("ElFormItem", "el.form.change", [value])
    }
  }
}
</script>

<template>
  <div class="el-checkbox-group" role="group" aria-label="checkbox-group">
    <slot></slot>
  </div>
</template>
