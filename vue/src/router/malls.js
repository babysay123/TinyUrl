export default [
  {
    path: '/malls',
    redirect: '/malls/gameMall'
  },
  {
    path: '/malls/gameMall',
    name: 'gameMall',
    component: resolve => require(['Views/malls/gameMall.vue'], resolve),
    meta: {
      title: '游戏大厅'
    }
  },
  {
    path: '/malls/gameContent',
    name: 'gameContent',
    component: resolve => require(['Views/malls/gameContent.vue'], resolve),
    meta: {
      title: '游戏'
    }
  },
  {
    path: '/malls/gameRoom',
    name: 'gameRoom',
    component: resolve => require(['Views/malls/gameRoom.vue'], resolve),
    meta: {
      title: '游戏室'
    }
  },
  {
    path: '/malls/createGroup',
    name: 'createGroup',
    component: resolve => require(['Views/malls/createGroup.vue'], resolve),
    meta: {
      title: '创建群组'
    }
  }
]
