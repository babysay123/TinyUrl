export default [
  {
    path: '/agencyCenter',
    name: 'agencyCenter',
    component: resolve => require(['Views/agency/agencyCenter.vue'], resolve),
    meta: {
      title: '代理中心'
    }
  }
]
