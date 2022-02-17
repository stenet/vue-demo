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
    <div class="col-xs-12">
      <base-info>
        <div>
          Hierbei wird mit Nested-Slots gearbeitet. D.h. ein Element wird durch mehrere Elemente durchgereiht.
        </div>
        <div>
          In diesem Fall vom &lt;slot-outer&gt; in den &lt;slot-inner&gt;.
        </div>
      </base-info>
    </div>
  </div>
</template>

<style scoped>

</style>