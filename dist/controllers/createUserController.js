"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/controllers/createUserController.ts
var createUserController_exports = {};
__export(createUserController_exports, {
  createUserController: () => createUserController
});
module.exports = __toCommonJS(createUserController_exports);

// src/services/createUserService.ts
var import_mongoose2 = __toESM(require("mongoose"));

// src/models/Model.ts
var import_mongoose = __toESM(require("mongoose"));
var bcrypt = require("bcryptjs");
var userSchema = new import_mongoose.default.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true, default: false },
  senha: { type: String, required: true, select: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});
userSchema.pre("save", function(next) {
  return __async(this, null, function* () {
    if (!this.isModified("senha")) {
      return next();
    }
    const hashedPassword = yield bcrypt.hash(this.senha, 10);
    this.senha = hashedPassword;
    next();
  });
});
var User = import_mongoose.default.model("User", userSchema);
var tagSchema = new import_mongoose.default.Schema({
  nome: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now },
  updated_at: { type: Date, required: true, default: Date.now }
});
var Tag = import_mongoose.default.model("Tag", tagSchema);
var complimentSchema = new import_mongoose.default.Schema({
  user_sender: { type: import_mongoose.default.Types.ObjectId, ref: "User", required: true },
  user_receiver: { type: import_mongoose.default.Types.ObjectId, ref: "User", required: true },
  tag_id: { type: import_mongoose.default.Types.ObjectId, ref: "Tag", required: true },
  message: { type: String, required: true },
  created_at: { type: Date, required: true, default: Date.now }
});
var Compliment = import_mongoose.default.model("Compliment", complimentSchema);

// src/services/createUserService.ts
var createUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ nome, email, admin = false, senha }) {
      import_mongoose2.default.set("strictQuery", false);
      yield import_mongoose2.default.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");
      const user = new User({
        nome,
        email,
        admin,
        senha
      });
      user.save((err) => {
        if (err) {
          console.error(err);
          import_mongoose2.default.disconnect();
          return;
        }
        console.log("Usu\xE1rio cadastrado com sucesso");
        import_mongoose2.default.disconnect();
      });
      return JSON.stringify(`O usu\xE1rio ${user} foi cadastrado com sucesso`);
    });
  }
};

// src/controllers/createUserController.ts
var createUserController = class {
  handle(request, response) {
    return __async(this, null, function* () {
      const { nome, email, admin, senha } = request.body;
      const CreateUserService = new createUserService();
      const user = yield CreateUserService.execute({ nome, email, admin, senha });
      return response.json(user);
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createUserController
});
