import { Directive } from "vue";
import { Container } from "../../../di";
import { GridWidthService } from "../../../services/grid-width-service";

export default <Directive>{
  mounted(el: HTMLElement, binding) {
    if (!binding.instance) {
      return;
    }
    
    const container: Container = binding.instance.$.appContext.provides.container;
    const gridWidthService = container.get(GridWidthService);
    gridWidthService.observe(el);
  },
  unmounted(el: HTMLElement, binding) {
    if (!binding.instance) {
      return;
    }

    const container: Container = binding.instance.$.appContext.provides.container;
    const gridWidthService = container.get(GridWidthService);
    gridWidthService.unobserve(el);    
  }
};