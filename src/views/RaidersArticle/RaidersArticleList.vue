<template>
  <div class="raidersArticleList">
    <div class="articleWrap">
      <div class="article" v-for="(item,index) in list" :key="index"  @click="openPage(item.gl_Url)">
        <div class="atcImage">
          <img :src="HOST +item.pic_Url" alt="" v-if="item.pic_Url">
        </div>
        <div class="atcCont">
          <div class="title">{{item.title}}</div>
          <div class="text">{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'raidersArticleList',
  data() {
    return {
      indexData: [],
      type: ''
    };
  },
  created() {
    this.type = this.$route.params.type;
    this._initIndex();
  },
  beforeRouteUpdate(to, from, next){
      this.type = to.params.type;
      this._initIndex();
      next();
  },
  computed: {
    list() {
      return this.indexData;
    },
    typeNum() {
      if(this.type === 'activityGuide'){
        return 1;
      }
      if(this.type === 'externalGuide'){
        return 2;
      }
      if(this.type === 'abyssGuide'){
        return 3;
      }
      if(this.type === 'otherGuide'){
        return 4;
      }
      return 0;
    }
  },
  methods: {
    openPage(url) {
      window.open(url);
    },
    _initIndex() {
      this.indexData = [];
      if(this.typeNum === 0){
        return;
      }
      this.$http.get(this.HOST + "Wiki/Article/Guides/" + this.typeNum, {
        before(request) {
          if (this.previouseRequest) {
            this.previouseRequest.abort();
          }
          this.previouseRequest = request;
        }
      })
      .then(response => {
        var data = JSON.parse(response.data);
        this.indexData = Object.assign({}, this.indexData, data.guides);
        // console.log(this.list);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped lang="scss">
.raidersArticleList{
  .articleWrap{
    overflow-x: hidden;
    overflow-y: auto;
    .article{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: rem(355);
      height: rem(120);
      padding: rem(10);
      overflow: hidden;
      .atcImage{
        width: rem(150);
        height: rem(100);
        background: #aaa;
        img{
          width: rem(150);
          height: rem(100);
        }
      }
      .atcCont{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: rem(190);
        height: rem(100);
        .title,.text{
          height: rem(40);
          line-height: rem(20);
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .title{
          color: #66b3ff;
          font-size: rem(14);
        }
        .text{
          font-size: rem(12);
        }
      }
    }
  }
}
</style>