export default [
  {
    path: '/gameMall',
    name: 'gameMall',
    component: resolve => require(['Views/malls/gameMall.vue'], resolve),
    meta: {
      title: '游戏大厅'
    }
  }
]
