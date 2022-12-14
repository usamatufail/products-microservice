"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterProducts = void 0;
const moments = require("moment");
const filterProducts = (search, products) => {
    const lowerSearch = search === null || search === void 0 ? void 0 : search.toLowerCase();
    const filtered = products === null || products === void 0 ? void 0 : products.filter((product) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let categoryContains = false;
        let variantsInlcluded = false;
        let tagsIncluded = false;
        (_a = product === null || product === void 0 ? void 0 : product.categories) === null || _a === void 0 ? void 0 : _a.forEach((category) => {
            var _a, _b;
            if ((_b = (_a = category === null || category === void 0 ? void 0 : category.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(lowerSearch)) {
                categoryContains = true;
            }
        });
        (_b = product === null || product === void 0 ? void 0 : product.variants) === null || _b === void 0 ? void 0 : _b.forEach((variant) => {
            var _a, _b;
            if ((_b = (_a = variant === null || variant === void 0 ? void 0 : variant.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(lowerSearch)) {
                variantsInlcluded = true;
            }
        });
        (_c = product === null || product === void 0 ? void 0 : product.tags) === null || _c === void 0 ? void 0 : _c.forEach((tag) => {
            var _a;
            if ((_a = tag === null || tag === void 0 ? void 0 : tag.toLowerCase()) === null || _a === void 0 ? void 0 : _a.includes(lowerSearch)) {
                tagsIncluded = true;
            }
        });
        const createDate = moments(product === null || product === void 0 ? void 0 : product.createdAt).format('YYYY-MM-DD');
        const searchDate = moments(search).format('YYYY-MM-DD');
        return (categoryContains ||
            variantsInlcluded ||
            tagsIncluded ||
            createDate === searchDate ||
            ((_e = (_d = product === null || product === void 0 ? void 0 : product.name) === null || _d === void 0 ? void 0 : _d.toLowerCase()) === null || _e === void 0 ? void 0 : _e.includes(lowerSearch)) ||
            ((_h = (_g = (_f = product === null || product === void 0 ? void 0 : product.productType) === null || _f === void 0 ? void 0 : _f.name) === null || _g === void 0 ? void 0 : _g.toLowerCase()) === null || _h === void 0 ? void 0 : _h.includes(search)) ||
            ((_l = (_k = (_j = product === null || product === void 0 ? void 0 : product.mainVariant) === null || _j === void 0 ? void 0 : _j.name) === null || _k === void 0 ? void 0 : _k.toLowerCase()) === null || _l === void 0 ? void 0 : _l.includes(lowerSearch)));
    });
    return filtered;
};
exports.filterProducts = filterProducts;
//# sourceMappingURL=filter-products.util.js.map