//TODO - Error-Handling hinzufügen
export type Constructable<T = {}> = {
  new(...args: any[]): T;
};

export type Key = Symbol | string | Constructable;
type Scope = "singleton" | "scoped" | "transient";

interface IRegistryItem {
  key: Key;
  scope: Scope;
  type?: Constructable;
  resolve?: (container: Container) => object;
}

interface IContainerOptions {
  onAfterInstanceCreated?(item: IRegistryItem, instance: any): any;
}

class Registry {
  private _registry: Map<Key, IRegistryItem[]>;

  constructor() {
    this._registry = new Map();
  }

  register(item: IRegistryItem) {
    if (this._registry.has(item.key)) {
      this._registry.get(item.key)!.push(item);
    } else {
      this._registry.set(item.key, [item]);
    }
  }

  getOrCreateRegistryItem(key: Key) {
    let item = this._registry.get(key);
    if (!item || item.length === 0) {
      const newItem: IRegistryItem = {
        key,
        scope: "singleton",
        type: key as any
      };
      
      this.register(newItem);
      item = [newItem];
    }

    return item;
  }
}

export class All {
  constructor(public key: Key) {
  }
  
  static of(key: Key) {
    return new All(key);
  }
}

export class Container {
  private _registry?: Registry;
  private _instances: Map<Key, any>;

  constructor(
    private _parentContainer?: Container,
    private _options?: IContainerOptions
  ) {
    if (!_parentContainer) {
      this._registry = new Registry();
    }

    this._instances = new Map();
  }

  static createContainer(options?: IContainerOptions) {
    return new Container(undefined, options);
  }

  createChildContainer() {
    return new Container(this);
  }

  get<T>(key: Key | Constructable<T>): T {
    const registry = this.getRegistry();
    const item = registry.getOrCreateRegistryItem(key)[0];

    switch (item.scope) {
      case "singleton": {
        return this.getRoot().getOrCreateInstance<T>(item);
      }
      case "scoped": {
        return this.getOrCreateInstance<T>(item);
      }
      case "transient": {
        return this.createNewInstance<T>(item);
      }
    }
  }
  getAll<T>(key: Key | Constructable<T>): T[] {
    const registry = this.getRegistry();
    const item = registry.getOrCreateRegistryItem(key);
    
    const result = [];
    
    for (const i of item) {
      switch (i.scope) {
        case "singleton": {
          result.push(this.getRoot().getOrCreateInstance<T>(i));
          break;
        }
        case "scoped": {
          result.push(this.getOrCreateInstance<T>(i));
          break;
        }
        case "transient": {
          result.push(this.createNewInstance<T>(i));
          break;
        }
      }
    }
    
    return result;    
  }

  registerSingleton(key: Key, type: Constructable, scope: Scope = "singleton") {
    this.register({
      key,
      scope,
      type
    });
  }
  registerScoped(key: Key, type: Constructable, scope: Scope = "scoped") {
    this.register({
      key,
      scope,
      type
    });
  }
  registerTransient(key: Key, type: Constructable, scope: Scope = "transient") {
    return this.register({
      key,
      scope,
      type
    });
  }
  registerInstance(key: Key, obj: object) {
    return this.register({
      key,
      scope: "singleton",
      resolve: () => obj
    });
  }
  registerCallback(key: Key, callback: { (): object }) {
    return this.register({
      key,
      scope: "singleton",
      resolve: callback
    });
  }

  private register(item: IRegistryItem) {
    if (this._parentContainer) {
      throw new Error("Registrierungen dürfen nur auf dem Root-Container gemacht werden");
    }

    this._registry!.register(item);
  }
  
  private getOrCreateInstance<T>(item: IRegistryItem) {
    let instance = this._instances.get(item.key);
    if (!instance) {
      instance = this.createNewInstance(item);
      this._instances.set(item.key, instance);
    }

    return instance as T;
  }
  private createNewInstance<T>(item: IRegistryItem) {
    let instance: T | null;

    if (item.resolve) {
      try {
        instance = <T><unknown>item.resolve(this);
      } catch (ex) {
        console.error(`Fehler bei "resolve" von ${item.key}`, ex);
        throw ex;
      }
    } else {
      try {
        const parameters = this.getParameters(item.type);
        instance = new item.type!(...parameters) as T;
      } catch (ex) {
        console.error(`Fehler bei Erstellung von ${item.key}`, ex);
        throw ex;
      }
    }

    if (this.getRoot()._options?.onAfterInstanceCreated) {
      return this.getRoot()._options?.onAfterInstanceCreated!(item, instance) as T;
    }

    return instance;
  }
  private getParameters(type: any) {
    const r: any[] = [];

    if (type.inject) {
      for (const i of type.inject) {
        if (i instanceof All) {
          r.push(this.getAll(i.key))
        } else {
          r.push(this.get(i));
        }
      }
    }

    return r;
  }
  private getRegistry(): Registry {
    if (!this._registry) {
      return this._parentContainer!.getRegistry();
    }

    return this._registry;
  }
  private getRoot(): Container {
    if (this._parentContainer) {
      return this._parentContainer.getRoot();
    }

    return this;
  }
}