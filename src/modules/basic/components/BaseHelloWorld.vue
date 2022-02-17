<script lang="ts" setup>
type Props = {
  message: string;
}

const props = defineProps<Props>();
</script>

<template>
  Message aus BasicHelloWorld: {{ props.message }}
</template>

<style lang="less">
</style>