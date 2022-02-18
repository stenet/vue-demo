import { ref } from "vue";

export class LocalizationService {
  private _culture = ref<string>("de");
  
  constructor() {
  }

  get culture() {
    return this._culture.value;
  }
  set culture(value) {
    this._culture.value = value;
  }

  localizations: any = {
    de: {
      "hello": "Hallo"
    },
    en: {
      "hello": "Hello"
    }
  };

  getTranslation(key: string) {
    if (!(this.culture in this.localizations)) {
      return null;
    }

    const localizations = this.localizations[this.culture];
    if (!(key in localizations)) {
      return null;
    }

    return localizations[key];
  }
}