<style lang="scss" scoped>
@import 'Assets/css/base.color.scss';
@import 'Assets/css/mix.scss';
/* laws */
/** content **/
.result-content {
  overflow: hidden;
}
.mint-popup.mt-nobg {
  background: none;
}
/* reissue */
.reissue {
  position: relative;
  overflow: hidden;
  width: 90vw;
  text-align: center;
  background: #fff;
  @include rounded-corners(5px);
  .reissue-title {
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #999;
  }
}
.content-top{
  overflow: hidden;
  position: relative;
}
.content-top.fixed{
  position: fixed;
  width: 100%;
  z-index: 10;
  background: #fff;
  max-width: 780px;
  top: 1.125rem;
}
.content-top > dl{
  float: left;
  box-sizing: border-box;
  padding: 0.4375rem 0.375rem;
  // padding: 14px 12px;
  text-align: center;
}
.content-top > dl dt{
  font-size: 12px;
  line-height: 0.5rem;
}
.content-top > dl dd{
  font-size: 14px;
  margin-top: 0.3125rem;
  // margin-top: 10px;
  word-break: break-word;
  line-height: 0.625rem;
}
.content-top > dl dd img{
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  vertical-align: top;
}
.content-top > dl dd span{
  margin-left: 0;
  vertical-align: top;
  font-size: 13px;
}
.content-top .content-top-left{
  width: 40%;
}
.content-top .content-top-right{
  width: 60%;
}
.content-top > ul{
  border-bottom: 1px solid #eee;
  padding: 6px 5% 10px 5%;
}
.content-top > ul li{
  text-align: center;
  line-height: 24px;
  font-size: 12px;
  vertical-align: middle;
  overflow: hidden;
}
.content-top > ul li span{
  font-size: 13px;
  vertical-align:top;
}
.content-top > ul li span.text-red{
  margin-left: 6px;
  font-size: 12px;
}
.content-top > ul li > a{
  text-align: center;
  font-size: 13px;
  float: left;
  border: 1px solid #40a0e9;
  line-height: 30px;
  height: 30px;
  padding:0 .35rem;
  border-radius: .12rem;
}
.content-top > ul li > a:active{
  background: #f1f1f1;
}
.content-top > ul li:last-child{
  margin-top: 8px;
}
.content-top > ul li > a:last-child{
  float: right;
}
.content-top > ul li > a span{
  background: url('../../../assets/images/lottery/icon_Return.png') no-repeat left center;
  background-size: contain;
  background-position: 5px 0;
  padding: 1px 15px 1px 25px;
}
.content-top > ul li > a:nth-child(2) span{
  background: url('../../../assets/images/lottery/icon_add.png') no-repeat left center;
  background-size: contain;
  background-position: 5px 0;
}
.content-top-gap{
  margin-top: 4.5625rem;
}
/* main */
.content-main{
  position: relative;
  // overflow: hidden;
}
  /*expand*/
.content-main .content-expand{
  position: relative;
}
.content-expand .expand-shake{
  overflow: hidden;
  position: relative;
}
.content-expand .expand-shake .shake-tips{
  font-size: 12px;
  margin-left: 0.3125rem;
  height: 1.125rem;
  line-height: 1.125rem;
}
.content-expand .expand-shake a{
  display: block;
  height: 0.875rem;
  line-height: 0.875rem;
  width: 2.75rem;
  margin: 0.125rem 0.3125rem;
}
.content-expand .expand-shake .shake-right{
  float: right;
  background: url("/mobile/images/lottery/Lotter_ rock.png") no-repeat center;
  background-size: contain;
}
.content-expand .expand-shake .goback{
  float: right;
  display: none;
  font-size: 12px;
  text-align: center;
  color: #999;
  background: #fff;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-appearance: none;
  -webkit-appearance : none;
  line-height: 0.625rem;
  height: 0.625rem;
  // width: 2.75rem;
  width: 3.125rem;
  margin: 0.25rem 0.3125rem;
  margin-left: 0;
  position: relative;
}
.content-expand .expand-shake .goback:after {
  content:"";
  /*!key_baseRed_start*/background: $baseRed;/*!key_baseRed_end*/
  display: block;
  width: 15px;
  line-height: 15px;
  // border: 1px solid #e0e0e0;
  border: none;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 15px;
  position: absolute;
  color: #fff;
  top: -6px;
  right: -8px;
}
.content-expand .expand-addTo{
  position: fixed;
  bottom: 1.125rem;
  // left: 0;
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
  overflow: hidden;
  border-top: 1px solid #ddd;
}
.content-expand .expand-addTo h5{
  font-weight: 200;
  font-size: 12px;
  line-height: 1.125rem;
  height: 1.125rem;
  display: inline-block;
  padding: 0 10px;
}
.content-expand .expand-addTo .addTo-control{
  overflow: hidden;
  float: right;
  line-height: 1.125rem;
  height: 1.125rem;
  margin-right: 10px;
}
.addTo-control span{
  float: left;
  font-size: 12px;
}
.addTo-control .addPanel{
  overflow: hidden;
  margin: 0.125rem 6px;
  float: left;
}
.addPanel li {
  float: left;
  text-align: center;
  line-height: 0.8125rem;//0.875rem
  border: 1px solid #ddd;
  // font-size: 20px;
  padding: 0 8px;
  box-sizing: border-box;
}
.addPanel li.add {
  border-left: none;
  cursor: pointer;
  color: #999;
  width: 0.8125rem;
  padding:0;
}
.addPanel li.reduce {
  border-right: none;
  cursor: pointer;
  color: #999;
  width: 0.8125rem;
  padding:0;
}
.addPanel li .panel {
  width: 0.8125rem;
  font-size: 14px;
  border: none;
  line-height: 0.8125rem;
  text-align: center;
  vertical-align: top;
}
.gap-footer-addPanel{
  margin-bottom: 2.25rem;
}
.list .list-title{
  // font-size: 14px;
  text-align: center;
  color: #ccc;
  line-height: 0.875rem;
}
.list .list-title > span{
  font-size: 12px;
  margin-right: 0.25rem;
  line-height: 0.875rem;
}
.list .list-title > span.text-red{
  vertical-align: middle;
  font-size: 14px
}
/* list pay ment */
.list-pay .list-ul li{
  overflow: hidden;
  display: block;
  padding-left: 10px;
}
.list-pay .pay-box{
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  overflow: hidden;
}
.list-pay .pay-box > .btn-close{
  float: left;
  width: .7rem;
  height: .7rem;
  background-image: url('../../../assets/images/lottery/button_close.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  margin-top: 17px;
}
.list-pay .pay-box > .btn-close:active{
  background-color: #909090;
}
.list-pay .pay-box > .box-msg{
  float: left;
  display: block;
  width: 88%;
  width: -moz-calc(100% - 32px - 10px);
  width: -webkit-calc(100% - 32px - 10px);
  width: calc(100% - 32px - 10px);
}
.list-pay .pay-box > .box-msg li{
  font-size: 12px;
  line-height: 22px;
  word-break: break-word;
}
.list-pay .pay-box > .box-msg li.text-red{
  font-size: 13px;
}
/* list square*/
.list-square .list-ul{
  position: relative;
  overflow: hidden;
}
.list-square .list-ul li{
  // margin-bottom: 0.375rem;
  box-sizing: border-box;
  display: block;
  float: left;
  margin: 0 0 0.375rem 0.375rem;
  width: 28%;
  width: -webkit-calc((100% - 1.5rem) / 3);
  width: -moz-calc((100% - 1.5rem) / 3);
  width: calc((100% - 1.5rem) / 3);
  text-align: center;
}
.list-square .list-ul li a{
  display: block;
  color: rgb(253, 189, 44);
  font-size: 13px;
  line-height: 0.875rem;
  height: 0.875rem;
  border: 1px solid rgb(191, 191, 191);
}
.list-square .list-ul li.active a{
  border: 1px solid rgb(253, 189, 44);
  background: rgb(253, 189, 44);
  color: #fff;
}
.list-square .list-ul li a:active{
  background: rgb(253, 189, 44);
  color: #fff;
}
.list-square .list-ul li span{
  font-size: 12px;
  display: block;
  line-height: 0.5625rem;
  height: 0.5625rem;
  color: rgb(191, 191, 191);
}
/* two col */
.list-two-col{
  overflow: hidden;
  padding-top: 0.3125rem;
}
.list-two-col .list-col-left{
  width: 18%;
  float: left;
  text-align: center;
  position: relative;
}
.list-two-col .list-col-left span{
  font-size: 12px;
  // padding: 2px 10px 2px 5px;
  position: relative;
  background: url("/mobile/images/lottery/Lotter_select_headerImage.png") no-repeat center;
  background-size: cover;
  top: 0.125rem;
  display: block;
  padding: 2px 0;
  margin-left: 2px;
  text-align: center;
}
.list-two-col .list-col-right{
  width: 82%;
  float: left;
}
.list .list-quick-btns{
  overflow: hidden;
  padding-bottom: 0.3125rem;
}
.list .list-quick-btns .btn{
  display: block;
  width: 15%;
  margin-left: 1.4%;
  margin-left: -moz-calc(10% / 7);
  margin-left: -webkit-calc(10% / 7);
  margin-left: calc(10% / 7);
  line-height: 26px;
  height: 26px;
  float: left;
  background: none;
  border:1px solid #bfbfbf;
  font-size: 14px;
  font-weight: 100;
  margin-bottom: 0;
  border-radius: 0;
}
.list .list-quick-btns .btn:active{
  background: #f5f5f5;
}
/* list dragon */
.list-dragon .list-ul{
  position: relative;
  overflow: hidden;
  margin-left: 3%;
}
.list-dragon .list-ul li{
  box-sizing: border-box;
  display: block;
  float: left;
  margin: 0 0 0.375rem 0.375rem;
  width: 33%;
  text-align: center;
}
.list-dragon .list-ul li a{
  float: left;
  width: 100%;
  color: rgb(253, 189, 44);
  font-size: 14px;
  line-height: 0.875rem;
  height: 0.875rem;
  border: 1px solid rgb(191, 191, 191);
  border-radius: 4px;
}
.list-dragon .list-ul li.active a{
  border: 1px solid rgb(253, 189, 44);
  background: rgb(253, 189, 44);
  color: #fff;
}
.list-dragon .list-ul li a:active{
  background: rgb(253, 189, 44);
  color: #fff;
}
.list-dragon .list-ul li span{
  font-size: 12px;
  display: block;
  line-height: 0.5625rem;
  height: 0.5625rem;
  color: rgb(191, 191, 191);
}
.list-dragon .list-ul .vs{
  box-sizing: border-box;
  float: left;
  margin: 0.1rem 0 0 0.375rem;
  line-height: 28px;
  height: 30px;
  width: 30px;
  text-align: center;
  position: relative;
  font-size: 15px;
  color: rgb(253, 189, 44);
  border: 1px solid rgb(191, 191, 191);
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  -moz-appearance: none;
  -webkit-appearance : none;
}
/* list circle */
.list-circle .list-ul{
  position: relative;
  overflow: hidden;
}
.list-circle .list-ul li{
  box-sizing: border-box;
  display: block;
  float: left;
  width: 20%;
  text-align: center;
  position: relative;
  margin-bottom: 0.375rem;
}
.list-circle .list-ul li a{
  display: block;
  color: rgb(253, 189, 44);
  font-size: 15px;
  border: 1px solid rgb(191, 191, 191);
  line-height: 38px;
  height: 38px;
  width: 38px;
  text-align: center;
  position: relative;
  left: 50%;
  margin-left: -19px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  -moz-appearance: none;
  -webkit-appearance : none;
}
.list-circle .list-ul li a.font-small{
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis;
}
.list-circle .list-ul li span{
  font-size: 12px;
  display: block;
  line-height: 0.5625rem;
  height: 0.5625rem;
  color: rgb(191, 191, 191);
}
.list-circle .list-ul li.active a{
  background: rgb(253, 189, 44);
  color: #fff;
  border: 1px solid rgb(253, 189, 44);
}
.list-circle .list-ul li a:active{
  background: rgb(253, 189, 44);
  color: #fff;
  border: 1px solid rgb(253, 189, 44);
}
// whole color
.ballRedColor{
  color: rgba(216, 30, 6,1) !important;
  background: #fff !important;
  border: 1px solid rgba(216, 30, 6,1) !important;
}
.ballGreenColor{
  color: #26ab5f !important;
  background: #fff !important;
  border: 1px solid #26ab5f !important;
}
.ballBlueColor{
  color: #40a0e9 !important;
  background: #fff !important;
  border: 1px solid #40a0e9 !important;
}
.ballGrayColor{
  color: #a1a1a1 !important;
  background: #fff !important;
  border: 1px solid #a1a1a1 !important;
}
.active.ballRedColor{
  background: rgba(216, 30, 6,1) !important;
  color: #fff !important;
  border: 1px solid rgba(216, 30, 6,1) !important;
}
.active.ballGreenColor{
  background: #26ab5f !important;
  color: #fff !important;
  border: 1px solid #26ab5f !important;
}
.active.ballBlueColor{
  background: #40a0e9 !important;
  color: #fff !important;
  border: 1px solid #40a0e9 !important;
}
.active.ballGrayColor{
  background: #a1a1a1 !important;
  color: #fff !important;
  border: 1px solid #a1a1a1 !important;
}
/*  */
.recharge{
  text-align: left;
  position: relative;
  margin: -50px -30px;
}
.recharge-header{
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.recharge-header h4{
  font-weight: 200;
  font-size: 13px;
  line-height: 16px;
}
.recharge-header h5{
  font-weight: 200;
  font-size: 12px;
  line-height: 18px;
}
.recharge-header h5 span{
  font-size: 12px;
}
.recharge-body > h4{
  font-weight: 200;
  font-size: 12px;
  overflow: hidden;
  line-height: 26px;
  padding: 4px 10px 22px 10px;
  // margin-bottom: 3px;
}
.recharge-body > h4.no-rebate{
  padding: 4px 10px 4px 10px;
}
.recharge-body > h4 span{
  font-size: 12px;
}
.recharge-body h4 .left{
  float: left;
}
.recharge-body h4 .right{
  float: right;
}
.recharge-body .recharge-input{
  // margin-top: 20px;
  padding: 0 10px;
  font-size: 12px;
  overflow: hidden;
  line-height: 26px;
}
.recharge-body .recharge-input span{
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}
.recharge-body .recharge-input input{
  font-size: 12px;
  vertical-align: middle;
  height: 24px;
  box-sizing: border-box;
  padding: 0 5px;
  width: 48%;
  width: -moz-calc(100% - 48px - 5px - 24px * 3 - 6px * 3);
  width: -webkit-calc(100% - 48px - 5px - 24px * 3 - 6px * 3);
  width: calc(100% - 48px - 5px - 24px * 3 - 6px * 3);
  border: 1px solid #ccc;
}
.recharge-body .recharge-input a{
  font-size: 12px;
  padding: 4px 6px;
  color: #999;
  background: #eee;
  vertical-align: middle;
}
.recharge-body .recharge-input a.active, .recharge-body .recharge-input a:active{
  background: #fdbe25;
  color: #fff;
}
.recharge-block{
  // padding: 10px;
  padding: 10px 10px 2px 10px;
}
.recharge-block .num{
  overflow: hidden;
}
.recharge-block .num li{
  float: left;
  margin-right: 10px;
  width: 30.5%;
  width: -moz-calc((100% - 20px) / 3);
  width: -webkit-calc((100% - 20px) / 3);
  width: calc((100% - 20px) / 3);
  text-align: center;
  margin-bottom: 10px;
}
.recharge-block .num li:nth-child(3n){
  margin: 0;
}
.recharge-block .num li a{
  display: block;
  color: #999;
  background: #eee;
  line-height: 28px;
  height: 28px;
  font-size: 12px;
}
.recharge-block .num li a:active, .recharge-block .num li.active a{
  background: #fdbe25;
  color: #fff;
}
.recharge-block .sum li{
  font-size: 12px;
  line-height: 26px;
}
.recharge-block .sum li.gray{
  color: #999;
}
.recharge-block .sum li span{
  font-size: 12px;
}
.recharge-btns{
  border-top: 1px solid #eee;
  padding: 10px;
  overflow: hidden;
}
.recharge-btns a{
  width: 44%;
  line-height: 36px;
  height: 36px;
  display: block;
  text-align: center;
  font-size: 12px;
  color: #000;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance : none;
}
.recharge-btns .cancel{
  float: left;
  background: #999;
  color: #eee;
}
.recharge-btns .submit{
  float: right;
  color: #fff;
}
/* reissue */
.reissue{
  position: relative;
  margin: -50px -30px;
}
.reissue .reissue-title{
  // text-align: center;
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #999;
}
.reissue .reissue-words{
  font-size: 13px;
  font-weight: 200;
  // height: 40px;
  // line-height: 40px;
  height: auto;
  margin-top: 20px;
}
.reissue .reissue-tips{
  font-size: 12px;
  font-weight: 200;
  color: #999;
}
.reissue .reissue-btns{
  position: relative;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 10px;
}
.reissue .reissue-btns a.btn{
  display: block;
  float: left;
  // padding: 25px 10px;
  color: #fff;
  background-color: #999;
  margin-left: 8%;
  width: 32%;
  line-height: 32px;
  height: 32px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance : none;
  font-size: 12px;
  margin-bottom: 0;
}
.reissue .reissue-btns a.btn-right{
  float: right;
  margin:0 8% 0 0%;
}
/* 空白页 */
.emptyData{
  text-align: center;
  align-items: center;
  line-height: 25px;
  margin-top: 120px;
  margin-bottom: 140px;
}
.emptyData img{
  width: 74%;
}
.emptyData .text-black{
  font-size: 16px;
}
.emptyData .text-gray{
  font-size: 12px;
}
.emptyData .login-btns .btn-col{
  width: 50%;
  margin: 15px 25% 0px 25%;
}
</style>

<template>
  <section>
    <Head href="javascript:void(0);">
      <h3>{{lotteryMsg.name}}</h3>
    </Head>
    <div id="lotteryContent" class="result-content head-fixed-gap">
      <div class="content-top bg-white">
        <ul class="">
          <li id="titleMsg"><span class="text-black">距第{{lotteryMsg.currentIssue ? lotteryMsg.currentIssue : '-'}}期截止</span><span class="text-red" id="lotteryTime">00:00:00</span></li>
          <li>
            <a class="back text-blue" @click="backBtn"><span>返回添加1注</span></a>
            <a class="random text-blue" @click="randomBtn"><span>机选添加1注</span></a>
          </li>
        </ul>
      </div>
      <!-- body -->
      <div class="content-main gap-footer-addPanel">
        <div class="list list-pay">
          <ul class="list-ul">
            <template v-if="payments.length > 0">
              <li class="bg-white" v-for="(item, inx) in payments" :key="inx" @click="showPop(item)">
                <div class="pay-box">
                  <a class="btn-close" @click.stop="removePay(item, inx)"></a>
                  <ul class="box-msg">
                    <li class="text-red">{{item.numbers}}</li>
                    <li class="text-black">{{item.title}} {{item.size}}注 {{(item.size * (item.unitFee || 0) / 100).toFixed(2)}}元</li>
                    <li class="text-gray">赔率：{{item.odds}} </li>
                  </ul>
                </div>
              </li>
            </template>
            <div class="emptyData" v-if="payments.length === 0">
              <img src="/mobile/images/mine/face_no_game.png">
              <p class="text-gray">亲，您还没有投注哦~</p>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div class="content-expand">
      <div class="expand-addTo bg-white">
        <h5>投注追加</h5>
        <div class="addTo-control">
          <span>追</span>
          <ul class="addPanel">
            <li class="reduce" @click="afterReduce">-</li>
            <li>
              <input name="addTo" type="number" readonly="readonly" v-model="totalPayment.addTo" class="panel">
            </li>
            <li class="add" @click="afterAdd">+</li>
          </ul>
          <span>期</span>
        </div>
      </div>
    </div>
    <BettingFoot
      :size="totalPayment.size"
      :sum="totalPayment.sum*totalPayment.addTo"
      :is-login="isLogin"
    ></BettingFoot>
    <BettingPop
      ref="betRei"
      v-if="bettingPopShow"
      :lottery-layout="lotteryLayout"
      :payment="payment"
      :is-login="isLogin"
      :maxOdds="payment.odds"
    ></BettingPop>
    <BettingReissue
      :popup-reissue="popupReissue"
    ></BettingReissue>
    <!-- 提示 是否清空数组 -->
    <!-- <mt-popup
      :class="'mt-nobg'"
      :closeOnClickModal="false"
      v-model="alertPop"
      popup-transition="popup-fade"
    >
      <section class="reissue">
        <h3 class="reissue-title">温馨提示</h3>
        <h4 class="reissue-words">{{alertData.title}}</h4>
        <h5 class="reissue-tips">{{alertData.tips}}</h5>
        <div class="reissue-btns">
          <a id="reissueNext" @click="alertData.no" class="btn btn-right">取消</a>
          <a id="reissueClear" @click="alertData.yes" class="btn">确定</a>
        </div>
      </section>
    </mt-popup> -->
  </section>
</template>

<script>
import { ChangeThreeDecimal, ToastMsg } from './module/tools'
// import Algorithm from './module/algorithm_module'
import ResultCompute from './module/ResultCompute'
// 引用颜色数组方法
import Head from 'Components/global/head.vue'
import BettingFoot from 'Components/lottery/betting/betting-foot' // 底部组件
import BettingPop from 'Components/lottery/betting/module/betting-pop'
import BettingReissue from './module/betting-reissue'
import { mapState } from 'vuex'

export default {
  name: 'betting-result',
  data () {
    return {
      lotteryId: this.$route.query.lotteryId,
      dateMsg: '加载中...',
      lotteryLayout: {}, // 当前彩种布局
      lotteryMsg: {}, // 彩种信息
      shareCode: 0,
      isLogin: false,
      odds: '', // 计算之后的赔率
      payments: [],
      payment: {
        issue: '',
        numbers: '', // 真实投注数组后的字符串
        playId: '',
        odds: '',
        unitFee: 200,
        rebate: 0,
        size: 0, // 投注数，后台会算
        title: ''
        // layout: '' // 每个投注记录保存投注布局，为了弹出详情时得出相应的数据
      },
      totalPayment: {
        size: 0, // 投注数，后台会算
        unitFee: 200,
        sum: '0.00',
        addTo: 1
      },
      alertPop: false,
      alertData: { // 弹出提示的信息
        title: '',
        tips: '',
        yes: function () {
        },
        no: function () {
        }
      },
      TimeOut: null,
      popupReissue: false,
      inputAfter: 1,
      bettingPopShow: false,
      unitSave: null // 单注金额记录
    }
  },
  watch: {
    '$store.state.Lottery.lotteryLayout': function (val) {
      this.lotteryLayout = val
      // console.log(this.lotteryLayout)
      // console.log('layout改变')
    },
    '$store.state.payments': function (val) {
      this.payments = val
      console.log(this.$store.state.payments)
    },
    'dateMsg': function (text) {
      document.getElementById('lotteryTime').innerHTML = text
    },
    'payments': function (arr) {
      console.log(arr)
      // console.log('pay ment s ')
      // console.log(arr)
      let sum = 0
      let size = 0
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]
        size += item.size * 1
        sum += item.size * item.unitFee
      }
      this.totalPayment.sum = (sum / 100).toFixed(2)
      this.totalPayment.size = size
      // 更新vuex的数据
      this.$store.dispatch('updatePayments', this.payments)
    }
  },
  computed: {
    ...mapState({
      Lottery (state) {
        return state.Lottery
      },
      chatRoom (state) {
        return state.chatRoom
      }
    })
  },
  methods: {
    isnum (data) {
      console.log('tag', data)
    },
    // 倒计时
    commonTimer (start, end, fn, callback) {
      let maxtime = (new Date(start) - new Date(end)) / 1000 // 剩余秒
      let checkTime = (i) => {
        if (i < 10) {
          i = '0' + i
        }
        return i
      }
      // console.log(maxtime)
      let timers = () => {
        if (maxtime >= 0) {
          let dd = parseInt(maxtime / 60 / 60 / 24, 10)
          let hh = parseInt(maxtime / 60 / 60 % 24, 10) // 计算剩余的小时数
          let mm = parseInt(maxtime / 60 % 60, 10) // 计算剩余的分钟数
          let ss = parseInt(maxtime % 60, 10) // 计算剩余的秒数

          hh = checkTime(hh + 24 * dd)
          mm = checkTime(mm)
          ss = checkTime(ss)
          let msg = hh + ':' + mm + ':' + ss
          fn(msg, { h: hh, m: mm, s: ss })
          --maxtime
          this.TimeOut = setTimeout(function () {
            timers()
          }, 1000)
        } else {
          fn('over')
        }
      }
      this.TimeOut = setTimeout(function () {
        timers()
      }, 1000)
      if (typeof callback === 'function') {
        callback()
        return false
      }
    },
    // 倒计时结束重新请求
    recallTime (lotteryId) {
      let _ts = this
      _ts.dateMsg = '加载中...'
      this.doRecall(lotteryId, function (res) {
        if (res.code === 0) {
          let _data = res.data
          let _sys = res.system_time
          let _dead = _data.deadline
          let _lotteryId = _data.lotteryId

          _ts.commonTimer(_dead, _sys, function (msg) {
            if (msg !== 'over') {
              _ts.dateMsg = msg
            } else {
              // 检查是否投注，弹出提示
              let _paymentArr = _ts.$store.getters.getPayments
              // console.log('payment arr ')
              // console.log(_paymentArr)
              if (_paymentArr && _paymentArr.length > 0) {
                _ts.popupReissue = true // 触发子组件弹出倒计时
              }
              // 重新请求
              _ts.recallTime(_lotteryId)
            }
          })
        }
      })
    },
    clearTimeOut () {
      // console.log('result time out is ' + this.TimeOut)
      clearTimeout(this.TimeOut)
    },
    changeReissue (val) {
      // 如果有betting-reissue，则此方法必须 important
      this.popupReissue = val
    },
    doRecall (id, fn) {
      let _ts = this
      // console.log(id)
      let _drawUrl = '/front/lottery/draw_info.do'
      this.axios.postFast(_drawUrl, {
        'lotteryId': id
      }).then(function (res) {
        if (res.code === 0) {
          _ts.lotteryMsg.lastLuckyNumbers = res.data.lastLuckyNumbers
          _ts.lotteryMsg.currentIssue = res.data.currentIssue
          _ts.lotteryMsg.lastIssue = res.data.lastIssue
          // 改变data到vuex
          _ts.$store.dispatch('LotteryDetail', _ts.lotteryMsg)
          if (typeof fn === 'function') {
            fn(res)
          }
        } else {
          console.log('请求失败')
          console.log(res.msg)
        }
      }).catch(() => {
      })
    },
    HeadBack () {
      // history.back(1)
      this.$router.go(-1)
    },
    backBtn () {
      // 返回添加一注
      // this.$router.push({
      //   path: '/lottery',
      //   query: {
      //     lotteryId: this.lotteryId
      //   }
      // })
      // history.back(1)
      this.$router.go(-1)
    },
    calcAlgorithm (layout, selectArr) {
      // let al = Algorithm.switch(layout.lotteryClassName, layout)
      // let _methodName = layout.lotteryMethodName
      // let numbers = al.calculate(_methodName, selectArr)

      // console.log('注数：' + numbers)
      // this.$parent.paymentNumbers(numbers)
      const { lotteryClassName, lotteryMethodName } = layout
      const { result } = new ResultCompute(lotteryClassName, lotteryMethodName, selectArr)

      // return numbers
      return result
    },
    // 计算实际赔率
    calcRealPrize (dict) {
      // dict = dict * 1
      let number = 0
      number = (dict.maxPrize * 1000 - dict.minPrize * 1000) / 9 * dict.shareCode * 1 + dict.minPrize * 1000
      if (number < -1) {
        return ChangeThreeDecimal(-1 * (Math.floor(-1 * number) / 1000))
      } else {
        return ChangeThreeDecimal(Math.floor(number) / 1000)
      }
    },
    randomBtn () {
      // 随机创建一条，布局参数根据layout
      // 添加到payments
      // console.log('random auto')
      // 注意，数组是真实投注数
      let randomNumF = function (min, max) {
        return parseInt(Math.random() * (max - min) + min)
      }
      if (!this.lotteryLayout.lotteryId) {
        return false
      }
      let $layout = this.lotteryLayout
      let _lay = $layout.layout
      let _selects = [] // 选择数组
      let _realArr = []
      if (_lay.length === 0) return false
      let numArr = []
      let colInx = 0 // 每列的元素索引
      // console.log(randomNumF())
      let _iStr = []
      let getDiff = function (len) { // 获取不重复元素
        if (_iStr.length === 0) {
          _iStr = Array.apply(null, Array(len)).map((item, index) => index)
        }
        let _iI = randomNumF(0, _iStr.length - 1)
        colInx = _iStr[_iI]
        _iStr.splice(_iI, 1)
      }
      // 获取数组
      if ($layout.minSel === 1) {
        // 定位胆
        let rowInx = 0 // 列的索引
        if (_lay.length === 1) {
          numArr = _lay[0].numbers.split('|') // 变字符串为数组
          colInx = randomNumF(0, numArr.length - 1) // 随机取值
          _selects.push(colInx) // 添加新值
          _realArr.push(numArr[colInx]) // 添加新值
        } else {
          for (let i = 0; i < _lay.length; i++) {
            _selects.push([])
            _realArr.push([])
          }
          rowInx = randomNumF(0, _lay.length - 1) // 随机行
          numArr = _lay[rowInx].numbers.split('|')
          colInx = randomNumF(0, numArr.length - 1)
          _selects[rowInx].push(colInx)
          _realArr[rowInx].push(numArr[colInx])
        }
      } else {
        let _methodName = $layout.lotteryMethodName
        if (_lay.length > 1) {
          for (let i = 0; i < _lay.length; i++) {
            _selects.push([])
            _realArr.push([])
          }
          if (_methodName.indexOf('duplex') > -1) {
            // 胆拖
            let _minSel = $layout.minSel
            if (_minSel === 0) {
              _minSel = 3
            }
            let danLen = _lay[0].numbers.split('|').length
            let tuoLen = _lay[1].numbers.split('|').length
            colInx = randomNumF(0, danLen - 1)
            _selects[0].push(colInx)
            _realArr[0].push(_lay[0].numbers.split('|')[colInx])
            _iStr += colInx
            for (let i = 0; i < _minSel - 1; i++) {
              getDiff(tuoLen)
              _selects[1].push(colInx)
              _realArr[1].push(_lay[1].numbers.split('|')[colInx])
            }
          } else {
            // 其余，每行数据都不一样
            for (let rowInx = 0; rowInx < _lay.length; rowInx++) {
              let _row = _lay[rowInx]
              let _rowNums = _row.numbers.split('|')
              let _numLen = _rowNums.length
              getDiff(_numLen)
              _selects[rowInx].push(colInx)
              _realArr[rowInx].push(_rowNums[colInx])
            }
          }
        } else {
          // 一维
          let _chooseArr = [] // 只有一个一维数组
          if ($layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
            // 龙虎
            _chooseArr = _lay[0].numbers.replace(/\|/g, ',').split(',')
          } else {
            _chooseArr = _lay[0].numbers.split('|')
          }
          let _len = _chooseArr.length
          let _minSel = _lay[0].minSel
          if (_minSel > 1) {
            // 一般来说，会是每个元素底下都有赔率
            for (let i = 0; i < _minSel; i++) {
              getDiff(_len)
              _selects.push(colInx)
              _realArr.push(_chooseArr[colInx])
            }
          } else if (_minSel !== 0) {
            colInx = randomNumF(0, _len)
            _selects.push(colInx)
            if ($layout.lotteryMethodName.indexOf('dragonTiger') > -1) {
              let _m = ''
              if (colInx % 2) {
                // 单数
                _m = `${_chooseArr[colInx]}vs${_chooseArr[colInx - 1]}`
              } else {
                // 双数
                _m = `${_chooseArr[colInx]}vs${_chooseArr[colInx + 1]}`
              }
              _realArr.push(_m)
            } else {
              // 一般来说，是统一赔率
              _realArr.push(_chooseArr[colInx])
            }
          }
        }
      }
      // console.log(_selects)
      // console.log(_realArr)
      // 计算注数
      let nums = this.calcAlgorithm(this.lotteryLayout, _selects)
      // 计算赔率
      let _maxOdds = 0
      if (_lay[0].maxPrizes) {
        for (let x = 0; x < _lay.length; x++) {
          let _item = _lay[x]
          let _minArr = _item.prizes.split('|')
          let _maxArr = _item.maxPrizes.split('|')
          let _odds = 0
          // _selects[x]
          if (_lay.length > 1) {
            for (let n of _selects[x]) {
              _odds = this.calcRealPrize({
                minPrize: _minArr[n],
                maxPrize: _maxArr[n],
                shareCode: this.shareCode
              })
              if (_maxOdds * 1 < _odds * 1) {
                _maxOdds = _odds
              }
            }
          } else {
            for (let n of _selects) {
              _odds = this.calcRealPrize({
                minPrize: _minArr[n],
                maxPrize: _maxArr[n],
                shareCode: this.shareCode
              })
              if (_maxOdds * 1 < _odds * 1) {
                _maxOdds = _odds
              }
            }
          }
        }
        // this.maxOdds = _maxOdds
        // this.$parent.updateOdds(_maxOdds)
      } else {
        // this.maxOdds = this.odds
        _maxOdds = this.calcRealPrize({
          minPrize: $layout.minPrize,
          maxPrize: $layout.maxPrize,
          shareCode: this.shareCode
        })
      }
      // console.log(_maxOdds)
      // 添加新的一条payment
      let _payment = {
        issue: this.lotteryMsg.currentIssue,
        numbers: '', // 真实投注数组后的字符串
        playId: $layout.playId,
        odds: _maxOdds,
        unitFee: (this.unitSave.get() || ''), // 200,
        rebate: 0,
        size: nums, // 投注数，后台会算
        title: this.$store.getters.getTitle
        // layout: $layout // 每个投注记录保存投注布局，为了弹出详情时得出相应的数据
      }
      if ($layout.layout.length > 1) {
        for (let col = 0; col < _realArr.length; col++) {
          if (_realArr[col].length === 0) {
            _realArr[col] = '-'
          } else {
            _realArr[col] = _realArr[col].join('|')
          }
        }
        _payment.numbers = _realArr.join(',')
      } else {
        _payment.numbers = _realArr.join(',')
      }
      // _payment.size = nums
      // _payment.layout = $layout
      // _payment.playId = $layout.playId
      // _payment.issue = this.lotteryMsg.currentIssue
      // _payment.title = this.$store.getters.getTitle
      // _payment.odds = _maxOdds
      // console.log(_payment)
      this.payments.unshift(_payment)
    },
    afterAdd () {
      if (this.totalPayment.addTo < 100) {
        this.totalPayment.addTo++
        // this.randomBtn()
      }
    },
    afterReduce () {
      if (this.totalPayment.addTo > 1) {
        this.totalPayment.addTo--
        // this.randomBtn()
      }
    },
    showPop (item) {
      // 弹出pop 传当前单价
      this.bettingPopShow = true
      this.payment = item
      this.payment.shares = true
      // console.log(this.payment)
      // this.$children[2].togglePop()
      // console.log(this.$refs)
      this.$nextTick(() => {
        this.$refs.betRei.togglePop()
      })
    },
    popSubmit (prize) {
      // 弹出层的提交 返回单价
      // console.log('close pop')
      // this.$children[2].bettingPop = false
      // console.log(this.payment)
      this.$refs.betRei.bettingPop = false
      if (prize && typeof prize === 'string') {
        this.payment.unitFee = prize * 100
        let sum = 0
        let size = 0
        // 计算底部总价
        for (let i = 0; i < this.payments.length; i++) {
          let item = this.payments[i]
          size += item.size * 1
          sum += item.size * item.unitFee
        }
        this.totalPayment.sum = (sum / 100).toFixed(2)
        this.totalPayment.size = size
        // 更新vuex的数据
        this.$store.dispatch('updatePayments', this.payments)
        // 更新单注金额
        this.unitSave.save(this.payment.unitFee)
      }
    },
    removePay (item, inx) {
      // 删除payment
      this.payments.splice(inx, 1)
    },
    // 底部按钮
    clearSelect () {
      this.payments = []
      this.$store.dispatch('removePayments', 'clear')
    },
    bettingPop () {
      // 提交投注，TMD登录验证都做了。好像是我自己写的。MD写的真好
      // 我知道是你写的了, 666
      let _ts = this
      this.axios.postOnce('/front/bet/betting.do?after=' + this.totalPayment.addTo, this.payments).then(function (res) {
        // console.log(this.payments, '1373 payments')
        // console.log(this.inputAfter, '1374 inputAfter')
        console.log(res, '1375 res')
        if (res.code === 0) {
          ToastMsg('投注成功~')
          let shareBettingMoney = _ts.Utils.Storage.get('shareBettingMoney')
          if (!shareBettingMoney) {
            shareBettingMoney = {}
          }
          shareBettingMoney.afterLottery = _ts.lotteryMsg
          _ts.Utils.Storage.save('shareBettingMoney', shareBettingMoney)
          _ts.clearSelect()
          setTimeout(function () {
            // window.location.href = '/mobile/lottery/betSuccess.html'
            _ts.$router.push('/betSuccess')
          }, 1200)
        } else if (res.code === 111) {
          _ts.alertPop = true
          _ts.alertData = {
            title: res.msg,
            tips: '是否要去充值？',
            yes: function () {
              // yes
              _ts.alertPop = false
              window.location.href = '/mobile/studio/#/rechargeList'
            },
            no: function () {
              // no
              _ts.alertPop = false
            }
          }
        } else if (res.code === 112) {
          let _rebetting = '/front/bet/rebetting.do'
          let _orderId = res.data
          let autoNext = () => {
            _ts.alertPop = true
            _ts.alertData = {
              title: res.msg,
              tips: '是否要自动投注到下一期？',
              yes: function () {
                // yes
                _ts.alertPop = false
                _ts.axios.postOnce(_rebetting, { orderId: _orderId }).then((dd) => {
                  if (dd.code === 0) {
                    ToastMsg('自动投注下一注成功~')
                    _ts.clearSelect()
                    setTimeout(() => {
                      // window.location.href = '/mobile/lottery/betSuccess.html'
                      _ts.$router.push('/betSuccess')
                    }, 1800)
                  } else if (dd.code === 112) {
                    autoNext()
                  }
                }).catch(() => {
                })
              },
              no: function () {
                // no
                _ts.alertPop = false
              }
            }
          }
          autoNext()
        }
      }).catch(() => {
      })
    }
  },
  beforeDestroy () {
    // console.log('ready for destory vue')
    this.clearTimeOut()
  },
  created () {
    setTimeout(() => {
      this.Lottery.lotteryResult = true
    }, 100)
    document.title = '投注结算'
    this.$store.dispatch('SetLotteryId', this.lotteryId)
    let _vuex = this.$store
    let _payments = _vuex.getters.getPayments
    let _lottery = _vuex.getters.getLayout
    let _lotteryMsg = _vuex.getters.getLayoutMsg
    if (!_lottery || !_lottery.lotteryId) {
      // 没有从投注页投注，直接进来，返回投注页
      this.$router.push({
        path: '/lottery',
        query: {
          lotteryId: this.lotteryId
        }
      })
      return false
    }
    this.lotteryLayout = _lottery
    this.lotteryMsg = _lotteryMsg
    this.shareCode = _vuex.getters.getShareCode
    this.payments = _payments
    // console.log(this.shareCode)
    // console.log(this.payments)
    this.recallTime(this.lotteryId) // 倒计时
    // 实例化unitSave 作为unitFee的存取对象
    this.unitSave = this.Utils.Storage.package('unitFee')
  },
  mounted () {
  },
  components: {
    Head,
    BettingFoot,
    BettingPop,
    BettingReissue
  }
}
</script>
