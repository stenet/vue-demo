<script lang="ts" setup>
import { useContainer } from "../../../use/container";
import { usePromise } from "../../../use/promise";
import { DataService } from "../../../services/data-service";

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
        
        <div class="col-xs-12">
          <base-info>
            <div>
              Das zentrale Element ist &lt;base-loading&gt; in Kombination mit der Composable Function "usePromise".
            </div>
            <div>
              Die "usePromise" gibt eine Reihe von reaktiven Eigenschaften zurück wie u.a. "promise", "result", "reload", die einfach
              gebunden werden können.
            </div>
          </base-info>
        </div>
      </div>
    </base-loading>
  </div>
</template>