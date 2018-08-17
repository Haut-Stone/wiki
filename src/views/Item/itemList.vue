<template>
  <div class="item_list">
    <div class="wrapper"> 
      <div class="block" v-for="(item, index) in itemList" :key="index">
        <div class="icon"></div>
        <div class="star"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemList',
  data () {
    return {
      msg: '我是材料列表',
      itemList: [
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        },
        {
          "id": 5023,
          "name": "雷霆意志",
          "icon": "后台相对应的图片的地址",
          "star": 3,
          "type": "曜日材料"
        }
      ],
    }
  },
  methods: {
    _initList() {
      this.$http.get(this.HOST + "", {
        before(request) {
          if (this.previouseRequest) {
            this.previouseRequest.abrot();
          }
          this.previouseRequest = request;
        }
      })
      .then(response => {
        let itemList = JSON.parse(response.data);
        this.itemList = Object.assign({}, this.itemList, itemList)
      })
      .catch(error => {
        console.log(error);
        console.log("error 已经被显示了");
        this.$router.push({path: "/404"});
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.item_list {
  .wrapper {
    margin-top: rem(40);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgb(243, 243, 243);
    .block {
      margin-left: rem(10);
      margin-right: rem(10);
      margin-bottom: rem(10);
      height: rem(64);
      width: rem(64);
      background-image: url(../../assets/images/blue_bg.png);
      background-size: rem(64);
      position: relative;
      .icon {
        height: rem(40);
        width: rem(40);
        position: absolute;
        background-image: url(../../assets/images/turbo.png);
        background-size: rem(40);
        top: rem(10);
        left: rem(10);
      }
      .star {
        height: rem(10);
        width: rem(30);
        position: absolute;
        background-image: url(../../assets/images/star_4.png);
        background-size: rem(30);
        top: rem(52);
        left: rem(20);
      }
    }
  }
}
</style>
