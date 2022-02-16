<script lang="ts" setup>
import { useContainer } from "../../../use/container";
import { usePromise } from "../../../use/promise";
import BaseLoading from "../components/BaseLoading.vue";
import { DataService } from "../../../services/DataService";

const dataService = useContainer(DataService);
const { promise, result, reload } = usePromise(dataService.loadData());

async function onReloadClick() {
  reload(dataService.loadData(1))
}
</script>

<template>
  <div>
    <base-loading :promise="promise">
      <div class="col-container">
        <div v-for="item in result" class="col-xs-12">
          {{ item.firstName }} {{ item.lastName }}
        </div>
        
        <div class="col-xs-12">
          <button @click="onReloadClick()">Reload data</button>
        </div>
      </div>
    </base-loading>
  </div>
</template>