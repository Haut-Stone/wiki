<template>
  <div class="weaponIndex">
    <div class="weaponWrap" v-if="weaponStar">
      <div class="weaponStar">
        <h1 class="title">{{this.title}}</h1>
        <div class="lineFix"></div>
      </div>
      <div class="weapon" >
        <div class="weaponInfo" v-for="(item,index) in weapon" :key="index">
          <!-- <div class="weaponImg"> -->
          <router-link class="detailLink" :to="'weaponDetail/'+item.id"><img class="weaponImg" :src="HOST + item.image"></router-link>
          <!-- <a class="detailLink" :href="'#/detail/' + item.id"><img class="weaponImg" :src="HOST + item.image"></a> -->
          <!-- </div> -->
          <p class="weaponName">{{item.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeaponIndex',
  props: {
    weaponStar: {
      type: Number,
      default: 5,
    },
    weaponData: {
      type: Array,
      default: [],
    }
  },
  computed: {
    weapon: function() {
      return this.weaponData;
    },
    title () {
      if (this.weaponStar == 5) {
        return "五星武器";
      } else if (this.weaponStar == 4) {
        return "四星武器";
      } else if (this.weaponStar == 3) {
        return "三星武器";
      } else if (this.weaponStar == 2) {
        return "二星武器";
      } else {
        return "wrong!!";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.weaponWrap {
  // testborder
  // border: 1px solid red;
  .weaponStar {
    margin-top: rem(16);
    text-align: center;
    .title {
      margin: 0 auto;
      width: rem(115);
      line-height: rem(26.5);
      font-size: rem(20)
    }
    .lineFix {
      margin: 0 auto;
      width: rem(46);
      border-bottom: rem(2) solid black;
    }
  }
  .weapon {
    display: flex;
    flex-wrap: wrap;
    .weaponInfo {
      /*flex: 1;*/
      margin-top: rem(23.5);
      width: 25%;
      text-align: center;
      .detailLink {
        .weaponImg {
          display: inline-block;
          border: rem(2) solid #7035A0;
          border-radius: rem(3);
          width: rem(43)
        }
      }
      .weaponName {
        font-size: rem(12);
      }
    }
  }
}
</style>
