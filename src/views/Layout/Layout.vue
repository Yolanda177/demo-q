<template>
  <div class="dme-app-wrapper">
    <el-container>
      <el-aside width="4.1667rem">
        <!-- <div class="dme-logo"></div> -->
        <nav-bar @route-change="handelLoading"></nav-bar>
      </el-aside>

      <!-- <el-header>模型管理模块</el-header> -->
      <el-main>
        <div class="page-container" ref="pageContainer">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navBar from './components/nav-bar/index'

export default {
  name: 'layout',
  data() {
    return {
      loadingInstance: null,
      dialogUserPwd: false,
      userData: {},
      themeClass: '' // 主题配置
    }
  },
  components: {
    navBar
  },
  computed: {
  },
  watch: {
    $route() {
      this.loadingInstance && this.loadingInstance.close()
    }
  },
  created() {
    // const themeConfig = store.getters.appConfig.theme
    // switch (themeConfig) {
    //   case 'dark':
    //     this.themeClass = 'dark-theme'
    //     break
    //   case 'light':
    //     this.themeClass = 'light-theme'
    //     break
    //   default:
    //     this.themeClass = 'dark-theme'
    //     break
    // }
  },
  methods: {
    handelLoading() {
      this.loadingInstance = this.$loading({
        fullscreen: false,
        target: this.$refs.pageContainer,
        spinner: 'iconfont icon-yuan',
        customClass: 'dynamic-circle'
      })
    },
    handleCommand(command) {
      switch (command) {
        case 'pdChange':
          this.handleOpenUserPwd()
          break
        case 'userLogout':
          this.handleLogout()
          break
        default:
          break
      }
    },

    handleOpenUserPwd() {
      this.dialogUserPwd = true
    },

    handleClose() {
      this.dialogUserPwd = false
      delete this.userData.oldPwd
      delete this.userData.newPwd
      delete this.userData.confirmedPwd
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.dme-app-wrapper {
  height: 100%;
  width: 100%;
  .el-container {
    height: 100%;
  }
  &.has-header {
    .el-container {
      height: calc(100% - 3.13rem);
    }
    .el-header {
      height: 3.13rem;
      z-index: 2000;
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;
      box-shadow: 0rem 0.16rem 0.68rem 0rem rgba(0, 0, 0, 0.07);
      .prj-name {
        font-size: 22.5px;
        color: #333;
        font-weight: 700;
        display: flex;
        align-items: center;
        .dme-svg-icon {
          font-size: 2.29rem;
          margin-right: 0.8rem;
        }
      }
      .el-dropdown {
        cursor: pointer;
      }
      .user-box {
        display: flex;
        align-items: center;
        .user-name {
          font-size: 0.83rem;
        }
        .dme-svg-icon {
          font-size: 1.5rem;
        }
      }
      .dialog-container {
        position: absolute;
      }
    }
  }

  .el-aside {
    // background-color: #333;
    color: #666666;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    color: #333;
    padding: 0px;
    width: 100%;
    height: 100%;
  }

  // 自主结构样式
  .dme-logo {
    height: 60px;
    width: 100%;
  }
  .page-container {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    height: 100%;
  }
}
</style>
