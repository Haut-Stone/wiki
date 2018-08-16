<template>
  <div class="stigmata">
    <NavMenu :navData="navData" armorName="圣痕"></NavMenu>
    <transition name="fade">
      <ScrollMenu :navData="navData" v-show="scrollTop > 150"></ScrollMenu>
    </transition>
    <transition name="fade">
      <BackTop :scrollTop="scrollTop"></BackTop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from "@/components/NavMenu/NavMenu";
import ScrollMenu from "@/components/ScrollMenu/ScrollMenu";
import BackTop from "@/components/BackTop/BackTop";

import { urlParse } from "@/assets/js/util";
import router from "@/router";

export default {
  name: 'stigmata',
   data() {
    return {
      scrollTop: 0,
      navData: {
        hasMenu: false,
        navMenu: [
          {
            name: '五星',
            route: '/stigmata/fiveStar'
          },
          {
            name: '四星',
            route: '/stigmata/fourStar'
          },
          {
            name: '三星',
            route: '/stigmata/threeStar'
          },
          {
            name: '二星',
            route: '/stigmata/twoStar'
          },
          {
            name: '活动',
            route: '/stigmata/otherStar'
          }
        ]
      }
    };
  },
  mounted() {
    window.addEventListener("scroll", this._handleScroll);
  },
  methods: {
    // 获取滚动条高度
    _handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
    }
  },
  components: {
    NavMenu,
    ScrollMenu,
    BackTop
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.5s;
}
.move-enter,
.move-leave-to {
  transform: translate(-6rem, 0);
  opacity: 0;
}
</style>
