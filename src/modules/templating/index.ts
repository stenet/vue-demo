import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import RuntimeTemplate from "./components/RuntimeTemplate.vue";

export function createTemplatingPlugin(options: ITemplatingOptions): Plugin {
  options.addRoutes({
    path: "/templating",
    name: "Templating",
    component: () => import("./views/Templating.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
      app.component("runtime-template", RuntimeTemplate);
    }
  };
}

interface ITemplatingOptions {
  addRoutes: AddRoutes;
}