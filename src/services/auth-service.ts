import { ref } from "vue";

export class AuthService {
  private _state = ref({
    isLoggedIn: false
  });
  
  get state() {
    return this._state.value;
  }
  
  async login(username?: string, password?: string) {
    if (!username) {
      alert("Kein Benutzername angegeben");
      return false;
    }
    if (!password) {
      alert("Kein Passwort angegeben");
      return false;
    }
    
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        this._state.value.isLoggedIn = true;
        resolve(true);
      }, 300);
    });
  }
  async loginAzureAd() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._state.value.isLoggedIn = true;
        resolve(true);
      }, 300);
    });
  }
  
  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this._state.value.isLoggedIn = false;
        resolve(true);
      }, 300);
    });
  }
}