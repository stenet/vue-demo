import { ref, UnwrapRef } from "vue";

export function usePromise<T>(promise?: Promise<T>) {
  const p = ref<Promise<T> | undefined>(promise);
  const result = ref<T | null>();
  const isRunning = ref();
  const error = ref<Error | null>();
  
  const reload = (newPromise: Promise<T>) => {
    p.value = newPromise;
    result.value = null;
    isRunning.value = true;
    error.value = null;
    
    newPromise.then(c => {
      result.value = c;
    }).catch(e => {
      error.value = e;
    }).finally(() => {
      isRunning.value = false;
    });
  } 
  
  if (promise) {
    reload(promise);
  }
  
  return  {
    promise: p,
    isRunning,
    error,
    result,
    reload
  }
}