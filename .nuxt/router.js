import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3689bde2 = () => interopDefault(import('../pages/artists.vue' /* webpackChunkName: "pages/artists" */))
const _2b59bedd = () => interopDefault(import('../pages/performances.vue' /* webpackChunkName: "pages/performances" */))
const _5c0f12c3 = () => interopDefault(import('../pages/plan.vue' /* webpackChunkName: "pages/plan" */))
const _7affc128 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3689bde2,
    name: "artists"
  }, {
    path: "/performances",
    component: _2b59bedd,
    name: "performances"
  }, {
    path: "/plan",
    component: _5c0f12c3,
    name: "plan"
  }, {
    path: "/",
    component: _7affc128,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
