import { EventHandler, IEventHandler } from "../events/event-handler";
import { JsonService } from "./json-service";

export class FetchService {
  private readonly _errorHandler: EventHandler<Response>;
  
  constructor(
    private _jsonService: JsonService
  ) {
    this._errorHandler = new EventHandler<Response>();
    
    this.defaultOptions = {
      errorHandler: this._errorHandler
    };
  }

  static inject = [JsonService];

  readonly defaultOptions: Partial<FetchOptions> & FetchErrorHandlerEvent;

  get<T>(options: FetchGetOptions): Promise<T> {
    return this.fetch("GET", options);
  }
  post<T>(options: FetchPostOptions): Promise<T> {
    return this.fetch("POST", options);
  }
  patch<T>(options: FetchPatchOptions): Promise<T> {
    return this.fetch("PATCH", options);
  }
  put<T>(options: FetchPutOptions): Promise<T> {
    return this.fetch("PUT", options);
  }
  delete(options: FetchDeleteOptions): Promise<any> {
    return this.fetch("DELETE", options);
  }

  async fetch(method: FetchMethod, options: FetchUnionOptions) {
    const fetchOptions = Object.assign({}, this.defaultOptions, options);
    const { abortController, finish } = this.createAbortHandler(options);

    const response = await fetch(this.getUrl(options.url), {
      method: method,
      signal: abortController.signal,
      ...fetchOptions
    });

    finish();
    if (response.status != 200) {
      this.handleError(options, response);
    }

    const resultType = this.getResultType(options);
    switch (resultType) {
      case "json": {
        return await this.getJson(response);
      }
      case "binary": {
        return await this.getBinary(response);
      }
    }
  }

  private createAbortHandler(options: FetchUnionOptions) {
    let abortController = new AbortController();
    const abort = (() => {
      abortController.abort();
    });

    if (options.abortSignal) {
      options.abortSignal.addEventListener("abort", abort);
    }

    const timeout = options.timeout || this.defaultOptions.timeout;

    const handle = timeout
      ? setTimeout(() => abortController.abort(), timeout)
      : 0;

    return {
      abortController,
      finish: () => {
        if (options.abortSignal) {
          options.abortSignal.removeEventListener("abort", abort);
        }

        clearTimeout(handle);
      }
    };
  }

  private getUrl(url: string) {
    if (this.defaultOptions.url) {
      return `${this.defaultOptions.url}/${url}`;
    }

    return url;
  }
  
  private handleError(options: FetchUnionOptions, response: Response) {
    let isHandled = false;
    if (!isHandled && options.errorHandler) {
      isHandled = options.errorHandler(response);
    }
    
    if (!isHandled) {
      isHandled = this._errorHandler.publish(response).isHandled;
    }

    throw new Error(`${response.status}: ${response.statusText}`);
  }
  
  private getResultType(options: FetchUnionOptions): FetchResultType {
    if ("resultType" in options && options.resultType) {
      return options.resultType;
    }

    return "json";
  }
  private async getJson(response: Response) {
    const text = await response.text();
    if (!text) {
      return null;
    }

    return this._jsonService.parse(text);
  }
  private async getBinary(response: Response) {
    return await response.blob();
  }
}

type FetchErrorHandler = (response: Response) => boolean;
type FetchErrorHandlerEvent = {
  errorHandler: IEventHandler<Response>
};

type FetchOptions = {
  url: string;
  headers?: FetchHeader;
  timeout?: number;

  mode?: RequestMode;
  credentials?: RequestCredentials;
}
type FetchBaseOptions = FetchOptions & {
  resultType?: FetchResultType;
  abortSignal?: AbortSignal;
  errorHandler?: FetchErrorHandler;
};

export type FetchGetOptions = FetchBaseOptions & {
  id?: string;
};
export type FetchPostOptions = FetchBaseOptions & {
  body: any;
}
export type FetchPatchOptions = FetchPostOptions;
export type FetchPutOptions = FetchPostOptions;
export type FetchDeleteOptions = FetchBaseOptions & {
  id: string;
}

type FetchUnionOptions = FetchGetOptions | FetchPostOptions | FetchPatchOptions | FetchPutOptions | FetchDeleteOptions;

type FetchResultType = "json" | "binary";
type FetchHeader = {
  [key: string]: string;
}
type FetchMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";