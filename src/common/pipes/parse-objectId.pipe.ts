import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<any, string> {
  public transform(value: any): string {
    const valid = ObjectId.isValid(value);
    if (!valid) {
      throw new BadRequestException(`Validation Failed: ${value} is not a valid MongoDB ObjectId!`);
    } else {
      return value;
    }
  }
}
