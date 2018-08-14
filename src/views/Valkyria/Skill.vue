<template>
  <div class="skill">
    <div class="dataWrap" v-if="skill && skill.length > 0">
      <RoleName :armorData="armorData" :armorName="armorData.armorName"></RoleName>
      <!-- 技能导航 开始 -->
      <div class="skillNav">
        <div class="skillNavItem" @click="moveTo(index)" v-for="(item,index) in skill" :key="index" :class="'skillNavItem' + (index+1)">
          <div class="title">
            <p>{{item.skillType}}</p>
            <h2>{{item.skillName}}</h2>
          </div>
          <div class="image">
            <img :src="HOST + item.skillImageUrl" alt="">
          </div>
        </div>
        <div class="tipsWrap">
          <div class="tips">
            Tips:可点击技能跳转技能说明
          </div>
        </div>
      </div>
      <!-- 技能导航 结束 -->

      <!-- 技能列表 开始 -->
      <div class="skillItemWrap">
        <div class="skillItem" :ref="'item'+index" v-for="(item,index) in skill" :key="index">
          <BlockTitle :title="item.skillName" :icon="1" :rightTxt="item.skillType"></BlockTitle>
          <div class="skillListWrap">
            <div class="skillList">
              <div class="skillListItem" v-for="(subSkill,subIndex) in item.subSkills" :key="subIndex">
                <div class="skillImage">
                  <img :src="HOST + subSkill.skillImageUrl" alt="">
                </div>
                <div class="itemContent">
                  <div class="title">
                    <span class="name">{{subSkill.skillName}}</span>
                    <span class="level" v-if="subSkill.unlockGrade">解锁等级</span>
                    <span class="levelNum" v-if="subSkill.unlockGrade">LV.{{subSkill.unlockGrade}}</span>
                  </div>
                  <p>{{subSkill.skillIntro}}</p>
                </div>
              </div>
            </div>
            <div class="text-box dark">
              <!-- <div class="title">
                <div class="item" v-for="(subSkill,subIndex) in item.subSkills" :key="subIndex">
                  {{subSkill.skillName}}：<span>优先升满</span>
                  </div>
              </div> -->
              <p>
                <pre>{{item.appraisal | newLine}}</pre>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 技能列表 结束 -->
    </div>
    <NoData v-else></NoData>
  </div>
</template>

<script>
// @ is an alias to /src
import RoleName from "@/components/RoleName/RoleName";
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import NoData from "@/components/NoData/NoData";
import router from "@/router";

export default {
  name: 'skill',
  data() {
    return {
      skillData: {}
    };
  },
  props: {
    armorData: {
      type: Object
    }
  },
  computed: {
    skill: function() {
      return this.skillData.skill;
    }
  },
  watch: {
    armorData: {
      handler(newValue, oldValue) {
        this._initSkill();
      },
      deep: true
    }
  },
  created() {
    this._initSkill();
  },
  methods: {
    moveTo(index) {
      document.documentElement.scrollTop =
      this.$refs["item" + index][0].offsetTop - 50;
      document.body.scrollTop = this.$refs["item" + index][0].offsetTop - 50;
    },
    // 初始化技能信息
    _initSkill() {
      if (this.armorData.armorId) {
        //console.log('角色id:'+this.armorData.armorId);
      } else {
        router.push({ path: "/" });
        return;
      }
      this.$http.get(this.HOST + "/Wiki/Valkyrja/Skill/" + this.armorData.armorId,
        {
          before(request) {
            if (this.previousRequest) {
              this.previousRequest.abort();
            }
            this.previousRequest = request;
          }
        })
        .then(response => {
          this.skillData = Object.assign({},this.skillData,JSON.parse(response.data));
          var a = null;
          var b = null;
          var c = null;
          var d = null;
          var e = null;
          var f = null;
          for (var i = this.skillData.skill.length - 1; i >= 0; i--) {
            if (this.skillData.skill[i].skillType == "队长技能") {
              a = this.skillData.skill[i];
            } else if (this.skillData.skill[i].skillType == "分支/特殊 攻击") {
              b = this.skillData.skill[i];
            } else if (this.skillData.skill[i].skillType == "被动") {
              c = this.skillData.skill[i];
            } else if (this.skillData.skill[i].skillType == "必杀技") {
              d = this.skillData.skill[i];
            } else if (this.skillData.skill[i].skillType == "闪避") {
              e = this.skillData.skill[i];
            } else if (this.skillData.skill[i].skillType == "普通攻击") {
              f = this.skillData.skill[i];
            }
          }
          var arr = new Array(a, b, c, d, e, f);
          this.skillData.skill = arr;
        })
        .catch(error => {
          console.log(error);
          router.push({ path: "/404" });
        });
    }
  },
  filters: {
    newLine: function (value) {
      return value.replace(/\^/g,'\n');
    }
  },
  components: {
    RoleName,
    BlockTitle,
    NoData
  }
}
</script>

<style scoped lang="scss">
$light: #F1F5F6;
$dark: #1B2B42;

$color-blu: #466C9B;
$color-yel: #F8B534;
$color-pin: #F67483;

.skill {
  .skillNav {
    margin-top: rem(40);
    background: url("../../assets/images/skillNavBg.png") no-repeat center;
    background-position-y: rem(15);
    background-size: rem(168);
    overflow: hidden;
    position: relative;
    font-size: rem(12);
    color: #1c2b42;
    .skillNavItem {
      display: flex;
      position: absolute;
      height: rem(47);
      .image {
        width: rem(47);
        height: rem(47);
        background: url("../../assets/images/circle.png") no-repeat;
        background-size: rem(47);
        img {
          width: rem(47);
          height: rem(47);
        }
      }
      .title {
        display: flex;
        flex-direction: column;
        h2 {
          font-size: rem(14);
          font-weight: bold;
          color: #000;
        }
      }
    }
    .skillNavItem1,
    .skillNavItem3,
    .skillNavItem5 {
      .title {
        text-align: right;
        margin-right: rem(4);
      }
    }
    .skillNavItem2,
    .skillNavItem4,
    .skillNavItem6 {
      flex-direction: row-reverse;
      .title {
        margin-left: rem(4);
      }
    }
    .skillNavItem1,
    .skillNavItem2 {
      align-items: flex-start;
    }
    .skillNavItem3,
    .skillNavItem4 {
      align-items: center;
    }
    .skillNavItem5,
    .skillNavItem6 {
      align-items: flex-end;
    }
    .skillNavItem1 {
      top: 0;
      right: rem(195);
    }
    .skillNavItem2 {
      top: 0;
      left: rem(195);
    }
    .skillNavItem3 {
      top: rem(48);
      right: rem(232);
    }
    .skillNavItem4 {
      top: rem(48);
      left: rem(232);
    }
    .skillNavItem5 {
      top: rem(99);
      right: rem(195);
    }
    .skillNavItem6 {
      top: rem(99);
      left: rem(195);
    }
    .tipsWrap {
      margin-top: rem(168);
      text-align: center;
      .tips {
        margin: 0 auto;
        font-size: rem(12);
        color: #476b9b;
        padding: rem(4) rem(10);
        display: inline-block;
        text-align: center;
        border: 1px solid #d9d9d9;
        border-radius: rem(16);
      }
    }
  }
  .skillItemWrap {
    margin: rem(40) rem(12) 0;
    .skillItem {
      margin-bottom: rem(40);
      .skillListWrap {
        margin: 0 rem(10);
        width: auto;
        .skillList {
          margin-top: rem(27);
          margin-bottom: rem(12);
          .skillListItem {
            display: flex;
            margin-bottom: rem(20);
            .skillImage {
              width: rem(55);
              margin-right: rem(12);
              text-align: center;
              background: url("../../assets/images/circle.png") center top no-repeat;
              background-size: rem(47);
              img {
                width: rem(47);
                height: rem(47);
              }
            }
            .itemContent {
              flex: 1;
              font-size: rem(12);
              .title {
                font-size: rem(13);
                margin-bottom: rem(10);
                font-weight: bold;
                display: flex;
                height: rem(18);
                line-height: rem(18);
                .name {
                  flex: 1;
                }
                .level {
                  color: #c9c9c9;
                  margin-right: rem(5);
                }
                .levelNum {
                  color: #ffb434;
                }
              }
              p {
                line-height: rem(18);
                color: #4d4d4d;
              }
            }
          }
        }
        .text-box {
          padding: rem(9) rem(10);
          border-radius: 6px;
          line-height: rem(18);
          &.light {
            background-color: $light;
          }
          &.dark {
            background-color: $dark;
            color: #fff;
            padding: rem(12) rem(16);
          }
          p {
            font-size: rem(12);
            margin-bottom: rem(5);
            pre{
              white-space: pre-wrap;
            }
            span {
              color: $color-blu;
            }
          }
        }
      }
    }
  }
}
</style>
