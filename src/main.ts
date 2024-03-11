import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { yamlFileLoad } from './config/configuration';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  SwaggerModule.setup('doc', app, yamlFileLoad);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || 4000;

  await app.listen(port, () => {
    console.log(
      '\x1b[36m%s\x1b[0m',
      `\nServer running on port http://localhost:${port}\n`,
    );
  });
}
bootstrap();
