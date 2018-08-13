<template>
  <div class="roleName">
        <div class="title-en">{{armorData.roleNameEn}}</div>
        <div class="title">{{armorData.roleName}}</div>
        <div class="armorName" v-if="armorName !== '' && armorData.armorName">
            <div class="type" :class="armorTypeClass">{{armorData.armorType}}</div>
            <div class="name">{{armorData.armorName}}</div>
        </div> 
  </div>
</template>

<script>
export default {
  name: 'RoleName',
  props: {
      armorData: {
          type: Object,
          default: {}
      },
      armorName: {
          type: String
      }
  },
  computed: {
      armorTypeClass () {
            if (this.armorData.armorType === '生物') {
                return 'biological';
            } else if (this.armorData.armorType === '异能') {
                return 'ability';
            } else if (this.armorData.armorType === '机械') {
                return 'mechanical';
            } else {
                return 'biological';
            }
      }
  }
}
</script>

<style scoped lang="scss">
.roleName{
    margin-top: rem(35);
    .title-en{
        font-size: rem(12);
        color: #585858;
        font-weight: bold;
        text-align: center;
    }
    .title{
        font-size: rem(24);
        font-weight: bold;
        text-align: center;
    }
    .armorName{
        width: rem(124);
        line-height: rem(20);
        text-align: center;
        font-size: 0;
        margin: rem(6) auto 0;
        border: 1px solid #d9d9d9;
        border-radius: rem(20);
        .type, .name{
            vertical-align: middle;
            display: inline-block;
            font-size: rem(12);
        }
        .type{
            margin-right: rem(6);
            &.biological{
                color: #ffb22b;
                &::before{
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: rem(2);
                    width: rem(13);
                    height: rem(13);
                    background: url("../../assets/images/biological.png") no-repeat;
                    background-size: rem(13);
                }
            }
            &.ability{
                color: #f74599;
                &::before{
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: rem(2);
                    width: rem(13);
                    height: rem(13);
                    background: url("../../assets/images/ability.png") no-repeat;
                    background-size: rem(13);
                }
            }
            &.mechanical{
                color: #3fc8fe;
                &::before{
                    content: "";
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: rem(2);
                    width: rem(13);
                    height: rem(13);
                    background: url("../../assets/images/mechanical.png") no-repeat;
                    background-size: rem(13);
                }
            }
        }
    }
}
</style>
