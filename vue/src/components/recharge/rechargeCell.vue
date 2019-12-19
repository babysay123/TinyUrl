<style lang="scss" scoped>
.rechargeCell-items {
  background: #fff;
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  padding-left: 17px;
  padding-right: 10px;
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #f5f4f9;
  }
  .rechargeCell-icon {
    width: 40px;
    height: 40px;
  }
  .rechargeCell-text {
    margin: 0 12px;
    flex: 1;
    font-weight: 400;
  }
  .rechargeCell-arrow {
    font-size: 22px;
  }
  &:active {
    background: rgba(0, 0, 0, .1);
  }
  // 充值优惠
  .discount {
    position: absolute;
    padding: 0px 4px;
    font-size: 11px;
    background: #d81e06;
    line-height: 16px;
    color: #fff;
    border-radius: 8px;
    margin-left: 22px;
    margin-top: -12px;
  }
}
</style>

<template>
  <div class="rechargeCell">
    <div
      class="rechargeCell-items"
      v-for="(c, index) in cell"
      :key="index"
      @click="c.available && c.callback && c.callback()"
    >
      <img class="rechargeCell-icon" :src="c.icon">
      <div v-if="isDiscount(c)" class="discount">优惠</div>
      <div class="rechargeCell-text">
        {{ c.title }}
        <span v-if="!c.available" class="text-red">(当前通道维护中...)</span>
      </div>
      <i class="fa fa-angle-right fa-lg text-gray rechargeCell-arrow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cell: {
      type: Array,
      required: true
    }
  },
  methods: {
    isDiscount (item) {
      return item.payways.filter(e => e.discount).length > 0
    }
  }
}
</script>
