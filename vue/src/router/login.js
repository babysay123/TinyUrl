export default [
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['Views/login/login.vue'], resolve),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: resolve => require(['Views/login/register.vue'], resolve),
    meta: {
      title: '快速注册'
    }
  }
]
