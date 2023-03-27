// 政策模块
export const policy = [
  {
    path: '/policy',
    // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    // redirect: 'noredirect',
    component: () => import(/* webpackChunkName: "blank" */ '../views/blank.vue'),
    hidden: true,
    meta: { title: '', icon: '' },
    redirect: '/policy/manage',
    name: 'policy',
    children: [
      {
        path: '/policy/manage',
        name: 'policy-manage',
        hidden: false,
        meta: { title: '政策模块管理', icon: 'iconevaluate' },
        redirect: '/policy/manage/dataList',
        component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
        children: [
          {
            path: '/policy/manage/dataList',
            name: 'policy-dataList',
            hidden: false,
            meta: { title: '数据列表', icon: '' },
            component: () => import(/* webpackChunkName: "dataList" */ '../views/policy/data-list')

          }
        ]
      },
      {
        path: '/policy/clean',
        name: 'policy-clean',
        hidden: false,
        meta: { title: '政策数据清洗', icon: 'iconevaluate' },
        redirect: '/policy/clean/org-list',
        component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
        children: [
          {
            path: '/policy/clean/org-list',
            name: 'policy-org-list',
            hidden: false,
            meta: { title: '发文机构名称标准化表', icon: '' },
            component: () => import(/* webpackChunkName: "dataList" */ '../views/policy/org-list')

          }
        ]
      },
      {
        path: '/policy/analyze',
        name: 'policy-analyze',
        hidden: false,
        meta: { title: '政策数据分析', icon: 'iconevaluate' },
        redirect: '/policy/analyze/sight-words',
        component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
        children: [
          {
            path: '/policy/analyze/sight-words',
            name: 'policy-sight-words',
            hidden: false,
            meta: { title: '高频词列表', icon: '' },
            component: () => import(/* webpackChunkName: "dataList" */ '../views/policy/sight-words')

          },
          {
            path: '/policy/analyze/text-contrast',
            name: 'policy-text-contrast',
            hidden: true,
            meta: { title: '文本对比', icon: '' },
            component: () => import(/* webpackChunkName: "dataList" */ '../views/policy/text-contrast')

          }
        ]
      }
    ]
  }

]
// 民政局
export const adminRoutes = [
  {
    path: '',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
    hidden: false,
    meta: { title: '', icon: '' },
    redirect: 'evaluate-finished',
    children: [
      {
        path: 'evaluate-finished',
        name: 'evaluate-finished',
        hidden: false,
        meta: { title: '已评估老人列表', icon: 'iconevaluate' },
        component: () => import(/* webpackChunkName: "evaluate-finished" */ '../views/evaluate-finished')
      },
      // 评估详情
      {
        path: 'evaluate-show/:id',
        name: 'evaluate-show',
        hidden: true,
        component: () => import(/* webpackChunkName: "evaluate-show" */ '../views/evaluate-show')
      }
    ]
  },
  {
    path: '',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
    hidden: false,
    meta: { title: '', icon: '' },
    redirect: 'no-evaluate',
    children: [
      {
        path: 'no-evaluate',
        name: 'no-evaluate',
        hidden: false,
        meta: { title: '已登记但未评估老人列表', icon: 'iconregisted' },
        component: () => import(/* webpackChunkName: "no-evaluate" */ '../views/no-evaluate')
      },
      // 历史评估
      {
        path: 'evaluate-history/:id',
        name: 'evaluate-history',
        hidden: true,
        meta: { title: '评估历史', icon: '' },
        component: () => import(/* webpackChunkName: "evaluate-history" */ '../views/evaluate-history')
      }
    ]
  },
  {
    path: '',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
    hidden: false,
    meta: { title: '用户管理', icon: 'iconuser-admin' },
    redirect: 'primary-user',
    children: [
      // 评估列表
      {
        path: 'primary-user',
        name: 'primary-user',
        hidden: false,
        meta: { title: '基层用户', icon: '' },
        component: () => import(/* webpackChunkName: "primary-user" */ '../views/primary-user')
      },
      {
        path: 'organization',
        name: 'organization',
        hidden: false,
        meta: { title: '评估机构', icon: '' },
        component: () => import(/* webpackChunkName: "organization" */ '../views/organization')
      }
    ]

  }
]
// 基层用户
export const primaryRoutes = [
  {
    path: '',
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
    hidden: false,
    meta: { title: '', icon: '' },
    redirect: 'register-list',
    children: [
      // 登记列表
      {
        path: 'register-list',
        name: 'register-list',
        hidden: false,
        meta: { title: '登记列表', icon: 'iconregister' },
        component: () => import(/* webpackChunkName: "evaluate-list" */ '../views/register-list')
      },
      {
        path: 'register/:id?',
        name: 'register',
        hidden: true,
        meta: { title: '登记', icon: '' },
        component: () => import(/* webpackChunkName: "evaluate-list" */ '../views/register')
      }
    ]

  },
  {
    path: '/user',
    meta: { title: '管理员管理', icon: 'iconuser-admin' },
    hidden: false,
    component: () => import(/* webpackChunkName: "main" */ '../views/main/main.vue'),
    children: [
      {
        path: 'reset-pwd',
        name: 'reset-pwd',
        meta: { title: '修改密码', icon: 'iconuser-admin' },
        hidden: false,
        component: () => import(/* webpackChunkName: "reset-pwd" */ '../views/reset-pwd')
      }
    ]
  }
]
