"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiMultiFile = void 0;
const swagger_1 = require("@nestjs/swagger");
const ApiMultiFile = (fileName = 'files') => (target, propertyKey, descriptor) => {
    (0, swagger_1.ApiBody)({
        type: 'multipart/form-data',
        required: true,
        schema: {
            type: 'object',
            properties: {
                [fileName]: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'binary',
                    },
                },
            },
        },
    })(target, propertyKey, descriptor);
};
exports.ApiMultiFile = ApiMultiFile;
//# sourceMappingURL=api-file-upload.decorator.js.map