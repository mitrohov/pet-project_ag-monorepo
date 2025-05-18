import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  GetSessionInfoDto,
  SignInBodyDto,
  SignUpBodyDto,
  SignUpResponseDto,
} from './dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { Response } from 'express'
import { CookieService } from './cookie.service'
import { AuthGuard } from './auth.guard'
import { SessionInfo } from './session-info.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResponseDto })
  @UsePipes(new ValidationPipe())
  async signUp(
    @Body() body: SignUpBodyDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken } = await this.authService.signUp(
      body.email,
      body.password,
      body.isMock ? body.isMock : false
    )

    this.cookieService.setToken(res, accessToken)

    return { accessToken }
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SignUpResponseDto })
  @UsePipes(new ValidationPipe())
  async signIn(
    @Body() body: SignInBodyDto,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken } = await this.authService.signIn(
      body.email,
      body.password
    )

    this.cookieService.setToken(res, accessToken)

    return { accessToken }
  }

  @Post('sign-out')
  @ApiOkResponse()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  signOut(@Res({ passthrough: true }) res: Response) {
    this.cookieService.removeToken(res)
  }

  @Get('session')
  @ApiOkResponse({
    type: GetSessionInfoDto,
  })
  @UseGuards(AuthGuard)
  getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
    return session
  }
}
