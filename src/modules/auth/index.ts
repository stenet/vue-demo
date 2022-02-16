import { Plugin } from "vue";
import { AddRoutes } from "../../routes";

export function createAuthPlugin(options: IAuthOptions): Plugin {
  options.addRoutes({
    path: "/login",
    name: "Login",
    component: () => import("./views/Login.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
    }
  };
}

interface IAuthOptions {
  addRoutes: AddRoutes;
}