import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import BaseInfo from "./components/BaseInfo.vue";
import GridSizeDirective from "./directives/grid-size-directive";

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
      app.component("base-info", BaseInfo);
      app.directive("grid-size", GridSizeDirective);
    }
  };
}

interface IBasicOptions {
  addRoutes: AddRoutes;
}