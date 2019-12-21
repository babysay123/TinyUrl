<style lang="scss">
.head {
  height: 1.125rem;
  line-height: 1.125rem;
  text-align: center;
  position: relative;
  > a {
    position: absolute;
    width: 16%;
    text-align: center;
    display: block;
    line-height: 1.125rem;
    height: 1.125rem;
    top: 0;
    color: #fff;
    font-size: 14px;
    z-index: 10;
    i {
      line-height: 1.125rem;
      height: 1.125rem;
    }
  }
  &.fixed{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 200;
    max-width: 780px;
  }
  .menu-left {
    left: 0;
  }
  .menu-right {
    right: 0;
  }
  .filter-right {
    right: 0;
    font-size: 13px;
    width: 18%;
  }
  > h2 {
    font-weight: 200;
    line-height: 1.125rem;
    height: 1.125rem;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    position: relative;
    img{
      height: 0.875rem;
      margin-top: 0.125rem;
    }
  }
  > h3 {
    font-weight: 200;
    line-height: 1.125rem;
    height: 1.125rem;
    color: #fff;
    font-size: 16px;
    img{
      height: 0.875rem;
      margin-top: 0.125rem;
    }
  }
  .back{
    width: 12%;
  }
}
.menu-dropdown {
  position: absolute;
  top: 100%;
  right: 0.0625rem;
  z-index: 100;
  display: none;
  float: left;
  min-width: 100px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #222222;
  border: 1px solid #cccccc;
  border: 1px solid rgba(0,0,0,0.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  box-shadow: 0 6px 12px rgba(0,0,0,0.175);
  background-clip: padding-box;
  > ul li a {
    display: block;
    padding: 3px 13px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857143;
    color: #ffffff;
    white-space: nowrap;
    font-size: 14px;
    text-align: center;
    i {
      margin-right: 3px;
    }
    svg {
      vertical-align: text-top;
      margin-right: 5px;
    }
  }
}
</style>

<template>
  <section id="header" class="head bg-col" :class="{ 'fixed': fixed }">
    <a
      v-if="back"
      class="back head-back"
      @click="backHandler ? backHandler() : $router.go(-1)"
    >
      <i class="fa fa-angle-left fa-2x"></i>
    </a>
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    href: {
      type: String
    },
    fixed: {
      type: Boolean,
      default: false
    },
    back: {
      type: Boolean,
      default: true
    },
    backHandler: {
      type: Function
    }
  }
}
</script>
