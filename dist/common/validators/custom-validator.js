"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdValidator = void 0;
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
let ObjectIdValidator = class ObjectIdValidator {
    validate(value, args) {
        const validObjectId = mongoose_1.Types.ObjectId.isValid(value);
        return validObjectId;
    }
    defaultMessage(args) {
        var _a;
        if (Array.isArray(args === null || args === void 0 ? void 0 : args.value)) {
            const errors = (_a = args === null || args === void 0 ? void 0 : args.value) === null || _a === void 0 ? void 0 : _a.map((el, index) => {
                return `${args.property}.${index} must be a MongoDB ObjectId!`;
            });
            return errors.join(', ');
        }
        else {
            return `${args.property} must be a MongoDB ObjectId!`;
        }
    }
};
ObjectIdValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'objectId', async: false })
], ObjectIdValidator);
exports.ObjectIdValidator = ObjectIdValidator;
//# sourceMappingURL=custom-validator.js.map