<script lang="ts" setup>
import EventOuter from "../components/EventOuter.vue";
import { ref } from "vue";

const received = ref<string[]>([]);

function onEventInnerDispatchClick() {
  received.value.push(`Received dispatch on ${Date().toLocaleString()}`);
}
function onEventInnerEmitClick() {
  received.value.push(`Received emit on ${Date().toLocaleString()}`);
}
</script>

<template>
  <div class="col-container">

    <div class="col-xs-12">
      <event-outer
        @event-inner-dispatch-click="onEventInnerDispatchClick()"
        @event-inner-emit-click="onEventInnerEmitClick()"/>
    </div>

    <div class="col-xs-12" v-for="item in received">
      {{ item }}
    </div>
    
    <div class="col-xs-12">
      <base-info>
        <div>
          Vergleich, ob es einen Unterschied macht, ob dispatchEvent oder $emit zum feuern von Events verwendet wird.
        </div>
        <div>
          Um es kurz zu machen: nein 😀
        </div>
      </base-info>
    </div>
  </div>
</template>

<style lang="less">
</style>