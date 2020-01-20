import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _91454838 = () => interopDefault(import('../pages/artists.vue' /* webpackChunkName: "pages/artists" */))
const _50fadbca = () => interopDefault(import('../pages/performances.vue' /* webpackChunkName: "pages/performances" */))
const _29260401 = () => interopDefault(import('../pages/plan.vue' /* webpackChunkName: "pages/plan" */))
const _50c6f7aa = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _91454838,
    name: "artists"
  }, {
    path: "/performances",
    component: _50fadbca,
    name: "performances"
  }, {
    path: "/plan",
    component: _29260401,
    name: "plan"
  }, {
    path: "/",
    component: _50c6f7aa,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
