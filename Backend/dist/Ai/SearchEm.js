"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEmbedding = void 0;
const aiservics_1 = require("../Services/aiservics");
const searchEmbedding = (query) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const CollectionSet = yield (0, aiservics_1.collection)();
    const count = yield CollectionSet.count();
    if (count === 0)
        return []; // If there are no documents, return empty array immediately
    const results = yield CollectionSet.query({
        queryTexts: [query],
        nResults: Math.min(5, count),
    });
    console.log(((_a = results.ids) === null || _a === void 0 ? void 0 : _a[0]) || []);
    return ((_b = results.ids) === null || _b === void 0 ? void 0 : _b[0]) || [];
});
exports.searchEmbedding = searchEmbedding;
//# sourceMappingURL=SearchEm.js.map