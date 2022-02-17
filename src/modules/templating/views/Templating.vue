<script lang="ts" setup>
import { ref } from "vue";
import RuntimeTemplate from "../components/RuntimeTemplate.vue";
import HelloWorld from "../components/HelloWorld.vue";

const t1 = `
  <div class="is-template">   
    <h3>Template 1</h3>
    <div>
      <hello-world :hello-world-name="name"></hello-world>
    </div>
    <div>
      <input type="text" v-model="name">
    </div>
    <div>
      Simple: {{ name }}
    </div>
    <div>
      Nested: {{ nested.a.n1 }}
    </div>
    <div>
      Static: {{ staticValue }}
    </div>
    <div>
      <button @click="onButtonClick()">Input auf aktuelles Datum/Zeit ändern</button>
    </div>
  </div>`;

const t2 = `
  <div class="is-template">
    <h3>Template 2</h3>  
    <div>
      <hello-world :hello-world-name="name"></hello-world>
    </div>
    <div>
      <input type="text" v-model="name">
    </div>
    <div>
      Simple: {{ name }}
    </div>
    <div>
      Nested: {{ nested.a.n1 }}
    </div>
    <div>
      Static: {{ staticValue }}
    </div>
    <div>
      <button @click="onButtonClick()">Input auf aktuelles Datum/Zeit ändern</button>
    </div>
  </div>`;

const name = ref("Name 1");
const nested = ref({
  a: {
    n1: "N1"
  }
});

let staticValue = "ABC";

function onButtonClick() {
  name.value = new Date().toLocaleString();
  nested.value.a.n1 = new Date().toLocaleString();
  staticValue = "ABC";
};

const components = {
  HelloWorld
};
const context = {
  name,
  nested,
  staticValue,
  onButtonClick
};

</script>

<template>
  <div class="col-container">
    <div class="col-xs-12">
      <div>
        {{ name }}
      </div>
    </div>
    <div class="col-xs-12">
      <runtime-template :components="components" :context="context" :template="t1"></runtime-template>
    </div>
    <div class="col-xs-12">
      <runtime-template :components="components" :context="context" :template="t2"></runtime-template>
    </div>
    <div class="col-xs-12">
      <base-info>
        <div>
          Beispiel, wie dynamische Templates verwendet werden können
        </div>
        <div>
          Damit können auch andere Komponenten eingebunden werden. Solche die nicht global registriert sind, müssen allerdings
          wie gewohnt übergeben werden.
        </div>
        <div>
          Wichtig hierfür ist, dass in der vite.config.ts unter resolve =&gt; alias "vue" konfiguriert ist, da ansonsten der Template-Compiler
          nicht Teil des Bundles ist und die Funktionalität im Produktiv-Bundle nicht verfügbar ist.
        </div>
      </base-info>
    </div>
  </div>
</template>

<style lang="less">
.dynamic-template div + div {
  margin-top: 1rem;
}
.is-template {
  display: grid;
  gap: 1rem;
  border: 4px solid #ddd;
  padding: 1rem;
}
</style>