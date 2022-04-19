import { Injectable } from '@nestjs/common';
import { AppLoggerService } from '../util/app-logger.service';
import { queryInputDTO } from '../dto/query-input.dto';
import { outPutResDto } from '../dto/responseregister.dto';
import { HeadersDto } from '../dto/headers.dto';


@Injectable()
export class AppService {
  constructor(
    private appLoggerService: AppLoggerService,
  ) {

  }
  public async getInforesponse(HeadersDto:HeadersDto,bodyRequestDTO: queryInputDTO): Promise<outPutResDto> {
    let bodyResponseDTO = new outPutResDto();
    try {
      this.appLoggerService.log(`REQUEST: ${JSON.stringify(bodyRequestDTO)}`);
      
      if (!bodyRequestDTO.labor_rate || bodyRequestDTO.labor_rate.toString().length < 6) {
        bodyResponseDTO.status = 'Failed';
        bodyResponseDTO.OutDescription = 'Invalid Zip Code';
        this.appLoggerService.error(JSON.stringify(bodyResponseDTO),bodyResponseDTO.OutDescription);
        return bodyResponseDTO;
      }
      if (!HeadersDto.apikey || HeadersDto.apikey !="Ow8VcQTZTCWFsQYAUOjz") {
        bodyResponseDTO.status = "Failed";
        bodyResponseDTO.OutDescription = 'Invalid API Key';
        this.appLoggerService.error( JSON.stringify(bodyResponseDTO), bodyResponseDTO.OutDescription);
        return bodyResponseDTO;
      }     
      
    } catch (error) {
      this.appLoggerService.error(error,bodyResponseDTO.OutDescription);
    }
    return bodyResponseDTO;
  }
}
