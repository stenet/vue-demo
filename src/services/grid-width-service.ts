export class GridWidthService {
  private readonly WIDTH_XS = 768;
  private readonly WIDTH_SM = 992;
  private readonly WIDTH_MD = 1200;
  private readonly WIDTH_LG = 1500;

  private readonly _observer: ResizeObserver;
  
  constructor() {
    this._observer = new ResizeObserver(this.updateGridSize.bind(this));
  }
  
  isXS(width: number) {
    return true;
  }
  isSM(width: number) {
    return width >= this.WIDTH_XS;
  }
  isMD(width: number) {
    return width >= this.WIDTH_SM;
  }
  isLG(width: number) {
    return width >= this.WIDTH_MD;
  }
  isXL(width: number) {
    return width >= this.WIDTH_LG;
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
    
    if (this.isSM(width)) {
      target.classList.add("gr-sm");
    } else {
      target.classList.remove("gr-sm");
    }

    if (this.isMD(width)) {
      target.classList.add("gr-md");
    } else {
      target.classList.remove("gr-md");
    }

    if (this.isLG(width)) {
      target.classList.add("gr-lg");
    } else {
      target.classList.remove("gr-lg");
    }

    if (this.isXL(width)) {
      target.classList.add("gr-xl");
    } else {
      target.classList.remove("gr-xl");
    }
  }
}