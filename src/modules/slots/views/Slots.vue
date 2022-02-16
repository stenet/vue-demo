<script lang="ts" setup>
import SlotOuter from "../components/SlotOuter.vue";
</script>

<template>
  <div class="col-container">
    <div class="col-xs-12">
      <slot-outer>
        <img src="../../../assets/logo.png">
      </slot-outer>
    </div>
  </div>
</template>

<style scoped>

</style>