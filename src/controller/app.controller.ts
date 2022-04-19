import { Body, Controller, Headers, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { HeadersDto } from '../dto/headers.dto';
import { AppLoggerService } from '../util/app-logger.service';
import { ENVIRONMENT_VARIABLES } from '../environment/variables';
import { queryInputDTO } from '../dto/query-input.dto';
import * as CircuitBreaker from 'opossum';
import { outPutResDto } from '../dto/responseregister.dto';
import { Utils } from '../util/utils';
@Controller(ENVIRONMENT_VARIABLES.MS_BASE_PATH)
export class AppController {
  constructor(
    private readonly appService: AppService,
    private appLoggerService: AppLoggerService,
  ) {}

  /**
   * controla el envio de datos.
   * @param headers headers request
   * @param bodyRequest body request
   * @return
   */
  @Get()
   async getPrueba(@Headers() headers: HeadersDto,
      @Body() bodyRequest:queryInputDTO,
   ): Promise<outPutResDto> { 
     this.appLoggerService.log(
       `REQUEST: ${JSON.stringify(bodyRequest)}`    
     );
     let response: outPutResDto = null;
     const circuitBreaker = new CircuitBreaker(
      async () => {
        response = await this.appService.getInforesponse(headers, bodyRequest);
        this.appLoggerService.log(
          `RESPONSE: ${JSON.stringify(response)}`      
        );
        return response;
      },
      {
        timeout: parseInt(ENVIRONMENT_VARIABLES.CIRCUIT_BREAKER_TIMEOUT),
      },
    );
    circuitBreaker.fallback((error) =>
    this.validateFallback(error)
);
   return circuitBreaker.fire(); 
}

    private validateFallback(
      error     
    ): outPutResDto {
      const response = new outPutResDto();
      response.status = 'Interno';
      response.OutDescription = `ERROR GENERAL: ${Utils.getMessageFromUnexpectedError(error)}`;      
      return response;
    }
}
