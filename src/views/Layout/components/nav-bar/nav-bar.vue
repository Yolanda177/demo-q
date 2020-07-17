<!--
 * @Description:
 * @Author: Liangqq
 * @Date: 2020-04-11 22:27:08
 * @LastEditors: Liangqq
 * @LastEditTime: 2020-06-23 09:35:18
 -->
<template>
  <div class="nav-bar">
    <el-menu
      :default-active="currentRoutePath"
      :router="true"
      @select="handelSelect"
    >
      <el-menu-item index="/a-page">
        <!-- <dme-svg-icon icon-class="administration-nav"></dme-svg-icon> -->
        <span slot="title">A</span>
      </el-menu-item>
      <el-menu-item index="/b-page">
        <!-- <dme-svg-icon icon-class="datasource-nav"></dme-svg-icon> -->
        <span slot="title">B</span>
      </el-menu-item>
      <el-menu-item index="/c-page">
        <!-- <dme-svg-icon icon-class="algorithm-nav"></dme-svg-icon> -->
        <span slot="title">C</span>
      </el-menu-item>
      <el-menu-item index="/d-page">
        <!-- <dme-svg-icon icon-class="component-nav"></dme-svg-icon> -->
        <span slot="title">D</span>
      </el-menu-item>
      <el-menu-item index="/e-page">
        <!-- <dme-svg-icon icon-class="new-model-nav"></dme-svg-icon> -->
        <span slot="title">E</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'nav-bar',
  data() {
    return {
      currentIndex: null,
      showBackBtn: false,
      indicatorUrl: null,
      isModelBuildActive: false, // 构建模块是否已激活
      isShowDropMenu: false,
      dialogUserPwd: false,
      userData: {}
    }
  },
  components: {},
  computed: {
    currentRoutePath() {
      const pathArr = this.$route.path.split('/')
      return `/${pathArr[1]}`
    }
  },
  mounted() {
    // console.log(this.$router.options.routes[0])
    this.currentIndex = this.$route.path
  },
  methods: {
    handelSelect(index) {
      if (this.currentIndex === '/model-build') {
        this.isModelBuildActive = true
      }
      if (!this.currentIndex.includes(index) && !this.isModelBuildActive) {
        this.currentIndex = index
        this.$emit('route-change')
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
