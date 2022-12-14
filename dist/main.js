"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const filters_1 = require("./common/filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
    }));
    app.useGlobalFilters(new filters_1.HttpExceptionFilter(), new filters_1.MongoExceptionFilter(), new filters_1.MongooseException());
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Product Catalogue API')
        .setDescription('An API for Catalogue Management')
        .setVersion('1.0')
        .addBearerAuth()
        .setBasePath('/api/v1')
        .build();
    const appDocument = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api', app, appDocument, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map