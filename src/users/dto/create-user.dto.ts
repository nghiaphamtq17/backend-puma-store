import {
  IsEmail,
  IsEnum,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

class DocumentDto {
  @IsString()
  type: string;

  @IsString()
  file_url: string;
}

export class CreateUserDto {
  @IsEnum(['customer', 'owner'])
  role: 'customer' | 'owner';

  @IsEnum(['individual', 'company'])
  type: 'individual' | 'company';

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  representative_name?: string;

  @IsString()
  @IsOptional()
  representative_phone?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents?: Array<DocumentDto>;
}
