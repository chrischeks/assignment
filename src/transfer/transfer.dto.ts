import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class TransferDto {
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @IsNotEmpty()
  @Min(100)
  amount: number;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}

export class TransferDetailsDto {
  @ValidateNested()
  @IsArray()
  @IsObject({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => TransferDto)
  transferDetails: TransferDto[];
}
