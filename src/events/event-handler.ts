interface IEventHandlerExecutor<T> {
  detail: T;
  stopProgagation(): void;
}

type EventHandlerExecutor<T> = {(args: IEventHandlerExecutor<T>): void};

export interface IEventHandler<T> {
  addListener(callback: EventHandlerExecutor<T>): void;
  removeListener(callback: EventHandlerExecutor<T>): void;
}

export class EventHandler<T> implements IEventHandler<T> {
  private readonly _handlers: EventHandlerExecutor<T>[] = [];
  
  addListener(callback: EventHandlerExecutor<T>): void {
    this._handlers.push(callback);
  }
  removeListener(callback: EventHandlerExecutor<T>): void {
    const indexOf = this._handlers.indexOf(callback);
    if (indexOf < 0) {
      return;
    }
    
    this._handlers.splice(indexOf, 1);
  }  
  
  publish(value: T) {
    let stop = false;
    
    const args: IEventHandlerExecutor<T> = {
      detail: value,
      stopProgagation() {
        stop = true;
      }
    }
    
    for (const handler of this._handlers) {
      handler(args);
      
      if (stop) {
        return {
          isHandled: true
        };
      }
    }
    
    return {
      isHandled: false
    };
  }
} 