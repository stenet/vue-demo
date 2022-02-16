import { Plugin } from "vue";
import { AddRoutes } from "../../routes";
import { LocalizationService } from "../../services/LocalizationService";
import { useContainer } from "../../use/container";
import TranslateDirective from "./directives/translate-directive";

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tr: Translate
  }
}

export function createLocalizationPlugin(options: ILocalizationOptions): Plugin {
  options.addRoutes({
    path: "/localization",
    name: "Localization",
    component: () => import("./views/Localization.vue"),
    meta: {
      showInNav: true
    }
  });
  
  return {
    install(app) {
      app.config.globalProperties.$tr = (key: string) => {
        return useContainer(LocalizationService).getTranslation(key);
      };
      
      app.directive("tr", TranslateDirective)
    }
  };
}

interface ILocalizationOptions {
  addRoutes: AddRoutes;
}
type Translate = (key: string) => string;