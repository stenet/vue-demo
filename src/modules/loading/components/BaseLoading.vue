<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";

type Props = {
  promise: Promise<any>
}

enum State {
  loading = 0,
  finish = 1,
  error = 2
}

class PromiseResolver {
  private _promise?: Promise<any>;

  constructor(
    private _callback: { (state: State): void }) {
  }

  setPromise(promise?: Promise<any>) {
    this._promise = promise;

    if (!promise) {
      this.notifyState(State.finish, this._promise);
      return;
    }

    this.notifyState(State.loading, this._promise);
    this.waitPromise(promise);
  }

  private async waitPromise(promise: Promise<any>) {
    try {
      await promise;
      this.notifyState(State.finish, promise);
    } catch {
      this.notifyState(State.error, promise);
    }
  }
  private notifyState(state: State, promise?: Promise<any>) {
    if (this._promise != promise) {
      return;
    }

    this._callback(state);
  }
}

const props = defineProps<Props>();
const state = ref(State.loading);
const resolver = new PromiseResolver(s => state.value = s);
const has = computed(() => !!props.promise);

watchEffect(() => {
  resolver.setPromise(props.promise);
});

</script>

<template>
  <div v-if="has" class="base-loading">
    <div v-if="state === 0" class="base-loading__active">
      <div>
        Daten werden geladen
      </div>
      <div>
        <i class="fas fa-3x fa-spinner fa-spin" style="color: darkgoldenrod"></i>
      </div>
    </div>
    <div v-else-if="state === 1">
      <slot></slot>
    </div>
    <div v-else-if="state === 2">
      Fehler beim Laden 🟥
    </div>
  </div>
</template>

<style lang="less">
.base-loading__active {
  display: grid;
  grid-auto-flow: row;
  gap: 1rem;
  justify-items: center;
}
</style>