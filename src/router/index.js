import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Star from '@/components/Star'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'List',
      component: List
    },
    {
      path: '/',
      name: 'Star',
      component: Star
    },

  ]
})
