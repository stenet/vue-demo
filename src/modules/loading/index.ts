import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import BaseLoading from "./components/BaseLoading.vue";

export function createLoadingPlugin(options: ILoadingOptions): Plugin {
  options.addRoutes({
    path: "/loading",
    name: "Loading",
    component: () => import("./views/Loading.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
      app.component("base-loading", BaseLoading)
    }
  };
}

interface ILoadingOptions {
  addRoutes: AddRoutes;
}