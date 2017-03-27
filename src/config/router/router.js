import * as names from './router_names.js';

module.exports = [
	 {
      path: '/login',
      name: '注册',
      component: function(resolve) {
        require(['../../page/login.vue'], resolve)
      }
    },
    {
      path: '/',
      name: '首页',
      component: function (resolve) {
        require(['../../page/index.vue'], resolve)
      },
      children: [
        { 
        	path: '/btn', 
        	name: '按钮',
        	component: names.btn
        },
        { 
        	path: '/alert',
        	name: '警告', 
        	component: names.alert
        },
        { 
        	path: '/msg', 
        	name: '消息',
        	component: names.msg
        },
        {
          	path: '/table',
          	name: '表格',
          	component: names.table
        },
        {
          	path: '/pagination',
          	name: '分页',
          	component: names.pagination
        },
        {
          	path: '/radio',
          	name: '单选框',
          	component: names.radio
        },
        {
          path: '/checkbox',
          name: '多选框',
          component: names.checkbox
        },
        {
          path: '/input',
          name: '输入框',
          component: names.input
        },
        {
          path: '/number',
          name: '计数器',
          component: names.number
        },
        {
          path: '/demo_prolist',
          name: '商品列表',
          component: names.demo_prolist
        },
        {
          path: '/demo_valiform',
          name: '表单校验',
          component: names.demo_valiform
        },
        {
          path: '/upload',
          name: '图片上传',
          component: names.upload
        },
        {
          path: '/edit_info',
          name: '头像设置',
          component: names.editInfo
        },
        {
          path: '/chart',
          name: '图表',
          component: names.chart
        },
        {
          path: '/api_list',
          name: '接口列表',
          component: names.apiList
        },
        {
          path: '/user_manage',
          name: '用户管理',
          component: names.userManage
        },
        {
          path: '/api_manage',
          name: '接口管理',
          component: names.apiManage
        }
      ]
    }
]
