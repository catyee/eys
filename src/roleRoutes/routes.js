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

          },
          {
            path: '/policy/manage/policyDetail/:id',
            name: 'policy-detail',
            hidden: true,
            meta: { title: '数据列表', icon: '' },
            component: () => import(/* webpackChunkName: "policyDetail" */ '../views/policy/policy-detail')

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
