export class GridSizeService {
  private readonly WIDTH_XS = 768;
  private readonly WIDTH_SM = 992;
  private readonly WIDTH_MD = 1200;
  private readonly WIDTH_LG = 1500;

  private readonly _observer: ResizeObserver;
  
  constructor() {
    this._observer = new ResizeObserver(this.updateGridSize.bind(this));
  }
  
  observe(el: HTMLElement) {
    this._observer.observe(el);
    this.updateElement(el, el.clientWidth);
  }
  unobserve(el: HTMLElement) {
    this._observer.observe(el);
  }  
  
  private updateGridSize(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      if (!entry.contentRect) {
        continue;
      }
      
      const width = entry.contentRect.width;
      const target = entry.target;
      this.updateElement(target, width);
    }
  }
  private updateElement(target: Element, width: number) {
    target.classList.add("gr-xs");
    
    if (width >= this.WIDTH_XS) {
      target.classList.add("gr-sm");
    } else {
      target.classList.remove("gr-sm");
    }

    if (width >= this.WIDTH_SM) {
      target.classList.add("gr-md");
    } else {
      target.classList.remove("gr-md");
    }

    if (width >= this.WIDTH_MD) {
      target.classList.add("gr-lg");
    } else {
      target.classList.remove("gr-lg");
    }

    if (width >= this.WIDTH_LG) {
      target.classList.add("gr-xl");
    } else {
      target.classList.remove("gr-xl");
    }
  }
}