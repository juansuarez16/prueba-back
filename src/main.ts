import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ENVIRONMENT_VARIABLES } from './environment/variables';
import { AppLoggerService } from './util/app-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new AppLoggerService(),
  });
  await app.listen(ENVIRONMENT_VARIABLES.MS_PORT,()=>{
    console.log("Server is listening on port",ENVIRONMENT_VARIABLES.MS_PORT);
    
  });
}
bootstrap();
