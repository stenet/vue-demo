import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import RuntimeTemplate from "./components/RuntimeTemplate.vue";

export function createFetchingPlugin(options: IFetchingOptions): Plugin {
  options.addRoutes({
    path: "/fetching",
    name: "Fetching",
    component: () => import("./views/Fetching.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
    }
  };
}

interface IFetchingOptions {
  addRoutes: AddRoutes;
}