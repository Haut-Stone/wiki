<template>
  <div class="error404">
	<div class="text">
		<p>wiki程序完善中... </p>
		<p>更多详情请关注微信公众号</p>
		<p>崩坏3情报姬</p>
	</div>
    <img src="../assets/images/QRcode.jpg" alt="">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'error404',
  data () {
    return {
      img_logo: img_logo
    }
  }
}
</script>

<style scoped lang="scss">
.error404{
  	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: auto;
	background: url('../assets/images/home_bg.png') center bottom;
	background-size: 100%;
	.text{
		margin-top: rem(110);
		font-family: 'Microsoft Yahei';
		font-size: rem(26);
		font-weight: bold;
		text-align: center;
	}
	img{
		width: rem(360);
		display: block;
		margin:  0 auto;
	}
}
</style>
