"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageObjectsGenerator = void 0;
const imageObjectsGenerator = (images) => {
    return images.map((image) => ({
        public_id: image.public_id,
        url: image.secure_url,
        label: image.tags[1],
    }));
};
exports.imageObjectsGenerator = imageObjectsGenerator;
//# sourceMappingURL=generate-image-object.util.js.map