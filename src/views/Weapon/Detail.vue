<template>
  <div class="Detail">
    <div class="dataWrap">

      <!-- 武器基本信息 开始-->
      <WeaponName :weaponData="weapon"></WeaponName>
      <div class="basic">
        <div class="weaponImg">
          <img :src="HOST + weapon.img" v-if="weapon.img">
        </div>
        <div class="weaponMsg">
          <div class="title">武器评价</div>
          <div class="lineFix"></div>
          <div class="subtitle">{{weapon.shortComment}}</div>
          <div class="title">氪金指数：<Star :star="weapon.rechargeStar"></Star></div>
          <div class="title">保值指数：<Star :star="weapon.valueStar"></Star></div>
          <div class="title">获得方式：{{weapon.getWay}}</div>
        </div>
      </div>
      <!-- 武器基本信息 结束 -->

      <!-- 武器面板属性对比 开始 -->
      <div class="attr" v-if="weapon.attr && weapon.attr.length > 0">
        <BlockTitle title="面板属性和对比" :icon="2"></BlockTitle>
        <div class="panel">
          <div class="panelBar">
            <div class="barSpan">武器</div>
            <div class="barSubTitle">{{weapon.name}}</div>
            <div class="barRight">
              <div class="barRightCell">攻击<span class="circle dark"></span></div>
              <div class="barRightCell">会心<span class="circle light"></span></div>
            </div>
          </div>
          <div class="attrImgBox">
            <div class="attrImg">
              <img :src="HOST + weapon.img" v-if="weapon.img">
            </div>
            <div class="attrImg" v-for="(item, index) in weapon.attr" :key="index">
              <WeaponCanvas :weaponAttr="weapon.attr[index]" :canvasId="index"></WeaponCanvas>
              <div class="attrImgTitle">
                <div class="attrWight">{{item.weight}}</div>
                <div class="attrLv">{{item.lv}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 属性结束 -->

        <!-- 对比开始 -->
        <div class="panel" v-if="weapon.compared && weapon.compared.length > 0">
          <div class="panelBar">
            <div class="barSpan">面板对比</div>
            <div class="barRight">
              <div class="barRightCell"><span class="segSpan dark"></span>100攻击</div>
              <div class="barRightCell"><span class="segSpan light"></span>25会心</div>
            </div>
          </div>
          <div class="panelContent">
            <div class="comBox" v-for="(item, index) in weapon.compared" :key="index">
              <img class="comImg" :src="HOST + item.img">
              <div class="comInfo">
                <div class="comName">{{item.name}}</div>
                <div class="comAttr">
                  <div class="comAttack darkText">攻击：{{item.attack}}</div>
                  <div class="comCrit light">会心：{{item.crit}}</div>
                </div>
                <SegmentBox :attack="item.attack" :crit="item.crit"></SegmentBox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 武器面板属性对比 结束 -->

      <!-- 武器技能解析 开始 -->
      <div class="skill" v-if="weapon.skill && weapon.skill.length > 0 && weapon.skill[0].detail">
        <BlockTitle title="武器技能解析" :icon="2"></BlockTitle>
        <div class="panel" v-for="(item, index) in weapon.skill" :key="index" v-if="item.name">
          <div class="panelBar">
            <div class="barSpan">{{item.type}}</div>
          </div>
          <div class="panelContent">
            <!-- <div class="skillBox">
              <div class="skillTitle">技能说明：</div>
              <div class="skillText">{{item.name}}</div>
            </div> -->
            <div class="skillBox">
              <div class="skillTitle">技能成长：</div>
              <!-- TODO 技能详情 -->
              <div class="skillGrowing">
                <div class="skillButtonBox">
                  <div ref="beginButton" class="skillButton light" @click="changeSkillGrowingToBegin(index)">初始</div>
                  <div ref="endButton" class="skillButton" @click="changeSkillGrowingToEnd(index)">毕业</div>
                </div>
                <div class="skillText" ref="skillGrowingNow">{{weapon.skill[0].growing[index].begin}}</div>
              </div>
            </div>
            <div class="lightBox" v-if="item.test || item.analysis">
              <div class="skillBox" v-if="item.test">
                <div class="skillTitle">技能测试：</div>
                <div class="skillText">{{item.test}}</div>
              </div>
              <div class="skillBox" v-if="item.analysis">
                <div class="skillTitle">技能解析：</div>
                <div class="skillText">{{item.analysis}}</div>
              </div>
            </div>
          </div>
        </div>
       </div> 
      <!-- 武器技能解析 开始 -->

      <!-- 适配角色 开始 -->
      <div class="character" v-if="weapon.character && weapon.character.length > 0">
        <BlockTitle title="适配角色" :icon="2"></BlockTitle>
        <div class="panel">
          <div class="panelBar">
            <div class="half">
              <div class="barSpan center">角色</div>
            </div>
              <div class="half">
                <div class="barTitle">适用度评分</div>
              </div>
          </div>
          <div class="panelContent">
            <div class="charBox" v-for="(item, index) in weapon.character" :key="index">
              <img class="charImg" v-if="item.img" :src="HOST + item.img">
              <!-- 占位用的div -->
              <div class="charImg" v-if="!item.img"></div>
              <div class="charName">{{item.name}}</div>
              <div class="levelBox">
                <Star :star="item.star"></Star>
                <div class="charComment">{{item.comment}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 适配角色 结束 -->

      <!-- 武器评价 开始 -->
      <div class="comment" v-if="weapon.comment.text">
        <BlockTitle title="武器背景" :icon="2"></BlockTitle>
        <div class="panel">
          <div class="panelBar">
            <div class="barTitle">武器背景</div>
          </div>
          <div class="longText">{{weapon.comment.text}}</div>
        </div>
      </div>
      <!-- 武器评价 结束 -->

      <!-- 武器应用 开始 -->
      <div class="application" v-if="weapon.application.text">
        <BlockTitle title="武器应用" :icon="2"></BlockTitle>
        <div class="panel">
          <div class="panelBar">
            <div class="barTitle">武器应用</div>
          </div>
          <div class="longText">{{weapon.application.text}}</div>
        </div>
      </div>
      <!-- 武器应用 结束 -->
    </div>
  </div>
</template>

<script>
import WeaponName from "@/components/WeaponName/WeaponName";
import Star from "@/components/Star/Star";
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import SegmentBox from "@/components/SegmentBox/SegmentBox";
import WeaponCanvas from "@/components/WeaponCanvas/WeaponCanvas";
export default {
  name: "Detail",
  data() {
    return {
      weaponData: {
        "attr": [
          {
            "attack": 161,
            "crit": 41,
            "weight": 14,
            "lv": 40
          },
          {
            "attack": 254,
            "crit": 59,
            "weight": 18,
            "lv": 50
          }
        ],
        "comment": {
          "text": "综合实力很强的一个武器。"
        },
        "application": {
          "text": "氪金玩家的不二选择。"
        }
      }
    };
  },
  computed: {
    weapon: function() {
      return this.weaponData;
    }
  },
  created() {
    // console.log("一个新的详情页被创建。");
    this._initDetail();
  },
  components: {
    WeaponName,
    Star,
    BlockTitle,
    SegmentBox,
    WeaponCanvas,
  },
  methods: {
    _initDetail() {
      if (this.$route.params.id) {
        // console.log("现在的武器id是" + this.$route.params.id + "现在正在对该武器进行一次数据更新");
      } else {
        router.push({path: "/"});
        return;
      }
      this.$http.get(this.HOST + "Wiki/Equipment/Weapon/" + this.$route.params.id, {
        before(request) {
          if (this.previousRequest) {
            this.previousRequest.abort();
          }
          this.previousRequest = request;
        }
      })
      .then(response => {
        var data = JSON.parse(response.data);
        data.compared.sort(function(a, b) {
          if ((a.name == data.name)) {
            return -1;
          }else {
            return 1;
          }
        })
        this.weaponData = Object.assign({}, this.weaponData, data);
        // console.log("数据已被更新");
      })
      .catch(error => {
        console.log(error);
        this.$router.push({path: "/404"});
      });
    },
    changeSkillGrowingToEnd(index) {
      var now = this.$refs.skillGrowingNow[index];
      var data = this.weapon.skill[0].growing[index].end;
      var newData = data.replace(/[+]{0,1}(\d+\.\d+)|[+]{0,1}(\d+)/ig, "<span style='color: #F7B032;'>$&</span>");
      now.innerHTML = newData;
      this.$refs.beginButton[index].className = "skillButton";
      this.$refs.endButton[index].className = "skillButton light";

    },
    changeSkillGrowingToBegin(index) {
      var temp = this.$refs.skillGrowingNow
      var now = this.$refs.skillGrowingNow[index];
      var data = this.weapon.skill[0].growing[index].begin;
      var newData = data.replace(/[+]{0,1}(\d+\.\d+)|[+]{0,1}(\d+)/ig, "<span style='color: #F7B032;'>$&</span>");
      now.innerHTML = newData;
      this.$refs.beginButton[index].className = "skillButton light";
      this.$refs.endButton[index].className = "skillButton";
    },
  },
  watch: {
    $route (to, from) {
      if (to.name == "Detail") {
        this._initDetail();
      }
    }
  },
  updated() {
    for (var i = 0; i < this.weapon.skill.length; i++) {
      if (this.weapon.skill[i].name) {
        this.changeSkillGrowingToBegin(i);
      }
    }
  }, 
};
</script>

<style scoped lang="scss">
$light: #F7B032;
$dark: #20345B;
$darkText: #243755;
$subText: #929292;
$lightText: #565656;
$borderColor: #2A3958;

.Detail {
  padding-bottom: rem(100);
  .basic {
    display: flex;
    margin-top: rem(15);
    .weaponImg {
      img {
        width: rem(82.5);
        margin-left: rem(45);
      }
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center; /* align vertical */
      text-align: center;
      width: rem(205);
      height: rem(97.5);
      // margin-bottom: 0.286rem;
    }
    .weaponMsg {
      flex:1;
      .title {
        color: $darkText;
        display: flex;
        font-size: rem(12);
        font-weight: 900;
        margin-top: rem(2.6);
      }
      .lineFix {
        background-color: $light;
        border: rem(1) solid $light;
        margin: rem(2) 0;
        width: rem(23);
      }
      .subtitle {
        color: #747474;
        font-size: rem(12);
        margin-bottom: rem(2.6);
      }
    }
  }
  .attr{
    .attrImgBox {
      display: flex;
      .attrImg {
        flex:1;
        padding: rem(3) rem(10);
        img {
          width: rem(82.5);
          margin-left: rem(15);
          display: inline-block;
          margin-top: rem(14);
        }
        .attrImgTitle {
          background-color: #0C1B33;
          border-radius: rem(3);
          color: $light;
          font-size: rem(12);
          margin: 0 auto;
          // padding: 0 0.150rem;
          height: rem(16);
          width: rem(82.5);
          display: flex;
          text-align: center;
          justify-content: center; /* align horizontal */
          align-items: center; /* align vertical */
          .attrWight {
            &::before {
              color: #fff;
              content: "负重";
              margin-right: rem(1);
            }
            flex: 1;
          }
          .attrLv {
            &::before {
              color: #fff;
              content: "lv.";
              margin-right: rem(1);
            }
            flex: 1;
          }
        }
      }
    }
    .comBox {
      display: flex;
      margin-top: rem(17);
      &:nth-child(1){
        .comInfo {
          .comName {
            color: $light;
          }
        }
      }
      .comImg {
        display: inline-block;
        height: rem(47);
        margin-left: rem(6);
        width: rem(50);
      }
      .comInfo {
        margin-left: rem(10);
        margin-right: rem(5);
        .comName {
          color: $darkText;
          font-size: rem(12);
          font-weight: 900;
        }
        .comAttr {
          display: flex;
          font-size: rem(12);
          font-weight: 900;
          margin-top: rem(3);
          .comCrit.light{
            margin-left: rem(4);
          }
        }
      }
    }
  }
  .skill { 
    .skillBox {
      display: flex;
      font-size: rem(12);
      margin-top: rem(4);
      .skillTitle {
        color: $darkText;
        display: block;
        font-weight: 900;
        text-align: right;
        width: 20%;
      }
      .skillText {
        color: #565656;
        display: block;
        font-weight: 900;
        width: 80%;
      }
      .skillGrowing {
        display: block;
        width: 80%;
        .skillButtonBox {
          display: flex;
          margin-bottom: rem(3);
          .skillButton {
            background-color: $dark;
            color: white;
            border-radius: rem(2);
            font-size: rem(12);
            line-height: rem(18);
            padding: 0 rem(5);
            margin-right: rem(5);
          }
          .light {
            background-color: $light;
            color: black;
          }
        }
        .skillText {
          width: 100%;
        }
      }
    }
    .lightBox {
      background-color: #f8f8f8;
      border-radius: 6px;
      margin-top: rem(10);
      padding: rem(5) rem(2);
    }
  }
  .character{
    .panelBar {
      margin-top: rem(5);
    }
    .charBox {
      align-items: center;
      display: flex;
      margin-top: rem(9);
      padding: rem(5) rem(16);
      text-align: center;
      .charImg {
        height: rem(48);
        margin-left: rem(3);
        margin-right: rem(10);
        width: rem(58);
      }
      .charName {
        flex:1;
        font-size: rem(12);
        font-weight: 900;
      }
      .levelBox {
        flex:1;
        margin-left: rem(7.5);
        text-align: left;
        .charComment {
          color: $darkText;
          font-size: rem(12);
          margin-top: rem(5);
        }
      }
    }
  }
  .panel {
    border-radius: 6px;
    border: rem(1) solid #ddd;
    margin: rem(10) auto;
    padding: rem(5);
    width: rem(337);
    .panelBar {
      display: flex;
      justify-content: space-between;
      .half {
        width: 50%;
      }
      .center {
        margin: 0 auto;
      }
      .barSpan {
        background-color: #0C1B33;
        border-radius: rem(3);
        color: #fff;
        height: rem(19);
        font-size: rem(12);
        padding: 0 rem(2.6);
        text-align: center;
        width: rem(51);
        display: flex;
        justify-content: center; /* align horizontal */
        align-items: center; /* align vertical */
      }
      .barTitle {
        color: $darkText;
        font-size: rem(12);
        font-weight: 900;
        line-height: rem(19);
        margin: 0 auto;
        text-align: center;
        width: rem(150);
      }
      .barSubTitle {
        color: $darkText;
        font-size: rem(12);
        font-weight: 900;
        line-height: rem(19);
        text-align: left;
        width: rem(150);
        margin-right: rem(85);
      }
      .barRight { 
        height: rem(19);
        .barRightCell {
          color: $subText;
          font-size: rem(12);
          text-align: right;
          .circle {
            border-radius: 100px;
            display: inline-block;
            height: rem(3);
            margin-left: rem(2);
            width: rem(3);
          }
          .circle.light {
            border: rem(1.5) $light solid;
          }
          .circle.dark {
            border: rem(1.5) $dark solid;
          }
          .segSpan{
            display: inline-block;
            margin-right: rem(5);
            vertical-align: middle;
            width: rem(82.5);
          }
          .segSpan.light {
            background-color: $light;
            border: rem(1) solid $light;
          }
          .segSpan.dark {
            background-color: $dark;
            border: rem(1) solid $dark;
          }
        }
      }
    }
    .longText {
      color: $lightText;
      font-size: rem(12);
      font-weight: 900;
      margin: rem(5) rem(12);
    }
    .panelContent {
      padding: rem(5) rem(5);
    }
  }
  .light {
    color: $light;
  }
  .dark {
    color: $dark;
  }
  .darkText {
    color: $darkText;
  }
}
</style>