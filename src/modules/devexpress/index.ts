import { App, Plugin } from "vue";
import { AddRoutes } from "../../routes";
import { DxButton } from "devextreme-vue/button";
import { DxCheckBox } from "devextreme-vue/check-box";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { DxTextBox, DxButton as DxTextBoxButton } from "devextreme-vue/text-box";
import { DxNumberBox, DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import { DxDateBox, DxButton as DxDateBoxButton } from "devextreme-vue/date-box";
import { DxTagBox } from "devextreme-vue/tag-box";
import DxTagBoxBindDirective from "./directives/dx-tag-box-bind-directive";

import "devextreme/dist/css/dx.light.css";

const DX_INITIALIZED_EVENT = "dx-initialized";

export function getDefaultDxWidgets(): IDevExpressWidget[] {
  return [
    { name: "DxButton", vueComponent: DxButton },
    { name: "DxDataGrid", vueComponent: DxDataGrid },
    { name: "DxColumn", vueComponent: DxColumn },
    { name: "DxTextBox", vueComponent: DxTextBox },
    { name: "DxTextBoxButton", vueComponent: DxTextBoxButton },
    { name: "DxNumberBox", vueComponent: DxNumberBox },
    { name: "DxNumberBoxButton", vueComponent: DxNumberBoxButton },
    { name: "DxDateBox", vueComponent: DxDateBox },
    { name: "DxDateBoxButton", vueComponent: DxDateBoxButton },
    { name: "DxCheckBox", vueComponent: DxCheckBox },
    { name: "DxTagBox", vueComponent: DxTagBox }
  ];
}

export function registerDxInitialized<T>(el: Element, callback: { (args: DxInitialized<T>): void }) {
  el.addEventListener(DX_INITIALIZED_EVENT, (args: any) => {
    callback(args.detail);
  });
}

export function createDevExpressPlugin(options: IDevExpressOptions): Plugin {
  options.addRoutes({
    path: "/devexpress",
    name: "DevExpress",
    component: () => import("./views/DevExpress.vue"),
    meta: {
      showInNav: true
    }
  });

  return {
    install(app) {
      const widgets = options.widgets || getDefaultDxWidgets();
      widgets.forEach(w => registerWidget(app, w));

      app
        .directive("dx-tag-box-bind", DxTagBoxBindDirective);
    }
  };
}

function registerWidget(app: App, widget: IDevExpressWidget) {
  const methods = widget.vueComponent.extends?.methods;
  const hasIntegrationOptions = !!methods?.$_getExtraIntegrationOptions;
  
  if (hasIntegrationOptions) {
    const currentExtraIntegrationOptions = methods.$_getExtraIntegrationOptions;

    methods.$_getExtraIntegrationOptions = () => {
      return Object.assign(currentExtraIntegrationOptions(), {
        onInitialized(ev: DxInitialized<any>) {
          ev.element.dispatchEvent(new CustomEvent(DX_INITIALIZED_EVENT, {
            detail: ev,
            bubbles: true,
            cancelable: false
          }));
        }
      });
    };
  }  

  app.component(widget.name, widget.vueComponent);
}

export type DxInitialized<T> = {
  element: HTMLElement,
  component: T
};

interface IDevExpressOptions {
  addRoutes: AddRoutes;
  widgets?: IDevExpressWidget[];
}

interface IDevExpressWidget {
  name: string;
  vueComponent: any;
}