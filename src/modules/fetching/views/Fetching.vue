<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { FetchService } from "../../../services/fetch-service";
import { useContainer } from "../../../use/container";
import notify from "devextreme/ui/notify";

const url = ref<string>("https://api.predic8.de/shop/products/");
const data = ref<object>();

function onShowProductsClick() {
  url.value = "https://api.predic8.de/shop/products/";
}
function onShowProduct62Click() {
  url.value = "https://api.predic8.de/shop/products/62";
}
function onShowVendor32Click() {
  url.value = "https://api.predic8.de/shop/vendors/32";
}
function onShowErrorClick() {
  url.value = "https://api.predic8.de/shop123456789";
}

const fetchService = useContainer(FetchService);
let abortController: AbortController;

watchEffect(async () => {
  abortController?.abort();
  abortController = new AbortController();

  data.value = await fetchService.get({
    url: url.value,
    abortSignal: abortController.signal,
    timeout: 500,
    errorHandler: (response) => {
      notify(response.statusText, "error", 3000);
      return true;
    }
  });
});

</script>

<template>
  <div class="fetching col-container">
    <div class="col-md-3 col-xs-12">
      <button @click="onShowProductsClick()">Show products</button>
    </div>

    <div class="col-md-3 col-xs-12">
      <button @click="onShowProduct62Click()">Show product 62</button>
    </div>

    <div class="col-md-3 col-xs-12">
      <button @click="onShowVendor32Click()">Show vendor 32</button>
    </div>

    <div class="col-md-3 col-xs-12">
      <button @click="onShowErrorClick()">Show error</button>
    </div>

    <div class="col-xs-12 json" v-html="JSON.stringify(data)">
    </div>

    <div class="col-xs-12">
      <base-info>
        Laden von Daten aus dem Web (mit FetchService)
      </base-info>
    </div>
  </div>
</template>

<style lang="less" scoped>
.fetching {
  button {
    width: 100%;
  }
}

.json {
  word-break: break-word;
}

</style>