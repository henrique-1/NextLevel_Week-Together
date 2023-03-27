"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// src/server.ts
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/routes.ts
var import_express = require("express");

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

// src/services/createTagService.ts
var import_mongoose3 = __toESM(require("mongoose"));
var createTagService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ nome }) {
      import_mongoose3.default.set("strictQuery", false);
      yield import_mongoose3.default.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");
      const tag = new Tag({
        nome
      });
      tag.save((err) => {
        if (err) {
          console.error(err);
          import_mongoose3.default.disconnect();
          return JSON.stringify(`Ocorreu um erro ao cadastrar a tag ${tag.nome}`);
        }
        console.log("Tag cadastrada com sucesso");
        import_mongoose3.default.disconnect();
      });
      return JSON.stringify(`A tag ${tag.nome} foi cadastrada com sucesso`);
    });
  }
};

// src/controllers/createTagController.ts
var createTagController = class {
  handle(request, response) {
    return __async(this, null, function* () {
      const { nome } = request.body;
      const CreateTagService = new createTagService();
      const tag = yield CreateTagService.execute({ nome });
      return response.json(tag);
    });
  }
};

// src/services/createComplimentService.ts
var import_mongoose4 = __toESM(require("mongoose"));
var createComplimentService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ tag_id, user_sender, user_receiver, message }) {
      import_mongoose4.default.set("strictQuery", false);
      yield import_mongoose4.default.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");
      const compliment = new Compliment({
        tag_id,
        user_sender,
        user_receiver,
        message
      });
      compliment.save((err) => {
        if (err) {
          console.error(err);
          import_mongoose4.default.disconnect();
          return;
        }
        console.log("Compliment cadastrado com sucesso");
        import_mongoose4.default.disconnect();
      });
      return JSON.stringify(`O compliment ${compliment} foi cadastrado com sucesso`);
    });
  }
};

// src/controllers/createComplimentController.ts
var createComplimentController = class {
  handle(request, response) {
    return __async(this, null, function* () {
      const { tag_id, user_receiver, message } = request.body;
      const { userId } = request.params;
      const CreateComplimentService = new createComplimentService();
      const compliment = yield CreateComplimentService.execute({ tag_id, user_sender: userId, user_receiver, message });
      return response.json(compliment);
    });
  }
};

// src/services/authenticateUserService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var import_mongoose5 = __toESM(require("mongoose"));
var authenticateUserService = class {
  execute(_0) {
    return __async(this, arguments, function* ({ email, senha }) {
      import_mongoose5.default.set("strictQuery", false);
      yield import_mongoose5.default.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");
      const user = yield User.findOne({
        email
      });
      if (!user) {
        throw new Error("Email/Password incorrect");
      }
      const passwordMatch = yield (0, import_bcryptjs.compare)(senha, user.senha);
      if (!passwordMatch) {
        throw new Error("Email/Password incorrect");
      }
      const token = (0, import_jsonwebtoken.sign)(
        {
          email: user.email
        },
        "82ec88f89380f7a172a251f579a33c05",
        {
          subject: user.id,
          expiresIn: "1d"
        }
      );
      yield import_mongoose5.default.disconnect();
      return token;
    });
  }
};

// src/controllers/authenticateUserController.ts
var authenticateUserController = class {
  handle(request, response) {
    return __async(this, null, function* () {
      const { email, senha } = request.body;
      const AuthenticateUserService = new authenticateUserService();
      const token = yield AuthenticateUserService.execute({
        email,
        senha
      });
      return response.json(token);
    });
  }
};

// src/services/listTagServices.ts
var import_mongoose6 = __toESM(require("mongoose"));
var listTagService = class {
  execute() {
    return __async(this, null, function* () {
      import_mongoose6.default.set("strictQuery", false);
      yield import_mongoose6.default.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");
      const tags = yield Tag.find({});
      import_mongoose6.default.disconnect();
      return tags;
    });
  }
};

// src/controllers/listTagController.ts
var listTagController = class {
  handle(request, response) {
    return __async(this, null, function* () {
      const ListTagService = new listTagService();
      const tags = yield ListTagService.execute();
      return response.json(tags);
    });
  }
};

// src/middleware/ensureAuthenticated.ts
var import_jsonwebtoken2 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).end();
  }
  try {
    const { sub } = (0, import_jsonwebtoken2.verify)(authToken, "82ec88f89380f7a172a251f579a33c05");
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}

// src/middleware/ensureAdmin.ts
var import_mongoose7 = __toESM(require("mongoose"));
function ensureAdmin(request, response, next) {
  return __async(this, null, function* () {
    const userId = request.params.userId;
    import_mongoose7.default.set("strictQuery", false);
    yield import_mongoose7.default.connect("mongodb://127.0.0.1:27017/NLW-Together?replicaSet=rs");
    const admin = yield User.findOne({
      _id: userId,
      admin: true
    });
    yield import_mongoose7.default.disconnect();
    if (admin) {
      return next();
    }
    return response.status(401).json({
      error: "Unauthorized!"
    });
  });
}

// src/routes.ts
var router = (0, import_express.Router)();
var CreateUserController = new createUserController();
var CreateTagController = new createTagController();
var CreateComplimentController = new createComplimentController();
var AuthenticateUserController = new authenticateUserController();
var ListTagController = new listTagController();
router.post("/users", CreateUserController.handle);
router.post("/tags/:userId", ensureAuthenticated, ensureAdmin, CreateTagController.handle);
router.post("/login", AuthenticateUserController.handle);
router.post("/compliments/:userId", ensureAuthenticated, CreateComplimentController.handle);
router.get("/tags", ensureAuthenticated, ListTagController.handle);

// src/server.ts
var app = (0, import_express2.default)();
app.use(import_express2.default.json());
app.use((0, import_cors.default)());
app.use(router);
app.use((err, request, response, next) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
});
app.listen(3e3, () => console.log("Server is running on port 3000"));
