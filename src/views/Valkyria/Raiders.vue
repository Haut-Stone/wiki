<template>
  <div class="raiders">
    <div class="listWrap" v-if="raiders && raiders.length > 0">
      <!-- 攻略列表 开始 -->
      <div class="raidersItem" v-for="(item,index) in raiders" :key="index" @click="openDetail(item.id)">
        <div class="left">
          <div class="title">
            <h2>{{item.title}}</h2>
          </div>
          <div class="mes">
            <span class="time">{{item.time}}发布</span>
          </div>
        </div>
        <div class="right">
          <img :src="HOST + item.imgUrl" alt="">
        </div>
      </div>
      <!-- 攻略列表 结束 -->
    </div>
    <NoData v-else></NoData>
  </div>
</template>

<script>
// @ is an alias to /src
import router from "@/router";
import NoData from "@/components/NoData/NoData";

export default {
  name: 'raiders',
  data() {
    return {
      raidersData: {}
    };
  },
  props: {
    armorData: {
      type: Object
    }
  },
  computed: {
    raiders: function() {
      return this.raidersData.raiders;
    }
  },
  watch: {
    armorData: {
      handler(newValue, oldValue) {
        this._initRaiders();
      },
      deep: true
    }
  },
  created() {
    this._initRaiders();
  },
  methods: {
    _initRaiders() {
      if (this.armorData.armorId) {
        console.log("角色id:" + this.armorData.armorId);
      } else {
        router.push({ path: "/" });
        return;
      }
      this.$http
        .get(this.HOST + "/Wiki/Valkyrja/Raiders/" + this.armorData.armorId, {
          before(request) {
            if (this.previousRequest) {
              this.previousRequest.abort();
            }
            this.previousRequest = request;
          }
        })
        .then(response => {
          console.log(JSON.parse(response.data));
          this.raidersData = Object.assign(
            {},
            this.raidersData,
            JSON.parse(response.data)
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    openDetail(id) {
      console.log(id);
    }
  },
  components: {
    NoData
  }
}
</script>

<style scoped lang="scss">
.raiders {
  width: rem(375);
  .listWrap {
    margin: rem(20) auto 0;
    .raidersItem {
      width: rem(375);
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
      padding: rem(12);
      margin-top: rem(12);
      display: flex;
      .right {
        width: rem(84);
        height: rem(64);
        img {
          width: rem(84);
          height: rem(64);
        }
      }
      .left {
        flex: 1;
        .title {
          width: rem(230);
          height: rem(44);
          padding-bottom: rem(12);
          line-height: rem(19);
          overflow: hidden;
          h2 {
            font-size: rem(13);
            font-weight: bold;
          }
        }
        .mes {
          font-size: rem(12);
          color: #999;
          .time {
            margin-right: rem(18);
          }
        }
      }
    }
  }
}
</style>
