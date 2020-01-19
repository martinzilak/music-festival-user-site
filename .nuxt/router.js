import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2c1cbf06 = () => interopDefault(import('../pages/artists.vue' /* webpackChunkName: "pages/artists" */))
const _300e4522 = () => interopDefault(import('../pages/performances.vue' /* webpackChunkName: "pages/performances" */))
const _581cae08 = () => interopDefault(import('../pages/plan.vue' /* webpackChunkName: "pages/plan" */))
const _00a58e83 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _2c1cbf06,
    name: "artists"
  }, {
    path: "/performances",
    component: _300e4522,
    name: "performances"
  }, {
    path: "/plan",
    component: _581cae08,
    name: "plan"
  }, {
    path: "/",
    component: _00a58e83,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
