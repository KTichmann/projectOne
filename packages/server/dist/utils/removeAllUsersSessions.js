"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoDb_1 = require("./mongoDb");
exports.removeAllUsersSessions = (userId) => __awaiter(this, void 0, void 0, function* () {
    const db = yield mongoDb_1.MongoDb("test");
    yield db.collection("sessions").deleteMany({ "session.userId": userId });
});
//# sourceMappingURL=removeAllUsersSessions.js.map