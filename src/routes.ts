import { RouteRecordRaw } from "vue-router";

export class Routes {
  constructor() {
    this.routes = [];
    this.addRoutes = this.addRoutesInternal.bind(this);
  }

  addRoutes: AddRoutes;
  routes: RouteRecordRaw[];

  private addRoutesInternal(route: RouteRecordRaw | RouteRecordRaw[]) {
    if (Array.isArray(route)) {
      this.routes.push(...route);
    } else {
      this.routes.push(route);
    }
  }
}
export type AddRoutes = (route: RouteRecordRaw | RouteRecordRaw[]) => void;