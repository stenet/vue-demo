export class JsonService {
  private _regexDateISO = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d)|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d)/;

  parse(json: string) {
    if (!json) {
      return json;
    }

    if (!(typeof json === "string")) {
      json = JSON.stringify(json);
    }

    return JSON.parse(json, (key: string, value: string): any => {
      if (!(typeof value === "string" && value.indexOf("{") < 0)) {
        return value;
      }

      const a = this._regexDateISO.exec(value);

      if (a && a.index == 0) {
        return new Date(value);
      }

      return value;
    });
  }
  stringify(obj: any) {
    return JSON.stringify(obj);
  }
}
