import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config';
export declare class ConfigService<K> extends NestConfig<K> {
    get<P extends Path<K>>(path: P): PathValue<K, P>;
}
