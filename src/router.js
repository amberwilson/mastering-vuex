import Routes from '@/routes';
import EventCreate from '@/views/EventCreate.vue';
import EventList from '@/views/EventList.vue';
import EventShow from '@/views/EventShow.vue';
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: Routes.EventList,
      component: EventList,
    },
    {
      path: '/event/create',
      name: Routes.EventCreate,
      component: EventCreate,
    },
    {
      path: '/event/:id',
      name: Routes.EventShow,
      component: EventShow,
      props: true,
    },
  ],
});
