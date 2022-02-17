<script lang="ts" setup>

import IHelloWorld from "./HelloWorld";

interface Props {
  helloWorldName: string;
}
interface Expose {
  doSomething(): void;
}

const props = defineProps<Props>();

function doSomething() {
  alert("Hello from HelloWorld");
}

defineExpose<IHelloWorld>({
  doSomething
})
</script>

<template>
  <div class="hello">
    <h1>{{ props.helloWorldName }}</h1>
  </div>
</template>