<template>
  <div class="segmentBox">
    <div class="segmentRow">
      <div class="segment dark" v-if="this.attack > 200" :style="'width:' + this.getAttackWidth.first"></div>
      <div class="segment dark" v-if="this.attack > 100" :style="'width:' + this.getAttackWidth.second"></div>
      <div class="segment dark" v-if="this.attack > 0" :style="'width:' + this.getAttackWidth.third"></div>
    </div>
    <div class="segmentRow">
      <div class="segment light" v-if="this.crit > 50" :style="'width:' + this.getCritWidth.first"></div>
      <div class="segment light" v-if="this.crit > 25" :style="'width:' + this.getCritWidth.second"></div>
      <div class="segment light" v-if="this.crit > 0" :style="'width:' + this.getCritWidth.third"></div>     
    </div>
  </div>
</template>

<script>
export default {
  name: 'SegmentBox',
  props: {
    attack: {
      type: Number,
      default: 25,
    },
    crit: {
      type: Number,
      default: 75,
    },
  },
  computed: {
    getAttackWidth () {
      if(this.attack > 300 || this.attack <= 0) {
        this.attack = 300;
      }
      var rate = 1.0 / 50;
      var first=0, second=0, third=0;
      if (this.attack > 200) {
        first = 100;
        second = 100;
        third = this.attack - 200;
      } else if (this.attack > 100) {
        second = 100;
        third = this.attack - 100;
      } else if (this.attack > 0) {
        third = this.attack;
      }
      return {
        first: first * rate  + "rem",
        second: second *  rate + "rem",
        third: third *  rate + "rem",
      };
    },
    getCritWidth () {
      if (this.crit > 75 || this.crit <= 0) {
        this.crit = 75;
      }
      var rate = 4.0 / 50;
      var first=0, second=0, third=0;
      if (this.crit > 50) {
        first = 25;
        second = 25;
        third = this.crit - 50;
      } else if (this.crit > 25) {
        second = 25;
        third = this.crit - 25;
      } else if (this.crit > 0) {
        third = this.crit;
      }
      return {
        first: first * rate + "rem",
        second: second *  rate + "rem",
        third: third *  rate + "rem",
      };
    }
  }

}
</script>

<style scoped lang="scss">
$light: #F7B032;
$dark: #20345B;
.segmentBox {
  .segmentRow {
    transform: skewX(-15deg);
    margin-top: rem(1.6);
    display: flex;
    width: rem(248);
    .segment {
      margin: rem(1);
      width: rem(75);

    }
    .segment.light {
      border: rem(1) solid $light;
      background-color: $light;
    }
    .segment.dark {
      border: rem(1) solid $dark;
      background-color: $dark;
    }
  }
}
</style>
