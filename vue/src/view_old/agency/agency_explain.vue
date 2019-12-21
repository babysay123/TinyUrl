<template>
  <div class="explain">
    <img src="/mobile/images/agent/explain-ban.jpg" width="100%">
    <section class="notice" >
      当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，即可以自己投注，也可以发展下级玩家，赚取返点佣金。
    </section>
    <img src="/mobile/images/agent/explain_return.png" class="explain-title">
    <section class="explain-con">
      <p class="explain-con-p">可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。</p>
      <p class="explain-con-p">点击下级开户，可查看自身返点，也可为下级设置返点。</p>
    </section>
    <img src="/mobile/images/agent/explain_reg.png" class="explain-title">
    <section class="explain-con">
      <p class="explain-con-p">点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；</p>
      <p class="explain-con-p">如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；</p>
    </section>
    <img src="/mobile/images/agent/explain_prompt.png" class="explain-title">
    <section class="explain-con">
      <p class="explain-con-p">返点不同赔率也不同，点击返点赔率表，可查看返点赔率；</p>
      <p class="explain-con-p">返点越低，赔率就越低，建议为下级设置的返点不要过低；</p>
      <p class="explain-con-p">可在代理报表、投注明细、交易明细查看代理的发展情况；</p>
      <p class="explain-con-p">建议开设的下级也是代理类型，无论发展了几级您都能获得返点。</p>
    </section>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.explain {
  background: #fff;
  overflow: hidden;
  .notice{
    width: 90%;
    padding: 3% 5%;
    margin: .7rem auto;
    font-size: .4rem;
    line-height: .9rem;
    text-indent: 2em;
    color: #333;
    border: 3px solid #dc3b40;
    box-sizing: border-box;
    position: relative;
    &::before,
    &::after {
      position: absolute;
      width: 30%;
      height: .5rem;
      content: '';
      bottom: -.55rem;
    }
    &::before {
      left: 0;
      background: url('/mobile/images/agent/notice-left.png') no-repeat;
      background-size: 100%;
    }
    &::after {
      right: 0;
      background: url('/mobile/images/agent/notice-right.png') no-repeat;
      background-size: 100%;
    }
  }
  .explain-title {
    width: 6rem;
    margin: 0 auto;
    display: block;
  }
  .explain-con {
    width: 85%;
    margin: .5rem auto .7rem;
    padding: 4% 5%;
    border: 1px solid #cbcbcb;
    border-radius: .5rem;
    font-size: .4rem;
    line-height: .75rem;
    color: #333;
    p {
      text-indent: 2em;
    }
  }
}
</style>
