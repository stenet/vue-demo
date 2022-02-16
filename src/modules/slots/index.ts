import { Plugin } from "vue";
import { AddRoutes } from "../../routes";

export function createSlotsPlugin(options: ISlotsOptions): Plugin {
  options.addRoutes({
    path: "/slots",
    name: "Slots",
    component: () => import("./views/Slots.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
    }
  };
}

interface ISlotsOptions {
  addRoutes: AddRoutes;
}