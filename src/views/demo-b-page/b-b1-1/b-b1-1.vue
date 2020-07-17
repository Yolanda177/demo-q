<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-08 14:58:56
 * @LastEditTime: 2020-06-23 09:35:47
 * @LastEditors: Liangqq
 -->
<template>
  <div>
    b1-1
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-b1-1',
  components: {},
  data() {
    return {
      num: 0
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClickAdd() {
      this.num += 1
    }
  }
}
</script>

<style scoped lang="scss">
</style>
