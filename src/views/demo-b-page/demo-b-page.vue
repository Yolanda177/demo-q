<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2019-11-13 09:45:53
 * @LastEditTime: 2020-06-23 09:36:24
 * @LastEditors: Liangqq
 -->
<template>
  <div>
    b Page
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>
    <div>
      <el-button @click="handleToB1">to B1</el-button>
      <el-button @click="handleToB2">to B2</el-button>
      <p>当前页是{{currentPage}}</p>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'demo-b-page',
  components: {},
  data() {
    return {
      num: 0,
      currentPage: 'B页'
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
      this.$router.push({ name: 'b1' })
    },
    handleToB2() {
      this.currentPage = 'B2页'
      this.$router.push({ name: 'b2' })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
