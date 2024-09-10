import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-TDHCZ3ET.js";

// node_modules/ngxtension/fesm2022/ngxtension-create-injectable.mjs
function createInjectable(factory, {
  providedIn = "root"
} = {}) {
  const __Injectable = class __Injectable {
    constructor() {
      const result = factory();
      for (const key of Reflect.ownKeys(result)) {
        Object.defineProperty(this, key, {
          get: () => result[key],
          set: (value) => {
            result[key] = value;
          },
          enumerable: true,
          configurable: true
        });
      }
    }
  };
  __Injectable.ɵfac = function _Injectable_Factory(t) {
    return new (t || __Injectable)();
  };
  __Injectable.ɵprov = ɵɵdefineInjectable({
    token: __Injectable,
    factory: __Injectable.ɵfac,
    providedIn: providedIn === "scoped" ? null : providedIn
  });
  let _Injectable = __Injectable;
  (() => {
    (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_Injectable, [{
      type: Injectable,
      args: [{
        providedIn: providedIn === "scoped" ? null : providedIn
      }]
    }], () => [], null);
  })();
  if (factory.name) {
    Object.defineProperty(_Injectable, "name", {
      value: `_Injectable_${factory.name}`
    });
  }
  return _Injectable;
}
export {
  createInjectable
};
//# sourceMappingURL=ngxtension_create-injectable.js.map
