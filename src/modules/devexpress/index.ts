import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import { DxButton } from "devextreme-vue/button";
import { DxCheckBox } from "devextreme-vue/check-box";
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import { DxTextBox, DxButton as DxTextBoxButton } from "devextreme-vue/text-box";
import { DxNumberBox, DxButton as DxNumberBoxButton } from "devextreme-vue/number-box";
import { DxDateBox, DxButton as DxDateBoxButton } from "devextreme-vue/date-box";

import "devextreme/dist/css/dx.light.css";

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
      app
        .component("DxButton", DxButton)
        .component("DxDataGrid", DxDataGrid)
        .component("DxColumn", DxColumn)
        .component("DxTextBox", DxTextBox)
        .component("DxTextBoxButton", DxTextBoxButton)
        .component("DxNumberBox", DxNumberBox)
        .component("DxNumberBoxButton", DxNumberBoxButton)
        .component("DxDateBox", DxDateBox)
        .component("DxDateBoxButton", DxDateBoxButton)
        .component("DxCheckBox", DxCheckBox);
    }
  };
}

interface IDevExpressOptions {
  addRoutes: AddRoutes;
}