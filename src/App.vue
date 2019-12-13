<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
html {
  font-size: 1vw !important;
}
body {
  position: relative;
}
</style>
