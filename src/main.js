import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRotateLeft, faPlus, faMinus, faPersonWalkingArrowRight, faArrowLeft, faArrowRight, faXmark, faCrown } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRotateLeft, faPlus, faMinus, faPersonWalkingArrowRight, faArrowLeft, faArrowRight, faXmark, faCrown)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
