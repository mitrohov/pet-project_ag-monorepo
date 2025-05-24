import { ApiProperty } from '@nestjs/swagger'
import { Token, SessionInfo, SingInUser, User, UserWithId } from '../../dtos'

export class TokenForSwagger extends Token {
  @ApiProperty()
  declare accessToken: string
}

export class SingInUserForSwagger extends SingInUser {
  @ApiProperty({ example: 'user@mail.ru' })
  declare email: string

  @ApiProperty({ example: 'dsj34dgUdg' })
  declare password: string
}

export class SessionInfoForSwagger extends SessionInfo {
  @ApiProperty()
  declare id: number

  @ApiProperty()
  declare email: string

  @ApiProperty()
  declare iat: number

  @ApiProperty()
  declare exp: number
}

export class SignInResponseForSwagger extends SessionInfo {
  @ApiProperty()
  declare accessToken: string
}

export class UserForSwagger extends User {
  @ApiProperty({ example: 'user@mail.ru' })
  declare email: string

  @ApiProperty()
  declare hash: string

  @ApiProperty()
  declare salt: string
}

export class UserWithIdForSwagger extends UserWithId {
  @ApiProperty({ example: 1 })
  declare id: number
}
