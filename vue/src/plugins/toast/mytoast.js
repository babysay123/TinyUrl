import Vue from 'vue'
import MyToast from './mytoast.vue'
const ToastConstructor = Vue.extend(MyToast)
// 定义弹出组件fn
// duration@ 显示时间
function showToast (text, duration = 1800, btnShow = false, url) {
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        text: text, // 内容
        btnShow: btnShow, // btn显示或隐藏
        url: url, // 跳转路径
        show: true,
        showContent: true
      }
    },
    methods: {
      close () {
        this.show = false
        window.location.href = this.url
      },
      closeove () {
        this.show = false
      }
    }
  })

  document.body.appendChild(toastDom.$el)
  // 时常关闭 执行显隐动画
  setTimeout(() => { toastDom.showContent = false }, duration - 800)
  setTimeout(() => { toastDom.show = false }, duration)
}
// 全局注册 vue 的实例里面使用 this.$toast()
// function registryToast() {
//   Vue.prototype.$toast = showToast
// }
export default showToast
