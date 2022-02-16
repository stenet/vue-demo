import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.vue";
import { Container } from "./di";
import { createAuthPlugin } from "./modules/auth";
import { createBasicPlugin } from "./modules/basic";
import { createLoadingPlugin } from "./modules/loading";
import { createLocalizationPlugin } from "./modules/localization";
import { createSlotsPlugin } from "./modules/slots";
import { Routes } from "./routes";

import "./normalize.less";
import "./grid.less";
import "./common.less";
import "@fortawesome/fontawesome-free/css/all.min.css";

//Klassen für Konfiguraiton
const routes = new Routes();
const container = Container.createContainer();

//Plugins
const basicPlugin = createBasicPlugin({
  addRoutes: routes.addRoutes
});

const authPlugin = createAuthPlugin({
  addRoutes: routes.addRoutes
});

const loadingPlugin = createLoadingPlugin({
  addRoutes: routes.addRoutes
});

const slotsPlugin = createSlotsPlugin({
  addRoutes: routes.addRoutes
});

const localizationPlugin = createLocalizationPlugin({
  addRoutes: routes.addRoutes
});

//Router
let backRoute: any = null;
window.addEventListener(
  "popstate",
  (ev) => {
    backRoute = ev.state.back;
  });

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes.routes
});

router.afterEach((to, from) => {
  const slideLeft = !backRoute || backRoute == from.path;

  to.meta.transitionName = slideLeft ? "slide-left" : "slide-right";
  backRoute = null;
});

createApp(App)
  .provide("container", container)
  .use(router)
  .use(basicPlugin)
  .use(authPlugin)
  .use(loadingPlugin)
  .use(slotsPlugin)
  .use(localizationPlugin)
  .mount("#app");
