export default [
  {
    path: '/mine',
    name: 'mine',
    component: resolve => require(['Views/mine/mine.vue'], resolve),
    meta: {
      title: '个人中心'
    }
  }
]
