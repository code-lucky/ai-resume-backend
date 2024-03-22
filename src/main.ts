import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './interceptors/format-response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { InvokeRecordInterceptor } from './interceptors/invoke-record.interceptor';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
import { CustomExceptionFilter } from './filter/custom-exception.filter';
import { UnloginFilter } from './guard/unlogin.filter';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启跨域处理
  app.enableCors()

  // 全局日志
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN))

  // 设置全局前缀
  app.setGlobalPrefix('api')

  // 全局启用
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new FormatResponseInterceptor())
  app.useGlobalInterceptors(new InvokeRecordInterceptor())
  app.useGlobalFilters(new UnloginFilter())
  app.useGlobalFilters(new CustomExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('nest-cli')
    .setDescription('api接口文档')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      description: '基于jwt的认证'
    })
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-doc', app, document)

  const configService = app.get(ConfigService)
  await app.listen(configService.get('nest_server_port'));
}
bootstrap();
