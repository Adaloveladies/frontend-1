import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import Gorevler from './components/Gorevler.vue';
import City from './components/City.vue';
import Profile from './components/Profile.vue';

const Empty = { template: '<div></div>' };

const routes = [
  { path: '/', component: Empty },
  { path: '/hosgeldin', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp },
  { path: '/gorevlerim', component: Gorevler, meta: { requiresAuth: true } },
  { path: '/city', name: 'City', component: City },
  { path: '/tasks', name: 'Gorevler', component: Gorevler },
  { path: '/profile', component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 