import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async signUp(email: string, password: string, isMock: boolean = false) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException({ type: 'Email exists' });
    }

    const salt = this.passwordService.getSalt();
    const hash = this.passwordService.getHash(password, salt);

    const newUser = await this.userService.create(email, hash, salt, isMock);

    const accessToken = await this.jwtService.signAsync(
      {
        id: newUser.id,
        email: newUser.email,
      },
      {
        expiresIn: '1y',
      },
    );

    return { accessToken };
  }

  async signIn(email: string, password: string) {
    const user = (await this.userService.findByEmail(email)) as UserResponseDto;

    if (!user) {
      throw new UnauthorizedException();
    }

    const hash = this.passwordService.getHash(password, user.salt);

    if (hash !== user.hash) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
