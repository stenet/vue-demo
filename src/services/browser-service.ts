export class BrowserService {
  private readonly _isFirefox: boolean;
  private readonly _isMobileFirefox: boolean;

  private readonly _isChrome: boolean;
  private readonly _isMobileChrome: boolean;

  private readonly _isSafari: boolean;
  private readonly _isMobileSafari: boolean;

  private readonly _isDesktop: boolean;
  private readonly _isMobile: boolean;
  private readonly _isTouch: boolean;

  constructor() {
    const isAndroid = navigator.userAgent.indexOf("Android/") >= 0;

    const isFirefox = navigator.userAgent.indexOf("Firefox/") >= 0;
    const isChrome = navigator.userAgent.indexOf("Chrome/") >= 0;

    this._isFirefox = isFirefox && !isAndroid;
    this._isMobileFirefox = isFirefox && isAndroid;

    this._isChrome = isChrome && !isAndroid;
    this._isMobileChrome = isChrome && isAndroid;

    const isSafari = navigator.userAgent.indexOf("Safari/") >= 0;
    const isMac = navigator.userAgent.indexOf("Macintosh/") >= 0;
    const isIPhone = navigator.userAgent.indexOf("iPhone/") >= 0;
    const isIPad = navigator.userAgent.indexOf("iPad/") >= 0;

    this._isSafari = isSafari && isMac;
    this._isMobileSafari = isSafari && (isIPhone || isIPad);

    this._isDesktop = !isAndroid && !isIPhone && !isIPad;
    this._isMobile = !this._isDesktop;    
    this._isTouch = navigator.maxTouchPoints > 0;
  }

  get isFirefox() {
    return this._isFirefox;
  }
  get isMobileFirefox() {
    return this._isMobileFirefox;
  }

  get isChrome() {
    return this._isChrome;
  }
  get isMobileChrome() {
    return this._isMobileChrome;
  }

  get isSafari() {
    return this._isSafari;
  }
  get isMobileSafari() {
    return this._isMobileSafari;
  }

  get isDesktop() {
    return this._isDesktop;
  }
  get isMobile() {
    return this._isMobile;
  }
  get isTouch() {
    return this._isTouch;
  }
}