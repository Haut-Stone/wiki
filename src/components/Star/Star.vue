<template>
  <div class="star" :style="'width:' + this.starWidth"></div>
</template>

<script>
export default {
  name: 'Star',
  props: {
      star: {
          type: Number,
          default: 1
      }
  },
  computed: {
    starWidth () {
      if (this.star > 5) {
        return '0.75rem'
      } else {
        return this.star / 5 * 0.75 + 'rem';
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
.star{
    width: rem(57.5);
    height: rem(10);
    background: url('../../assets/images/star.png') no-repeat;
    background-size: rem(57.5) rem(10);
}
</style>
