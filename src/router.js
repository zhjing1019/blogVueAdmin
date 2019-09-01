import Vue from "vue";
import Router from "vue-router";
import Label from "@/view/Label.vue";
import ArticalList from "@/view/ArticalList.vue";
import Index from "@/view/Index.vue";
import Login from "@/view/Login.vue";


Vue.use(Router);

const router =  new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
      children: [
        {
          path: "/label",
          name: "Label",
          component: Label
        },
        {
          path: "/label",
          name: "Label",
          component: Label
        },
        {
          path: "/articalList",
          name: "ArticalList",
          component: ArticalList
        }
      ],
      redirect: "/label"
    },

  ]
});

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('loginToken');
 
    if (token === 'null' || token === '') {
      next('/');
    } else {
      next();
    }
  }
});

export default router;

