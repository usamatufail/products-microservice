"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const toStream = require("buffer-to-stream");
let ImageUploadService = class ImageUploadService {
    async uploadImage(id, file) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream({ tags: `${id}, ${file === null || file === void 0 ? void 0 : file.fieldname}` }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async deleteImage(public_id) {
        return cloudinary_1.v2.uploader.destroy(public_id);
    }
};
ImageUploadService = __decorate([
    (0, common_1.Injectable)()
], ImageUploadService);
exports.ImageUploadService = ImageUploadService;
//# sourceMappingURL=image-upload.service.js.map