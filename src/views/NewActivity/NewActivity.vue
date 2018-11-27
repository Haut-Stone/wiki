<template>
  <div class="newActivity">
    <header class="header">
				<img class="logo" :src="img_logo" alt="情报姬女仆装">
			</header>
		<div class="topImage">
			<img :src="topImage" alt="">
		</div>
    <div class="newsWrap">
      <div class="newsSegment" v-for="(item, index) in list" :key="index" @click="openPage(item.link)">
        <div class="newsImage">
          <img :src="HOST + item.cover" alt="" v-if="item.cover">
        </div>
        <div class="newsInfo">
          <div class="newsText">{{item.text}}</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <BackTop :scrollTop="scrollTop"></BackTop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import BackTop from "@/components/BackTop/BackTop";
import router from "@/router";
import img_logo from '@/assets/images/logo.png';
import topImage from '@/assets/images/newActivity_top_image.png';
export default {
  name: 'newActivity',
  data () {
    return {
      scrollTop: 0,
			img_logo: img_logo,
      topImage: topImage,
      newsData: [
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
        {
          text: "测试用",
          cover: "",
          link: "https://mp.weixin.qq.com/s/bJRcVY_5509IXKazEPJKGw",
        },
      ],
    }
  },
  created() {
    this._initIndex();
  },
  mounted() {
    window.addEventListener("scroll", this._handleScroll);
	},
	methods: {
    // 获取滚动条高度
    _handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
    },
    openPage(url) {
      window.open(url);
    },
    _initIndex() {
      this.newsData = [];
      this.$http.get(this.HOST + 'Wiki/Article/classify(classifyName="最新活动")', {
        before(request) {
          if (this.previouseRequest) {
            this.previouseRequest.abort();
          }
          this.previouseRequest = request;
        }
      })
      .then(response => {
        var data = JSON.parse(response.data);
        this.newsData = Object.assign({}, this.newsData, data);
        // console.log(this.list);
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  components: {
    BackTop
  },
  computed: {
    list() {
      return this.newsData;
    },
  }
}
</script>

<style scoped lang="scss">
.newActivity{
  .header{
		display: flex;
		justify-content: center;
		align-items: center;
		height: rem(60);
		line-height: rem(60);
		background-color: #1e263b;
		.logo{
			height: rem(25);
		}
	}
	.topImage {
		display: flex;
		margin: 0 0;
		img {
			width: rem(375);
			height: rem(188);
		}
	}
  .newsWrap {
    .newsSegment{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: rem(355);
      height: rem(120);
      padding: rem(10);
      overflow: hidden;
      .newsImage{
        width: rem(150);
        height: rem(100);
        background: #aaa;
        img{
          width: rem(150);
          height: rem(100);
        }
      }
      .newsInfo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: rem(190);
        height: rem(100);
        .newsText{
          height: rem(40);
          line-height: rem(40);
          color: #8e8e93;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
