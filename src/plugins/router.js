import { createRouter, createWebHistory } from "vue-router"
import Icons from "../views/Icons.vue"

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: "/",
    name: "Icons",
    //component: () => import(/* webpackChunkName: "icons" */ "../views/Icons.vue")
    component: Icons
  },
  {
    path: "/icon/:name",
    name: "SingleIcons",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router