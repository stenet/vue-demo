<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { LocalizationService } from "./services/LocalizationService";
import { useContainer } from "./use/container";

const localizationService = useContainer(LocalizationService);
const router = useRouter();

const routes = computed(() => {
  return router.getRoutes().filter(r => {
    return !!r.meta.showInNav
      && !r.aliasOf;
  });
});
</script>

<template>
  <div class="app__container caption--left" :key="localizationService.culture">
    <div class="app__nav">
      <template v-for="route in routes">
        <router-link :to="route.path">{{ route.name }}</router-link>
      </template>
    </div>

    <div class="app__router">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName" mode="out-in">
          <keep-alive max="2">
            <component :is="Component"/>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="less">
.app__container {
  font-family: "Helvetica Neue", "Segoe UI", helvetica, verdana, sans-serif;
  font-size: 14px;
  padding: 1rem;
}

.app__nav {
  display: flex;
  gap: .5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;

  a {
    padding: .25rem .5rem;
    border-radius: .25rem;
    background-color: #ddd;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    
    &:hover {
      background-color: #ccc;
    }
  }
}

.app__router {
  margin-top: 1rem;
}

.slide-left-leave-active, .slide-right-leave-active {
  transition: opacity 0.1s ease-in, transform 0.1s ease-in;
}
  
.slide-left-enter-active, .slide-right-enter-active {
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
}

.slide-left-enter-from, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(8px);
}

.slide-right-enter-from, .slide-left-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}
</style>
