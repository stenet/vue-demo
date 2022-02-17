import { Plugin } from "vue";
import { AddRoutes } from "../../routes";

export function createLifecyclePlugin(options: ILifecycleOptions): Plugin {
  options.addRoutes({
    path: "/lifecycle",
    name: "Lifecycle",
    component: () => import("./views/Lifecycle.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
    }
  };
}

interface ILifecycleOptions {
  addRoutes: AddRoutes;
}