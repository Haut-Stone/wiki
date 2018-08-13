<template>
  <div class="overview">
    <div class="dataWrap" v-if="overview">
      <!-- 角色基本信息开始 -->
      <RoleName :armorData="armorData" :armorName="armorData.armorName"></RoleName>
      <div class="basic">
        <div class="roleImage_large">
          <img :src="HOST + overview.armorImageUrl" v-if="overview.armorImageUrl">
        </div>
        <div class="roleMes">
          <div class="title">初始：<span class="icon" :class="'icon-'+overview.initialLevel"></span></div>
          <div class="title">定位：<span class="text">{{overview.armorPosition}}</span></div>
          <div class="title getway">获得方式：
            <p class="text" v-for="(item,index) in overview.getWay" :key="index">{{item}}</p>
          </div>
        </div>
      </div>
      <div class="basicProper" ref="basicProper"></div>
      <!-- 角色基本信息 结束 -->

      <!-- 优缺点 开始 -->
      <div class="advantage" v-if="overview.advantage || overview.disadvantage">
        <BlockTitle title="优缺点" :icon="1"></BlockTitle>
        <div class="advantageItem">
          <div class="title">优势</div>
          <div class="description">{{overview.advantage}}</div>
        </div>
        <div class="advantageItem">
          <div class="title">劣势</div>
          <div class="description">{{overview.disadvantage}}</div>
        </div>
      </div>
      <!-- 优缺点 结束 -->

      <!-- 适用场景 开始 -->
      <div class="applicableScene" v-if="overview.applicableScene && overview.applicableScene.length > 0">
        <BlockTitle title="适用场景" :icon="1"></BlockTitle>
        <div class="applicableSceneItem" v-for="(item,index) in overview.applicableScene" :key="index">
          <FitLineTitle :fitLineTitle="item.sceneName" :grade="item.fitnessLevel"></FitLineTitle>
          <div class="description">{{item.sceneText}}</div>
        </div>
      </div>
      <!-- 适用场景 结束 -->

      <!-- 角色皮肤 开始 -->
      <div class="roleSkin">
        <BlockTitle title="角色皮肤" :icon="1"></BlockTitle>
        <div class="roleSkinWrap">
          <div class="roleSkinScroll" v-if="this.overview.roleSkin" :style="'width:' + this.overview.roleSkin.length * 1.84 + 'rem'">
            <div class="roleSkinItem" v-for="(item,index) in overview.roleSkin" :key="index">
              <img :src="HOST + item.skinImageUrl" alt="">
              <div class="name">{{item.skinName}}</div>
              <Star :star="item.skinStar"></Star>
              <div class="sourse">{{item.skinGetWay}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 角色皮肤 结束 -->

      <!-- 宿舍形象 开始 -->
      <div class="dormitoryImage" v-if="overview.dormitoryImage && overview.dormitoryImageQ">
        <BlockTitle title="宿舍形象" :icon="1"></BlockTitle>
        <div class="dormitoryImageWrap">
          <div class="imageLarge">
            <img :src="HOST + overview.dormitoryImage" alt="" v-if="overview.dormitoryImage">
          </div>
          <div class="icon">
            <img src="../../assets/images/dormitoryImageIcon.png" alt="">
          </div>
          <div class="imageQ">
            <img :src="HOST + overview.dormitoryImageQ" alt="" v-if="overview.dormitoryImageQ">
            <h2>Q版头像</h2>
          </div>
        </div>
      </div> 
      <!-- 宿舍形象 结束 -->

      <!-- 角色起源 开始 -->
      <div class="roleOrigin">
        <BlockTitle title="角色起源" :icon="1"></BlockTitle>
        <div class="roleOriginWrap">
          <RoleName 
          :armorData="armorData"
          ></RoleName>
          <h4 class="roleDescription" v-if="overview.armorStartVersion && overview.armorStartVersionName">
            <span class="version">{{overview.armorStartVersion}}</span>{{overview.armorStartVersionName}}版本登场！
          </h4>
          <div class="roleOriginItem" v-if="overview.appearStory">
            <h2>角色出场故事</h2>
            <p>{{overview.appearStory}}</p>
          </div>
          <div class="roleOriginItem" v-if="overview.originStory">
            <h2>角色起源故事</h2>
            <p>{{overview.originStory}}</p>
          </div>
          <div class="roleOriginListItem">
            <h2>其他装甲</h2>
            <div class="armorList">
              <div class="armorListWrap" v-if="this.overview.anotherArmor" :style="{overflowX: this.overview.anotherArmor.length > 3 ? 'auto' : 'hidden'}">
                <div class="armorListScroll" :style="{width: this.overview.anotherArmor.length * 1.32 + 'rem'}">
                  <div class="listItem" v-for="(item,index) in overview.anotherArmor" :key="index">
                    <img :src="HOST + item.armorImageUrl" alt="">
                    <span>{{item.armorName}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="roleOriginListItem">
            <h2>相关人物</h2>
            <div class="roleList">
              <div class="listItem" v-for="(item,index) in overview.relatedRole" :key="index">
                <img :src="HOST + item.armorImageUrl" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 角色起源 结束 -->
    </div>
    <NoData v-else></NoData>
  </div>
</template>

<script>
// @ is an alias to /src
import RoleName from "@/components/RoleName/RoleName";
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import Star from "@/components/Star/Star";
import FitLineTitle from "@/components/FitLineTitle/FitLineTitle";
import NoData from "@/components/NoData/NoData";
import router from "@/router";

import echarts from 'echarts';
// 引入柱状图组件
import 'echarts/lib/chart/radar';
// 引入提示框和title组件
import 'echarts/lib/component/tooltip';

export default {
  name: 'overview',
  data() {
    return {
      overviewData: {},
      option:{
          tooltip: {},
          radar: {
              startAngle: 60,
              name: {
                  textStyle: {
                      color: '#000'
                }
              },
              indicator: [
                { name: '爆发', max: 10},
                { name: '输出', max: 10},
                { name: '控制', max: 10},
                { name: '上手', max: 10},
                { name: '辅助', max: 10},
                { name: '生存', max: 10}
              ]
          },
          series: [{
              name: '女武神属性',
              type: 'radar',
              areaStyle: {color: '#ffb22b'},
              lineStyle: {color: '#ffb22b'},
              itemStyle: {color: '#ffb22b'},
              data : [
                  {
                      value : [8, 6, 2, 4, 10, 6],
                      name : '女武神属性'
                  }
              ]
          }]
      }
    };
  },
  props: {
    armorData: {
      type: Object
    }
  },
  computed: {
    overview: function() {
      return this.overviewData;
    }
  },
  watch: {
    armorData: {
      handler(newValue, oldValue) {
        this._initOverview();
      },
      deep: true
    }
  },
  created () {
    this._initOverview();
  },
  methods: {
    // 初始化概览信息
    _initOverview () {
      if (this.armorData.armorId) {
        //console.log('角色id:' + this.armorData.armorId);
      } else {
        router.push({ path: "/" });
        return;
      }
      this.$http.get(this.HOST + "/Wiki/Valkyrja/Overview/" + this.armorData.armorId,
      {
        before(request) {
          if (this.previousRequest) {
            this.previousRequest.abort();
          }
          this.previousRequest = request;
        }
      })
      .then(response => {
        this.overviewData = Object.assign({}, this.overviewData, JSON.parse(response.data));
        this._initEcharts(this.overview.roleAttr);
      })
      .catch(error => {
        console.log(error);
        router.push({ path: "/404" });
      });
    },
    // 初始化图表
    _initEcharts (roleAttr) {
      var myChart = echarts.init(this.$refs.basicProper);
      var attr = [];
      attr.push(roleAttr.atk);
      attr.push(roleAttr.dps);
      attr.push(roleAttr.cont);
      attr.push(roleAttr.diff);
      attr.push(roleAttr.aid);
      attr.push(roleAttr.sur);
      this.option.series[0].data[0].value = attr;
      myChart.setOption(this.option);
    }
  },
  components: {
    RoleName,
    BlockTitle,
    Star,
    FitLineTitle,
    NoData
  }
}
</script>

<style scoped lang="scss">
.overview {
  .basic {
    display: flex;
    margin-top: rem(6);
    .roleImage_large {
      width: rem(218);
      img {
        width: rem(218);
      }
    }
    .roleMes {
      flex: 1;
      .title {
        line-height: rem(20);
        font-size: rem(12);
        color: #4d4d4d;
        font-weight: bold;
        &.getway {
          overflow-x: hidden;
          overflow-y: auto;
          height: rem(60)
        }
        &:nth-child(1) {
          margin-top: rem(25);
        }
        &:nth-child(3) {
          margin-top: rem(25);
        }
        .text {
          color: #000;
        }
        .icon {
          display: inline-block;
          vertical-align: middle;
          width: rem(37.5);
          height: rem(24);
          margin-top: rem(-7.5);
          background: url("../../assets/images/icon-s.png") no-repeat;
          background-size: auto rem(24);
          &.icon-B {
            background: url("../../assets/images/icon-b.png") no-repeat;
            background-size: auto rem(24);
          }
          &.icon-A {
            background: url("../../assets/images/icon-a.png") no-repeat;
            background-size: auto rem(24);
          }
          &.icon-S {
            background: url("../../assets/images/icon-s.png") no-repeat;
            background-size: auto rem(24);
          }
          &.icon-SS {
            background: url("../../assets/images/icon-ss.png") no-repeat;
            background-size: auto rem(24);
          }
          &.icon-SSS {
            background: url("../../assets/images/icon-sss.png") no-repeat;
            background-size: auto rem(24);
          }
        }
      }
    }
  }
  .basicProper {
    width: rem(280);
    height: rem(250);
    margin: rem(40) auto;
  }
  .advantage {
    .advantageItem {
      margin: rem(36) auto;
      display: flex;
      width: rem(295);
      .title {
        width: rem(70);
        font-size: rem(24);
        font-weight: bold;
      }
      .description {
        flex: 1;
        line-height: rem(18);
        color: #4d4d4d;
        font-size: rem(12);
      }
    }
  }
  .applicableScene {
    .applicableSceneItem {
      margin: rem(36) auto;
      width: rem(260);
      .description {
        line-height: rem(16);;
        color: #4d4d4d;
        margin-bottom: rem(14);
        font-size: rem(12);
      }
    }
  }
  .roleSkin {
    .roleSkinWrap {
      width: rem(350);
      height: rem(182);
      margin: rem(36) auto;
      overflow-y: hidden;
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      padding-bottom: rem(5);
      &::-webkit-scrollbar {
        display: none;
      }
      .roleSkinScroll {
        width: 15rem;
        height: rem(182);
        overflow: hidden;
        padding-bottom: rem(5);
        display: flex;
        .roleSkinItem {
          flex: 1;
          width: rem(124);
          height: rem(182);
          border: 1px solid #cccccc;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: rem(12);
          img {
            width: rem(90);
            height: rem(90);
            border-radius: 5px;
            margin-top: rem(12);
          }
          .name {
            font-size: rem(13);
            color: #1c2b42;
            font-weight: bold;
            margin-top: rem(15);
            margin-bottom: rem(3);
          }
          .sourse {
            font-size: rem(12);
            margin-top: rem(4);
          }
        }
      }
    }
  }
  .dormitoryImage {
    .dormitoryImageWrap {
      margin: rem(36) auto;
      display: flex;
      justify-content: center;
      align-items: center;
      .imageLarge img {
        width: rem(94);
        height: rem(230);
        margin-right: rem(10);
      }
      .icon img {
        width: rem(17.5);
        height: rem(17.5);
      }
      .imageQ {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: rem(32);
        img {
          width: rem(40);
          height: rem(52);
        }
        h2 {
          font-size: rem(12);
          color: #666666;
          font-weight: bold;
        }
      }
    }
  }
  .roleOrigin {
    .roleOriginWrap {
      width: rem(294);
      margin: 0 auto;
      .roleDescription {
        font-size: rem(12);
        text-align: center;
        margin-bottom: rem(28);
        .version {
          color: #ffb434;
        }
      }
      .roleOriginItem {
        margin-top: rem(22);
        h2 {
          font-size: rem(16);
          font-weight: bold;
          margin-bottom: rem(13);
        }
        p {
          font-size: rem(12);
          line-height: rem(18);
          color: #666;
        }
      }
      .roleOriginListItem {
        margin-top: rem(22);
        h2 {
          font-size: rem(16);
          font-weight: bold;
          margin-bottom: rem(22);
        }
        .armorList {
          .armorListWrap {
            overflow-y: hidden;
            overflow-x: auto;
            white-space: nowrap;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 5px;
            &::-webkit-scrollbar {
              display: none;
            }
            .armorListScroll {
              display: flex;
              width: 10rem;
              height: rem(122);
              overflow: hidden;
              padding-bottom: 5px;
              .listItem {
                width: 2.48rem;
                height: rem(122);
                box-sizing: border-box;
                border: 1px solid #cccccc;
                border-radius: 5px;
                margin-right: rem(6);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                  width: rem(60);
                }
                span {
                  font-size: rem(12);
                  color: #1c2b42;
                  margin-top: rem(7);
                }
              }
            }
          }
        }
        .roleList {
          width: rem(240);
          margin: 0 auto;
          font-size: 0;
          .listItem {
            display: inline-block;
            width: rem(36);
            margin-right: rem(24);
            margin-bottom: rem(7.5);
            img {
              width: rem(36);
            }
          }
        }
      }
    }
  }
}
</style>
