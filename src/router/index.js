import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login/Login' // 登录
import SelectPlatform from '@/components/Login/SelectPlatform' // 选择平台

import PersonOverview from '@/components/PersonAnalysis/PersonOverview' // 人员概览
import PersonList from '@/components/PersonAnalysis/PersonList/List' // 右上角信息列表
import PersonListDetail from '@/components/PersonAnalysis/PersonList/Detail' // 信息列表的信息详细
import PersonDetailOpts from '@/components/PersonAnalysis/PersonChartDetail/DetailOptsWrapper' // 人员概览图表详细
import PersonChartsWrapper from '@/components/PersonAnalysis/PersonFilteredCharts/ChartsWrapper' // 详细筛选后的图表

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/SelectPlatform',
      name: 'SelectPlatform',
      component: SelectPlatform
    },
    {
      path: '/PersonOverview',
      name: 'PersonOverview',
      component: PersonOverview
    },
    {
      path: '/PersonList',
      name: 'PersonList',
      component: PersonList
    },
    {
      path: '/PersonListDetail/id/:id',
      name: 'PersonListDetail',
      component: PersonListDetail
    },
    {
      path: '/PersonDetailOpts',
      name: 'PersonDetailOpts',
      component: PersonDetailOpts
    },
    {
      path: '/PersonChartsWrapper',
      name: 'PersonChartsWrapper',
      component: PersonChartsWrapper
    }
  ]
})
