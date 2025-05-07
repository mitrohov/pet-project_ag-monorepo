import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
} from 'class-validator';

export class TokenDto {
  @IsString()
  @ApiProperty()
  accessToken: string;
}

export class AuthData {
  @ApiProperty({ example: 'user@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'dsj34dgUdg' })
  @IsNotEmpty()
  password: string;
}

export class SignInBodyDto extends AuthData {}

export class SignUpBodyDto extends AuthData {
  @IsBoolean()
  @IsOptional()
  isMock?: boolean;
}

export class GetSessionInfoDto {
  @IsNumber()
  @ApiProperty()
  id: number;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNumber()
  @ApiProperty()
  iat: number;

  @IsNumber()
  @ApiProperty()
  exp: number;
}

export class SignUpResponseDto extends GetSessionInfoDto {
  @IsString()
  @ApiProperty()
  accessToken: string;
}

export class User {
  @ApiProperty({ example: 'user@mail.ru' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  hash: string;

  @ApiProperty()
  @IsString()
  salt: string;
}

export class UserResponseDto extends User {
  @IsNumber()
  @ApiProperty({ example: 1 })
  id: number;
}
