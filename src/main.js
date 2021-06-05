import Vue from 'vue';
import App from './App.vue';
import './assets/style.sass';

Vue.config.productionTip = true;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
