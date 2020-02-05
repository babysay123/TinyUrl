export default [
  {
    path: '/playRules',
    name: 'playRules',
    component: resolve => require(['Views/rules/playRules.vue'], resolve),
    meta: {
      title: '玩法规则'
    }
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: resolve => require(['Views/rules/tutorial.vue'], resolve),
    meta: {
      title: '玩法规则'
    }
  }
]
