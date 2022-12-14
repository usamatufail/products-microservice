"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let LoggerMiddleware = class LoggerMiddleware {
    use(req, res, next) {
        console.log(`req:`, {
            headers: req.headers,
            body: req.body,
            originalUrl: req.originalUrl,
        });
        getResponseLog(res);
        if (next) {
            next();
        }
    }
};
LoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
const getResponseLog = (res) => {
    const rawResponse = res.write;
    const rawResponseEnd = res.end;
    const chunkBuffers = [];
    console.log(`Beginning res.write`);
    res.write = (...chunks) => {
        const resArgs = [];
        for (let i = 0; i < chunks.length; i++) {
            resArgs[i] = chunks[i];
            if (!resArgs[i]) {
                res.once('drain', res.write);
                --i;
            }
        }
        if (resArgs[0]) {
            chunkBuffers.push(Buffer.from(resArgs[0]));
        }
        return rawResponse.apply(res, resArgs);
    };
    console.log(`Done writing, beginning res.end`);
    res.end = (...chunk) => {
        const resArgs = [];
        for (let i = 0; i < chunk.length; i++) {
            resArgs[i] = chunk[i];
        }
        if (resArgs[0]) {
            chunkBuffers.push(Buffer.from(resArgs[0]));
        }
        const body = Buffer.concat(chunkBuffers).toString('utf8');
        res.setHeader('origin', 'restjs-req-res-logging-repo');
        const responseLog = {
            response: {
                statusCode: res.statusCode,
                body: JSON.parse(body) || body || {},
                headers: res.getHeaders(),
            },
        };
        console.log('res: ', responseLog);
        rawResponseEnd.apply(res, resArgs);
        return responseLog;
    };
};
//# sourceMappingURL=log.middleware.js.map