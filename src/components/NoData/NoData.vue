<template>
  <div class="nodata">
      <p>数据录入中...</p>
      <p>更多崩坏3攻略请关注公众号</p>
      <img src="../../assets/images/QRcode.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: 'NoData'
}
</script>

<style scoped lang="scss">
.nodata{
    padding: rem(12);
    font-size: rem(14);
    img{
      width: rem(300);
      display: block;
      margin:  0 auto;
    }
}
</style>
