import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsPositive,
} from 'class-validator'

export class Token {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}

export class SingInUser {
  @IsEmail({}, { message: 'Введен не корректный email' })
  @MinLength(3, { message: 'Email должен быть не менее 3 символов' })
  @MaxLength(50, { message: 'Email должен быть не более 50 символов' })
  email: string

  @IsString()
  @MinLength(3, { message: 'Пароль должен быть не менее 3 символов' })
  @MaxLength(50, { message: 'Пароль должен быть не более 50 символов' })
  password: string
}

export class SessionInfo {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number

  @IsEmail()
  @MinLength(3, { message: 'Email должен быть не менее 3 символов' })
  @MaxLength(50, { message: 'Email должен быть не более 50 символов' })
  email: string

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  iat: number

  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  exp: number
}

export class SignInResponse extends SessionInfo {
  @IsString()
  @IsNotEmpty()
  accessToken: string
}

export class User {
  @IsEmail()
  @MinLength(3, { message: 'Email должен быть не менее 3 символов' })
  @MaxLength(50, { message: 'Email должен быть не более 50 символов' })
  email: string

  @IsString()
  @IsNotEmpty()
  hash: string

  @IsString()
  @IsNotEmpty()
  salt: string
}

export class UserWithId extends User {
  @IsNumber()
  @IsPositive({ message: 'Значение должно быть положительным числом' })
  @IsInt({ message: 'Значение должно быть целым числом' })
  id: number
}
