<template>
  <div class="scrollMenu">
    <div class="title" @click="_showArmorList">{{armorName}}</div>
    <ul class="scrollNav">
      <li><router-link to="/valkyria/overview">概览</router-link></li>
      <li><router-link to="/valkyria/skill">技能</router-link></li>
      <li><router-link to="/valkyria/equipPro">配装</router-link></li>
      <li><router-link to="/valkyria/team">组队</router-link></li>
      <li><router-link to="/valkyria/raiders">攻略</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ScrollMenu',
  props: {
    armorName: {}
  },
  methods: {
    _showArmorList() {
      this.$emit('showArmorList');
    }
  }
}
</script>

<style scoped lang="scss">
.scrollMenu{
    height: rem(25);
    padding: rem(9) 0;
    background: #1c2b42;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    z-index: 999;
    .title{
      height: rem(25);
      line-height: rem(25);
      padding: 0 rem(12);
      font-size: rem(20);
      color: #8e95a1;
      border-right: 2px solid #0d1e38;
    }
    .scrollNav{
      flex: 1;
      display: flex;
      font-size: rem(16);
      li{
        height: rem(25);
        line-height: rem(25);
        flex: 1;
        text-align: center;
        a{
          color: #fff;
          &.active{
            color: #ffb434;
          }
        }
      }
    }
}
</style>
