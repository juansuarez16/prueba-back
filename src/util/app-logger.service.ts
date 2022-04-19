import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { ENVIRONMENT_VARIABLES } from '../environment/variables';

/**
 * centraliza funcionalidad de logs de la aplicación
 * @author 
 * 31/12/2021
 */
@Injectable()
export class AppLoggerService implements LoggerService  {
  loggerWinston: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { applicationName: ENVIRONMENT_VARIABLES.SERVICE_NAME }, transports: [
      new winston.transports.Console({
        format: winston.format.colorize({
          all: true,
          colors: {
            info: 'blue',
            warn: 'yellow',
            error: 'red',
          },
        }),
      }),
    ],
  });

  log(message: string) {
    this.loggerWinston.info({ "timestamp": new Date().toISOString(), "message": message, "level": "info" });
  }

  error(message: any, trace?: string) {
    this.loggerWinston.error({  "timestamp": new Date().toISOString(), "message": message + JSON.stringify(trace), "level": "error" });
  }
  warn(message: any) {
    this.loggerWinston.warn({ "timestamp": new Date().toISOString(), "message": message, "level": "warn" });
  }
  debug?(message: any) {
    this.loggerWinston.debug({  "timestamp": new Date().toISOString(), "message": message, "level": "debug" });
  }
  verbose?(message: any) {
    this.loggerWinston.verbose({  "timestamp": new Date().toISOString(), "message": message, "level": "verbose" });
  }

  /**
   * genera log sobre un request realizado
   * @param request request hacia un legado
   
   */
   logRequest(
    request: any,    
  ) {
    this.log(
      `datos: ${JSON.stringify(request)}`
     
    );
  }
}
