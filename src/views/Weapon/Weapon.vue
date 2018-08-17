<template>
  <div class="weapon">
    <NavMenu :navData="navData" armorName="武器"></NavMenu>
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
  name: 'weapon',
  data() {
    return {
      scrollTop: 0,
      navData: {
        hasMenu: false,
        navMenu: [
          {
            name: '双枪',
            route: '/weapon/gun'
          },
          {
            name: '太刀',
            route: '/weapon/knife'
          },
          {
            name: '重炮',
            route: '/weapon/artillery'
          },
          {
            name: '十字架',
            route: '/weapon/cross'
          },
          {
            name: '大剑',
            route: '/weapon/sword'
          },
          {
            name: '拳套',
            route: '/weapon/knuckles'
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
}
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
