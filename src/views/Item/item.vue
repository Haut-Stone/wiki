<template>
  <div class="item">
    <!-- 顶部标题 -->
    <header>
      <div class="menu" @click="goHome"></div>
      <h2>材料页</h2>
    </header>
    <section>
      <div class="search-bar">
        <input type="text" class="search-text">
        <div class="line-fix"></div>
        <button class="search-btn"></button>
      </div>
      <div class="filter">
        <div class="block">
          <h2>分类</h2>
          <div class="arrow"></div>
        </div>
        <div class="block">
          <h2>星级</h2>
          <div class="arrow"></div>
        </div>
      </div>
    </section>
    <transition name="fade">
      <BackTop :scrollTop="scrollTop"></BackTop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import BackTop from "@/components/BackTop/BackTop";
import router from "@/router";
import { urlParse } from "@/assets/js/util";
import Star from "@/components/Star/Star";
export default {
  name: 'Item',
  data () {
    return {
      msg: '我是材料菜单',
      scrollTop: 0,
    }
  },
  methods: {
    goHome () {
      this.$router.push('/home')
    },
    _handleScroll() {
      let scrollTop = 
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
    }
  },
  components: {
    BackTop
  },
  mounted() {
    window.addEventListener("scroll", this._handleScroll);
    router.push({path: "/item/list/all/all"})
  }
}
</script>

<style lang="scss" scoped>
.item {
  height: rem(8000);
  background-color: rgb(243, 243, 243);
  /* 顶部标题 */
  header {
      height: rem(44);
      background: #1c2b42;
      position: relative;
      h2 {
        font-size: rem(20);
        color: #fff;
        height: rem(44);
        line-height: rem(44);
        text-align: center;
      }
      .menu {
        width: rem(24);
        height: rem(24);
        position: absolute;
        top: rem(10);
        left: rem(24);
        background: url("../../assets/images/back_btn.png") no-repeat;
        background-size: rem(13);
    }
  }

  // 搜索工具
  .search-bar {
    height: rem(42);
    background-color: white;
    position: relative;
    padding: rem(10);
    text-align: center;
    border-bottom: 1px solid rgb(206, 206, 206);
    .search-text {
      border-radius: 6px;
      border: 1px solid rgb(204, 204, 204);
      background-color: rgb(243, 243, 243);
      height: rem(30);
      width: rem(270);
      line-height: rem(30);
    }
    .line-fix {
      position: absolute;
      height: rem(32);
      top: rem(11);
      left: rem(330);
      width: rem(0);
      border-left: 1px solid rgb(206, 206, 206);
    }
    .search-btn {
      position: absolute;
      background-image: url(../../assets/images/search_icon.png);
      background-size: rem(30);
      background-color: transparent;
      border: none;
      height: rem(30);
      width: rem(30);
      left: rem(340);
      top: rem(10);
    }
  }

  // 过滤工具
  .filter {
    height: rem(42);
    border-bottom: 1px solid rgb(206, 206, 206);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    h2 {
      flex: 1;
      color: rgb(10, 21, 36);
    }
  }
}

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
