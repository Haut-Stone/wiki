<template>
  <div class="raidersArticle">
		<header class="header">
				<img class="logo" :src="img_logo" alt="情报姬">
			</header>
		<div class="topImage">
			<img :src="topImage" alt="">
		</div>
		<nav class="raidersNav">
			<ul>
				<li><router-link to="/raidersArticle/activityGuide">活动攻略</router-link></li>
				<li><router-link to="/raidersArticle/externalGuide">外传攻略</router-link></li>
				<li><router-link to="/raidersArticle/abyssGuide">深渊攻略</router-link></li>
				<li><router-link to="/raidersArticle/otherGuide">其他攻略</router-link></li>
			</ul>
		</nav>
		<transition name="fade">
      <BackTop :scrollTop="scrollTop"></BackTop>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import BackTop from "@/components/BackTop/BackTop";
import router from "@/router";

import img_logo from '@/assets/images/logo.png';
import topImage from '@/assets/images/TopImage.png';

export default {
  name: 'raidersArticle',
  data () {
    return {
			scrollTop: 0,
			img_logo: img_logo,
			topImage: topImage
    }
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
    }
  },
  components: {
    BackTop
  }
}
</script>

<style scoped lang="scss">
.raidersArticle{
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
		margin: rem(2) 0;
		img {
			width: rem(375);
			height: rem(145);
		}
	}
	.raidersNav{
		height: rem(40);
		background: #e0e0e0;
		ul{
			display: flex;
			height: rem(40);
			li{
				flex: 1;
				height: rem(40);
				line-height: rem(40);
				text-align: center;
				a{
					color: gray;
					font-size: rem(14);
					&.active{
						color: #66b3ff;
					}
				}
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
</style>