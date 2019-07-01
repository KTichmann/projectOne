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
const User_1 = require("../entity/User");
exports.confirmEmail = (req, res, mongo) => __awaiter(this, void 0, void 0, function* () {
    const collection = mongo.collection("userVerification");
    const { id } = req.params;
    const cursor = yield collection.find({ id: { $eq: id } });
    const docArr = yield cursor.toArray();
    const userId = docArr[0].userId;
    if (userId) {
        yield User_1.User.update({ id: userId }, { confirmed: true });
        yield collection.remove({ userId: { $eq: userId } }, { single: true });
        res.send("ok");
    }
    else {
        res.send("invalid");
    }
});
//# sourceMappingURL=confirmEmail.js.map