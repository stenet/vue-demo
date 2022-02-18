import { Directive } from "vue";
import { Container } from "../../../di";
import { BrowserService } from "../../../services/browser-service";

export default <Directive>{
  beforeMount(el: HTMLElement, binding) {
    if (!binding.instance) {
      return;
    }
    
    const container: Container = binding.instance.$.appContext.provides.container;
    const browserService = container.get(BrowserService);
    
    if (browserService.isFirefox) {
      el.classList.add("browser--firefox");
    }
    if (browserService.isMobileFirefox) {
      el.classList.add("browser--mobile-firefox");
    }
    if (browserService.isChrome) {
      el.classList.add("browser--chrome");
    }
    if (browserService.isMobileChrome) {
      el.classList.add("browser--mobile-chrome");
    }
    if (browserService.isSafari) {
      el.classList.add("browser--safari");
    }
    if (browserService.isMobileSafari) {
      el.classList.add("browser--mobile-safari");
    }
    if (browserService.isDesktop) {
      el.classList.add("browser--desktop");
    }
    if (browserService.isMobile) {
      el.classList.add("browser--mobile");
    }
    if (browserService.isTouch) {
      el.classList.add("browser--touch");
    }
  }
};