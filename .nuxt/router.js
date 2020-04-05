import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _b410b2b8 = () => interopDefault(import('../pages/artists.vue' /* webpackChunkName: "pages/artists" */))
const _46c6d4fe = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _f12e014a = () => interopDefault(import('../pages/performances.vue' /* webpackChunkName: "pages/performances" */))
const _3fedb141 = () => interopDefault(import('../pages/plan.vue' /* webpackChunkName: "pages/plan" */))
const _12f4f26a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/artists",
    component: _b410b2b8,
    name: "artists"
  }, {
    path: "/login",
    component: _46c6d4fe,
    name: "login"
  }, {
    path: "/performances",
    component: _f12e014a,
    name: "performances"
  }, {
    path: "/plan",
    component: _3fedb141,
    name: "plan"
  }, {
    path: "/",
    component: _12f4f26a,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
