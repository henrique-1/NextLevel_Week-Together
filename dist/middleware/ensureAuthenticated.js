"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middleware/ensureAuthenticated.ts
var ensureAuthenticated_exports = {};
__export(ensureAuthenticated_exports, {
  ensureAuthenticated: () => ensureAuthenticated
});
module.exports = __toCommonJS(ensureAuthenticated_exports);
var import_jsonwebtoken = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }
  try {
    const { sub } = (0, import_jsonwebtoken.verify)(authToken, "82ec88f89380f7a172a251f579a33c05");
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ensureAuthenticated
});
