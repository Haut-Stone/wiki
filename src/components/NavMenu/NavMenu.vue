<template>
  <div class="navMenu">
    <!-- 顶部标题 -->
    <header>
        <div class="menu" @click="_showArmorList" v-if="navData && navData.hasMenu"></div>
        <h2>{{armorName}}</h2>
    </header>
    <!-- 导航菜单 -->
    <nav class="topNav" v-if="navData">
        <ul>
            <li v-for="menu in navData.navMenu" :key="menu.route">
              <router-link :to="menu.route">{{menu.name}}</router-link>
            </li>
        </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: {
    armorName: {},
    navData: {}
  },
  methods: {
    _showArmorList() {
      this.$emit('showArmorList');
    }
  }
}
</script>

<style scoped lang="scss">
.navMenu{
  /* 顶部标题 */
  header{
      height: rem(44);
      background: #1c2b42;
      position: relative;
      h2{
        font-size: rem(20);
        color: #fff;
        height: rem(44);
        line-height: rem(44);
        text-align: center;
      }
      .menu{
        width: rem(24);
        height: rem(24);
        position: absolute;
        top: rem(10);
        left: rem(24);
        background: url("../../assets/images/menu_icon.png") no-repeat;
        background-size: rem(24);
    }
  }

  /* 导航菜单 */
  .topNav{
      height: rem(40);
      font-size: rem(14);
      ul{
        height: rem(40);
        display: flex;
        justify-content: space-around;
        align-items: center;
        li{
          width: rem(60);
          height: rem(24);
          line-height: rem(24);
          text-align: center;
          a{
            display: block;
            background: url('../../assets/images/topNav_default.png') no-repeat;
            background-size: rem(60) rem(24);
            color: #1c2b42;
            &.active{
              background: #1c2b42;
              border-radius: rem(24);
              color: #ffb434;
            }
          }
        }
      }
  }
}

</style>
