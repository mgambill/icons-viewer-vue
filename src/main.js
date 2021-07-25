import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import './index.css'

// icons
import * as outline from "./icons/heroicons/outline"
import * as solid from "./icons/heroicons/solid"
//import * as zondicon from "./icons/zondicons"
import * as codicon from "./icons/codicons"
import * as feather from "./icons/feather"
import * as teenyicon_outline from "./icons/teenyicons/outline"
import * as teenyicon_solid from "./icons/teenyicons/solid"


const app = createApp(App)
  .use(router)

Object.values(solid).forEach(icon => {
  app.component(`Solid${icon.name}`, icon)
})
Object.values(outline).forEach(icon => {
  app.component(`Outline${icon.name}`, icon)
})

// Object.values(zondicon).forEach(icon => {
//   app.component(`Zondicon_${icon.name}`, icon)
// })

Object.values(codicon).forEach(icon => {
  app.component(`Codicon_${icon.name}`, icon)
})

Object.values(teenyicon_outline).forEach(icon => {
  app.component(`Teeny_Outline${icon.name}`, icon)
})

Object.values(teenyicon_solid).forEach(icon => {
  app.component(`Teeny_Solid${icon.name}`, icon)
})

Object.values(feather).forEach(icon => {
  app.component(`Feather_${icon.name}`, icon)
})

 app.mount('#app')
