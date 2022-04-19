const serviceName = 'LOCAL_LABOR_RATE';
const httpPrefix = 'http://';

function getAppEnvironmentVariableOrDefault(
  variable: string,
  defaultValue: string,
) {
  return variable ? variable : defaultValue;
}

export const ENVIRONMENT_VARIABLES = {
  SERVICE_NAME: getAppEnvironmentVariableOrDefault(
    process.env.SERVICE_NAME,
    serviceName,
  ),
  MS_PORT: getAppEnvironmentVariableOrDefault(
    process.env.MS_PORT,
    '3000',
  ),
  MS_BASE_PATH: getAppEnvironmentVariableOrDefault(
    process.env.MS_BASE_PATH,
    '/services/apexrest/v1/carsApi',
  ),
  MS_GET_SEGMENT_LINE_ACCOUNT_END_POINT: getAppEnvironmentVariableOrDefault(
    process.env.MS_GET_SEGMENT_LINE_ACCOUNT_END_POINT,
    '/',
  ),
  ENABLE_JSON_LOGS: getAppEnvironmentVariableOrDefault(
    process.env.ENABLE_JSON_LOGS,
    '0',
  ),
  ENABLE_HTTP_LOGS: getAppEnvironmentVariableOrDefault(
    process.env.ENABLE_HTTP_LOGS,
    '0',
  ),
  CIRCUIT_BREAKER_TIMEOUT: getAppEnvironmentVariableOrDefault(
    process.env.CIRCUIT_BREAKER_TIMEOUT,
    '30000',
  )
  
  
};
