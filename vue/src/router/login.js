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
      title: '注册'
    }
  },
  {
    path: '/forgetPwd',
    name: 'forgetPwd',
    component: resolve => require(['Views/login/forgetPwd.vue'], resolve),
    meta: {
      title: '忘记密码'
    }
  }
]
