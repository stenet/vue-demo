import { Plugin } from "vue";
import { AddRoutes } from "../../routes";

export function createBasicPlugin(options: IBasicOptions): Plugin {
  options.addRoutes({
    path: "/",
    alias: ["/basic"],
    name: "Basic",
    component: () => import("./views/Basic.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
    }
  };
}

interface IBasicOptions {
  addRoutes: AddRoutes;
}