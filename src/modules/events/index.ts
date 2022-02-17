import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import RuntimeTemplate from "./components/RuntimeTemplate.vue";

export function createEventsPlugin(options: IEventsOptions): Plugin {
  options.addRoutes({
    path: "/events",
    name: "Events",
    component: () => import("./views/Events.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
    }
  };
}

interface IEventsOptions {
  addRoutes: AddRoutes;
}