

export class Utils{
    /**
   * construye un mensaje a partir de un error inesperado generado
   * @param legacyName nombre del legado
   * @returns 
   */
  static getMessageFromUnexpectedError(error: any): string {
    return `${error && error.message ? error.message : JSON.stringify(error)}`;
  }
}