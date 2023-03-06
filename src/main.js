import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'
import axios from 'axios'

Vue.config.productionTip = false

//firebase
var firebaseConfig = {
  apiKey: "AIzaSyBSvIZd_mesFKv7YPq479FpIAWRE8hWu5E",
  authDomain: "curry-app-3e233.firebaseapp.com", 
  projectId: "curry-app-3e233",
  storageBucket: "curry-app-3e233.appspot.com",
  messagingSenderId: "2817963061",
  appId: "1:2817963061:web:64c7d0b8ebc4b5c3c2ed7c",
  measurementId: "G-W409BLLCYM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  firebase,
  axios,
  render: h => h(App)
}).$mount('#app')
