<template>
  <div class="stigmataList" >
    <div v-for="(star,levelIndex) in starList" class="levelDiv"  @click="showDiv(levelIndex)" :key="levelIndex">
      <div class="stigmataStar">
        <h1 class="stigmataTitle">{{star.starName}}</h1>
        <div class="lineFix"></div>
      </div>
      <div v-for="(suit,index) in star.stigSuitInfor" v-bind:class="{showDiv:levelIndex==showIndex,hiddenDiv:levelIndex!=showIndex,stigmataDiv:1}" :key="index">
        <div class="textDiv">
          <p class="stigmataText">{{suit.suitName}}</p>
          <p class="desText">{{suit.suitDes}}</p>
        </div>
        <div class="imgDiv">
            <img :src="host+suitImg.imgUrl" @click="toStigmata(suitImg.id)" v-for="(suitImg,imgIndex) in suit.suitImgs" v-if="imgIndex<4" class="img" :key="imgIndex">
        </div>
      </div>
      <div  v-bind:class="{showDiv:levelIndex==showIndex,hiddenDiv:levelIndex!=showIndex,singleListDiv:1}">
      <div v-for="(single,singleIndex) in star.stigSingleInfor" class="singleDiv singleText" :key="singleIndex">
        <img :src="host+single.imgUrl" @click="toStigmata(single.id)" class="imgSingle">
        <div clss="singleText">{{single.suitName}}</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import demoImg from "@/assets/images/demo.png"
export default {
  showIndex:0,
  name: "StigmataList",
  data() {
    return {
      host:this.HOST,
      showIndex:0,
      starList:[],
      tempList:[],
    };
  },
  created () {
    this._initStigmataList();
  },
  methods:{
     _initStigmataList () {
      this.$http.get(this.HOST + '/Wiki/Equipment/StigmataList')
      .then(response => {
        var data = JSON.parse(response.data); //将接收到的json字符串转json对象
        for(var k=0; k<data.length; k++){    //获取对应星级的名字
          if(data[k].star==5){
            data[k].starName="五星圣痕";
          }else if(data[k].star==4){
            data[k].starName="四星圣痕";
          }else if(data[k].star==3){
            data[k].starName="三星圣痕";
          }else if(data[k].star==2){
            data[k].starName="二星圣痕";
          }else if(data[k].star==1){
            data[k].starName="一星圣痕";
          }else{
            data[k].starName="其它"
          }
        }
        var tmp = "";          //冒泡排序，将圣痕星级按高到低排序
        for(var i=0;i<data.length; i++){
          for(var j=i+1; j<data.length;j++){
            if(data[i].star<data[j].star){
              tmp=data[i];
              data[i]=data[j];
              data[j]=tmp;
            }
          }
        }
        this.tempList = data;
        this._updateData(this.$route.params.type);
        // console.log(data[1].stigSuitInfor)
      })
      .catch(error => {
        // console.log(error);
        router.push({ path: "/404" });
      });
    },
    showDiv:function(LevelIndex){
      this.showIndex=LevelIndex;
    },
    toStigmata:function(id){
      this.$router.push({name:'stigmataDetail',params:{id:id}});
    },
    _updateData: function (type) {
      this.starList = [];
      if (type == "fiveStar") {
        this.starList[0] = this.tempList[0];
      } else if (type == "fourStar") {
        this.starList[0] = this.tempList[1];
      } else if (type == "threeStar") {
        this.starList[0] = this.tempList[2];
      } else if (type == "twoStar") {
        this.starList[0] = this.tempList[3];
      } else if (type = "otherStar") {
        //do nothing
      } else {
        //do nothing
      }
      this.showDiv(0);
    }
  },
  watch: {
    $route (to, from) {
      this._updateData(to.params.type);
    }
  },
};
</script>

<style scoped lang="scss">
.stigmataList {
  padding-bottom: rem(160);
  .levelDiv {
    margin:0 5%;
    text-align: center;
    .stigmataStar {
      margin-top: rem(16);
      text-align: center;
      .stigmataTitle {
        margin: 0 auto;
        width: rem(77);
        line-height: rem(27);
        font-size: rem(19);
      }
      .lineFix {
        margin: 0 auto;
        width: rem(46);
        border-bottom: rem(1) solid black;
      }
    }
  }
}


.showDiv{
  display:inline-block;
}
.hiddenDiv{
  display:none;
}

.levelTextDiv{
  margin-top: rem(16);
  height: rem(34);
}
.levelText{
  margin: 0 auto;
  width: rem(77);
  line-height: rem(19);
  font-size: rem(12);
}
.stigmataDiv{
  width:100%;
  height: rem(72);
  position: relative;
  border-bottom: #7F7F7F dashed 1px;
}
.textDiv{
  position: absolute;
  height: rem(71);
  left: rem(15);
  width: rem(145);
  padding-top: rem(29);
  margin-bottom: rem(11);
}
.stigmataText{
  display: inline-block;
  // margin-right: 0.143rem;
  font-size: rem(15);
  text-align: center;
  color:#7030A0;
}
.desText{
  font-size: rem(6);
  color:#7F7F7F;
}
.imgDiv{
  margin-left: rem(35);
  height: rem(37.5);
  position: absolute;
  left: rem(112.5);
  width:auto;
  // height:1rem;
  margin-top: rem(22);
}
.img{
  width: rem(43);
  height: rem(37.5);
  margin-left: rem(12);
  border-radius: 5px;
  border:#7030A0 solid 2px;
}
.imgSingle {
  width: rem(43);
  height: rem(37.5);
  border-radius:5px;
  border:#7030A0 solid 2px;
}
.singleListDiv{
   width:100%;
   height: auto;
}
.singleDiv{
  width: 25%;
  margin-top: rem(12);
  float:left;
}
.singleText{
  font-size: rem(12);
  color: black;
  text-align: center;
  float: left;
}

</style>
