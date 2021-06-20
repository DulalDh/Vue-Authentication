import Vue from 'vue'
import { store } from '../store';
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
    { path: '', redirect: '/home' },
    {
        path: '/home',
        name: 'Home',
        component: Home,

        meta: {
            title: 'Default Home page',
            requiresAuth: true
        },

    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue'),
        meta: {
            title: 'Default Home page',
            requiresAuth: true
        },
    },

]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    let isAuthenticated = store.getters['authentication/isAuthenticated'];
    let matched = to.matched.some(record => record.meta.requiresAuth);
    if (matched) {
        if (isAuthenticated) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
})


export default router