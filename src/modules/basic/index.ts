import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import BaseInfo from "./components/BaseInfo.vue";
import GridWidthDirective from "./directives/grid-width-directive";
import BrowserDirective from "./directives/browser-directive";

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
      app.directive("grid-width", GridWidthDirective);
      app.directive("browser", BrowserDirective);
    }
  };
}

interface IBasicOptions {
  addRoutes: AddRoutes;
}