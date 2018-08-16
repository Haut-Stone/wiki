<template>
  <div class="raidersArticleList">
    <div>{{type}}</div>
    <div class="articleWrap">
      <div class="article" v-for="(item,index) in list" :key="index"  @click="openPage(item.url)">
        <div class="atcImage"></div>
        <div class="atcCont">
          <div class="title">我是标题我是标题我是标题我是标题我是标题我是标题</div>
          <div class="text">我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容</div>
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
      type: '',
      list: [
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        },
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        },
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        },
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        },
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        },
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        },
        {
          imgUrl: '',
          title: '',
          text: '',
          url: 'www.baidu.com'
        }
      ]
    };
  },
  created() {
    this.type = this.$route.params.type;
  },
  beforeRouteUpdate(to, from, next){
      this.type = to.params.type;
      next();
  },
  methods: {
    openPage(url) {
      console.log(url)
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
        width: rem(190);
        height: rem(100);
        .title{
          height: rem(20);
          overflow: hidden;
          font-size: rem(14);
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #66b3ff;
        }
        .text{
          height: rem(60);
          margin: rem(10) 0;
          line-height: rem(20);
          overflow: hidden;
          font-size: rem(12);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
    }
  }
}
</style>