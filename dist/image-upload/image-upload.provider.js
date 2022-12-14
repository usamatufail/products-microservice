"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("./constants");
exports.ImageUploadProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: process.env.CLD_CLOUD_NAME,
            api_key: process.env.CLD_API_KEY,
            api_secret: process.env.CLD_API_SECRET,
        });
    },
};
//# sourceMappingURL=image-upload.provider.js.map