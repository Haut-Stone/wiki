<template>
  <div id="app">
    <router-view/>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/base.scss';


$vm_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
// 根元素大小使用 vw 单位
$vm_design: 750;

html {
    font-size: ($vm_fontsize / ($vm_design / 2)) * 100vw;
}

#app {
  font-size: rem(16);
}
</style>
