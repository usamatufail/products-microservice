"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBatchPromises = void 0;
const createBatchPromises = (array, id, promiseFn) => {
    return array.map((arrEl) => promiseFn(id, arrEl));
};
exports.createBatchPromises = createBatchPromises;
//# sourceMappingURL=create-batch-promises.util.js.map