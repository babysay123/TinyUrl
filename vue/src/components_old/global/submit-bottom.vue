<style lang="scss">
/* footer betting */
.footer-menu .footer-betting{
  display: block;
  max-width: 780px;
  margin: 0 auto;
  border-top: 1px solid rgb(122, 122, 122);
  overflow: hidden;
  position: relative;
  background: #222;
}
.footer-betting p{
  line-height: 1.125rem;
  height: 1.125rem;
  text-align: center;
  font-size: 14px;
}
.footer-betting p span{
  font-size: 14px;
  // color: #fff;
}
.footer-betting p span.text-red{
  margin-left: 0.25rem;
}
.footer-betting .relative{
  position: relative;
  overflow: hidden;
  height: 1.125rem;
  padding-left: 10px;
}
.footer-betting .relative h4{
  font-weight: 100;
  font-size: 13px;
  // height: 0.625rem;
  // line-height: 0.625rem;
  height: 0.5625rem;
  line-height: 0.5625rem;
}
.footer-betting .relative h5{
  font-weight: 100;
  font-size: 12px;
  // height: 0.5rem;
  // line-height: 0.5rem;
  height: 0.5625rem;
  line-height: 0.5625rem;
}

.footer-betting a{
  display: block;
  position: absolute;
  width: 1.625rem;
  line-height: 0.875rem;
  height: 0.875rem;
  text-align: center;
}
.footer-betting .btn-clear{
  font-size: 12px;
  color: #fff;
  left: 0.125rem;
  top: 0.125rem;
}
.footer-betting .btn-bet{
  font-size: 12px;
  // color: #222222;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-appearance: none;
  -webkit-appearance : none;
  // background: rgb(253, 190, 37);
  right: 0.125rem;
  top: 0.125rem;
}
// .footer-betting .btn-bet:active{
//   background: #FDBE81;
// }
.footer-fixed-gap{
  margin-bottom: 1.1875rem;
}
</style>

<template>
  <section id="${_ts.bettingId}" class="footer-menu">
    <div class="footer-betting">
      <p><span class="text-white">0注</span><span class="text-red">0.00元</span></p>
      <a class="btn-clear" href="javascript:void(0);">清空</a>
      <a class="btn-bet btn-bet-col" href="javascript:void(0);">投注</a>
    </div>
  </section>
</template>

<script>
export default {
  name: 'submit-bottom',
  data () {
    return {
      noData: ''
    }
  },
  created () {
  }
}
</script>
