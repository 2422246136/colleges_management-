import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import axios from './axios/axios'
import util from './util/util'
import { Row, Col, Message} from 'view-design'
import Viewer from 'v-viewer'
import VueParticles from 'vue-particles'
import 'viewerjs/dist/viewer.css'
Vue.use(VueParticles)
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": false, "button": true, "navbar": true, "title": false, "toolbar": false, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": false, "url": "data-source" }
});
axios.defaults.withCredentials = true//让ajax携带cookie
axios.defaults.withCredentials=true;
Vue.config.productionTip = false;

// 挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios;
Vue.prototype.util = util;
Vue.prototype.$Message = Message;


Vue.component('Row', Row);
Vue.component('Col', Col);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
