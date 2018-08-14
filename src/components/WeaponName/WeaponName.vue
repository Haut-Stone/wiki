<template>
 <div class="weaponName">
    <div class="titleEn">WEAPON</div>
    <div class="title">{{weapon.name}}</div>
    <div class="weaponType">
      <div class="type" :class="weaponTypeClass">{{weapon.type}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeaponName',
  props: {
    weaponData: {
      type: Object,
      default: {}
    },
  },
  computed: {
    weapon: function() {
      return this.weaponData;
    },
    weaponTypeClass() {
      if(this.weaponData.type === '重炮') {
        return 'artillery';
      } else if (this.weaponData.type === '双枪') {
        return 'gun';
      } else if (this.weaponData.type === '太刀') {
        return 'knife';        
      } else if (this.weaponData.type === '十字架') {
        return 'cross';        
      } else if (this.weaponData.type === '大剑') {
        return 'sword';        
      } else if (this.weaponData.type === '拳套') {
        return 'knuckles';        
      }  else {
        return 'gun';
      }
    },
  }
};
</script>

<style scoped lang="scss">
$light: #F7B032;
$dark: #20345B;
$darkText: #040D1C;
$borderColor: #d9d9d9;
.weaponName {
  margin-top: rem(10);
  .titleEn {
    font-size: rem(12);
    color: $darkText;
    font-weight: 900;
    font-style: italic;
    text-align: center;
    line-height: rem(15);
  }
  .title{
      font-size: rem(16);
      font-weight: bold;
      color: $light;
      font-style: italic;
      text-align: center;
  }
  .weaponType {
    width: rem(105);
    line-height: rem(15);
    text-align: center;
    font-size: 0;
    margin: rem(2) auto 0;
    border: 1px solid $borderColor;
    border-radius: rem(20);
    .type{
      vertical-align: middle;
      display: inline-block;
      font-size: rem(12);
      font-style: italic;
      font-weight: 900;
      margin-right: rem(6);
      &.artillery{
        color: #000;
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: rem(5);
          width: rem(15);
          height: rem(15);
          background: url("../../assets/images/artillery.png") no-repeat;
          background-size: rem(15);
        }
      }
      &.gun{
        color: #000;
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: rem(5);
          width: rem(15);
          height: rem(15);
          background: url("../../assets/images/gun.png") no-repeat;
          background-size: rem(15);
        }
      }
      &.knife{
        color: #000;
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: rem(5);
          width: rem(15);
          height: rem(15);
          background: url("../../assets/images/knife.png") no-repeat;
          background-size: rem(15);
        }
      }
      &.cross{
        color: #000;
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: rem(5);
          width: rem(15);
          height: rem(15);
          background: url("../../assets/images/cross.png") no-repeat;
          background-size: rem(15);
        }
      }
      &.sword{
        color: #000;
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: rem(5);
          width: rem(15);
          height: rem(15);
          background: url("../../assets/images/sword.png") no-repeat;
          background-size: rem(15);
        }
      }
      &.knuckles{
        color: #000;
        &::before{
          content: "";
          display: inline-block;
          vertical-align: middle;
          margin-right: rem(5);
          width: rem(15);
          height: rem(15);
          background: url("../../assets/images/knuckles.png") no-repeat;
          background-size: rem(15);
        }
      }
    }
  }
}
</style>
