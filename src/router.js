import Vue from "vue";
import Router from "vue-router";
import Label from "@/view/Label.vue";
import ArticalList from "@/view/ArticalList.vue";
import EditArtical from "@/view/EditArtical.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
        path: "/",
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
    },
    {
        path: "/editArtical",
        name: "EditArtical",
        component: EditArtical
    },
  ]
});