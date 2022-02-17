<script lang="ts" setup>
  import { ref } from "vue";
  import BaseHelloWorld from "../components/BaseHelloWorld.vue";
  
  const message = ref("keine");
</script>

<template>
  <div class="col-container">
    <div class="col-xs-12" data-caption="Message">
      <input type="text" v-model="message">
    </div>
    <div class="col-xs-12">
      <base-hello-world
        :message="message"></base-hello-world>
    </div>
    <div class="col-xs-12">
      <base-info>
        Hier wird gezeigt, wie eine Komponente (in diesem Fall &lt;base-hello-world&gt;) inkl. Properties verwendet wird.
      </base-info>
    </div>
  </div>
</template>

<style lang="less">
</style>