﻿<script lang="ts" setup>
  
</script>

<template>
  <div class="base-info">
    <i class="fas fa-circle-info"></i>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less">
.base-info {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  padding: 1rem;
  border-radius: .5rem;
  border: 1px solid #c5e7d5;
  align-items: center;
  background-color: #e7f5ee;
  color: #18a058;
  
  i {
    font-size: 1.5rem;
  }
  
  > div > div + div {
    margin-top: 1rem;
  }
}
</style>