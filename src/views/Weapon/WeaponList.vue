<template>
  <div class="weaponList">
    <div class="dataWrap">
      <!-- 列表组件 开始 -->
      <WeaponIndex v-for="(item, id) in index" :weaponData="item.weaponList" :weaponStar="item.level" :key="id"></WeaponIndex>
      <!-- 列表组件 结束 -->
    </div>
  </div>
</template>

<script>
import WeaponIndex from "@/components/WeaponIndex/WeaponIndex";
export default {
  name: "WeaponList",
  data() {
    return {
      indexData: [],
      type: ''
    };
  },
  components: {
    WeaponIndex,
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
    index() {
      return this.indexData;
    },
    typeNum() {
      if(this.type === 'knife'){
        return 1;
      }
      if(this.type === 'gun'){
        return 2;
      }
      if(this.type === 'sword'){
        return 3;
      }
      if(this.type === 'artillery'){
        return 4;
      }
      if(this.type === 'cross'){
        return 5;
      }
      if(this.type === 'knuckles'){
        return 6;
      }
      return 0;
    }
  },
  methods: {
    _initIndex() {
      // console.log("beginResuest");
      if(this.typeNum === 0){
        return;
      }
      this.$http.get(this.HOST + "Wiki/Equipment/WeaponList/" + this.typeNum, {
        before(request) {
          if (this.previouseRequest) {
            this.previouseRequest.abort();
          }
          this.previouseRequest = request;
        }
      })
      .then(response => {
        var data = JSON.parse(response.data);
        data.sort(function(a, b) {
          if (a.level < b.level) {
            return 1;
          } else if (a.level > b.level) {
            return -1;
          } else {
            return 0;
          }
        });
        this.indexData = Object.assign({}, this.indexData, data);
        // console.log(data);
      })
      .catch(error => {
        console.log(error);
        console.log("error 已经被显示了");
      });
    },
  },
};
</script>

<style scoped lang="scss">
.weaponList {
  padding-bottom: rem(100);
}
</style>
