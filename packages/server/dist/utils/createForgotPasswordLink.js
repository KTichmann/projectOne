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
const uuid_1 = require("uuid");
exports.createForgotPasswordLink = (url, userId, mongo) => __awaiter(this, void 0, void 0, function* () {
    const id = uuid_1.v4();
    const collection = mongo.collection("forgotPassword");
    yield collection.insertOne({ createdAt: new Date(), id, userId });
    return `${url}/change-password/${id}`;
});
//# sourceMappingURL=createForgotPasswordLink.js.map