<script lang="ts" setup>
import { ref } from "vue";
import { AuthService } from "../../../services/auth-service";
import { useContainer } from "../../../use/container";
  
const model = ref(<{
  username?: string,
  password?: string
}>{
});

const loadingPromise = ref<Promise<any>>();

const authService = useContainer(AuthService);

async function onLoginClick() {
  loadingPromise.value = authService.login(model.value.username, model.value.password);
  await loadingPromise.value;
}
async function onLogoutClick() {
  loadingPromise.value = authService.logout();
  await loadingPromise.value;
}
</script>

<template>
  <base-loading :promise="loadingPromise">
    <div class="col-container">
      <template v-if="!authService.state.isLoggedIn">
        <div class="col-xs-12" data-caption="Benutzer">
          <input type="text" v-model="model.username">
        </div>
        <div class="col-xs-12" data-caption="Passwort">
          <input type="text" v-model="model.password">
        </div>
        <div class="col-xs-12">
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

      <div class="col-xs-12">
        <base-info>
          <div>
            Der Login wird vom AuthService durchgeführt.
          </div>
          <div>
            Für den Ladevorang wird &lt;base-loading&gt; verwendet, das angezeigt wird, so lange der Promise von login/logout aktiv ist.
          </div>
        </base-info>
      </div>
    </div>
  </base-loading>
</template>

<style lang="less">
</style>