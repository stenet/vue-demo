import { Plugin } from "vue";
import { AddRoutes } from "../../routes";

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
    }
  };
}

interface ILoadingOptions {
  addRoutes: AddRoutes;
}