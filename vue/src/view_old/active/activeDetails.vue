<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-06 15:34:43
 * @LastEditTime: 2019-08-31 16:06:29
 * @LastEditors: Please set LastEditors
 -->
<style lang="scss">
.activeDetails-container {
  padding: 10px;
  img {
    width: 100%!important;
  }
}
.zw{
  width: 100%;
  height: 1.125rem;
}
			body {
				max-width: 1200px;
				margin: 0px auto;

			}

			p {
				margin: 5px 1.5em;
			}

			h5 {
				padding: 1.5em;
			}

			table {
        width: 100%;
				border-collapse: collapse;
        margin: 0px auto;
        font-size: 14px;
        thead{
          width: 100%;
          tr{
            border: 1px solid black;
            width: 100%;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
          td{
            border-left:  1px solid black;
          }
          }
        }
        tbody{
          width: 100%;
          tr{
           border: 1px solid black;
            width: 100%;
            height: .7rem;
            line-height: .7rem;
            text-align: center;
             &:nth-child(odd){
              background: #eee;
            }
            td{
              border-left:  1px solid black;
            }
          }
        }
			}
      .red {
				color: #f13131;
			}
</style>

<template>
  <section>
    <Head fixed v-if="!ios ">
      <h3>详情</h3>
    </Head>
    <div class="zw" v-if="!ios"></div>
    <div class="activeDetails-container" v-html="data" v-if="!obj">
    </div>
    <div v-else-if="obj && obj.proType ===2 ||obj.proType ===3||obj.proType ===4||obj.proType ===12">
      <table>
        <thead>
          <tr>
            <td v-for="(tit,index) in obj.title.split(',')" :width="width" :key="tit" :colspan="((obj.title.split(',').length<cos)&&( (obj.title.split(',').length-1)===index))?cos-obj.title.split(',').length+1:''">
              {{tit}}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,i) in obj.items" :key="item">
            <td v-for="it in item.split('/')" :key="it" :width="width">
            {{it}}
            </td>
            <td :rowspan="obj.items.length" v-if="i==0&&item.split('/').length!==obj.title.split(',').length" :width="width"> {{obj.countMoney}} </td>
          </tr>
        </tbody>
      </table>
      <div v-html="html"></div>
    </div>
  </section>
</template>

<script>
import Head from 'Components/global/head.vue'
export default {
  components: { Head },
  // computed: {
  //   data () {
  //     return this.$route.query.content
  //   }
  // },
  data () {
    return {
      data: null,
      obj: null,
      ios: this.$route.query.ios,
      html: null,
      width: null,
      cos: null
    }
  },
  methods: {
    isJsonString (str) {
      try {
        if (typeof JSON.parse(str) === 'object') {
          return true
        }
      } catch (e) {
      }
      return false
    }
  },
  created () {
    this.$route.query.content ? this.axios.post('/app/appView/getProIntroduce.do', { 'id': this.$route.query.content }).then(res => {
      if (res.code === 0) {
        if (this.isJsonString(res.data)) {
          this.obj = JSON.parse(res.data)
          if (this.obj.proType === 2 || this.obj.proType === 3 || this.obj.proType === 4 || this.obj.proType === 12) {
            this.width = 100 / this.obj.title.split(',').length + '%'
            this.cos = this.obj.items.map((item, i) => {
              return item.split('/').length
            })[0]
            switch (this.obj.proType) {
              case 2:
                this.html =
                `
            	<h5>申请方式</h5>
			<p>1.登陆游戏账号然后在<i class="red">【首页】</i>点击<i class="red">【活动】</i>进入优惠活动</p>
			<p>2.在优惠活动选择<i class="red">【签到领红包】</i>点击<i class="red">【立即领取】</i></p>
			<h5>活动说明</h5>
			<p class='red'>注：在玩家签到的第一天起可连续签到7天，每天可领取相应彩金</p>
			<p>1.连续签到天数越高，可领取的彩金相应越高，连续7天签到可最高领取${this.obj.countMoney}元；</p>
			<p>2.如中途中断签到，则必须重新开始签到；</p>
			<p>3.参与此活动即表示您已同意以下「活动规则」中所述的条款条约。</p>
			<h5>活动规则</h5>
			<p>1.所有活动彩金均以人民币(CNY)为结算单位，以北京时间为计时区间；</p>
			<p>2.每位玩家﹑每一个住址 ﹑每一个手机号码﹑相同支付方式(相同借记卡/信用卡/银行账户)及相同的IP地址均视为一个人；若会员有存在恶意性重复申请行为，公司将保留取消或收回的权利；</p>
			<p>3.彩票01的所有活动特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司活动优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利；</p>
			<p>4.若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，彩票01有权要求会员向我们提供充足有效的文件，用以确认是否享有该活动优惠的资质；</p>
			<p>5.所有活动彩金禁止投注超过该项玩法总注数的60%，禁止利用平台进行套利、套现、对打以及洗黑钱等违规行为，此类违规/套利行为均不在赠送名单之内；</p>
			<p>6.彩票01保留对所有活动的最终解释权，以及在无通知的情况下修改、终止活动的权利，适用于所有活动优惠。</p>
            `
                break
              case 3:
                console.log(this.obj, '')
                var num = 0
                this.obj.items.forEach(item => {
                  num += parseFloat(item.split('/')[3])
                })

                this.html = `
            <h5>邀请方式</h5>
          <p>1.在 <i class="red">【我的】 </i>选择 <i class="red">【代理报表】 </i>进入代理中心点击 <i class="red">【下级开户】 </i></p>
          <p>2.在 <i class="red">【下级开户】 </i>中填写详细信息 <i class="red">【生成邀请码】 </i></p>
          <p>4.将邀请码发送给您的好友注册即可，通过您的邀请码注册的玩家就是您的邀请好友，您即可逐级领取邀请彩金</p>
          <h5>申请方式</h5>
          <p>1.登陆游戏账号然后在 <i class="red">【首页】 </i>点击 <i class="red">【活动】 </i>进入优惠活动</p>
          <p>2.在优惠活动选择 <i class="red">【邀请奖】 </i>点击 <i class="red">【申请】 </i></p>
          <h5>活动说明</h5>
          <p class="red">例：玩家A成功邀请到7个人，7个人累计的总充值为2800，玩家A可领取到8元+18元+28元的现金，可直接提现</p>
          <p clas="red">1.邀请礼金无需打码可直接提现；</p>
          <p>2.邀请的人必须成功成功绑定手机号和银行卡才能算作有效人数；</p>
          <p>3.该活动逐级领取，最多可累计领取总额为${num}元邀请现金，</p>
          <p>4.参与此活动即表示您已同意以下「活动规则」中所述的条款条约。</p>
          <h5>活动规则</h5>
          <p>1.所有活动彩金均以人民币(CNY)为结算单位，以北京时间为计时区间；</p>
          <p>2.每位玩家﹑每一个住址 ﹑每一个手机号码﹑相同支付方式(相同借记卡/信用卡/银行账户)及相同的IP地址均视为一个人；若会员有存在恶意性重复申请行为，公司将保留取消或收回的权利；</p>
          <p>3.彩票01的所有活动特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司活动优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利；</p>
          <p>4.若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，彩票01有权要求会员向我们提供充足有效的文件，用以确认是否享有该活动优惠的资质；</p>
          <p>5.所有活动彩金禁止投注超过该项玩法总注数的60%，禁止利用平台进行套利、套现、对打以及洗黑钱等违规行为，此类违规/套利行为均不在赠送名单之内；</p>
          <p>6.彩票01保留对所有活动的最终解释权，以及在无通知的情况下修改、终止活动的权利，适用于所有活动优惠。</p>
            `
                break
              case 4:
                this.html = `
                <h5>申请方式</h5>
          <p>1.登陆游戏账号然后在 <i class="red"> <i class="red">【首页】 </i></i>点击<i class="red"> <i class="red">【活动】 </i></i>进入优惠活动
          </p>
          <p>2.在优惠活动选择 <i class="red">【直属下级打码】 </i>点击 <i class="red">【申请】 </i></p>
          <h5>活动说明</h5>
          <p class="red">例：A代理昨日有6个直属下级有效玩家，累计打码量为188000，乘以0.6%返佣比例，即可通过 <i class="red">【联系客服】 </i>领取1128元代理佣金</p>
          <p>1.累计打码量统计数据以昨日凌晨0点到23：59分的所有游戏有效打码为准；</p>
          <p>2.累计打码量的数据只统计直属下级玩家，下下级玩家不纳入统计；</p>
          <p>3.参与此活动即表示您已同意以下「活动规则」中所述的条款条约。</p>
          <h5>活动规则</h5>
          <p>1.所有活动彩金均以人民币(CNY)为结算单位，以北京时间为计时区间；</p>
          <p>2.每位玩家﹑每一个住址 ﹑每一个手机号码﹑相同支付方式(相同借记卡/信用卡/银行账户)及相同的IP地址均视为一个人；若会员有存在恶意性重复申请行为，公司将保留取消或收回的权利；</p>
          <p>3.彩票01的所有活动特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司活动优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利；</p>
          <p>4.若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，彩票01有权要求会员向我们提供充足有效的文件，用以确认是否享有该活动优惠的资质；</p>
          <p>5.所有活动彩金禁止投注超过该项玩法总注数的60%，禁止利用平台进行套利、套现、对打以及洗黑钱等违规行为，此类违规/套利行为均不在赠送名单之内；</p>
          <p>6.彩票01保留对所有活动的最终解释权，以及在无通知的情况下修改、终止活动的权利，适用于所有活动优惠。</p>
              `
                break
              case 12:
                this.html =
              `<h5> 转入方式</h5>
                <p> 1.通过存款，并完成1倍的流水；</p>
                <p>2.在<i class="red" style="color: #f13131;">【个人中心】</i>找到<i class="red" style="color: #f13131;">
                    【余额宝】</i>入口，进入余额宝，点击转入即可；</p>
                <h5> 转出方式</h5>
                <p> 1.进入<i class="red" style="color: #f13131;"> 【个人中心】</i>找到<i class="red" style="color: #f13131;">
                    【余额宝】</i>入口，进入余额宝，点击转出；</p>
          
                <h5> 活动说明</h5>
                <p class="red" style="color: #f13131;"> 例：余额宝总额为1万元的情况可赚取红利为：10000x1%=100元；</p>
                <p> 1.充值的金额需要完成一倍打码量才能够转入到余额宝；</p>
                <p class="red" style="color: #f13131;">2.余额宝收益是从最后一次账户余额转入到余额宝起满24小时开始结算；</p>
                <p> 3.转出余额宝以后需要重新完成1倍打码量才能再次转入；</p>
                <p> 4.官方保留对活动的最终解释权，以及在无通知的情况下更改、延迟、终止活动的权利，适用于所有优惠</p>
          
          
                <h5>活动规则</h5>
                <p>1. 所有活动彩金均以人民币（CNY）为结算单位，以北京时间为计区时间；</p>
                <p>2. 每位玩家、每一个住址、每一个手机号、相同支付方式（相同借记卡/信用卡/银行账户）
                  及相同的IP地址，均视为同一个人；若会员存在恶意性重复申请行为，公司将保留取消或收回的权利；
                </p>
                <p>3. 彩票01的所有活动特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、
                  滥用公司活动优惠等行为，公司保留冻结、取消该团体或个人账户及账户结余的权利；
                </p>
                <p>4. 若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，彩票01有权要求会员向我们提供充足有效的文件，
                  用以确认是否享有该活动优惠的资质；
          
                </p>
                <p>5. 所有活动彩金禁止投注超过该项玩法总注数的60%，禁止利用平台进行套利、套现、对打以及洗黑钱等违规行为，此类违规
                  /套利行为均不在赠送名单之内；
                </p>
          
                <p>6. 彩票01保留对所有活动的最终解释权，以及在无通知的情况下修改、终止活动的权利，适用于所有活动优惠。</p>
                `
                break
            }
          }
        }
        this.data = res.data
      }
    }) : this.$router.go(-1)
    // this.$route.query.content || this.$router.go(-1)
  }
}
</script>
