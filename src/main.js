import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router.js";
import axios from "axios";

Vue.use(ElementUI);
Vue.use(axios);

// // 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem('Authorization')) {
//       config.headers.Authorization = localStorage.getItem('Authorization');
//     }
 
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   });


  //异步请求前在header里加入token
axios.interceptors.request.use(
  config => {
    // if (config.url === "") {
    //如果是登录操作，则不需要携带header里面的token
    // } else {
    if (localStorage.getItem("Authorization")) {
      config.headers["x-cms-token"] = localStorage.getItem("Authorization");
    }
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("Authorization");
          this.$router.push("/");
      }
    }
  }
);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
