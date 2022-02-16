<script lang="ts" setup>
import SlotInner from "./SlotInner.vue";
</script>

<template>
  <div class="col-container">
    <div class="col-xs-12">
      OuterSlot
    </div>
    <div class="col-xs-12">
      <slot-inner>
        <slot></slot>
      </slot-inner>
    </div>
  </div>
</template>