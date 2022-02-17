<script lang="ts" setup>
import { ref } from "vue";

const emits = defineEmits<{
  (e: "event-inner-emit-click"): void
}>();

const button = ref<HTMLButtonElement>();

function onButtonDispatchClick() {
  button.value?.dispatchEvent(new CustomEvent("event-inner-dispatch-click", {
    bubbles: true
  }));
}

function onButtonEmitClick() {
  emits("event-inner-emit-click");
}
</script>

<template>
  <div class="event-inner col-container">
    <div class="col-md-6 col-xs-12">
      <button ref="button" @click="onButtonDispatchClick()">Publish event with dispatchElement</button>
    </div>
    <div class="col-md-6 col-xs-12">
      <button ref="button" @click="onButtonEmitClick()">Publish event with $emit</button>
    </div>
  </div>
</template>

<style lang="less">
.event-inner {
  button {
    width: 100%;
  }
}
</style>