import { ref, UnwrapRef } from "vue";

export function usePromise<T>(promise: Promise<T>) {
  const p = ref<Promise<T>>(promise);
  const result = ref<T | null>();
  const isLoading = ref();
  const error = ref<Error | null>();
  
  const reload = (newPromise: Promise<T>) => {
    p.value = newPromise;
    result.value = null;
    isLoading.value = true;
    error.value = null;
    
    newPromise.then(c => {
      result.value = c;
    }).catch(e => {
      error.value = e;
    }).finally(() => {
      isLoading.value = false;
    });
  } 
  
  reload(promise);
  
  return  {
    promise: p,
    isLoading,
    error,
    result,
    reload
  }
}