import Vue from "vue";
import Router from "vue-router";
import Label from "@/view/Label.vue";
import ArticalList from "@/view/ArticalList.vue";
import Index from "@/view/Index.vue";
import Login from "@/view/Login.vue";


Vue.use(Router);

export default new Router({
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

