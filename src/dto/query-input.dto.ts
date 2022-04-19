import { IsNumber } from "class-validator";

/**
 * Estructura del request data
 * 
 * Juan Manuel Suarez
 *
 
 */
 export class queryInputDTO {
    @IsNumber()
    labor_rate: number;    
}



