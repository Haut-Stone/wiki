<template>
  <div class="weaponCanvas">
    <canvas :id="getId" v-if="weaponAttr" ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'WeaponCanvas',
  props: {
    weaponAttr: {
      type: Object,
      default: {},
    },
    canvasId: {
      type: Number,
      default: "1",
    }
  },
  computed: {
    getId () {
      return 'canvas' + this.canvasId;
    },
  },
  methods: {
    _initCavans() {
      // var canvas = document.getElementById(this.getId);
      var canvas = this.$refs.canvas;
      canvas.setAttribute("class", "img");
      var clientWidth = document.documentElement.clientWidth;
      clientWidth = 667;
      
      //根据设计图中的canvas画布的占比进行设置
      var canvasWidth = Math.floor(clientWidth*160/750);

      canvas.setAttribute('width',canvasWidth+'px');
      canvas.setAttribute('height',canvasWidth+'px');

      // 画环
      draw(canvasWidth/2, 5, 85, this.weaponAttr.crit, 100, this.weaponAttr.attack);

      function draw(frame, lineWidth, critRadius, crit, attackRadius, attack) {
        var context = canvas.getContext("2d");
        var attackEnd = (300 - attack) * 360 / 300;
        var critEnd = (100 - crit) * 360 / 100;
        var attackStr = attack.toString();
        var critStr = crit.toString();

        //改变0，0位置
        context.translate(frame, frame);
        context.save();

        //会心
        if (crit > 0) {
          context.rotate(-230 * Math.PI/180);
          context.beginPath();
          context.strokeStyle = "#F7B032";
          context.lineCap = "square";
          context.closePath();
          context.fill();
          context.lineWidth = lineWidth;
          context.putImageData(context.getImageData(0, 0, critRadius, critRadius), 0, 0);
          context.beginPath();
          context.arc(0, 0, critRadius / 2, 0, critEnd*2*Math.PI/360, true);
          context.stroke();
        }

        //返回
        context.restore();
        context.save();

        //攻击
        context.rotate(-90 * Math.PI/180);
        context.beginPath();
        context.strokeStyle = "#20345B";
        context.lineCap = "square";
        context.closePath();
        context.fill();
        context.lineWidth = lineWidth;
        context.putImageData(context.getImageData(0, 0, attackRadius, attackRadius), 0, 0);
        context.beginPath();
        context.arc(0, 0, attackRadius / 2, 0, attackEnd*2*Math.PI/360, true);
        context.stroke();
        context.restore();

        //文本
        context.save();
        context.font="30px Arial";
        context.fillStyle = "#20345B";
        context.fillText(attackStr, -25, -5);
        if (crit >= 10) {
          context.fillStyle = "#F7B032";
          context.fillText(critStr, -15, 25);
        } else {
          context.fillStyle = "#F7B032";
          context.fillText(critStr, -9, 25);
        }
        context.restore();
      }
    }
  },
  watch: {
    weaponAttr: {
      handler(newValue, oldValue) {
        this._initCavans(); 
      },
      deep: true,
    }
  },
};
</script>

<style scoped lang="scss">
.weaponCanvas {
  width: rem(91);
  height: rem(91);
  .img{
    width: 100%;
  }
}
</style>
