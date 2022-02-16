<script lang="ts" setup>
import { ref } from "vue";
import { AuthService } from "../../../services/AuthService";
import { useContainer } from "../../../use/container";
  
const model = ref(<{
  username?: string,
  password?: string
}>{
});

const authService = useContainer(AuthService);

async function onLoginClick() {
  const r = await authService.login(model.value.username, model.value.password);
}
async function onLogoutClick() {
  const r = await authService.logout();
}
</script>

<template>
  <div class="col-container">
    <template v-if="!authService.state.isLoggedIn">
      <div class="col-xs-12" data-caption="Benutzer">
        <input type="text" v-model="model.username">
      </div>
      <div class="col-xs-12" data-caption="Passwort">
        <input type="text" v-model="model.password">
      </div>
      <div class="col-xs-12" data-caption="Benutzer">
        <button @click="onLoginClick()">Login</button>
      </div>
    </template>
    
    <template v-if="authService.state.isLoggedIn" >
      <div class="col-xs-12" data-caption="Benutzer">
        <button @click="onLogoutClick()">Logout</button>
      </div>
    </template>
    
    <div class="col-xs-12">
      Aktuell ist der Benutzer {{ authService.state.isLoggedIn ? "" : "nicht" }} angemeldet
    </div>
  </div>
</template>

<style scoped>

</style>