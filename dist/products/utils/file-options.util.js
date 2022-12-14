"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.singleFileOptions = exports.fileOptions = void 0;
exports.fileOptions = {
    schema: {
        type: 'object',
        properties: {
            files: {
                type: 'array',
                items: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    },
};
exports.singleFileOptions = {
    schema: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary',
            },
        },
    },
};
//# sourceMappingURL=file-options.util.js.map