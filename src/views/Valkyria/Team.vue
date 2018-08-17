<template>
  <div class="team">
    <div class="dataWrap" v-if="team && team.length > 0">
      <RoleName :armorData="armorData" :armorName="armorData.armorName"></RoleName>
      <!-- 组队列表 开始 -->
      <div class="dif-team">
        <div class="teamInfoWrap" v-for="(teamItem,index) in team" :key="index">
          <div class="team-info">
            <h2 class="team-name">{{teamItem.name}}</h2>
            <img class="team-break" src="../../assets/images/team-break.png">
            <p class="team-features">{{teamItem.feature}}</p>
            <button @click="moveTo(index)" class="team-button font-style-1">查看</button>
          </div>
          <div class="team-img-box">
            <div class="imgWrap">
              <img class="team-avatar" :src="HOST + member.avatar" v-for="(member,imageIndex) in teamItem.member" :key="imageIndex">
            </div>
            <p class="team-name-all">
              <span v-for="(member,imageIndex) in teamItem.member" :key="imageIndex">{{member.name}}</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 组队列表 结束 -->

      <!-- 组队详情 开始 -->
      <div class="teamListItem" v-for="(teamItem,index) in team" :key="index">
        <div class="teamItem" :ref="'item'+index">
          <BlockTitle :title="teamItem.name" :icon="1" rightTxt="队伍构成"></BlockTitle>
          <div class="character-board">
            <div class="character-box" v-for="(member,memberIndex) in teamItem.member" :key="memberIndex">
              <span class="character-features" :class="'color'+(memberIndex+1)">{{member.position}}</span>
              <h2 class="character-skills">{{member.feature}}</h2>
              <img class="character-img" :src="HOST + member.avatar" alt="">
              <p class="character-name">{{member.name}}</p>
              <img class="character-attr" v-if="member.type === '生物'" src="../../assets/images/biological.png" alt="">
              <img class="character-attr" v-else-if="member.type === '异能'" src="../../assets/images/ability.png" alt="">
              <img class="character-attr" v-else-if="member.type === '机械'" src="../../assets/images/mechanical.png" alt="">
            </div>
          </div>
          <div class="text-box light">
            <div v-for="(member,memberIndex) in teamItem.member" :key="memberIndex">
              <h4>{{member.name}}{{member.bestlevel}}:</h4>
              <p>{{member.collection}}</p>
            </div>
          </div>
          <div class="text-box dark" v-if="teamItem.kernel">
            <h3>搭配核心</h3>
            <p>{{teamItem.kernel}}</p>
          </div>
          <div class="text-box light">
            <p><span>输出流程: </span>{{teamItem.loop}}</p>
          </div>
        </div>
        <div class="teamItem applicableScene" v-if="teamItem.applicableScene && teamItem.applicableScene.length > 0">
          <BlockTitle :title="teamItem.name" :icon="1" rightTxt="适用场景"></BlockTitle>
          <div class="applicableSceneItem" v-for="(sceneItem,sceneIndex) in teamItem.applicableScene" :key="sceneIndex">
            <FitLineTitle :grade="sceneItem.fitnessLevel" :fitLineTitle="sceneItem.sceneName"></FitLineTitle>
            <div class="description">{{sceneItem.sceneText}}</div>
          </div>
        </div>
      </div>
      <!-- 组队详情 结束 -->
    </div>
    <NoData v-else></NoData>
  </div>
</template>

<script>
// @ is an alias to /src
import RoleName from '@/components/RoleName/RoleName';
import BlockTitle from '@/components/BlockTitle/BlockTitle';
import FitLineTitle from '@/components/FitLineTitle/FitLineTitle';
import NoData from '@/components/NoData/NoData';
import router from "@/router";

export default {
  name: 'team',
  data () {
    return {
      teamData: {}
    }
  },
  props: {
    armorData: {
      type: Object
    }
  },
  computed: {
    team: function () {
      return this.teamData.teamPro
    }
  },
  watch: {
    armorData: {
      handler(newValue, oldValue) {
        this._initTeam();
      },
      deep: true
    }
  },
  created () {
    this._initTeam();
  },
  methods:{
    moveTo(index) {
      document.documentElement.scrollTop = this.$refs['item'+index][0].offsetTop - 50;
      document.body.scrollTop = this.$refs['item'+index][0].offsetTop - 50;
    },
    // 初始化组队信息
    _initTeam () {
      if (this.armorData.armorId) {
        //console.log('角色id:'+this.armorData.armorId);
      } else {
        router.push({ path: "/" });
        return;
      }
      this.$http.get(this.HOST + "/Wiki/Valkyrja/Team/" + this.armorData.armorId,{
          before(request) {
            if (this.previousRequest) {
              this.previousRequest.abort();
            }
            this.previousRequest = request;
          }
      })
        .then(response => {
          this.teamData = Object.assign({}, this.teamData, JSON.parse(response.data));
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    RoleName,
    BlockTitle,
    FitLineTitle,
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

.team{
  margin-bottom: rem(12);
  .dif-team{
    .teamInfoWrap{
      border: 1px solid #D8D9DA;
      border-radius: 6px;
      margin-left: rem(12);
      margin-right: rem(12);
      margin-top: rem(12);
      width: auto;
      padding: rem(11) rem(13);
      display: flex;
      .team-info{
        width: rem(135);
        .team-name{
          font-size: rem(15);
          margin-top: rem(5);
        }
        .team-break{
          margin-top: rem(3);
          width: rem(134);
          display: block;
        }
        .team-features{
          margin-top: rem(1);
          font-size: rem(12);
        }
        .team-button{
          margin-top: rem(11);
          display: block;
          height: rem(23.5);
          width: rem(61);
          font-size: rem(12);
          background-color: #1B2B42;
          border: 1px solid white;
          border-radius: 4px;
          text-align: center;
          color: #F8B02C;
        }
      }
      .team-img-box{
        flex: 1;
        text-align: center;
        width: rem(188);
        .imgWrap img{
          width: rem(60);
          margin-right: rem(-4.5);
        }
        .team-name-all{
          color: #AFB1B2;
          text-align: center;
          margin: rem(8) auto 0;
          font-size: rem(12);
          span:after{
            content: '+'
          }
          span:last-child:after{
            content: ''
          }
        }
      }
    }
  }
  .teamItem{
    margin: 0 rem(12);
    margin-top: rem(30);
    .character-board{
      margin-top: rem(18);
      margin-bottom: rem(12);
      border: 1px solid #D8D9DA;
      border-radius: 6px;
      padding: rem(12);
      display: flex;
      .character-box{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        .character-features{
          color: white;
          text-align: center;
          display: inline-block;
          padding: rem(2) rem(5);
          font-size: rem(12);
          border-radius: 4px;
          border: 1px solid white;
          margin: 0 auto;
          &.color1{
            background-color: $color-blu;
          }
          &.color2{
            background-color: $color-yel;
          }
          &.color3{
            background-color: $color-pin;
          }
          &:before{
            content: "";
            width: rem(6);
            height: rem(9);
            display: inline-block;
            vertical-align: middle;
            background: url('../../assets/images/featuresIcon.png') no-repeat;
            background-size: rem(6) rem(9);
            margin-right: rem(6);
          }
        }
        .character-skills{
          font-size: rem(12);
          margin-top: rem(4);
        }
        .character-img{
          width: rem(60);
          margin-top: rem(10);
        }
        .character-name{
          color: #4d4d4d;
          font-size: rem(12);
        }
        .character-attr{
          margin-top: rem(6);
          width: rem(25);
        }
      }
    }
    .text-box{
      padding: rem(9) rem(10);
      margin-top: rem(10);
      border-radius: 6px;
      line-height: rem(18);
      &.light{
        background-color: $light;
      }
      &.dark{
        background-color: $dark;
        color: #fff;
        padding: rem(12) rem(16);
      }
      h4{
        font-size: rem(12);
        color: $color-blu;
        margin-bottom: rem(1);
      }
      p{
        font-size: rem(12);
        margin-bottom: rem(5);
        span{
          color: $color-blu;
        }
      }
      h3{
        font-size: rem(12);
        color: $color-yel;
        margin-bottom: rem(6);
      }
    }
  }
  .applicableScene{
    .applicableSceneItem{
      margin: rem(36) auto;
      width: rem(295);
      .description{
        line-height: rem(18);
        color: #4d4d4d;
        font-size: rem(12);
      }
    }
  }
}
</style>
