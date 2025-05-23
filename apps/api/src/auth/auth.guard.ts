import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { CookieService } from './cookie.service'
import { JwtService } from '@nestjs/jwt'
import * as process from 'node:process'
import * as dotenv from 'dotenv'

dotenv.config()

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request

    if (!req.cookies) {
      throw new UnauthorizedException()
    }

    const token = req.cookies[CookieService.tokenKey]

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      req['session'] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}
