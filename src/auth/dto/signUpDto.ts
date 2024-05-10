import {
    IsEmail,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    ValidateIf,
  } from 'class-validator';
  
  export class SignUpDto {
    @IsString()
    @Length(2, 30)
    username: string;
  
    @IsString()
    @ValidateIf((dto) => dto.about !== '')
    @Length(2, 200)
    about: string;
  
    @IsUrl()
    avatar: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  }