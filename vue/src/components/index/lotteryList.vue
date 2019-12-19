<!--
 @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-19 14:38:45
 * @LastEditTime: 2019-09-19 16:27:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section>
    <div class="lottery-box" v-for="i in gameList" :key="i.gameName">
      <div class="img-box">
        <img src="/mobile/images/index/sfpls.png">
      </div>
      <div class="content-box">
        <p style="font-size: 0.373rem;">{{i.gameName}}</p>
        <p style="font-size: 0.29rem;color:#a1a1a1;">第308478期{{i}}</p>
        <p>00:02:03</p>
      </div>
    </div>
  </section>
</template>
<script>

export default {
  props: ['gameList'],
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.lottery-box{
  width: 46%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 4px 2px rgba(0,0,0,.1);
  margin-left: 2.7%;
  margin-bottom: 10px;
  float: left;
  overflow: hidden;
  .content-box{
    width: 60%;
    float: left;
    p{
      line-height: 22px;
      overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis
    }
  }
  .img-box{
    width: 40px;
    margin-right: 16px;
    margin-left: 13px;
    line-height: 60px;
    float: left;
    text-align:center;
    img{
      width: 100%;
      vertical-align:middle;
    }
  }
}
</style>
