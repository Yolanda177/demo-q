<template>
  <div>
    b2 Page
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'b-b2',
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
