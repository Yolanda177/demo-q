<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2019-12-14 21:49:04
 * @LastEditTime: 2020-06-23 09:35:55
 * @LastEditors: Liangqq
 -->
<template>
  <div>
    b1
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
      <el-button @click="handleToB1">to BB1</el-button>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'b-b1',
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
    },
    handleToB1() {
      this.currentPage = 'B1页'
      this.$router.push({ name: 'bb1' })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
