<template>
  <div class="container">
    <div class="header">header-top</div>
    <div class="body">
      <div class="body-top">body-top</div>
      <div class="body-main">
        <div class="table-container">
          <el-button @click="handleOpen">打开table</el-button>
          <el-dialog title="提示" :visible.sync="visivle">
            <el-table
              :data="tableData"
              style="width: 100%"
              height="100%"
              border
            >
              <el-table-column prop="date" label="日期"></el-table-column>
              <el-table-column prop="name" label="姓名"></el-table-column>
              <el-table-column prop="province" label="省份"></el-table-column>
              <el-table-column prop="city" label="市区"></el-table-column>
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="zip" label="邮编"></el-table-column>
            </el-table>
          </el-dialog>
        </div>
      </div>
    </div>
    <!-- <div class="bottom">bottom</div> -->
  </div>
</template>

<script>
export default {
  name: 'demo-d-page',
  components: {},
  data() {
    return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
        visivle: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleOpen() {
      this.visivle = !this.visivle
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  // display: flex;
  // flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1%;
  // align-items: center;
  .header {
    width: 100%;
    height: 3rem;
    // background: #efefef;
    border-bottom: 1px solid;
  }
  .body {
    width: 100%;
    background: #eafdf6;
    height: calc(100% - 3rem);
    margin-top: 1%;
    // padding: 1%;
    .body-top {
      height: 3rem;
      width: 100%;
      background: #7afccc;
      // line-height: 3rem;
    }
    .body-main {
      height: calc(100% - 3rem);
      width: 100%;
      .table-container {
        height: 100%;
        width: 100%;
        /deep/ .el-table {
          font-size: 0.83rem;
          .el-table__header-wrapper {
            .has-gutter {
              th {
                height: 2rem;
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 3rem;
    background: #fbd8d8;
    line-height: 3rem;
  }
}
</style>
