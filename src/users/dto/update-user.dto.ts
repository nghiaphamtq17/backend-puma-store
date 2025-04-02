import {
  IsEmail,
  IsEnum,
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class DocumentDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  file_url?: string;
}

export class UpdateUserDto {
  @IsEnum(['customer', 'owner'])
  @IsOptional()
  role?: 'customer' | 'owner';

  @IsEnum(['individual', 'company'])
  @IsOptional()
  type?: 'individual' | 'company';

  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  password?: string;

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
