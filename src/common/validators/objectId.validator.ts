import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'objectId', async: false })
export class ObjectIdValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const validObjectId = Types.ObjectId.isValid(value);
    return validObjectId;
  }

  defaultMessage(args: ValidationArguments) {
    if (Array.isArray(args?.value)) {
      const errors = args?.value?.map((el: string, index: number) => {
        return `${args.property}.${index} must be a MongoDB ObjectId!`;
      });
      return errors.join(', ');
    } else {
      return `${args.property} must be a MongoDB ObjectId!`;
    }
  }
}
