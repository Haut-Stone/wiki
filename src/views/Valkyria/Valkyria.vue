<template>
  <div class="valkyria">
    <transition name="move">
      <ArmorList 
      :armorId="armorData.armorId" 
      v-show="armorListShow" 
      @getId="getId"  
      @hideArmorList="_hideArmorList" 
      @initBasic="_initBasic" 
      ref="armorList"
      ></ArmorList>
    </transition>
    <NavMenu 
    :armorName="armorData.armorName"
    :navData="navData"
    @showArmorList="_showArmorList"
    ></NavMenu>
    <transition name="fade">
      <ScrollMenu 
      :armorName="armorData.armorName" 
      :navData="navData"
      @showArmorList="_showArmorList" 
      v-show="scrollTop > 150"
      ></ScrollMenu>
    </transition>
    <transition name="fade">
      <BackTop :scrollTop="scrollTop"></BackTop>
    </transition>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view :armorData="armorData"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import NavMenu from "@/components/NavMenu/NavMenu";
import ScrollMenu from "@/components/ScrollMenu/ScrollMenu";
import BackTop from "@/components/BackTop/BackTop";
import ArmorList from "@/components/ArmorList/ArmorList";

import { urlParse } from "@/assets/js/util";
import router from "@/router";

export default {
  name: 'valkyria',
  data() {
    return {
      scrollTop: 0,
      armorData: {
        armorId: (() => {
          let queryParam = urlParse();
          return queryParam.armorId;
        })()
      },
      armorListShow: false,
      navData: {
        hasMenu: true,
        navMenu: [
          {
            name: '概览',
            route: '/valkyria/overview'
          },
          {
            name: '技能',
            route: '/valkyria/skill'
          },
          {
            name: '配装',
            route: '/valkyria/equipPro'
          },
          {
            name: '组队',
            route: '/valkyria/team'
          },
          {
            name: '攻略',
            route: '/valkyria/raiders'
          }
        ]
      }
    };
  },
  created() {
    if (!this.armorData.armorId && localStorage.getItem("armorId")) {
      this.$set(this.armorData, "armorId", localStorage.getItem("armorId"));
    }
  },
  mounted() {
    window.addEventListener("scroll", this._handleScroll);
  },
  methods: {
    // 初始化装甲信息
    _initBasic(data) {
      var id = '';
      if(this.armorData.armorId){
        id= this.armorData.armorId;
      } else {
        id = data.armorId;
      }
      localStorage.setItem('armorId', id);
      this._initArmorData(id);
    },
    // 更新装甲信息
    _initArmorData(armorId) {
      this.$http
        .get(this.HOST + "/Wiki/Valkyrja/ArmorBasic/" + armorId)
        .then(response => {
          this.armorData = Object.assign(
            {},
            this.armorData,
            JSON.parse(response.data)
          );
          this.$set(this.armorData, "armorId", armorId);
          router.push({ path: "/valkyria/overview" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 获取滚动条高度
    _handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.scrollTop = scrollTop;
    },
    // 显示和隐藏侧边导航栏
    _showArmorList() {
      this.armorListShow = true;
    },
    _hideArmorList() {
      this.armorListShow = false;
    },
    // 获取装甲id
    getId(data) {
      this.$set(this.armorData, "armorId", data.armorId);
      localStorage.setItem("armorId", data.armorId);
      this._initArmorData(this.armorData.armorId);
      this._hideArmorList();
    }
  },
  components: {
    NavMenu,
    ScrollMenu,
    BackTop,
    ArmorList
  }
}
</script>

<style scoped lang="scss">
.valkyria{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: rem(16);
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .move-enter-active,
  .move-leave-active {
    transition: all 0.5s;
  }
  .move-enter,
  .move-leave-to {
    transform: translate(-rem(225), 0);
    opacity: 0;
  }
}
</style>
