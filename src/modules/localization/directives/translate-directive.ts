import { Directive } from "vue";
import { Container } from "../../../di";
import { LocalizationService } from "../../../services/localization-service";

export default <Directive>{
  mounted(el, binding) {    
    let targets = ["html"];
    let key = "";

    if (typeof binding.value == "string") {
      key = binding.value;
    } else {
      targets = typeof binding.value.target == "string"
        ? binding.value.target.split(",").map((c: string) => c.trim()).filter((c: string) => !!c)
        : binding.value.target;

      key = binding.value.key;
    }
    
    if (!binding.instance) {
      return;
    }
    
    const container: Container = binding.instance.$.appContext.provides.container;
    const localizationService = container.get(LocalizationService);
    const translation = localizationService.getTranslation(key);
    for (const target of targets) {
      switch (target) {
        case "html": {
          el.innerText = translation;
          break;
        }
        default: {
          el.setAttribute(target, translation);
        }
      }
    }
  }
};