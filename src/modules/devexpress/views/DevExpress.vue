<script lang="ts" setup>
import { ref } from "vue";
import notify from "devextreme/ui/notify";

const textBoxValue = ref("Wert");

const columns = ref<DevExpress.ui.dxDataGrid.Column[]>([{
  caption: "Name",
  dataField: "name"
}]);

const textBoxButtonOptions = ref<DevExpress.ui.dxButton.Properties>({
  text: "Click to disable",
  onClick: () => {
    //funktioniert nicht, da DX Änderungen an der Eigenschaft nicht überwacht.
    //textBoxButtonOptions.value.disabled = true;

    //Aber wir können die Eigenschaften einfach neu setzen und disabled ergänzen 😉
    textBoxButtonOptions.value = Object.assign({}, textBoxButtonOptions.value, {
      disabled: true
    });
  }
});

function onTextBoxButtonClick(ev: DevExpress.ui.dxButton.ClickEvent) {
  notify("Hello from the dxTextBox", "success", 3000);
}

const columnName = ref("Name");
const data = [{ name: "Stefan" }];
const disabled = ref(false);

function onChangeColumnNameSkriptClick() {
  //geht nur, wenn die Columns neu gesetzt werden, da DX keine Nested-Eigenschaften überwacht
  const newColumns = [...columns.value];
  newColumns[0].caption = "Name komplett";
  columns.value = newColumns;
}
function onChangeColumnNameMarkupClick() {
  columnName.value = "Name komplett";
}
</script>

<template>
  <div class="col-container">    
    <div class="col-xs-12" data-caption="placeholder wird mit Standard-Attribut gesetzt">
      <dx-text-box
        placeholder="dxTextBox"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="placeholder kommt per inline Binding">
      <dx-text-box
        :placeholder="'Placeholder aus inline Funktion'"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="placeholder aus v-bind und readonly normal">
      <dx-text-box
        v-bind="{ placeholder: 'Placeholder aus v-bind und readonly normal'}"
        :read-only="true"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="value wird mit Standard-Attribut gesetzt">
      <dx-text-box
        placeholder="Wert mit value"
        value="Stefan"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="Wert mit value binding (= one-way-binding)">
      <dx-text-box
        placeholder="Wert mit value binding (= one-way-binding)"
        :value="textBoxValue"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="Wert mit v-model binding (= two-way-binding)">
      <dx-text-box
        placeholder="Wert mit v-model binding (= two-way-binding)"
        v-model="textBoxValue"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="Wert mit v-bind und v-model:value binding">
      <dx-text-box
        placeholder="Wert mit v-bind und v-model:value binding"
        v-bind:value="'Wert aus v-bind ... ☣️'"
        v-model:value="textBoxValue"></dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="dynamische dxTextBox mit Hilfe von component">
      <component
        :is="'DxTextBox'"
        placeholder="Ich bin dynamisch 🤘"></component>
    </div>

    <div class="col-xs-12" data-caption="zusätzlich ein Button im inline Style">
      <dx-text-box>
        <dx-text-box-button
          :options="{ text: 'Hi', onClick: (ev: DevExpress.ui.dxButton.ClickEvent) => onTextBoxButtonClick(ev) }"
          name="notify"
          location="after">
        </dx-text-box-button>
      </dx-text-box>
    </div>

    <div class="col-xs-12" data-caption="zusätzlich ein Button mit gebundenen Options">
      <dx-text-box>
        <dx-text-box-button
          :options="textBoxButtonOptions"
          name="notify"
          location="after">
        </dx-text-box-button>
      </dx-text-box>
    </div>

    <div class="col-md-6 col-xs-12">
      <dx-check-box
        text="Ändere mich, um den disabled Status der unteren dxCheckBox zu ändern"
        v-model="disabled"></dx-check-box>
    </div>
    
    <div class="col-md-6 col-xs-12">
      <dx-check-box
        text="Mein Enabled/Disabled-Status kommt von der darüberliegenden dxCheckBox"
        :disabled="disabled"></dx-check-box>
    </div>
    
    <div class="col-xs-12" data-caption="Spalten in Skript">
      <dx-data-grid
        :columns="columns"
        :data-source="data"
        :hover-state-enabled="true"></dx-data-grid>
    </div>
    
    <div class="col-xs-12">
      <dx-button
        text="Change column name"
        @click="onChangeColumnNameSkriptClick()"></dx-button>
    </div>
    
    <div class="col-xs-12" data-caption="Spalten in Markup">
      <dx-data-grid
        :data-source="data"
        :hover-state-enabled="true">
        <dx-column :caption="columnName" data-field="name"></dx-column>
      </dx-data-grid>
    </div>
    
    <div class="col-xs-12">
      <dx-button
        text="Change column name"
        @click="onChangeColumnNameMarkupClick()"></dx-button>      
    </div>
    
    <div class="col-xs-12">
      <base-info>
        Verwendung von unterschiedlichen DevExpress-Komponenten wie dxTextBox, dxDataGrid, dxButton, ...
      </base-info>
    </div>
  </div>
</template>

<style lang="less">
</style>