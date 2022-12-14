import { PipeTransform } from '@nestjs/common';
export declare class ParseObjectIdPipe implements PipeTransform<any, string> {
    transform(value: any): string;
}
