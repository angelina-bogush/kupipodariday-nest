import {
    IsBoolean,
    IsNumber,
    IsOptional,
    Min,
  } from 'class-validator';
  
  export class CreateOfferDto {
    @IsNumber()
    public item: number;
  
    @IsNumber()
    @Min(1)
    public amount: number;
  
    @IsBoolean()
    @IsOptional()
    public hidden: boolean = false;
  }