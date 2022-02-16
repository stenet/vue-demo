<script lang="ts" setup>
import { LocalizationService } from "../../../services/LocalizationService";
import { useContainer } from "../../../use/container";

const localizationService = useContainer(LocalizationService);
</script>

<template>
  <div class="col-container">
    <div class="col-xs-12" data-caption="Sprache">
      <select v-model="localizationService.culture">
        <option value="de">Deutsch</option>
        <option value="en">Englisch</option>
      </select>
    </div>
    
    <div class="col-xs-12" data-caption="Übersetzung mit Directive + Target als Array">
      <div v-tr="{ target: ['html', 'title'], key: 'hello' }">
      </div>
    </div>
    
    <div class="col-xs-12" data-caption="Übersetzung mit Directive + Target als String">
      <div v-tr="{ target: 'html,title', key: 'hello' }">
      </div>
    </div>

    <div class="col-xs-12" data-caption="Übersetzung mit Interpolation">
      {{ $tr('hello') }}
    </div>
    
    <div class="col-xs-12">
      Das aktualisieren der Directiven wird mit einem kleinen Hack gemacht. In der App.vue ist bei .app__container ein :key mit der
      Culture definiert. Dadurch, dass sich der Wert ändert, wird ein Rerendering ausgelöst.      
    </div>
  </div>
</template>

<style scoped>

</style>