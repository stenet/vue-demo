<script lang="ts" setup>
import {
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate, onDeactivated,
  onErrorCaptured,
  onMounted,
  onUnmounted,
  onUpdated
} from "vue";

interface Props {
  name: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "log", v: string): void
}>();

function emit(value: string) {
  emits("log", value);
}

emit("setup");

onMounted(() => emit("onMounted"));
onUpdated(() => emit("onUpdated"));
onUnmounted(() => emit("onUnmounted"));
onBeforeMount(() => emit("onBeforeMount"));
onBeforeUpdate(() => emit("onBeforeUpdate"));
onBeforeUnmount(() => emit("onBeforeUnmount"));
onErrorCaptured(() => emit("onErrorCaptured"));
onActivated(() => emit("onActivated"));
onDeactivated(() => emit("onDeactivated"));

</script>

<template>
  <div class="lifecycle-logger">
    Aktueller Wert: {{ props.name }}
  </div>
</template>

<style lang="less">
.lifecycle-logger {
  font-weight: bold;
}
</style>