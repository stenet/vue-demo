<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { LocalizationService } from "./services/localization-service";
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
  <div class="app__container caption--left" :key="localizationService.culture" v-browser>
    <div class="app__nav">
      <div class="app__logo">
        <img src="./assets/logo.png">
      </div>
      
      <div>
        <template v-for="route in routes">
          <router-link :to="route.path">{{ route.name }}</router-link>
        </template>
      </div>
    </div>
    
    <div class="app__title">
      <span>
        {{ router.currentRoute.value.name }}
      </span>  
    </div>   

    <div class="app__router">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transitionName" mode="out-in">
          <keep-alive max="2">
            <component :is="Component" v-grid-width/>
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
  padding: 2px 0;
  border: 3px solid #ddd;
  align-items: center;
  
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
  }

  a {
    flex-grow: 1;
    text-align: center;
    padding: .5rem 1rem;
    background-color: #eee;
    text-decoration: none;
    color: #666;
    font-weight: bold;
    border-top: 3px solid transparent;
    border-bottom: 3px solid transparent;
    text-transform: uppercase;
    font-size: 0.8rem;
    
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

.app__logo {
  display: flex;
  justify-content: center;
  width: 50px;
  
  img {
    height: 25px;
    object-fit: contain;
  }
}

.app__title {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: #333;
  
  span {
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 10px;
      z-index: -1;
      bottom: -4px;
      left: 0;
      right: -30px;
      background-color: #41B883;
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
