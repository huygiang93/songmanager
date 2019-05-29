import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewSong from '@/components/NewSong'
import ViewSong from '@/components/ViewSong'
import EditSong from '@/components/EditSong'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-song',
      component: NewSong
    },
    {
      path: '/edit/:song_id',
      name: 'edit-song',
      component: EditSong
    },
    {
      path: '/:song_id',
      name: 'view-song',
      component: ViewSong
    },
  ]
})
