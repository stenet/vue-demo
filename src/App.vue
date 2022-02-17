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
      <img src="./assets/logo.png" height="25">
      
      <div>
        <template v-for="route in routes">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </template>
      </div>
    </div>

    <div class="app__router">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName" mode="out-in">
          <keep-alive max="2">
            <component :is="Component" v-grid-size/>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="less">
.app__container {
  padding: 1rem;
  max-width: 1024px;
  margin: 0 auto;
}

.app__nav {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
  align-items: center;
  
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  a {
    padding: .5rem 1rem;
    background-color: #eee;
    text-decoration: none;
    color: #666;
    font-weight: bold;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    text-transform: uppercase;
    font-size: 0.7rem;
    
    &.router-link-active {
      border-bottom-color: #333;
      color: #333;
    }
    &:hover {
      background-color: #ccc;
      color: #333;
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
