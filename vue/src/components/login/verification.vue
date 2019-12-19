<!--
 @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-01 16:06:21
 * @LastEditTime: 2019-10-02 21:19:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section>
    <div class="login-group">
      <i class="icon" />
      <input class="code-ipt"
       placeholder="请输入验证码(区分大小写)"
       @input="ele => inputNumber(ele.target.value)"
       v-model="code"
       minLength="0"
      maxLength="6">
      <div id="code">
        <img  :src="baseimg" v-if="baseimg" alt="" @click="$emit('switch')">
        <div v-else-if="!baseimg" @click="$emit('switch')">加载失败</div>
      </div>

    <!-- <canvas id="s-canvas" :width="contentWidth" :height="contentHeight"></canvas> -->
    </div>
  </section>
</template>
<script>

export default {
  props: {
    identifyCode: {
      type: String,
      default: '4444'
    },
    baseimg: {
      type: String
    },
    value: {
      type: [ String, Number ]
    },
    fontSizeMin: {
      default: 16
    },
    fontSizeMax: {

      default: 40
    },
    backgroundColorMin: {

      default: 180
    },
    backgroundColorMax: {

      default: 240
    },
    colorMin: {

      default: 50
    },
    colorMax: {
      default: 160
    },
    lineColorMin: {
      default: 40
    },
    lineColorMax: {
      default: 180
    },
    dotColorMin: {
      default: 0
    },
    dotColorMax: {
      default: 255
    },
    contentWidth: {
      default: 160
    },
    contentHeight: {
      default: 38
    }
  },
  data () {
    return {
      code: this.value
      // contentHeight:38,
      // backgroundColorMin:180
    }
  },
  methods: {
    inputNumber (val) {
      this.code = val.replace(/^\\d{6}$/g, '')
      this.$emit('input', this.code)
    }
    // base64ImgtoFile (dataurl, filename = 'file') {
    //   let arr = dataurl.split(',')
    //   let mime = arr[0].match(/:(.*?);/)[1]
    //   let suffix = mime.split('/')[1]
    //   let bstr = atob(arr[1])
    //   let n = bstr.length
    //   let u8arr = new Uint8Array(n)
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n)
    //   }
    //   return new File([u8arr], `${filename}.${suffix}`, {
    //     type: mime
    //   })
    // },
    // // 生成一个随机数
    // randomNum (min, max) {
    //   return Math.floor(Math.random() * (max - min) + min)
    // },
    // // 生成一个随机的颜色
    // randomColor (min, max) {
    //   let r = this.randomNum(min, max)
    //   let g = this.randomNum(min, max)
    //   let b = this.randomNum(min, max)
    //   return 'rgb(' + r + ',' + g + ',' + b + ')'
    // },
    // drawPic () {
    //   let canvas = document.getElementById('s-canvas')
    //   let ctx = canvas.getContext('2d')
    //   ctx.textBaseline = 'bottom'
    //   // 绘制背景
    //   ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
    //   ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
    //   // 绘制文字
    //   for (let i = 0; i < this.identifyCode.length; i++) {
    //     this.drawText(ctx, this.identifyCode[i], i)
    //   }
    //   this.drawLine(ctx)
    //   this.drawDot(ctx)
    // },
    // drawText (ctx, txt, i) {
    //   ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
    //   ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
    //   let x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
    //   let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
    //   console.log(this.fontSizeMin, this.fontSizeMax, this.contentWidth, this.contentHeight)
    //   var deg = this.randomNum(-45, 45)
    //   // 修改坐标原点和旋转角度
    //   ctx.translate(x, y)
    //   ctx.rotate(deg * Math.PI / 180)
    //   ctx.fillText(txt, 0, 0)
    //   // 恢复坐标原点和旋转角度
    //   ctx.rotate(-deg * Math.PI / 180)
    //   ctx.translate(-x, -y)
    // },
    // drawLine (ctx) {
    //   // 绘制干扰线
    //   for (let i = 0; i < 8; i++) {
    //     ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
    //     ctx.beginPath()
    //     ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
    //     ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
    //     ctx.stroke()
    //   }
    // },
    // drawDot (ctx) {
    //   // 绘制干扰点
    //   for (let i = 0; i < 100; i++) {
    //     ctx.fillStyle = this.randomColor(0, 255)
    //     ctx.beginPath()
    //     ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
    //     ctx.fill()
    //   }
    // }
  },
  watch: {
    // identifyCode () {
    //   this.drawPic()
    // },
  },
  mounted () {
    // this.drawPic()
  }
}
</script>
<style lang="scss" scoped>
#code{
  width: 30%;
  height: 44px;
  img{
    width: 100%;
    height: 100%;
  }
  div{
    width: 100%;
    height: 100%;
    background: #999;
    line-height: 44px;
    text-align: center;
  }
}
.s-canvas {
    height: 38px;
    canvas {
        margin-top: 1px;
        margin-left: 8px;
    }
}
.code-map{
  width: 50%;
  height: 50px;
}
   .login-group{
      width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -webkit-align-items: flex-end;
    -ms-flex-align: end;
    align-items: flex-end;
    height: 50px;
    line-height: 50px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#684325), to(#684325)), -webkit-gradient(linear, left top, left bottom, from(#ccc), to(#ccc));
    background-image: -webkit-linear-gradient(#684325, #684325), -webkit-linear-gradient(#ccc, #ccc);
    background-image: linear-gradient(#684325, #684325), linear-gradient(#ccc, #ccc);
    background-position: center bottom, center bottom;
    background-size: 0 2px, 100% 1px;
    background-repeat: no-repeat;
    -webkit-transition: .35s ease;
    transition: .35s ease;
}
.icon{
  width: 30px;
    height: 30px;
    position: relative;
   &::after{
      content:'';
      position: absolute;
      width: 26px;
    height: 26px;
    top: -8px;
    margin-left: 1px;
    background: url('/mobile/images/login/security_checked@2x.png') no-repeat;
    background-size: 100% 100%;
    }
}
 .code-ipt{
   background: none;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    outline: none;
    height: 48px;
    line-height: 48px;
    padding-left: 10px;
    font-size: 14px;
    border: none;
    // &::after{
    //   content:'';
    //   width: 30px;
    // height: 50px;
    // background: url('/mobile/images/login/security_checked@2x.png');
    // }
 }
</style>
