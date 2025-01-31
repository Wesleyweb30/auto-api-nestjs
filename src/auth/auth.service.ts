import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import {compareSync as bcryptCompareSync} from 'bcrypt'
import { SignUserDto } from 'src/users/dto/sign-in-user.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    async signIn(signUser: SignUserDto): Promise<{access_token: string}> {
        const foundUser = await this.usersService.findOne(signUser.username);
        
        if (!foundUser || !bcryptCompareSync(signUser.password, foundUser.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUser.id, username: foundUser.username };

        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
