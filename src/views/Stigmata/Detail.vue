<template>
  <div class="stigmataDetail">
    <!-- 头条 开始 -->
    <div class="bigTitle">
      <span class="title_text">【圣痕信息】</span>
      <span class="title_text light">{{stigmata.suitName}}</span>
    </div>
    <!-- 头条 结束 -->
    
    <!-- 圣痕信息 开始 -->
    <div class="summary_div">
      <div class="smallTitle">
        <div class="itemInfo">
          <div class="title_text color_orange">{{stigmata.itemName}}</div>
          <div class="position_div">
            <img class="position_img" src="../../assets/images/up.png" v-if="stigmata.position=='上位'"/>
            <img class="position_img" src="../../assets/images/middle.png" v-else-if="stigmata.position=='中位'"/>
            <img class="position_img" src="../../assets/images/down.png" v-else-if="stigmata.position=='下位'"/>
            <div class="content_text position_text">{{stigmata.position}}圣痕</div>
          </div>
        </div>
      </div>
      <div class="mainInfo">
        <img class="leftImg" :src="host+stigmata.img"/>
        <div class="rigthInfo">
          <div class="bubble">
            <img class="bubbleImg" src="../../assets/images/bubble1.png"/>
            <div class="bubbleText">{{stigmata.comment.text}}</div>
          </div>
          <div class="infoTitle">
            氪金指数：<Star :star="stigmata.valueStar"></Star>
          </div>
          <div class="infoTitle">
            保值指数：<Star :star="stigmata.rechargeStar"></Star>
          </div>
          <div class="infoTitle">获得方式：{{stigmata.getWay}}</div>
        </div>
      </div>
    </div>
    <!-- 圣痕信息 结束 -->
    
    <!-- 面板对比 开始 -->
    <div class="property">
      <BlockTitle title="面板成长&对比" :icon="1"></BlockTitle>
      <div class="panel">
        <div class="panelBar">
          <div class="barSpan">面板成长</div>
          <div class="barSubTitle">{{stigmata.itemName}}</div>
        </div>
        <div class="panelContent">
          <div class="levelTagBox">
            <div class="levelTag dark" id="tag1">初始</div>
            <div class="levelTag dark">毕业</div>
          </div>
          <div class="numberBox">
            <div class="numberBoxRow">
              <div class="numberBoxTitle">生命</div>
              <div class="number light">{{stigmata.attr[0].life}}</div>
              <img class="arrow" src="../../assets/images/arrow.png">
              <div class="number light">{{stigmata.attr[1].life}}</div>
            </div>
            <div class="numberBoxRow">
              <div class="numberBoxTitle">攻击</div>
              <div class="number light">{{stigmata.attr[0].attack}}</div>
              <img class="arrow" src="../../assets/images/arrow.png">
              <div class="number light">{{stigmata.attr[1].attack}}</div>
            </div>
            <div class="numberBoxRow">
              <div class="numberBoxTitle">防御</div>
              <div class="number light">{{stigmata.attr[0].defense}}</div>
              <img class="arrow" src="../../assets/images/arrow.png">
              <div class="number light">{{stigmata.attr[1].defense}}</div>
            </div>
            <div class="numberBoxRow">
              <div class="numberBoxTitle">会心</div>
              <div class="number light">{{stigmata.attr[0].xxx}}</div>
              <img class="arrow" src="../../assets/images/arrow.png">
              <div class="number light">{{stigmata.attr[1].xxx}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 面板对比 结束 -->

    <!-- 单圣痕技能 开始 -->
    <div class="skill">
      <BlockTitle title="圣痕技能&成长" :icon="1"></BlockTitle>
      <div class="panel" v-for="(item, index) in stigmata.skill" :key="index" v-if="index == 0">
        <div class="panelBar">
          <div class="barSpan">圣痕技能</div>
        </div>
        <div class="panelContent">
          <div class="panelImg">
            <img :src="host+stigmata.img">
          </div>
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
                <div class="skillText" ref="skillGrowingNow">{{stigmata.skill[0].growing[index].begin}}</div>
              </div>
            </div>
          <div class="lightBox" v-if="item.analysis || item.use">
            <div class="skillBox" v-if="item.use">
              <div class="skillTitle">技能测试：</div>
              <div class="skillText">{{item.use}}</div>
            </div>
            <div class="skillBox" v-if="item.analysis">
              <div class="skillTitle">技能解析：</div>
              <div class="skillText">{{item.analysis}}</div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- 单圣痕技能 结束 -->

    <!-- 套装技能 开始 -->
    <div class="skill">
      <BlockTitle title="套装技能" :icon="1"></BlockTitle>
      <div class="panel" v-for="(item, index) in stigmata.suitSkill" :key="index" v-if="item.name">
        <div class="panelBar">
          <div class="barSpan" v-if="index == 0">两件套</div>
          <div class="barSpan" v-else>三件套</div>
        </div>
        <div class="panelContent">
          <div class="skillBox">
            <div class="skillTitle">技能说明：</div>
            <div ref="teamSkillDetail" class="skillText">{{item.name}}</div>
          </div>
          <div class="lightBox" v-if="item.analysis">
            <div class="skillBox">
              <div class="skillTitle">技能解析：</div>
              <div class="skillText">{{item.analysis}}</div>
            </div>
          </div>
        </div>
      </div>
    </div> 
    <!-- 套装技能 结束 -->

    <!-- 适配角色 开始 -->
    <div class="character">
      <BlockTitle title="适配角色" :icon="1"></BlockTitle>
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
          <div class="charBox" v-for="(item, index) in stigmata.character" :key="index">
            <img class="charImg" v-if="item.img" :src="HOST + item.img">
            <!-- 占位用的div -->
            <div class="charImg" v-else></div>
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

    <!-- 圣痕评价 开始 -->
    <div class="comment" v-if="stigmata.comment.text">
      <BlockTitle title="总体评价" :icon="1"></BlockTitle>
      <div class="panel">
        <div class="panelBar">
          <div class="barTitle">总体评价</div>
        </div>
        <div class="longText">{{stigmata.comment.text}}</div>
      </div>
    </div>
    <!-- 圣痕评价 结束 -->
  </div>
</template>

<script>
import BlockTitle from "@/components/BlockTitle/BlockTitle";
import Star from "@/components/Star/Star";
export default {
  name: "stigmataDetail",
  data() {
    return {
      host:this.HOST,
      stigmata:{
        "name": "上帝之鞭套装",
        "suitName": "上帝之鞭套装",
        "img": "/Picture/Stigmata/S3C_2/Pic.png",
        "itemName": "阿提拉（中）",
        "position": "中位",
        "rechargeStar": 0,
        "valueStar": 0,
        "getWay": "蛋池产出与兑换商店兑换",
        "attr": [{
            "attack": 0,
            "life": 234,
            "defense": 17,
            "xxx": 2
          },
          {
            "attack": 0,
            "life": 234,
            "defense": 17,
            "xxx": 2
          }
        ],
        "compared": [],
        "skill": [{
            "name": "连击数大于20时，战斗中防御提高41%",
            "detail": "连击数大于20时，战斗中防御提高41%",
            "growing": [{
              "begin": "连击数大于20时，战斗中防御提高25%",
              "end": "连击数大于20时，战斗中防御提高41%"
            }, {
              "begin": null,
              "end": null
            }],
            "analysis": null,
            "use": null
          },
          {
            "name": "连击数大于20时，战斗中防御提高41%",
            "detail": "连击数大于20时，战斗中防御提高41%",
            "growing": [{
              "begin": "连击数大于20时，战斗中防御提高25%",
              "end": "连击数大于20时，战斗中防御提高41%"
            }, {
              "begin": null,
              "end": null
            }],
            "analysis": null,
            "use": null
          }
        ],
        "suitSkill": [{
            "name": "暴击伤害提高30%，机械类角色装备时，战斗中SP上限额外提高10%",
            "analysis": null
          },
          {
            "name": "战斗中会心值40%",
            "analysis": null
          }
        ],
        "character": [{
            "img": "/Picture/Valkyrja/60203/HeadIcon.png",
            "name": "雷电芽衣",
            "star": 4
          },
          {
            "img": "/Picture/Valkyrja/60302/HeadIcon.png",
            "name": "布洛妮娅 扎伊切克",
            "star": 3
          }
        ],
        "comment": {
          "text": null
        }
      },
      tempData: {},
    };
  },
  created() {
    this._initDetail();
  },
  components: {
    Star,
    BlockTitle,
  },
  updated() {
    this.changeSkillGrowingToBegin(0);
    this._highlight();
    // console.log("updated")
  }, 
  methods: {
    _initDetail() {
      if (this.$route.params.id) {
       // console.log("http://www.gamepaper.cn/" + "Wiki/Equipment/Stigmata/" + this.$route.params.id);
      } else {
        router.push({path: "/"});
        return;
      }
      this.$http.get("http://www.gamepaper.cn/" + "Wiki/Equipment/Stigmata/" + this.$route.params.id, {
        before(request) {
          if (this.previousRequest) {
            this.previousRequest.abort();
          }
          this.previousRequest = request;
        }
      })
      .then(response => {
        var data = JSON.parse(response.data);
        this.tempData = Object.assign({}, this.tempData, data);
        this.stigmata = Object.assign({}, this.stigmata, data);
        // console.log("数据已被更新");
        // console.log(this.tempData);
      })
      .catch(error => {
        // console.log(error);
        this.$router.push({path: "/404"});
      });
    },
    changeSkillGrowingToEnd(index) {
      var now = this.$refs.skillGrowingNow[index];
      if (this.stigmata.skill[0].detail) {
        var data = this.stigmata.skill[0].growing[index].end;
        var newData = data.replace(/[+]{0,1}(\d+\.\d+)|[+]{0,1}(\d+)/ig, "<span style='color: #F7B032;'>$&</span>");
        now.innerHTML = newData;
      } else {
        now.innerHTML = "无技能";
      }
      this.$refs.beginButton[index].className = "skillButton";
      this.$refs.endButton[index].className = "skillButton light";
      // console.log("changeSkillGrowingToEnd");

    },
    changeSkillGrowingToBegin(index) {
      var now = this.$refs.skillGrowingNow[index];
      if (this.stigmata.skill[0].detail) {
        var data = this.stigmata.skill[0].growing[index].begin;
        var newData = data.replace(/[+]{0,1}(\d+\.\d+)|[+]{0,1}(\d+)/ig, "<span style='color: #F7B032;'>$&</span>");
        now.innerHTML = newData;
      } else {
        now.innerHTML = "无技能";
      }
      this.$refs.beginButton[index].className = "skillButton light";
      this.$refs.endButton[index].className = "skillButton";
      // console.log("changeSkillGrowingToBegin");
    },
    _highlight() {
      // console.log("highlight");
      var temp = this.$refs.teamSkillDetail;
      // console.log(temp)
      for (var i = 0; i < temp.length; i++) {
        // console.log(temp[i]);
        temp[i].innerHTML = this.stigmata.suitSkill[i].name.replace(/[+]{0,1}(\d+\.\d+)|[+]{0,1}(\d+)/ig, "<span style='color: #F7B032;'>$&</span>");
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.name == "Stigmata") {
        this._initDetail();
        this._highlight();
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
.bigTitle {
  text-align: center;
  margin-top: 0.286rem;
  margin-bottom: 0.286rem;
}
.stigmataDetail {
  padding: 0 0;
}
.property {
  .levelTagBox {
    display: flex;
    font-size: 0.214rem;
    margin-bottom: 0.107rem;
    #tag1 {
      margin-left: 1.65rem;
    }
    .levelTag {
        margin-left: 1.5rem;
    }
  }
  .numberBox {
    .numberBoxRow {
      display: flex;
      font-size: 0.171rem;
      line-height: 0.25rem;
      .numberBoxTitle {
        width: 0.6rem;
        margin-left: 0.45rem;
      }
      .arrow {
        // display: inline-block;
        margin-left: 0.215rem;
        height: 0.1rem;
        width: 0.493rem;
        align-self: center;
      }
      .number {
        text-align: center;
        width: 1rem;
        margin-left: 0.215rem;
      }
    }
  }
}
.summary_div{
  padding-top:0.17rem;
  width: 4.5rem;
  margin: 0 auto;
  border-top: #CDCDCD solid 2px;
  .smallTitle {
    height:0.85rem;
    text-align: center;
    .itemInfo {
      // float:left;
      // margin-left:0.53rem;
    }
  }
  .mainInfo {
    margin-top: 0.2rem;
    margin-bottom: 0.285rem;
    display: flex;
    .leftImg {
      // flex:1;
      width: 1.85rem;
      margin-left: 0.143rem;
      margin-right: 0.285rem;
      height: 1.85rem;
    }
    .rightInfo {
      flex:1;
      margin-left: 0.215rem;
      margin-top:0.1rem;
      width:2rem; 
      font-size:0.06rem;
    }
  }
}
.infoTitle {
  display: flex;
  color: $darkText;
  font-weight: 900;
  font-size: 0.128rem;
  margin-top: 0.036rem;
}

.bubble {
  margin-top: 0.321rem;
  position: relative;
  .bubbleImg {
    // position: absolute;
    width:2rem;
    height:.5rem;
  }
  .bubbleText {
    position: absolute;
    text-align: center;
    width:2rem;
    display: flex;
    justify-content: center; /* align horizontal */
    align-items: center; /* align vertical */
    font-size: 0.143rem;
    height:0.45rem;
    top:0;
    left:0;
  }
}

.title_text{
  font-size: 0.25rem;
}
.content_text{
  font-size:0.18rem;
}
.icon_div{
  float: left;
}
.icon_img{
  width:0.88rem;
  height: 0.85rem;
}
.position_div{
  display: inline-block;
  border: black solid 1px;
  border-radius: 5px;
  width: 1.8rem;
  height: 0.36rem;
  margin-top: 0.15rem;
}
.position_img{
  height:0.357rem;
  width:0.357rem;
  margin:0 0.18rem 0 0.26rem;
  float:left;
}
.position_text{
float:left;
line-height: 0.36rem;
}

.star_img{
  height:0.16rem;
}
.square_div{
  margin-top:0.113rem;
  width:94%;
  border: #7F7F7F solid 1px;
  border-radius: 0.1rem;
  padding:3%;
}
.property_title{
  width:100%;
  height:0.32rem;
}
.blue_button{
  width:18%;
  height:100%;
  background-color: #26497F;
  border-radius: 0.025rem;
  color:white;
  font-size:0.18rem;
  text-align:center;
  line-height: 0.32rem;
  float:left;
}
.property_text{
  width:82%;
  height:100%;
  font-size:0.18rem;
  text-align:center;
  line-height:0.32rem;
  float:right;
}
.property_content{
  margin-top:0.113rem;
}
.stigmata_head_div{
  width:0.87rem;
  font-size:0px;
}
.stigmata_head{
  width:0.87rem;
  height:0.75rem;
}

.skill { 
  .skillBox {
    display: flex;
    font-size: 0.128rem;
    margin-top: 0.05rem;
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
        margin-bottom: 0.035rem;
        .skillButton {
          background-color: $dark;
          color: white;
          border-radius: 0.028rem;
          font-size: 0.143rem;
          line-height: 0.243rem;
          padding: 0 0.07rem;
          margin-right: 0.07rem;
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
    margin-top: 0.143rem;
    padding: 0.05rem 0.021rem;
  }
}
.character{
  .panelBar {
    margin-top: 0.07rem;
  }
  .charBox {
    align-items: center;
    display: flex;
    margin-top: 0.12rem;
    padding: 0.07rem 0.21rem;
    text-align: center;
    .charImg {
      height: 0.64rem;
      margin-left: 0.05rem;
      margin-right: 0.14rem;
      width: 0.752rem;
    }
    .charName {
      flex:1;
      font-size: 0.17rem;
      font-weight: 900;
    }
    .levelBox {
      flex:1;
      margin-left: 0.1rem;
      text-align: left;
      .charComment {
        color: $darkText;
        font-size: 0.122rem;
        margin-top: 0.07rem;
      }
    }
  }
}
.panel {
  border-radius: 6px;
  border: 0.014rem solid #ddd;
  margin: 0.13rem auto;
  padding: 0.06rem 0.06rem;
  width: 4.5rem;
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
      border-radius: 0.043rem;
      color: #fff;
      height: 0.25rem;
      font-size: 0.12rem;
      padding: 0 0.035rem;
      text-align: center;
      width: 0.8rem;
      display: flex;
      justify-content: center; /* align horizontal */
      align-items: center; /* align vertical */
    }
    .barTitle {
      color: $darkText;
      font-size: 0.2rem;
      font-weight: 900;
      line-height: 0.25rem;
      margin: 0 auto;
      text-align: center;
      width: 2rem;
    }
    .barSubTitle {
      color: $darkText;
      font-size: 0.15rem;
      font-weight: 900;
      line-height: 0.25rem;
      margin: 0 auto;
      text-align: left;
      width: 2rem;
    }
    .barRight { 
      height: 0.25rem;
      .barRightCell {
        color: $subText;
        font-size: 0.114rem;
        text-align: right;
        .circle {
          border-radius: 100px;
          display: inline-block;
          height: 0.043rem;
          margin-left: 0.035rem;
          width: 0.043rem;
        }
        .circle.light {
          border: 0.021rem $light solid;
        }
        .circle.dark {
          border: 0.021rem $dark solid;
        }
        .segSpan{
          display: inline-block;
          margin-right: 0.07rem;
          vertical-align: middle;
          width: 1.1rem;
        }
        .segSpan.light {
          background-color: $light;
          border: 0.021rem solid $light;
        }
        .segSpan.dark {
          background-color: $dark;
          border: 0.021rem solid $dark;
        }
      }
    }
  }
  .longText {
    color: $lightText;
    font-size: 0.15rem;
    font-weight: 900;
    margin: 0.07rem 0.2rem;
  }
  .panelContent {
    padding: 0.07rem;
    .panelImg {
      text-align: center;
      margin-bottom: 0.14rem;
      img {
        height: 2.25rem;
        width: 2.25rem;
      }
    }
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
</style>
