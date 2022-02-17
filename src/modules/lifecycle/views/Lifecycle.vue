<script lang="ts" setup>
import LifecycleLogger from "../components/LifecycleLogger.vue";
import { ref } from "vue";

const showLogger = ref(true);
const name = ref("Hubert");
const data = ref<string[]>([]);

function log(value: string) {
  data.value.push(value);
}
</script>

<template>
  <div class="lifecycle col-container">
    <div class="col-md-4 col-xs-12">
      <input type="text" v-model="name">
    </div>

    <div class="col-md-4 col-xs-12">
      <button @click="showLogger = !showLogger">{{ showLogger ? "Hide" : "Show" }} Lifecycle-Logger</button>
    </div>

    <div class="col-md-4 col-xs-12">
      <button @click="data.splice(0)">Clear logs</button>
    </div>
    
    <div class="col-xs-12">
      <lifecycle-logger
        v-if="showLogger"
        :name="name"
        @log="log($event)"></lifecycle-logger>
    </div>
    
    <div class="col-xs-12" v-for="item in data">
      {{ item }}
    </div>
    
    <div class="col-xs-12">
      <base-info>
        Beispiel für Lifecycle-Hooks, die ausgelöst werden
      </base-info>
    </div>
  </div>
</template>

<style lang="less">
.lifecycle {
  button, input {
    width: 100%;
  }
}
</style>