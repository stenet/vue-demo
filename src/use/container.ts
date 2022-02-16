import { inject } from "vue";
import { Constructable, Container, Key } from "../di";

export function useContainer<T>(key: Key | Constructable<T>): T {
  return inject<Container>("container")!.get(key as Key) as T;
}