import { Directive } from "vue";
import { Container } from "../../../di";
import { GridSizeService } from "../../../services/GridSizeService";

export default <Directive>{
  mounted(el: HTMLElement, binding) {
    if (!binding.instance) {
      return;
    }
    
    const container: Container = binding.instance.$.appContext.provides.container;
    const gridSizeService = container.get(GridSizeService);
    gridSizeService.observe(el);
  },
  unmounted(el: HTMLElement, binding) {
    if (!binding.instance) {
      return;
    }

    const container: Container = binding.instance.$.appContext.provides.container;
    const gridSizeService = container.get(GridSizeService);
    gridSizeService.unobserve(el);    
  }
};