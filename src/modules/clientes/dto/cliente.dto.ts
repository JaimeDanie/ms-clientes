import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString, Validate, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { DateUtils } from "src/shared/utils/dateUtils";

// VALIDATE MIN DATE
@ValidatorConstraint({ async: false })
export class MinDateConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (!value) return false;

    const date = new Date(value);
    const minDate = DateUtils.dateNow();
    return date <= minDate;
  }

  defaultMessage() {
    return 'The date must be less than or equal to the minimum date.';
  }
}
export class ClienteDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullName: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    document: string;
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsDateString()
    @Validate(MinDateConstraint)  
    @IsNotEmpty()
    birthdate: string;
}