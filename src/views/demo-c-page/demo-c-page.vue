<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2019-11-13 09:46:11
 * @LastEditTime: 2020-04-08 17:21:16
 * @LastEditors: Liangqq
 -->
<template>
  <div>
    c Page
    <div>{{num}}</div>
    <div>
      <el-button @click="handleClickAdd">计算+</el-button>
    </div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="date" label="日期" width="120"></el-table-column>
      <el-table-column property="name" label="姓名" width="120"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
      <el-button @click="setCurrent()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-c-page",
  components: {},
  data() {
    return {
      num: 0,
      currentRow: null,
      tableData: [{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄"
      }, {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄"
      }, {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄"
      }]
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleClickAdd() {
      this.num += 1
    },
    setCurrent(row) {
      console.log(row)
      // const data = {
      //   date: "2016-05-01",
      //   name: "王小虎",
      //   address: "上海市普陀区金沙江路 1519 弄"
      // }
      this.$refs.singleTable.setCurrentRow(this.tableData[1])
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentRow = val
    }
  }
}
</script>

<style scoped lang="scss">
</style>
