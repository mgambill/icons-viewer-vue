import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import * as outline from "./icons/heroicons/outline"
import * as solid from "./icons/heroicons/solid"
import * as zondicon from "./icons/zondicons"
import VueClipboard from "vue-clipboard2"

Vue.use(VueClipboard)

Object.values(solid).forEach(icon => {
  Vue.component(`Solid${icon.name}`, icon)
})
Object.values(outline).forEach(icon => {
  Vue.component(`Outline${icon.name}`, icon)
})
// if we add another icon set we will need to a prefix....
Object.values(zondicon).forEach(icon => {
  Vue.component(`${icon.name}`, icon)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
